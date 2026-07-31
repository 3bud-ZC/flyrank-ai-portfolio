import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8')
const appSource = readFileSync(resolve(root, 'src/App.tsx'), 'utf8')
const mainSource = readFileSync(resolve(root, 'src/main.tsx'), 'utf8')
const workflow = readFileSync(resolve(root, '.github/workflows/deploy.yml'), 'utf8')

const checks = [
  ['page title exists', /<title>[^<]+<\/title>/.test(indexHtml)],
  ['meta description exists', /name="description"/.test(indexHtml)],
  ['canonical URL exists', /rel="canonical"/.test(indexHtml)],
  ['Open Graph title exists', /property="og:title"/.test(indexHtml)],
  ['Open Graph image exists', /property="og:image"/.test(indexHtml)],
  ['Twitter card exists', /name="twitter:card"/.test(indexHtml)],
  ['favicon exists', /rel="icon"/.test(indexHtml)],
  ['structured data exists', /application\/ld\+json/.test(indexHtml)],
  ['working form endpoint exists', /formsubmit\.co\/ajax\/abudfun@gmail\.com/.test(appSource)],
  ['contact form validates required fields', /minLength=\{20\}/.test(appSource) && /type="email"/.test(appSource)],
  ['duplicate submit is blocked', /status === 'submitting' \|\| status === 'success'/.test(appSource)],
  ['honeypot field exists', /name="_honey"/.test(appSource)],
  ['verification route exists', /route === 'verification'/.test(appSource)],
  ['badge links to verification route', /className="flyrank-badge" href="#\/verification"/.test(appSource)],
  ['analytics initializes from main', /initializeAnalytics\(\)/.test(mainSource)],
  ['CI runs audit before build', /npm run audit/.test(workflow)],
  [
    'external blank links include rel',
    !/target="_blank"(?![^>]*rel="noreferrer")/.test(appSource),
  ],
]

let failures = 0
for (const [label, passed] of checks) {
  if (passed) {
    console.log(`PASS  ${label}`)
  } else {
    failures += 1
    console.error(`FAIL  ${label}`)
  }
}

console.log(`\n${checks.length - failures}/${checks.length} hardening checks passed.`)
if (failures > 0) process.exit(1)
