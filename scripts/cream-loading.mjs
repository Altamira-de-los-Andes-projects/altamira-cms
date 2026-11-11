// Runs after `sanity build`: while the Studio loads, Sanity's page is plain white or blue-black (depending on the
// computer's light/dark setting), which flashes every time the language button reloads the Studio.
// Paint the estate's own background for each setting instead (the same as the Studio theme in branding.tsx).
import fs from 'node:fs'

const file = new URL('../dist/index.html', import.meta.url)
const html = fs.readFileSync(file, 'utf8')
const out = html
  .replace(/(prefers-color-scheme: dark\)\s*\{\s*background-color:\s*)#13141b/, '$1#16130f')
  .replace(/(prefers-color-scheme: light\)\s*\{\s*background-color:\s*)#ffffff/, '$1#f7f4ee')
// only cosmetic: if a Sanity update changes the page, warn and keep the deploy going
if (out === html) console.warn('cream-loading: loading background not found (Sanity changed its page); left as is')
else fs.writeFileSync(file, out), console.log('cream-loading: loading background set to the estate colours')
