import { globSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

      const binFilesList =
        typeof pkg.bin === 'string'
          ? [pkg.bin as string]
          : typeof pkg.bin === 'object'
            ? [...new Set(Object.values(pkg.bin) as string[])]
            : []

      binFilesList
        .map((file) => resolve(__dirname, file))
        .filter((file) => existsSync(file))
        .forEach((file) => {
          const content = readFileSync(file, 'utf8')
          const shebang = `#!/usr/bin/env node`

          if (!content.startsWith(shebang))
            writeFileSync(file, `${shebang}\n${content}`)
        })
    }
  }
})
