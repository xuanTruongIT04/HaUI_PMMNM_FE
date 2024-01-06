// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Medicare',
    }
  },
  ssr: false,
  devtools: { enabled: true },
  modules: ['nuxt-icon', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'bootstrap/dist/css/bootstrap.css',
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
    ],
  },
  imports: {
    dirs: ['stores', 'types'],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      githubApiBaseUrl: process.env.GITHUB_API_BASE_URL,
      githubToken: process.env.GITHUB_TOKEN,
    },
  },
})
