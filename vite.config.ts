// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
import * as packageJson from './package.json'
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/lib/'],
    }),
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    })
  ],
  build: {
    lib: {
      entry: path.join('src', 'lib/index.ts'),
      
      name: 'pepperdash/mobile-control-react-app-core',
      formats: ['es', "umd"],
      fileName: (format) => `mobile-control-react-app-core.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
    },
    },
  },
}))