import type {StructureBuilder, StructureResolver} from 'sanity/structure'

// The left-hand menu, in plain Spanish and in the order of the website. Texts are listed per page, in the order they appear there.
const textsOf = (S: StructureBuilder, title: string, pages: string[], hint: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(`${title} — ${hint}`)
        .schemaType('uiText')
        .filter('_type == "uiText" && page in $pages')
        .params({pages})
        .defaultOrdering([{field: 'position', direction: 'asc'}]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Qué quieres editar')
    .items([
      S.listItem().title('Logo, video y secciones del sitio').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      textsOf(S, 'Página de inicio', ['home'], 'textos'),
      S.listItem().title('Vinos (fotos, descripciones, fichas técnicas)').child(S.documentTypeList('wine').title('Vinos').defaultOrdering([{field: 'order', direction: 'asc'}])),
      textsOf(S, 'Textos de la página de vinos', ['vinos', 'wineDetail'], 'textos'),
      textsOf(S, 'Nuestros viñedos', ['vinedos'], 'textos'),
      textsOf(S, 'Novedades', ['novedades'], 'textos'),
      textsOf(S, 'Contacto', ['contacto'], 'textos'),
      textsOf(S, 'Pie de página', ['footer'], 'textos'),
      textsOf(S, 'Menú y avisos', ['nav', 'a11y', 'gate'], 'textos'),
      textsOf(S, 'Política de privacidad', ['legal'], 'textos'),
      S.divider(),
      S.listItem().title('Fotos del sitio').child(S.documentTypeList('siteMedia').title('Fotos del sitio').defaultOrdering([{field: 'position', direction: 'asc'}])),
      S.listItem().title('Idiomas del sitio').child(S.documentTypeList('language').title('Idiomas')),
    ])
