// The estate's look for the Studio: the same mark and colours as the website (vistaflores: public/favicon.svg, src/index.css).
import {buildLegacyTheme} from 'sanity'

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

const burgundy = '#6b1f2a'
const ink = '#14120f'
const cream = '#f7f4ee'

export const altamiraTheme = buildLegacyTheme({
  '--black': ink,
  '--white': cream,
  '--gray': '#7a7268',
  '--gray-base': '#7a7268',
  '--component-bg': cream,
  '--component-text-color': ink,
  '--brand-primary': burgundy,
  '--default-button-color': '#7a7268',
  '--default-button-primary-color': burgundy,
  '--default-button-success-color': '#4f6b3a',
  '--default-button-warning-color': '#b07a2a',
  '--default-button-danger-color': '#a33a2f',
  '--state-info-color': burgundy,
  '--state-success-color': '#4f6b3a',
  '--state-warning-color': '#b07a2a',
  '--state-danger-color': '#a33a2f',
  '--main-navigation-color': ink,
  '--main-navigation-color--inverted': cream,
  '--focus-color': burgundy,
})
