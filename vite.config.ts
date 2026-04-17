import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000
  },
  plugins: [
    vue(),
    AutoImport({
      eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.json' },
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia', 'vue-i18n'],
      vueTemplate: true
    }),
    Components({
      dirs: [
        'src/components'
        // 'src/components/global',
      ],
      dts: true
    })
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  esbuild: {
    tsconfigRaw: require('./tsconfig.node.json') // Ensure it loads correctly
  }
});
