import {defineArrayMember, defineField, defineType} from 'sanity'
import {tr} from '../lang'

export const wine = defineType({
  name: 'wine',
  title: tr('Vino', 'Wine'),
  type: 'document',
  fields: [
    defineField({name: 'slug', title: tr('Dirección (slug)', 'Address (slug)'), type: 'slug', options: {source: 'name'}, validation: (r) => r.required()}),
    defineField({name: 'active', title: tr('Visible en el sitio', 'Visible on the site'), type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: tr('Orden', 'Order'), type: 'number'}),
    defineField({
      name: 'line',
      title: tr('Línea (filtro de la página de vinos)', 'Line (wines page filter)'),
      type: 'string',
      options: {list: ['VAV', 'RESERVA', 'DAMA', 'NAVIGATO']},
      initialValue: 'RESERVA',
    }),
    defineField({name: 'name', title: tr('Nombre', 'Name'), type: 'internationalizedArrayString'}),
    defineField({name: 'sub', title: tr('Subtítulo (variedad)', 'Subtitle (variety)'), type: 'internationalizedArrayString'}),
    defineField({name: 'gridRegion', title: tr('Texto pequeño en la lista', 'Small text in the list'), type: 'internationalizedArrayString'}),
    defineField({name: 'region', title: tr('Texto pequeño en la ficha', 'Small text on the wine page'), type: 'internationalizedArrayString'}),
    defineField({name: 'title1', title: tr('Título, línea 1 (cursiva)', 'Title, line 1 (italic)'), type: 'internationalizedArrayString'}),
    defineField({name: 'title2', title: tr('Título, línea 2', 'Title, line 2'), type: 'internationalizedArrayString'}),
    defineField({
      name: 'paragraphs',
      title: tr('Párrafos', 'Paragraphs'),
      type: 'array',
      of: [
        defineArrayMember({
          name: 'paragraph',
          type: 'object',
          fields: [defineField({name: 'text', title: tr('Texto', 'Text'), type: 'internationalizedArrayText'})],
          preview: {prepare: () => ({title: tr('Párrafo', 'Paragraph')})},
        }),
      ],
    }),
    defineField({name: 'closing', title: tr('Frase final', 'Closing sentence'), type: 'internationalizedArrayString'}),
    defineField({
      name: 'score',
      title: tr('Puntaje', 'Score'),
      type: 'object',
      fields: [
        defineField({name: 'value', title: tr('Puntos', 'Points'), type: 'string'}),
        defineField({name: 'critic', title: tr('Crítico', 'Critic'), type: 'string'}),
        defineField({name: 'year', title: tr('Año', 'Year'), type: 'string'}),
      ],
    }),
    defineField({
      name: 'ficha',
      title: tr('Datos (variedad, origen, cosecha, crianza)', 'Details (variety, origin, vintage, ageing)'),
      type: 'array',
      of: [
        defineArrayMember({
          name: 'factRow',
          type: 'object',
          fields: [
            defineField({name: 'label', title: tr('Etiqueta', 'Label'), type: 'internationalizedArrayString'}),
            defineField({name: 'value', title: tr('Valor', 'Value'), type: 'internationalizedArrayString'}),
          ],
          preview: {prepare: () => ({title: tr('Dato', 'Detail')})},
        }),
      ],
    }),
    defineField({
      name: 'notes',
      title: tr('Notas de cata', 'Tasting notes'),
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tastingNote',
          type: 'object',
          fields: [
            defineField({name: 'label', title: tr('Etiqueta (vista, nariz, boca)', 'Label (eye, nose, palate)'), type: 'internationalizedArrayString'}),
            defineField({name: 'text', title: tr('Texto', 'Text'), type: 'internationalizedArrayText'}),
          ],
          preview: {prepare: () => ({title: tr('Nota', 'Note')})},
        }),
      ],
    }),
    defineField({name: 'bottle', title: tr('Foto de la botella', 'Bottle photo'), type: 'image', options: {hotspot: true}}),
    defineField({name: 'background', title: tr('Imagen de fondo', 'Background image'), type: 'image', options: {hotspot: true}}),
    defineField({name: 'technicalSheet', title: tr('Ficha técnica (PDF por idioma)', 'Technical sheet (PDF per language)'), type: 'internationalizedArrayFile'}),
  ],
  orderings: [{title: tr('Orden', 'Order'), name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'slug.current', media: 'bottle'}},
})
