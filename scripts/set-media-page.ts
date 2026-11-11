// Adds the page each photo belongs to (see PAGE_BY_LABEL in seed-media.ts). Run: npx sanity exec scripts/set-media-page.ts --with-user-token
import {getCliClient} from 'sanity/cli'
const client = getCliClient({apiVersion: '2025-02-19'})
const PAGE_BY_LABEL: Record<string, string> = {
  'Aviso de edad': 'gate', Inicio: 'home', 'Nuestros vinos': 'vinos', 'Nuestros viñedos': 'vinedos', Contacto: 'contacto', Galería: 'galeria', Novedades: 'novedades',
}
async function main() {
  const docs = await client.fetch<{_id: string; label: string}[]>(`*[_type == "siteMedia"]{_id, label}`)
  const tx = client.transaction()
  docs.forEach((d) => tx.patch(d._id, (p) => p.set({page: PAGE_BY_LABEL[d.label.split(' · ')[0]] ?? 'home'})))
  await tx.commit()
  console.log(docs.length, 'photos assigned to a page')
}
main()
