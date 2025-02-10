import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  // base: "/minazon",
  server: {
    open: true,
    host: true,
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
})
