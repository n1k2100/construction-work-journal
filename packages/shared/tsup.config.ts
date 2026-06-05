import { defineConfig } from 'tsup'

const config = defineConfig({
  bundle: true,
  clean: true,
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  entry: ['./src/index.ts'],
  format: 'esm',
  minify: 'terser',
  noExternal: [/.*/],
  splitting: false,
  treeshake: true,
})

export default config
