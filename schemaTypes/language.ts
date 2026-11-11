import {defineField, defineType} from 'sanity'
import {tr} from '../lang'

// Languages the site is offered in. Adding a document here adds a column to every translated field.
export const language = defineType({
  name: 'language',
  title: tr('Idioma', 'Language'),
  type: 'document',
  fields: [
    defineField({name: 'code', title: tr('Código (es, en, pt…)', 'Code (es, en, pt…)'), type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: tr('Nombre', 'Name'), type: 'string', validation: (r) => r.required()}),
    defineField({name: 'active', title: tr('Visible en el sitio', 'Visible on the site'), type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: tr('Orden', 'Order'), type: 'number'}),
    defineField({name: 'flag', title: tr('Bandera (solo para idiomas nuevos)', 'Flag (new languages only)'), type: 'image'}),
  ],
  orderings: [{title: tr('Orden', 'Order'), name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'code'}},
})
