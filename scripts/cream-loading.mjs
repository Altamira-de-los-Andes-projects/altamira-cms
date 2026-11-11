// Runs after `sanity build`: Sanity's page paints near-black while the Studio loads when the computer is in dark mode,
// which flashes every time the language button reloads the Studio. Paint the estate's cream instead.
import fs from 'node:fs'

const file = new URL('../dist/index.html', import.meta.url)
const html = fs.readFileSync(file, 'utf8')
const out = html.replace('background-color: #13141b;', 'background-color: #f7f4ee;')
// only cosmetic: if a Sanity update changes the page, warn and keep the deploy going
if (out === html) console.warn('cream-loading: dark loading background not found (Sanity changed its page); left as is')
else fs.writeFileSync(file, out), console.log('cream-loading: loading background set to cream')
