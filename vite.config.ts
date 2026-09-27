import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import * as path from 'path' // ИСПРАВЛЕНИЕ: Импортируем path как строгое пространство имен

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ИСПРАВЛЕНИЕ ДЛЯ ДЕПЛОЯ: Явно указываем базовый путь, чтобы db.json не терялся в интернете
  base: '/', 
})
