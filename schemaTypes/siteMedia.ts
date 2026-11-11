import {defineField, defineType} from 'sanity'

// One document per photo on the site, identified by the file name the website falls back to.
export const siteMedia = defineType({
  name: 'siteMedia',
  title: 'Foto del sitio',
  type: 'document',
  fields: [
    defineField({name: 'label', title: '¿Dónde aparece?', type: 'string', readOnly: true}),
    defineField({name: 'image', title: 'Foto', type: 'image', options: {hotspot: true}}),
    defineField({name: 'file', title: 'Archivo', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'page', title: 'Página', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'position', title: 'Posición', type: 'number', readOnly: true, hidden: true}),
  ],
  orderings: [{title: 'Orden', name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {select: {title: 'label', media: 'image'}},
})
