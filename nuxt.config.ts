// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-auth-utils',
    '@prisma/nuxt',
    'nuxt-authorization',
    'nuxt-file-storage',
    'vue-yandex-maps/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],
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
  css: ['@/assets/css/index.css'],
  yandexMaps: {
    apikey: 'b0fd084b-e4c3-478b-ac9b-3a9ad6094fb6',
  },
})