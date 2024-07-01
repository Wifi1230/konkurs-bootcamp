import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import path from 'path'; // Dodaj import modułu path

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  resolve: {
    alias: [
      { find: 'declarations', replacement: path.resolve(__dirname, '../declarations') }, // Zmieniono sposób tworzenia ścieżki
      { find: '@', replacement: path.resolve(__dirname, './src') }, // Zmieniono sposób tworzenia ścieżki
    ]
  }
});
