import {defineField, defineType} from 'sanity'
import {LANG, tr} from '../lang'
import {describeKey} from '../scripts/uiTextMeta'

// Every other piece of site copy (menu, buttons, section titles, footer…): one entry per text,
// identified by the same dotted key the website uses (e.g. "home.heroTitle1").
// Editors only see where it appears (label) and the text in each language; the rest is hidden.
export const uiText = defineType({
  name: 'uiText',
  title: tr('Texto del sitio', 'Site text'),
  type: 'document',
  fields: [
    defineField({name: 'label', title: tr('¿Dónde aparece?', 'Where does it appear?'), type: 'string', readOnly: true, hidden: LANG === 'en'}),
    defineField({name: 'value', title: tr('Texto (uno por idioma)', 'Text (one per language)'), type: 'internationalizedArrayText'}),
    defineField({name: 'key', title: tr('Clave', 'Key'), type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'page', title: tr('Página', 'Page'), type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'position', title: tr('Posición', 'Position'), type: 'number', readOnly: true, hidden: true}),
  ],
  orderings: [{title: tr('Orden en la página', 'Order on the page'), name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {
    select: {title: 'label', key: 'key', value: 'value'},
    // the stored label is Spanish; in English it is rebuilt from the key, and the sample text follows the Studio language
    prepare: ({title, key, value}: {title?: string; key?: string; value?: {language?: string; value?: string}[]}) => ({
      title: LANG === 'en' && key ? describeKey(key, 'en').label : title,
      subtitle: (value?.find((v) => v.language === LANG)?.value ?? value?.[0]?.value ?? '').slice(0, 90),
    }),
  },
})
