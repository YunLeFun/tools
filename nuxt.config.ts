import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  // let's use pwa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',

    '@yunlefun/vue/nuxt',
    'nuxt-monaco-editor',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    // watcher: 'chokidar',
  },

  css: [
    '@unocss/reset/tailwind.css',
    'element-plus/theme-chalk/dark/css-vars.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/tools-line.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/tools-line.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  monacoEditor: {
    // These are default values:
    locale: 'zh-hans',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor',
    },
  },

  devtools: {
    enabled: true,
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
  },
})
