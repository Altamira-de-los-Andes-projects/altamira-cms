// One-off: uploads the website's photos and hero video to Sanity and completes the site settings to match the site.
// Run: npx sanity exec scripts/seed-media.ts --with-user-token (SITE_REPO = path of the website repo)
// Photos are only created if missing, so editors' replacements are kept.
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const SITE_REPO = process.env.SITE_REPO ?? '/Users/admin/Desktop/Teko Proyectos/vistaflores'
const assets = path.join(SITE_REPO, 'public/assets')
const client = getCliClient({apiVersion: '2025-02-19'})

const PHOTOS: [file: string, label: string][] = [
  ['gate-mountain.png', 'Aviso de edad · Fondo'],
  ['place-bg.jpg', 'Inicio · Fondo de "El lugar"'],
  ['vineyard-autumn-andes.jpg', 'Inicio · Foto de viñedos bajo la frase'],
  ['quote-bg.jpg', 'Inicio · Fondo del banner con la cita'],
  ['d7200.png', 'Inicio · Premio 1'],
  ['5b74e.png', 'Inicio · Premio 2'],
  ['fb3eb.png', 'Inicio · Premio 3'],
  ['36671.png', 'Inicio · Premio 4'],
  ['b1740.png', 'Inicio · Premio 5'],
  ['226c0.png', 'Inicio · Premio 6'],
  ['5e611.png', 'Inicio · Foto de noticia 1'],
  ['28b42.png', 'Inicio · Foto de noticia 2'],
  ['vinos-hero.jpg', 'Nuestros vinos · Foto superior'],
  ['vinos-stage.jpg', 'Nuestros vinos · Paisaje detrás de las botellas'],
  ['la-consulta-real.jpg', 'Nuestros viñedos · Foto superior'],
  ['altamira-home-sq.jpg', 'Nuestros viñedos · Foto de Altamira'],
  ['laconsulta-home-sq.jpg', 'Nuestros viñedos · Foto de La Consulta'],
  ['estate-home.jpg', 'Nuestros viñedos · Foto de Vista Flores'],
  ['soil-laconsulta.jpg', 'Nuestros viñedos · Foto del suelo'],
  ['vinedos-vines-1.jpg', 'Nuestros viñedos · Foto de las viñas'],
  ['vinedos-hands.jpg', 'Nuestros viñedos · Foto de las manos'],
  ['contact-mobile-bg.jpg', 'Contacto · Foto de viñedo y Andes'],
  ['altamira-vy.jpg', 'Contacto · Foto del cartel (móvil)'],
  ...Array.from({length: 12}, (_, i): [string, string] => [`gallery-${String(i + 1).padStart(2, '0')}.jpg`, `Galería · Foto ${i + 1}`]),
]
// news photos are stock placeholders on the site: empty slots, so editors can add real ones
const EMPTY: [string, string][] = [
  ['news-featured', 'Novedades · Foto destacada'],
  ['news-1', 'Novedades · Foto de artículo 1'],
  ['news-2', 'Novedades · Foto de artículo 2'],
  ['news-3', 'Novedades · Foto de artículo 3'],
]
const idOf = (file: string) => `siteMedia-${file.replace(/[^A-Za-z0-9_-]/g, '-')}`
const up = async (kind: 'image' | 'file', file: string) => {
  const a = await client.assets.upload(kind, fs.createReadStream(path.join(assets, file)), {filename: file})
  return {_type: 'reference', _ref: a._id}
}

async function main() {
  let position = 0
  for (const [file, label] of PHOTOS) {
    const asset = await up('image', file)
    await client.createIfNotExists({_id: idOf(file), _type: 'siteMedia', file, label, position: position++, image: {_type: 'image', asset}})
  }
  for (const [file, label] of EMPTY) await client.createIfNotExists({_id: idOf(file), _type: 'siteMedia', file, label, position: position++})
  console.log(`${position} photos`)

  const heroVideo = {_type: 'file', asset: await up('file', 'hero-andes.mp4')}
  const heroPoster = {_type: 'image', asset: await up('image', 'hero-andes.jpg')}
  await client
    .patch('siteSettings')
    .set({
      heroVideo,
      heroPoster,
      showAgeGate: true, showHome: true, showVineyards: true, showWines: true, showContact: true,
      showGallery: false, showNews: false, showAwards: false,
      showEstate: true, showHomePhoto: true, showHomeVineyards: true, showQuote: true, showMap: true,
      phones: ['Argentina +54 261 4299962', 'USA +1 305 988 5992'],
      socials: ['IG', 'FB', 'LI'].map((label) => ({_key: label, _type: 'object', label})),
    })
    .unset(['phone'])
    .commit()

  const lines: Record<string, string> = {dama: 'DAMA', navigato: 'NAVIGATO', 'reserva-malbec': 'RESERVA', 'reserva-cf': 'RESERVA', 'vav-malbec': 'VAV', 'tres-fincas': 'VAV'}
  for (const [id, line] of Object.entries(lines)) await client.patch(`wine-${id}`).set({line}).commit()

  await client.createIfNotExists({
    _id: 'uiText-home-vineyardsPhotoAlt',
    _type: 'uiText',
    key: 'home.vineyardsPhotoAlt',
    page: 'home',
    label: 'Inicio · Descripción de la foto de viñedos (para lectores de pantalla)',
    position: 30.5,
    value: [
      {_key: 'alt-es', _type: 'internationalizedArrayTextValue', language: 'es', value: 'Viñedos de Altamira de los Andes con la cordillera nevada al fondo'},
      {_key: 'alt-en', _type: 'internationalizedArrayTextValue', language: 'en', value: 'Altamira de los Andes vineyards with the snow-capped Andes behind'},
      {_key: 'alt-pt', _type: 'internationalizedArrayTextValue', language: 'pt', value: 'Vinhedos da Altamira de los Andes com a cordilheira nevada ao fundo'},
    ],
  })
  console.log('settings, wine lines and alt text done')
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
