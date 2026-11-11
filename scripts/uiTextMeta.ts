// Plain-Spanish labels for the site's loose texts, so editors see "Portada · Título 1" instead of "home.heroTitle1".
const PAGES: Record<string, string> = {
  home: 'Inicio',
  vinos: 'Nuestros vinos',
  wineDetail: 'Ficha de cada vino',
  vinedos: 'Nuestros viñedos',
  novedades: 'Novedades',
  contacto: 'Contacto',
  footer: 'Pie de página',
  nav: 'Menú',
  a11y: 'Accesibilidad',
  gate: 'Aviso de edad',
  legal: 'Privacidad',
}
const WORDS: Record<string, string> = {
  hero: 'Portada', eyebrow: 'texto pequeño', title: 'título', subtitle: 'subtítulo', cta: 'botón', btn: 'botón', label: 'etiqueta',
  paras: 'párrafo', para: 'párrafo', desc: 'descripción', name: 'nombre', num: 'número', stats: 'dato', rows: 'fila', cards: 'tarjeta',
  breath: 'Frase del lugar', estate: 'Presentación', vy: 'Viñedos', pre: '(antes)', post: '(después)', em: '(destacado)',
  discover: 'botón Descubrir', tagline: 'frase', copyright: 'derechos', privacy: 'privacidad', warning: 'advertencia', enter: 'botón Ingresar',
  confirm: 'confirmación', line: 'línea', office: 'oficina', phone: 'teléfono', contact: 'contacto', follow: 'redes', email: 'correo',
  submit: 'botón Enviar', message: 'mensaje', fields: 'campo', intro: 'introducción', consent: 'consentimiento', link: 'enlace',
  home: 'Inicio', vinos: 'Vinos', vinedos: 'Viñedos', galeria: 'Galería', novedades: 'Novedades', contacto: 'Contacto',
  map: 'Mapa', art: 'ilustración', river: 'río', andes: 'Andes', valley: 'valle', mendoza: 'Mendoza', argentina: 'Argentina',
  featured: 'destacada', downloadPdf: 'botón Ficha técnica', ctaInfo: 'botón Solicitar información', ficha: 'ficha', notes: 'notas',
  all: 'todos', alt: 'descripción de la imagen', body: 'texto', caption: 'pie de foto', dark: 'modo oscuro', light: 'modo claro',
  info: 'información', labels: 'etiquetas', list: 'lista', more: 'más', news: 'novedades', note: 'nota', pdf: 'PDF', place: 'lugar',
  points: 'puntos', sub: 'subtítulo', wines: 'vinos', articles: 'artículos', award: 'premio', awards: 'premios', breadcrumb: 'ruta',
  close: 'cerrar', craft: 'oficio', date: 'fecha', download: 'descargar', filter: 'filtro', full: 'completo', gallery: 'galería',
  hint: 'sugerencia', italic: 'cursiva', narrative: 'relato', other: 'otros', quote: 'cita', read: 'leer', regarding: 'consulta sobre',
  region: 'región', sections: 'sección', see: 'ver', soil: 'suelo', specs: 'datos', tag: 'etiqueta', text: 'texto', to: 'a',
  unit: 'unidad', updated: 'actualizado', value: 'valor', vines: 'viñas', vineyards: 'viñedos', pacific: 'Pacífico', atlantic: 'Atlántico',
  chile: 'Chile', asl: 'm s. n. m.',
  langOf: 'texto accesible del botón de idioma (usa {lang})', openMenu: 'botón abrir menú', closeMenu: 'botón cerrar menú',
  inquiry: 'mensaje de consulta (usa {wine})', awardsList: 'lista de premios', critic: 'crítico', a11y: 'accesibilidad',
  h: 'subtítulo', p: 'texto', l: 'etiqueta', v: 'valor', desc2: 'descripción',
}
// English labels for the Studio in English: the keys are already English words, so only the cryptic ones are mapped
const PAGES_EN: Record<string, string> = {
  home: 'Home', vinos: 'Our wines', wineDetail: 'Wine page', vinedos: 'Our vineyards', novedades: 'News', contacto: 'Contact',
  footer: 'Footer', nav: 'Menu', a11y: 'Accessibility', gate: 'Age notice', legal: 'Privacy',
}
const WORDS_EN: Record<string, string> = {
  hero: 'Top', cta: 'button', btn: 'button', paras: 'paragraph', para: 'paragraph', desc: 'description', desc2: 'description',
  num: 'number', stats: 'figure', rows: 'row', cards: 'card', breath: 'Place sentence', estate: 'Introduction', vy: 'Vineyards',
  pre: '(before)', post: '(after)', em: '(highlighted)', discover: 'Discover button', enter: 'Enter button', submit: 'Send button',
  home: 'Home', vinos: 'Wines', vinedos: 'Vineyards', galeria: 'Gallery', novedades: 'News', contacto: 'Contact',
  art: 'illustration', downloadPdf: 'Technical sheet button', ctaInfo: 'Request information button', ficha: 'sheet',
  alt: 'image description', asl: 'm a.s.l.', langOf: 'language button text for screen readers (uses {lang})',
  openMenu: 'open menu button', closeMenu: 'close menu button', inquiry: 'inquiry message (uses {wine})', awardsList: 'awards list',
  a11y: 'accessibility', h: 'subtitle', p: 'text', l: 'label', v: 'value', specs: 'details', sections: 'section', fields: 'field',
}
const split = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Za-z])(\d)/g, '$1 $2').split(' ')

