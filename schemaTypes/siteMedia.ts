import {defineField, defineType} from 'sanity'
import {LANG, tr} from '../lang'
import {photoLabelEn} from '../scripts/uiTextMeta'

// One document per photo on the site, identified by the file name the website falls back to.
export const siteMedia = defineType({
  name: 'siteMedia',
  title: tr('Foto del sitio', 'Site photo'),
  type: 'document',
  fields: [
    defineField({name: 'label', title: tr('¿Dónde aparece?', 'Where does it appear?'), type: 'string', readOnly: true, hidden: LANG === 'en'}),
    defineField({name: 'image', title: tr('Foto', 'Photo'), type: 'image', options: {hotspot: true}}),
    defineField({name: 'file', title: tr('Archivo', 'File'), type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'page', title: tr('Página', 'Page'), type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'position', title: tr('Posición', 'Position'), type: 'number', readOnly: true, hidden: true}),
  ],
  orderings: [{title: tr('Orden', 'Order'), name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {
    select: {title: 'label', media: 'image'},
    prepare: ({title, media}: {title?: string; media?: any}) => ({title: LANG === 'en' ? photoLabelEn(title) : title, media}),
  },
})
