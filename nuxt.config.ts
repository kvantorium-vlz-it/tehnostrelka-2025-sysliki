// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-auth-utils',
    '@prisma/nuxt',

  ],
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      yandex: {
        clientId: 'a53de23a5cf748f2a95027c42892f88b',
        clientSecret: 'ff81865a37e44f8bbaa9bfbdedd02d48'
      }
    }
  }

})