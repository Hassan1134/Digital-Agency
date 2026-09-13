import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 0,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'framework', test: /node_modules[\\/](react|react-dom|react-router|motion)/, priority: 20 },
            { name: 'vendor', test: /node_modules/, priority: 10 },
          ],
        },
      },
    },
  },
})
