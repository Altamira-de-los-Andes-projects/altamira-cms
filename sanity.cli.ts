import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '65z18eah',
    dataset: 'production'
  },
  studioHost: 'altamira-de-los-andes',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
