// Studio language (English by default, Spanish on request). Chosen with the button in the top bar and kept in this
// browser; changing it reloads the Studio so every label (Sanity's and ours) is rebuilt in the new language.
const KEY = 'altamira-studio-lang'

function read(): 'en' | 'es' {
  try {
    return globalThis.localStorage?.getItem(KEY) === 'es' ? 'es' : 'en'
  } catch {
    return 'en' // no storage (CLI scripts, private mode): English
  }
}

export const LANG = read()

/** the label in the Studio's language: tr('Vinos', 'Wines') */
export const tr = (es: string, en: string) => (LANG === 'es' ? es : en)

export function switchLang() {
  try {
    localStorage.setItem(KEY, LANG === 'es' ? 'en' : 'es')
  } catch {}
  location.reload()
}
