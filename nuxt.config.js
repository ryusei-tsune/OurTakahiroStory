import path from 'path'
import fs from 'fs'

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'OurTakahiroStory',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],

    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
      },
    ],
    script: [{ src: `https://maps.google.com/maps/api/js?key=${process.env.API_KEY}` }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/persistedState.js', ssr: false }],

  serverMiddleware: [{ path: '/', handler: '~/server-middleware/index.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: '' },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    https: {
      key: fs.readFileSync(path.resolve('./static/ssl_cert/', 'https_server.key.pem')),
      cert: fs.readFileSync(path.resolve('./static/ssl_cert/', 'https_server.cert.pem')),
    },
  },
  manifest: {
    name: 'まわしてごはん',
    lang: 'ja',
    short_name: 'まわしてごはん',
    title: 'まわしてごはん',
    'og:title': 'まわしてごはん',
    description: `「まわしてごはん」は友人とご飯に行く時になかなかお店が決まらないという課題を、
      お店をランダムに提案することで解決するサービスです。またこのサービスの特徴として、
      ヒントとなる写真をたどりながらお店に向かうため、到着するまでどこに向かっているかわからないドキドキ感を味わうことができます。`,
    'og:description': `「まわしてごはん」は友人とご飯に行く時になかなかお店が決まらないという課題を、
      お店をランダムに提案することで解決するサービスです。またこのサービスの特徴として、
      ヒントとなる写真をたどりながらお店に向かうため、到着するまでどこに向かっているかわからないドキドキ感を味わうことができます。`,
    theme_color: '#69b3b7',
    background_color: '#69b3b7',
  },
}
