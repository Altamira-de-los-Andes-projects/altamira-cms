import {defineField, defineType} from 'sanity'

// Every other piece of site copy (menu, buttons, section titles, footer…): one entry per text,
// identified by the same dotted key the website uses (e.g. "home.heroTitle1").
// Editors only see where it appears (label) and the text in each language; the rest is hidden.
export const uiText = defineType({
  name: 'uiText',
  title: 'Texto del sitio',
  type: 'document',
  fields: [
    defineField({name: 'label', title: '¿Dónde aparece?', type: 'string', readOnly: true}),
    defineField({name: 'value', title: 'Texto (uno por idioma)', type: 'internationalizedArrayText'}),
    defineField({name: 'key', title: 'Clave', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'page', title: 'Página', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'position', title: 'Posición', type: 'number', readOnly: true, hidden: true}),
  ],
  orderings: [{title: 'Orden en la página', name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {
    select: {title: 'label', value: 'value'},
    prepare: ({title, value}: {title?: string; value?: {language?: string; value?: string}[]}) => ({
      title,
      subtitle: (value?.find((v) => v.language === 'es')?.value ?? value?.[0]?.value ?? '').slice(0, 90),
    }),
  },
})
