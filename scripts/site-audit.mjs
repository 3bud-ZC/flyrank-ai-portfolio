import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const read = (path) => readFileSync(resolve(root, path), 'utf8')

const indexHtml = read('index.html')
const appSource = read('src/App.tsx')
const mainSource = read('src/main.tsx')
const analyticsSource = read('src/analytics.ts')
const workflow = read('.github/workflows/deploy.yml')
const viteConfig = read('vite.config.ts')
const manifest = read('public/site.webmanifest')
const robots = read('public/robots.txt')
const sitemap = read('public/sitemap.xml')

const checks = [
  ['page title exists', /<title>[^<]+<\/title>/.test(indexHtml)],
  ['meta description exists', /name="description"/.test(indexHtml)],
  ['canonical URL uses public-site configuration', /rel="canonical" href="%VITE_PUBLIC_SITE_URL%"/.test(indexHtml)],
  ['Open Graph title exists', /property="og:title"/.test(indexHtml)],
  ['Open Graph URL uses public-site configuration', /property="og:url" content="%VITE_PUBLIC_SITE_URL%"/.test(indexHtml)],
  ['Open Graph image exists', /property="og:image"/.test(indexHtml)],
  ['Twitter card exists', /name="twitter:card"/.test(indexHtml)],
  ['favicon uses Vite base URL', /href="%BASE_URL%favicon\.svg"/.test(indexHtml)],
  ['manifest uses Vite base URL', /href="%BASE_URL%site\.webmanifest"/.test(indexHtml)],
  ['structured data exists', /application\/ld\+json/.test(indexHtml)],
  ['Vite build uses portable relative assets', /base:\s*['"]\.\/['"]/.test(viteConfig)],
  ['manifest start URL is portable', /"start_url":\s*"\."/.test(manifest)],
  ['manifest icon is portable', /"src":\s*"favicon\.svg"/.test(manifest)],
  ['robots policy exists', /User-agent:/i.test(robots)],
  ['sitemap contains a public URL', /<loc>https:\/\//.test(sitemap)],
  ['working form endpoint exists', /formsubmit\.co\/ajax\/s-abdallah\.ali@zewailcity\.edu\.eg/.test(appSource)],
  ['contact form validates required fields', /minLength=\{20\}/.test(appSource) && /type="email"/.test(appSource)],
  ['duplicate submit is blocked', /status === 'submitting' \|\| status === 'success'/.test(appSource)],
  ['honeypot field exists', /name="_honey"/.test(appSource)],
  ['verification route exists', /route === 'verification'/.test(appSource)],
  ['badge links to verification route', /className="flyrank-badge" href="#\/verification"/.test(appSource)],
  ['analytics initializes from main', /initializeAnalytics\(\)/.test(mainSource)],
  ['analytics requires a valid GA4 identifier', /\^G-\[A-Z0-9\]\+\$/i.test(analyticsSource)],
  ['deployment accepts GA4 variable', /VITE_GA_MEASUREMENT_ID/.test(workflow)],
  ['deployment accepts public-site URL variable', /VITE_PUBLIC_SITE_URL/.test(workflow)],
  ['CI runs audit before build', workflow.indexOf('npm run audit') < workflow.indexOf('npm run build')],
  ['external blank links include rel', !/target="_blank"(?![^>]*rel="noreferrer")/.test(appSource)],
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
