import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'animation',
              test: /node_modules[\\/](?:gsap|framer-motion|motion-dom|motion-utils|lenis)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
