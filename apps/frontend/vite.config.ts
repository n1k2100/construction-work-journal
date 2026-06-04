import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [react(), tailwind(), babel({ presets: [reactCompilerPreset()] })],
})
