import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {esESLocale} from '@sanity/locale-es-es'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {structure} from './structure'
import {schemaTypes} from './schemaTypes'
import {AltamiraMark, altamiraTheme} from './branding'
import {homeTool} from './homeTool'

// Types that exist once, so they open directly instead of as a list
const singletons = ['siteSettings']

export default defineConfig({
  name: 'default',
  title: 'Altamira de los Andes',
  icon: AltamiraMark,
  theme: altamiraTheme,

  projectId: '65z18eah',
  dataset: 'production',

  plugins: [
    // first tool: a welcome page with big shortcuts, in Spanish and English
    homeTool(),
    presentationTool({
      title: 'Editar sobre la web · Edit on the website',
      previewUrl: {initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'https://altamiradelosandes.com'},
      allowOrigins: ['https://altamira-azure.vercel.app', 'https://altamira-de-los-andes.vercel.app', 'https://altamiradelosandes.com', 'https://www.altamiradelosandes.com', 'http://localhost:*'],
    }),
    structureTool({title: 'Contenido · Content', structure}),
    esESLocale(),
    // languages come from the "language" documents, so editors can add or remove one without code changes
    internationalizedArray({
      languages: async (client) => {
        const found = await client.fetch<{id: string; title: string}[]>(`*[_type == "language" && defined(code)] | order(order asc){"id": code, title}`)
        // never an empty list: with no language documents loaded yet every translated field would be marked invalid
        return found.length ? found : [{id: 'es', title: 'Español'}]
      },
      defaultLanguages: ['es'],
      fieldTypes: ['string', 'text', 'file'],
    }),
  ],

  schema: {
    types: schemaTypes,
    // singletons can't be created or duplicated from the "new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },

  document: {
    actions: (input, {schemaType}) =>
      singletons.includes(schemaType) ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : input,
  },
})
