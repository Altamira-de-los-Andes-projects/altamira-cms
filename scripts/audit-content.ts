// Compares what is in the CMS with the copy bundled in the website (CUR = JSON dump of the site's COPY) and prints any gap.
// Run: CUR=path/to/dump.json npx sanity exec scripts/audit-content.ts --with-user-token
import fs from 'node:fs'
import {getCliClient} from 'sanity/cli'
const cur = JSON.parse(fs.readFileSync(process.env.CUR!, 'utf8'))
const client = getCliClient({apiVersion: '2025-02-19'})
const langs = ['es', 'en', 'pt']
const flat = new Map<string, Record<string, string>>()
function walk(n: any, p: string, l: string) {
  if (typeof n === 'string') n && flat.set(p, {...flat.get(p), [l]: n})
  else if (Array.isArray(n)) n.forEach((v, i) => walk(v, `${p}.${i}`, l))
  else if (n && typeof n === 'object') for (const [k, v] of Object.entries(n)) k !== 'wineCatalog' && walk(v, p ? `${p}.${k}` : k, l)
}
for (const l of langs) walk(cur[l], '', l)
async function main() {
  const texts = await client.fetch<any[]>(`*[_type=="uiText"]{key, "v": value[]{language,value}}`)
  const inCms = new Map(texts.map((t) => [t.key, Object.fromEntries(t.v.map((x: any) => [x.language, x.value]))]))
  const missing = [...flat.keys()].filter((k) => !inCms.has(k))
  const extra = [...inCms.keys()].filter((k) => !flat.has(k))
  let diff = 0, empty = 0
  const diffs: string[] = []
  for (const [k, vals] of flat) for (const l of langs) {
    const c = inCms.get(k)?.[l]
    if (vals[l] && c === undefined) empty++
    else if (vals[l] && c !== vals[l]) {diff++; diffs.push(`${k}[${l}]`)}
  }
  console.log(`TEXTS site=${flat.size} cms=${inCms.size} missingInCms=${missing.length} extraInCms=${extra.length} langValuesMissing=${empty} valuesDifferent=${diff}`)
  console.log('missing:', missing.slice(0, 10), 'extra:', extra.slice(0, 10), 'diffs:', diffs.slice(0, 10))
  // wines
  const wines = await client.fetch<any[]>(`*[_type=="wine"]{"id":slug.current, active, line, "n":count(name), "p":count(paragraphs), "f":count(ficha), "nt":count(notes), score, "bottle":defined(bottle.asset), "bg":defined(background.asset), "sheets":technicalSheet[].language}`)
  for (const w of wines) {
    const b = cur.es.wineCatalog.find((x: any) => x.id === w.id)
    const ok = b && w.p === b.paras.length && w.f === b.ficha.length && w.nt === b.notes.length && w.bottle && w.bg && w.sheets?.length === 3
    console.log('WINE', w.id.padEnd(15), ok ? 'OK ' : 'PROBLEM', JSON.stringify(w))
  }
  const media = await client.fetch<any[]>(`*[_type=="siteMedia"]{file, "has": defined(image.asset)}`)
  console.log('MEDIA total', media.length, 'withImage', media.filter((m) => m.has).length, 'empty slots', media.filter((m) => !m.has).map((m) => m.file))
  const s = await client.fetch(`*[_id=="siteSettings"][0]{siteName, "logo":defined(headerLogo.asset), "video":defined(heroVideo.asset), "poster":defined(heroPoster.asset), office, phones, email, "socials":socials[].label, showHome,showVineyards,showWines,showGallery,showNews,showContact,showAgeGate,showEstate,showHomePhoto,showHomeVineyards,showQuote,showAwards,showMap}`)
  console.log('SETTINGS', JSON.stringify(s))
  const l = await client.fetch(`*[_type=="language"]{code,title,active}`)
  console.log('LANGS', JSON.stringify(l))
  const total = await client.fetch(`count(*[!(_type match "system.*") && !(_type match "sanity.*")])`)
  console.log('TOTAL documents', total)
}
main()
