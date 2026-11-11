// Welcome page: the first thing editors see, in Spanish and English, with big shortcuts to the two ways of editing.
import {Box, Button, Card, Container, Flex, Grid, Heading, Stack, Text} from '@sanity/ui'
import {EditIcon} from '@sanity/icons/Edit'
import {HomeIcon} from '@sanity/icons/Home'
import {LaunchIcon} from '@sanity/icons/Launch'
import {ThListIcon} from '@sanity/icons/ThList'
import type {ComponentType} from 'react'
import {definePlugin} from 'sanity'
import {useRouter} from 'sanity/router'
import {AltamiraMark} from './branding'

const SITE = 'https://altamiradelosandes.com'

function Shortcut(props: {icon: ComponentType; title: string; en: string; text: string; textEn: string; action: string; tone?: 'primary' | 'default'; onClick?: () => void; href?: string}) {
  const {icon, title, en, text, textEn, action, tone = 'default', onClick, href} = props
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone === 'primary' ? 'primary' : 'default'}>
      <Stack gap={4}>
        <Stack gap={2}>
          <Heading size={1}>{title}</Heading>
          <Text size={1} muted>{en}</Text>
        </Stack>
        <Stack gap={2}>
          <Text size={2}>{text}</Text>
          <Text size={1} muted>{textEn}</Text>
        </Stack>
        <Button
          icon={icon}
          text={action}
          tone={tone}
          mode={tone === 'primary' ? 'default' : 'ghost'}
          padding={3}
          onClick={onClick}
          {...(href ? {as: 'a' as const, href, target: '_blank', rel: 'noreferrer'} : {})}
        />
      </Stack>
    </Card>
  )
}

function Home() {
  const router = useRouter()
  return (
    <Card height="fill" overflow="auto" tone="transparent">
      <Container width={3} paddingX={4} paddingY={6}>
        <Stack gap={6}>
          <Flex align="center" gap={4}>
            <Text size={4}>
              <AltamiraMark />
            </Text>
            <Stack gap={3}>
              <Heading size={3}>Altamira de los Andes</Heading>
              <Text muted>Gestor de contenido del sitio web · Website content manager</Text>
            </Stack>
          </Flex>

          <Grid gridTemplateColumns={[1, 1, 3]} gap={4}>
            <Shortcut
              icon={EditIcon}
              tone="primary"
              title="Editar sobre la web"
              en="Edit on the website"
              text="Abre el sitio y haz clic en el texto o la foto que quieras cambiar."
              textEn="Open the site and click the text or photo you want to change."
              action="Empezar · Start"
              onClick={() => router.navigateUrl({path: '/presentation'})}
            />
            <Shortcut
              icon={ThListIcon}
              title="Contenido por secciones"
              en="Content by section"
              text="Vinos, textos de cada página, fotos, logo, video, contacto e idiomas."
              textEn="Wines, page texts, photos, logo, video, contact details and languages."
              action="Abrir · Open"
              onClick={() => router.navigateUrl({path: '/structure'})}
            />
            <Shortcut
              icon={LaunchIcon}
              title="Ver el sitio publicado"
              en="View the live site"
              text="Así lo ven hoy los visitantes."
              textEn="What visitors see today."
              action="altamiradelosandes.com"
              href={SITE}
            />
          </Grid>

          <Card padding={4} radius={3} border>
            <Stack gap={4}>
              <Heading size={1}>Cómo publicar un cambio · How to publish a change</Heading>
              <Stack gap={3}>
                <Text>1. Cambia el texto, la foto o el video. · Change the text, photo or video.</Text>
                <Text>2. Pulsa el botón verde «Publicar» abajo a la derecha. · Press the green “Publish” button at the bottom right.</Text>
                <Text>3. En unos segundos el cambio aparece en el sitio. · The change is live on the site within seconds.</Text>
              </Stack>
              <Box>
                <Text size={1} muted>
                  Hasta que pulses «Publicar», nadie más ve el cambio: es un borrador. · Until you press “Publish”, nobody else sees the change: it is a draft.
                </Text>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Card>
  )
}

export const homeTool = definePlugin({
  name: 'altamira-home',
  tools: [{name: 'inicio', title: 'Inicio · Home', icon: HomeIcon, component: Home}],
})
