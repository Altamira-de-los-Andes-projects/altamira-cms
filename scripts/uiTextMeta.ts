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
const split = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Za-z])(\d)/g, '$1 $2').split(' ')

export function describeKey(key: string) {
  const [page, ...rest] = key.split('.')
  const parts: string[] = []
  for (const seg of rest) {
    for (const t of /^\d+$/.test(seg) ? [seg] : WORDS[seg] ? [seg] : split(seg)) {
      if (/^\d+$/.test(t)) parts.push(String(Number(t) + (seg === t ? 1 : 0)))
      else parts.push(WORDS[t.toLowerCase()] ?? WORDS[t] ?? t.toLowerCase())
    }
  }
  const text = parts.join(' ').replace(/\s+/g, ' ').trim()
  return {page, pageLabel: PAGES[page] ?? page, label: `${PAGES[page] ?? page} · ${text.charAt(0).toUpperCase()}${text.slice(1)}`}
}
