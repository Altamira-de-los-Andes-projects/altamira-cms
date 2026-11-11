import {defineField, defineType} from 'sanity'
import {tr} from '../lang'

// One document: everything global (header, hero, contact, which sections are on).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: tr('Logo, video y secciones del sitio', 'Logo, video & site sections'),
  type: 'document',
  groups: [
    {name: 'header', title: tr('Encabezado', 'Header')},
    {name: 'hero', title: tr('Inicio', 'Home')},
    {name: 'sections', title: tr('Secciones', 'Sections')},
    {name: 'contact', title: tr('Contacto', 'Contact')},
  ],
  fields: [
    defineField({name: 'siteName', title: tr('Nombre (texto del encabezado)', 'Name (header text)'), type: 'string', group: 'header', initialValue: 'Altamira de los Andes'}),
    defineField({name: 'headerLogo', title: tr('Logo (si se sube, reemplaza al texto)', 'Logo (if uploaded, replaces the text)'), type: 'image', group: 'header'}),
    defineField({name: 'headerSubtitle', title: tr('Subtítulo del encabezado', 'Header subtitle'), type: 'internationalizedArrayString', group: 'header'}),
    defineField({name: 'favicon', title: tr('Icono de la pestaña', 'Browser tab icon'), type: 'image', group: 'header'}),
    defineField({name: 'heroVideo', title: tr('Video de inicio', 'Home video'), type: 'file', options: {accept: 'video/*'}, group: 'hero'}),
    defineField({name: 'heroPoster', title: tr('Imagen mientras carga el video', 'Image while the video loads'), type: 'image', group: 'hero'}),
    defineField({name: 'showAgeGate', title: tr('Aviso de mayoría de edad al entrar', 'Age notice on entry'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHome', title: tr('Página: Inicio', 'Page: Home'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showVineyards', title: tr('Página: Nuestros viñedos', 'Page: Our vineyards'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showWines', title: tr('Página: Nuestros vinos', 'Page: Our wines'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showGallery', title: tr('Página: Galería', 'Page: Gallery'), type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showNews', title: tr('Página: Novedades (y noticias en Inicio)', 'Page: News (and news on Home)'), type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showContact', title: tr('Página: Contacto', 'Page: Contact'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showEstate', title: tr('Inicio: frase de presentación', 'Home: introduction sentence'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHomePhoto', title: tr('Inicio: foto de viñedos bajo la frase', 'Home: vineyard photo below the sentence'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHomeVineyards', title: tr('Inicio: sección "Nuestros viñedos"', 'Home: "Our vineyards" section'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showQuote', title: tr('Inicio: banner con la cita', 'Home: quote banner'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showAwards', title: tr('Inicio: premios', 'Home: awards'), type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showMap', title: tr('Viñedos: mapa de ubicaciones', 'Vineyards: locations map'), type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'office', title: tr('Oficina comercial (dirección)', 'Sales office (address)'), type: 'text', rows: 3, group: 'contact'}),
    defineField({name: 'phones', title: tr('Teléfonos (uno por línea)', 'Phones (one per line)'), type: 'array', of: [{type: 'string'}], group: 'contact'}),
    defineField({name: 'email', title: tr('Correo de contacto', 'Contact email'), type: 'string', validation: (r) => r.email(), group: 'contact'}),
    defineField({
      name: 'socials',
      title: tr('Redes sociales', 'Social networks'),
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: tr('Nombre', 'Name'), type: 'string'}),
            defineField({name: 'url', title: tr('Enlace (vacío si todavía no hay)', 'Link (empty if there is none yet)'), type: 'url'}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: tr('Logo, video y secciones del sitio', 'Logo, video & site sections')})},
})
