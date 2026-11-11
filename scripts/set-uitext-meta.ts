// Adds the plain-Spanish label, page and order to every "Texto del sitio" document.
// Run: npx sanity exec scripts/set-uitext-meta.ts --with-user-token
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {describeKey} from './uiTextMeta'

const client = getCliClient({apiVersion: '2025-02-19'})
const es = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'content.json'), 'utf8')).es

// same walk order as the site's source, so texts appear in the order they do on the page
const order: string[] = []
function walk(n: unknown, p: string) {
  if (typeof n === 'string') n && order.push(p)
  else if (Array.isArray(n)) n.forEach((v, i) => walk(v, `${p}.${i}`))
  else if (n && typeof n === 'object') for (const [k, v] of Object.entries(n)) k !== 'wineCatalog' && walk(v, p ? `${p}.${k}` : k)
}
walk(es, '')

async function main() {
  const docs = await client.fetch<{_id: string; key: string}[]>(`*[_type == "uiText"]{_id, key}`)
  for (let i = 0; i < docs.length; i += 50) {
    const tx = client.transaction()
    for (const d of docs.slice(i, i + 50)) {
      const {page, label} = describeKey(d.key)
      tx.patch(d._id, (p) => p.set({label, page, position: order.indexOf(d.key)}))
    }
    await tx.commit()
  }
  console.log(`${docs.length} texts labelled`)
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
