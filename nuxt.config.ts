// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@prisma/nuxt', 'nuxt-authorization', 'nuxt-file-storage'],
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      yandex: {
        clientId: process.env.YANDEX_CLIENT_ID,
        clientSecret:  process.env.YANDEX_CLIENT_SECRET
      }
    }
  },
  fileStorage: {
    mount: './public/images/',
  },
})