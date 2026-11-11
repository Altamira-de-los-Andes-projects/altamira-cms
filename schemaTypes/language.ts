import {defineField, defineType} from 'sanity'

// Languages the site is offered in. Adding a document here adds a column to every translated field.
export const language = defineType({
  name: 'language',
  title: 'Idioma',
  type: 'document',
  fields: [
    defineField({name: 'code', title: 'Código (es, en, pt…)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Nombre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'active', title: 'Visible en el sitio', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Orden', type: 'number'}),
    defineField({name: 'flag', title: 'Bandera (solo para idiomas nuevos)', type: 'image'}),
  ],
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'code'}},
})
