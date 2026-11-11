import {defineArrayMember, defineField, defineType} from 'sanity'

export const wine = defineType({
  name: 'wine',
  title: 'Vino',
  type: 'document',
  fields: [
    defineField({name: 'slug', title: 'Dirección (slug)', type: 'slug', options: {source: 'name'}, validation: (r) => r.required()}),
    defineField({name: 'active', title: 'Visible en el sitio', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Orden', type: 'number'}),
    defineField({
      name: 'line',
      title: 'Línea (filtro de la página de vinos)',
      type: 'string',
      options: {list: ['VAV', 'RESERVA', 'DAMA', 'NAVIGATO']},
      initialValue: 'RESERVA',
    }),
    defineField({name: 'name', title: 'Nombre', type: 'internationalizedArrayString'}),
    defineField({name: 'sub', title: 'Subtítulo (variedad)', type: 'internationalizedArrayString'}),
    defineField({name: 'gridRegion', title: 'Texto pequeño en la lista', type: 'internationalizedArrayString'}),
    defineField({name: 'region', title: 'Texto pequeño en la ficha', type: 'internationalizedArrayString'}),
    defineField({name: 'title1', title: 'Título, línea 1 (cursiva)', type: 'internationalizedArrayString'}),
    defineField({name: 'title2', title: 'Título, línea 2', type: 'internationalizedArrayString'}),
    defineField({
      name: 'paragraphs',
      title: 'Párrafos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'paragraph',
          type: 'object',
          fields: [defineField({name: 'text', title: 'Texto', type: 'internationalizedArrayText'})],
          preview: {prepare: () => ({title: 'Párrafo'})},
        }),
      ],
    }),
    defineField({name: 'closing', title: 'Frase final', type: 'internationalizedArrayString'}),
    defineField({
      name: 'score',
      title: 'Puntaje',
      type: 'object',
      fields: [
        defineField({name: 'value', title: 'Puntos', type: 'string'}),
        defineField({name: 'critic', title: 'Crítico', type: 'string'}),
        defineField({name: 'year', title: 'Año', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ficha',
      title: 'Datos (variedad, origen, cosecha, crianza)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'factRow',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Etiqueta', type: 'internationalizedArrayString'}),
            defineField({name: 'value', title: 'Valor', type: 'internationalizedArrayString'}),
          ],
          preview: {prepare: () => ({title: 'Dato'})},
        }),
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notas de cata',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tastingNote',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Etiqueta (vista, nariz, boca)', type: 'internationalizedArrayString'}),
            defineField({name: 'text', title: 'Texto', type: 'internationalizedArrayText'}),
          ],
          preview: {prepare: () => ({title: 'Nota'})},
        }),
      ],
    }),
    defineField({name: 'bottle', title: 'Foto de la botella', type: 'image', options: {hotspot: true}}),
    defineField({name: 'background', title: 'Imagen de fondo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'technicalSheet', title: 'Ficha técnica (PDF por idioma)', type: 'internationalizedArrayFile'}),
  ],
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'slug.current', media: 'bottle'}},
})
