import { globSync } from 'node:fs'
import { defineConfig } from 'tsdown'

const entry = globSync('src/**/*.ts')

export default defineConfig({
  tsconfig: 'tsconfig.build.json',
  entry,
  target: 'node18',
  dts: true,
  unbundle: true,
  sourcemap: false,

  hooks: {
    'build:done': (ctx) => {
      const pkg = ctx.options.pkg
      const binFilesList = pkg.bin
      console.log(ctx)
    }
  }
})
