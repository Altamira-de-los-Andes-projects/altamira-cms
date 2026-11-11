import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
// @sanity/icons v5 has one entry point per icon
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DropIcon} from '@sanity/icons/Drop'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {LockIcon} from '@sanity/icons/Lock'
import {MenuIcon} from '@sanity/icons/Menu'
import {PinIcon} from '@sanity/icons/Pin'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {ThListIcon} from '@sanity/icons/ThList'
import {TranslateIcon} from '@sanity/icons/Translate'

// The left-hand menu, in Spanish and English and in the order of the website. Texts are listed per page, in the order they appear there.
const textsOf = (S: StructureBuilder, title: string, pages: string[], icon: ComponentType) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(`${title} — textos · texts`)
        .schemaType('uiText')
        .filter('_type == "uiText" && page in $pages')
        .params({pages})
        .defaultOrdering([{field: 'position', direction: 'asc'}]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Qué quieres editar · What to edit')
    .items([
      S.listItem()
        .title('Logo, video y secciones · Logo, video & sections')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      textsOf(S, 'Página de inicio · Home page', ['home'], HomeIcon),
      S.listItem()
        .title('Vinos · Wines')
        .icon(DropIcon)
        .child(S.documentTypeList('wine').title('Vinos · Wines').defaultOrdering([{field: 'order', direction: 'asc'}])),
      textsOf(S, 'Página de vinos · Wines page', ['vinos', 'wineDetail'], ThListIcon),
      textsOf(S, 'Nuestros viñedos · Our vineyards', ['vinedos'], PinIcon),
      textsOf(S, 'Novedades · News', ['novedades'], SparklesIcon),
      textsOf(S, 'Contacto · Contact', ['contacto'], EnvelopeIcon),
      textsOf(S, 'Pie de página · Footer', ['footer'], DocumentTextIcon),
      textsOf(S, 'Menú y avisos · Menu & notices', ['nav', 'a11y', 'gate'], MenuIcon),
      textsOf(S, 'Política de privacidad · Privacy policy', ['legal'], LockIcon),
      S.divider(),
      S.listItem()
        .title('Fotos del sitio · Site photos')
        .icon(ImagesIcon)
        .child(S.documentTypeList('siteMedia').title('Fotos del sitio · Site photos').defaultOrdering([{field: 'position', direction: 'asc'}])),
      S.listItem()
        .title('Idiomas del sitio · Site languages')
        .icon(TranslateIcon)
        .child(S.documentTypeList('language').title('Idiomas · Languages')),
    ])
