export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],

  devtools: { enabled: true },

  app: {
    baseURL: '/the-endless-train/',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'The Endless Train',

      /**
       * Метатеги, фавиконки и т.п
       * Для генерации фавиконок - https://realfavicongenerator.net/
       */
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'title',
          content: 'The Endless Train',
        },
        {
          name: 'description',
          content: 'The Endless Train description',
        },
        {
          name: 'author',
          content: 'Mertan',
        },
        {
          name: 'msapplication-TileColor',
          content: '#e7609e',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
      link: [
        /* Favicons */
        { rel: 'icon', type: 'image/x-icon', href: '/the-endless-train/favicons/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/the-endless-train/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/the-endless-train/favicons/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/the-endless-train/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/the-endless-train/favicons/site.webmanifest' },
        { rel: 'mask-icon', href: '/the-endless-train/favicons/safari-pinned-tab.svg', color: '#e7609e' },
      ],
    },
  },

  css: [
    '~/assets/scss/vendors.scss',
    '~/assets/scss/common.scss',
  ],

  compatibilityDate: '2025-03-09',

  /* Миксины и переменные доступны во всех компонентах и во всех scss файлах */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/shared.scss" as *;',
        },
      },
    },

    /* Настройки для обработки .vue-файлов с TypeScript */
    vue: {
      script: {
        defineModel: true, // Поддержка defineModel для TS
        propsDestructure: true, // Поддержка деструктуризации пропсов
      },
    },

    /* Оптимизация обработки TypeScript */
    esbuild: {
      target: 'esnext', // Устанавливаем цель для TS
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true, // Если используем декораторы
        },
      },
    },
  },

  /* Добавляем настройки TypeScript */
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
