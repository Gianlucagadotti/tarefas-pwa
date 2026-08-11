import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        sourcemap: false,
        runtimeCaching: [
        {
          urlPattern: /^http:\/\/localhost:8001\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 24 horas
            },
            networkTimeoutSeconds: 10,
            cacheableResponse: {
              statuses: [0, 200],
            },
  },
        },
        ],
      },
      manifest: {
        name: 'Gerenciador de Tarefas',
        short_name: 'Tarefas',
        description: 'Aplicativo PWA para gerenciar tarefas diárias',
        theme_color: '#4a90d9',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/android/launchericon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/android/launchericon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/android/launchericon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
