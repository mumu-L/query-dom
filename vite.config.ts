import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir:'chromjs/',
  build:{
    chunkSizeWarningLimit:500,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,

      }
    }
    
  },
  plugins: [vue()]
})
