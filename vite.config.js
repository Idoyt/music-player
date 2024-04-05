import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';
import path from 'path';

module.exports = defineConfig({
  build: {
    target: 'es',
    assetsDir: 'static',
    manifest: 'true',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
});
