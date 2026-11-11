import type {ComponentType} from 'react'
import {tr} from './lang'
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

// The left-hand menu, in the Studio's language and in the order of the website. Texts are listed per page, in the order they appear there.
const textsOf = (S: StructureBuilder, title: string, pages: string[], icon: ComponentType) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(`${title} — ${tr('textos', 'texts')}`)
        .schemaType('uiText')
        .filter('_type == "uiText" && page in $pages')
        .params({pages})
        .defaultOrdering([{field: 'position', direction: 'asc'}]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title(tr('Qué quieres editar', 'What to edit'))
    .items([
      S.listItem()
        .title(tr('Logo, video y secciones', 'Logo, video & sections'))
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      textsOf(S, tr('Página de inicio', 'Home page'), ['home'], HomeIcon),
      S.listItem()
        .title(tr('Vinos', 'Wines'))
        .icon(DropIcon)
        .child(S.documentTypeList('wine').title(tr('Vinos', 'Wines')).defaultOrdering([{field: 'order', direction: 'asc'}])),
      textsOf(S, tr('Página de vinos', 'Wines page'), ['vinos', 'wineDetail'], ThListIcon),
      textsOf(S, tr('Nuestros viñedos', 'Our vineyards'), ['vinedos'], PinIcon),
      textsOf(S, tr('Novedades', 'News'), ['novedades'], SparklesIcon),
      textsOf(S, tr('Contacto', 'Contact'), ['contacto'], EnvelopeIcon),
      textsOf(S, tr('Pie de página', 'Footer'), ['footer'], DocumentTextIcon),
      textsOf(S, tr('Menú y avisos', 'Menu & notices'), ['nav', 'a11y', 'gate'], MenuIcon),
      textsOf(S, tr('Política de privacidad', 'Privacy policy'), ['legal'], LockIcon),
      S.divider(),
      S.listItem()
        .title(tr('Fotos del sitio', 'Site photos'))
        .icon(ImagesIcon)
        .child(S.documentTypeList('siteMedia').title(tr('Fotos del sitio', 'Site photos')).defaultOrdering([{field: 'position', direction: 'asc'}])),
      S.listItem()
        .title(tr('Idiomas del sitio', 'Site languages'))
        .icon(TranslateIcon)
        .child(S.documentTypeList('language').title(tr('Idiomas', 'Languages'))),
    ])