export function describeKey(key: string, lang: 'es' | 'en' = 'es') {
  const words = lang === 'en' ? WORDS_EN : WORDS
  const pages = lang === 'en' ? PAGES_EN : PAGES
  const [page, ...rest] = key.split('.')
  const parts: string[] = []
  for (const seg of rest) {
    for (const t of /^\d+$/.test(seg) ? [seg] : words[seg] ? [seg] : split(seg)) {
      if (/^\d+$/.test(t)) parts.push(String(Number(t) + (seg === t ? 1 : 0)))
      else parts.push(words[t.toLowerCase()] ?? words[t] ?? t.toLowerCase())
    }
  }
  const text = parts.join(' ').replace(/\s+/g, ' ').trim()
  return {page, pageLabel: pages[page] ?? page, label: `${pages[page] ?? page} · ${text.charAt(0).toUpperCase()}${text.slice(1)}`}
}

// English names of the site photos (their stored label is Spanish)
const PHOTO_EN: Record<string, string> = {
  'Aviso de edad': 'Age notice', Inicio: 'Home', 'Nuestros vinos': 'Our wines', 'Nuestros viñedos': 'Our vineyards', Contacto: 'Contact',
  Galería: 'Gallery', Novedades: 'News', Fondo: 'Background', 'Fondo de "El lugar"': 'Background of "The place"',
  'Foto de viñedos bajo la frase': 'Vineyard photo below the sentence', 'Fondo del banner con la cita': 'Quote banner background',
  'Foto superior': 'Top photo', 'Paisaje detrás de las botellas': 'Landscape behind the bottles', 'Foto de Altamira': 'Altamira photo',
  'Foto de La Consulta': 'La Consulta photo', 'Foto de Vista Flores': 'Vista Flores photo', 'Foto del suelo': 'Soil photo',
  'Foto de las viñas': 'Vines photo', 'Foto de las manos': 'Hands photo', 'Foto de viñedo y Andes': 'Vineyard and Andes photo',
  'Foto del cartel (móvil)': 'Sign photo (mobile)', 'Foto destacada': 'Featured photo',
}
export function photoLabelEn(label = '') {
  return label
    .split(' · ')
    .map((part) =>
      PHOTO_EN[part] ??
      part.replace(/^Premio (\d+)$/, 'Award $1').replace(/^Foto de noticia (\d+)$/, 'News photo $1').replace(/^Foto de artículo (\d+)$/, 'Article photo $1').replace(/^Foto (\d+)$/, 'Photo $1'),
    )
    .join(' · ')
}
