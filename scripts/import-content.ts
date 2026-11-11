// One-off seed: loads the website's current copy (scripts/content.json, a dump of the site's i18n.tsx),
// the wines, their images and technical-sheet PDFs into the dataset.
// Run: SITE_REPO=<path to the website repo> npx sanity exec scripts/import-content.ts --with-user-token
// Document ids must not contain a "." (those are private and invisible to the public website).
// Safe to re-run: documents are created only if they don't exist, so editors' changes are never overwritten.
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {describeKey} from './uiTextMeta'

const SITE_REPO = process.env.SITE_REPO ?? '/Users/admin/Desktop/Teko Proyectos/vistaflores'
const DRY = process.env.DRY === '1'
const LANGS = [
  {code: 'es', title: 'Español'},
  {code: 'en', title: 'English'},
  {code: 'pt', title: 'Português'},
]
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'content.json'), 'utf8')) as Record<string, any>
const client = getCliClient({apiVersion: '2025-02-19'})

type Doc = {_id: string; _type: string; [k: string]: unknown}
const docs: Doc[] = []

const key = () => Math.random().toString(36).slice(2, 12)
// internationalized-array v5 value: [{_key, language: 'es', value}, ...]; empty texts are left out
function loc(type: 'String' | 'Text', values: Record<string, string | undefined>) {
  return LANGS.filter((l) => values[l.code]).map((l) => ({
    _key: key(),
    _type: `internationalizedArray${type}Value`,
    language: l.code,
    value: values[l.code],
  }))
}
const perLang = <T>(fn: (lang: string) => T | undefined) => Object.fromEntries(LANGS.map((l) => [l.code, fn(l.code)])) as Record<string, T | undefined>

// ── languages and site settings
LANGS.forEach((l, i) => docs.push({_id: `language-${l.code}`, _type: 'language', code: l.code, title: l.title, active: true, order: i}))
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Altamira de los Andes',
  headerSubtitle: loc('String', {es: 'UCO VALLEY · MENDOZA', en: 'UCO VALLEY · MENDOZA', pt: 'UCO VALLEY · MENDOZA'}),
  showAgeGate: true,
  showHome: true,
  showWines: true,
  showVineyards: true,
  showMap: true,
  showGallery: false,
  showNews: true,
  showContact: true,
  office: 'Av. Colón 241\n(5500) Mendoza, Argentina',
  phone: '+54 261 4299962',
  email: 'inquiries@altamiradelosandes.com',
})

// ── every loose text: one document per dotted key, translated
const texts = new Map<string, Record<string, string>>()
function walk(node: unknown, prefix: string, lang: string) {
  if (typeof node === 'string') {
    if (node) texts.set(prefix, {...texts.get(prefix), [lang]: node})
  } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${prefix}.${i}`, lang))
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) if (k !== 'wineCatalog') walk(v, prefix ? `${prefix}.${k}` : k, lang)
}
for (const l of LANGS) walk(content[l.code], '', l.code)
for (const [k, values] of texts)
  docs.push({
    _id: `uiText-${k.replace(/[^A-Za-z0-9_-]/g, '-')}`,
    _type: 'uiText',
    key: k,
    page: describeKey(k).page,
    label: describeKey(k).label,
    position: [...texts.keys()].indexOf(k),
    value: loc('Text', values),
  })

// ── wines (structured, with images and PDFs)
const BOTTLES: Record<string, string> = {
  dama: '5c918.png',
  navigato: '3d3ec.png',
  'reserva-malbec': 'reserva-malbec.png',
  'reserva-cf': 'reserva-cf.png',
  'vav-malbec': '4600e.png',
  'tres-fincas': '73703.png',
}
const assetCache = new Map<string, string>()
async function upload(kind: 'image' | 'file', file: string) {
  if (assetCache.has(file)) return assetCache.get(file)!
  if (!fs.existsSync(file)) throw new Error(`missing ${file}`)
  if (DRY) return 'dry'
  const asset = await client.assets.upload(kind, fs.createReadStream(file), {filename: path.basename(file)})
  assetCache.set(file, asset._id)
  return asset._id
}
const ref = (id: string) => ({_type: 'reference', _ref: id})

async function buildWines() {
  const catalog = content.es.wineCatalog as any[]
  for (const [order, base] of catalog.entries()) {
    const id: string = base.id
    const w = (l: string) => (content[l].wineCatalog as any[]).find((x) => x.id === id)
    const L = (field: string, type: 'String' | 'Text' = 'String') => loc(type, perLang((l) => w(l)?.[field]))
    const rows = (field: string, a: string, b: string, bt: 'String' | 'Text' = 'String') =>
      (base[field] as any[]).map((_, i) => ({
        _key: key(),
        _type: field === 'ficha' ? 'factRow' : 'tastingNote',
        label: loc('String', perLang((l) => w(l)?.[field]?.[i]?.[a])),
        [b]: loc(bt, perLang((l) => w(l)?.[field]?.[i]?.[b])),
      }))
    const sheet = []
    for (const l of LANGS) {
      const f = path.join(SITE_REPO, 'public/assets/fichas', l.code, `${id}.pdf`)
      sheet.push({_key: key(), _type: 'internationalizedArrayFileValue', language: l.code, value: {_type: 'file', asset: ref(await upload('file', f))}})
    }
    docs.push({
      _id: `wine-${id}`,
      _type: 'wine',
      slug: {_type: 'slug', current: id},
      active: true,
      order,
      name: L('name'),
      sub: L('sub'),
      gridRegion: L('gridRegion'),
      region: L('region'),
      title1: L('title1'),
      title2: L('title2'),
      paragraphs: (base.paras as string[]).map((_, i) => ({
        _key: key(),
        _type: 'paragraph',
        text: loc('Text', perLang((l) => w(l)?.paras?.[i])),
      })),
      closing: L('closing'),
      score: base.score ?? undefined,
      ficha: rows('ficha', 'label', 'value'),
      notes: rows('notes', 'label', 'text', 'Text'),
      bottle: {_type: 'image', asset: ref(await upload('image', path.join(SITE_REPO, 'public/assets', BOTTLES[id])))},
      background: {_type: 'image', asset: ref(await upload('image', path.join(SITE_REPO, 'public/assets', `wbg-${id}.jpg`)))},
      technicalSheet: sheet,
    })
  }
}

async function main() {
  await buildWines()
  console.log(`${docs.length} documents (${texts.size} texts, ${LANGS.length} languages, 6 wines)${DRY ? ' [dry run, nothing written]' : ''}`)
  if (DRY) return
  for (let i = 0; i < docs.length; i += 50) {
    const tx = client.transaction()
    docs.slice(i, i + 50).forEach((d) => tx.createIfNotExists(d))
    await tx.commit()
    console.log(`wrote ${Math.min(i + 50, docs.length)}/${docs.length}`)
  }
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
