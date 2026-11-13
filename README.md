# Altamira de los Andes — CMS (Sanity Studio)

Gestor de contenido de https://altamiradelosandes.com. El cliente cambia desde aquí los textos, fotos, video, logo, vinos, fichas técnicas, datos de contacto, idiomas y qué secciones se muestran. El código de la web vive en el repositorio `vistaflores`.

- **Studio publicado:** https://cms.altamiradelosandes.com (proyecto de Vercel `altamira-cms`)
- **Proyecto Sanity:** `65z18eah`, dataset `production` (lectura pública)

## Empezar

```bash
npm install
npm run dev       # http://localhost:3333 (pide iniciar sesión con la cuenta de Sanity)
npm run build     # compila a dist/ y deja la pantalla de carga en los colores de la marca
```

## Qué hay en el repo

```
sanity.config.ts     configuración: plugins, tema, idioma y herramientas
structure.ts         menú lateral (secciones, iconos y nombres)
schemaTypes/         modelo de contenido: siteSettings, uiText, wine, siteMedia, language
branding.tsx         logo, colores (claro/oscuro) y botón de idioma de la barra
homeTool.tsx         pantalla de inicio del Studio con atajos y guía de publicación
lang.ts              idioma del Studio (inglés por defecto, español con el botón)
scripts/             carga y mantenimiento del contenido (ver abajo)
static/              favicon
vercel.json          cabeceras de seguridad y compilación
```

El modelo y cómo se une con la web está explicado en `vistaflores/docs/contenido-y-cms.md`.

## Interfaz en dos idiomas

El Studio se ve en inglés por defecto; el botón de la barra superior cambia a español y recuerda la elección en el navegador. Las etiquetas propias se escriben con `tr('español', 'english')` (`lang.ts`).

## Edición sobre la web

La primera herramienta del Studio abre la web real dentro del Studio y deja hacer clic en un texto o una foto para cambiarlos. La web detecta que está dentro del Studio y carga borradores en vivo. Requisitos:

- La dirección del Studio debe estar en `STUDIO_URL` de la web (`src/cms/index.ts`) y en los **CORS origins** de Sanity (con credenciales).
- Las direcciones de la web deben estar en `allowOrigins` de `sanity.config.ts` y en `frame-ancestors` del `vercel.json` de la web.

## Scripts de contenido

Se ejecutan con `npx sanity exec scripts/<archivo>.ts --with-user-token` desde esta carpeta, con la sesión de Sanity iniciada.

| Script | Para qué |
|---|---|
| `import-content.ts` | Carga inicial: textos, vinos, fotos y PDFs desde `content.json`. Solo crea lo que no existe, **nunca pisa lo que el cliente editó** |
| `seed-media.ts`, `set-media-page.ts` | Crea las fotos del sitio y les asigna su página |
| `set-uitext-meta.ts` | Etiqueta cada texto en español ("Inicio · Título 1") y su página |
| `audit-content.ts` | Revisa que todo lo de la web esté en el CMS |

Antes de ejecutar uno que escriba, léelo: trabajan sobre el dataset de producción.

## Despliegue

Cada push a `main` lo publica Vercel (`vercel.json`: `npm run build`). El Studio registrado en Sanity se llama "Altamira de los Andes"; si cambias de dominio, regístralo de nuevo (pantalla "Register Studio" de la primera visita) y añade el origen a CORS.

## Seguridad y accesos

Entrar al Studio exige una cuenta de Sanity que sea miembro del proyecto: tener la dirección no da acceso. Da a Sinclair el rol **Editor** (cambia contenido, no ajustes) desde sanity.io/manage → Members. El dataset es público para lectura: **no guardes datos personales** en él.
