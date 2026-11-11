import {defineField, defineType} from 'sanity'

// One document: everything global (header, hero, contact, which sections are on).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Logo, video y secciones del sitio',
  type: 'document',
  groups: [
    {name: 'header', title: 'Encabezado'},
    {name: 'hero', title: 'Inicio'},
    {name: 'sections', title: 'Secciones'},
    {name: 'contact', title: 'Contacto'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'Nombre (texto del encabezado)', type: 'string', group: 'header', initialValue: 'Altamira de los Andes'}),
    defineField({name: 'headerLogo', title: 'Logo (si se sube, reemplaza al texto)', type: 'image', group: 'header'}),
    defineField({name: 'headerSubtitle', title: 'Subtítulo del encabezado', type: 'internationalizedArrayString', group: 'header'}),
    defineField({name: 'favicon', title: 'Icono de la pestaña', type: 'image', group: 'header'}),
    defineField({name: 'heroVideo', title: 'Video de inicio', type: 'file', options: {accept: 'video/*'}, group: 'hero'}),
    defineField({name: 'heroPoster', title: 'Imagen mientras carga el video', type: 'image', group: 'hero'}),
    defineField({name: 'showAgeGate', title: 'Aviso de mayoría de edad al entrar', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHome', title: 'Página: Inicio', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showVineyards', title: 'Página: Nuestros viñedos', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showWines', title: 'Página: Nuestros vinos', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showGallery', title: 'Página: Galería', type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showNews', title: 'Página: Novedades (y noticias en Inicio)', type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showContact', title: 'Página: Contacto', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showEstate', title: 'Inicio: frase de presentación', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHomePhoto', title: 'Inicio: foto de viñedos bajo la frase', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showHomeVineyards', title: 'Inicio: sección "Nuestros viñedos"', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showQuote', title: 'Inicio: banner con la cita', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'showAwards', title: 'Inicio: premios', type: 'boolean', initialValue: false, group: 'sections'}),
    defineField({name: 'showMap', title: 'Viñedos: mapa de ubicaciones', type: 'boolean', initialValue: true, group: 'sections'}),
    defineField({name: 'office', title: 'Oficina comercial (dirección)', type: 'text', rows: 3, group: 'contact'}),
    defineField({name: 'phones', title: 'Teléfonos (uno por línea)', type: 'array', of: [{type: 'string'}], group: 'contact'}),
    defineField({name: 'email', title: 'Correo de contacto', type: 'string', validation: (r) => r.email(), group: 'contact'}),
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Nombre', type: 'string'}),
            defineField({name: 'url', title: 'Enlace (vacío si todavía no hay)', type: 'url'}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Logo, video y secciones del sitio'})},
})
