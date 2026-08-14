import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const OUT = new URL('../slides/public/anim/', import.meta.url).pathname
const COMPS = ['arch-pretty', 'arch-incident', 'melt-model', 'alert-funnel', 'arch-annotated', 'trace-waterfall', 'investigation-replay']

mkdirSync(OUT, { recursive: true })

for (const comp of COMPS) {
  console.log(`→ render ${comp}`)
  execFileSync('pnpm', ['exec', 'remotion', 'render', 'src/index.ts', comp, `${OUT}${comp}.mp4`], {
    stdio: 'inherit',
  })
}
