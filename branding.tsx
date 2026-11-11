// The estate's look for the Studio: the same mark and colours as the website (vistaflores: public/favicon.svg, src/index.css).
import {Box, Button, Card, Flex} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {cyan, green, magenta, orange, purple, red, yellow, type ColorTintKey} from '@sanity/color'
import {TranslateIcon} from '@sanity/icons/Translate'
import type {NavbarProps} from 'sanity'
import {LANG, switchLang} from './lang'

// Sanity's top bar plus one button that switches the whole Studio between English and Spanish
export function NavbarWithLanguage(props: NavbarProps) {
  return (
    // stretch + a Card with the bar's own background and bottom line, so the button sits on the bar, not on the page behind it
    <Flex align="stretch">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Card borderBottom paddingX={2} display="flex" style={{alignItems: 'center'}}>
        <Button
          icon={TranslateIcon}
          text={LANG === 'es' ? 'English' : 'Español'}
          title={LANG === 'es' ? 'Switch the Studio to English' : 'Cambiar el Studio a español'}
          mode="ghost"
          fontSize={1}
          padding={2}
          onClick={switchLang}
        />
      </Card>
    </Flex>
  )
}

// the estate mark: an "A" peak resting on an arc, on burgundy
export function AltamiraMark() {
  return (
    <svg viewBox="0 0 64 64" width="1em" height="1em" role="img" aria-label="Altamira de los Andes">
      <defs>
        <linearGradient id="altamira-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d6a0" />
          <stop offset="0.55" stopColor="#d7a876" />
          <stop offset="1" stopColor="#b87a4e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="13" fill="#6b1f2a" />
      <g fill="none" stroke="url(#altamira-gold)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 16 L24.5 40.5" strokeWidth="3.3" />
        <path d="M32 16 L39.5 40.5" strokeWidth="3.3" />
        <path d="M27.4 33.2 H36.6" strokeWidth="2.7" />
      </g>
      <path d="M13 42 Q32 33.6 51 42 Q32 39.2 13 42 Z" fill="url(#altamira-gold)" />
    </svg>
  )
}

// The website's colours as Sanity's palette: warm greys from the site's cream to its near-black, and its burgundy where
// Sanity uses blue. Sanity builds the light and dark looks from the same scales, so the Studio follows the computer's
// light/dark setting (or the choice in the account menu), like its default theme does.
const tints = (hexes: string[]) =>
  Object.fromEntries(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((k, i) => [k, hexes[i]])) as Record<ColorTintKey, string>

export const altamiraTheme = buildTheme({
  palette: {
    black: '#0d0b08',
    white: '#f7f4ee',
    gray: tints(['#f7f4ee', '#efeae1', '#ded8cc', '#c7bfb1', '#a39a8c', '#7a7268', '#5e574e', '#433d36', '#2a2520', '#1f1b16', '#16130f']),
    blue: tints(['#fbf0f1', '#f5dadd', '#e9b2b9', '#d98591', '#c85d6c', '#a63a4b', '#8a2a39', '#6b1f2a', '#551821', '#3e1118', '#2a0b10']),
    red, orange, yellow, green, cyan, purple, magenta,
  },
})
