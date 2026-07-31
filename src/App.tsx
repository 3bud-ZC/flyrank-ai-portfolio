import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { trackPageView } from './analytics'

type Project = {
  slug: string
  name: string
  category: string
  summary: string
  problem: string
  solution: string
  outcome: string
  role: string
  technologies: string[]
  evidence: string[]
  image: string
  imageAlt: string
  links: { label: string; href: string }[]
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/abudfun@gmail.com'

const projects: Project[] = [
  {
    slug: 'og-erp',
    name: 'OG ERP System',
    category: 'Business Operations System',
    summary:
      'A full-stack business-management system designed to replace fragmented operational records with one structured workflow.',
    problem:
      'Business activity was spread across manual records and disconnected tools, making customer, sales, and operational follow-up harder to understand and maintain.',
    solution:
      'I designed a modular web application that centralizes the core records and gives each workflow a consistent place, structure, and review path.',
    outcome:
      'The current build is a working full-stack application with a documented architecture and a clear path for continued module-level expansion.',
    role:
      'Product definition, software architecture, full-stack implementation, repository maintenance, testing, and deployment planning.',
    technologies: ['TypeScript', 'Full-stack web architecture', 'Relational data', 'Repository automation'],
    evidence: [
      'A real repository scan identifies the project as a file-routed full-stack application.',
      'Architecture, technology, security, and fix-planning reports can be regenerated from the codebase.',
      'The public visual is an interface-based composition; internal source repositories remain private.',
    ],
    image: 'https://drive.google.com/thumbnail?id=10n6H1gUVB2vgxbEc0EQTy1VOly4VtUQr&sz=w1600',
    imageAlt: 'Interface-based OG ERP project composition',
    links: [
      {
        label: 'Open interface evidence',
        href: 'https://drive.google.com/file/d/10n6H1gUVB2vgxbEc0EQTy1VOly4VtUQr/view',
      },
      {
        label: 'Open repository scan evidence',
        href: 'https://drive.google.com/file/d/1aqf7vwL4OYl_C5eNm8GonrTojloZ9i6Z/view',
      },
    ],
  },
  {
    slug: 'reporadar-ai',
    name: 'RepoRadar AI',
    category: 'Developer Intelligence Tool',
    summary:
      'A local-first repository scanner that converts an unfamiliar codebase into structured technical reports and agent-ready prompts.',
    problem:
      'Developers and coding agents lose time reconstructing architecture, entry points, risks, and the safest place to begin inside an unfamiliar repository.',
    solution:
      'RepoRadar scans a selected project folder, identifies the repository shape, and generates focused reports for architecture, technology, security, quick wins, case-study framing, and implementation work.',
    outcome:
      'A real scan of the OG ERP repository completed successfully and generated a reusable set of Markdown and JSON outputs for technical review.',
    role:
      'Product concept, CLI workflow, report design, local-first constraints, implementation, verification, and portfolio framing.',
    technologies: ['TypeScript', 'Node.js', 'CLI', 'Static analysis', 'Local-first processing'],
    evidence: [
      'The launcher accepts a selected local project folder rather than requiring an external upload.',
      'The completed run reports architecture, a health score, top risks, and the generated output files.',
      'The generated artifacts include technical reports, security notes, fix plans, GitHub issue drafts, and agent prompts.',
    ],
    image: 'https://drive.google.com/thumbnail?id=1aqf7vwL4OYl_C5eNm8GonrTojloZ9i6Z&sz=w1600',
    imageAlt: 'RepoRadar AI completed repository scan in a terminal',
    links: [
      { label: 'Open public repository', href: 'https://github.com/3bud-ZC/RepoRadar-Ai' },
      {
        label: 'Open generated output evidence',
        href: 'https://drive.google.com/file/d/14HZmmeXB-Fhu4t1_88r7K_EmlLfjCFLA/view',
      },
    ],
  },
  {
    slug: 'vps-monitor-bot',
    name: 'VPS Monitor Bot',
    category: 'Infrastructure Automation',
    summary:
      'A Telegram-based operations bot that makes server health and common administration checks available without opening a terminal session.',
    problem:
      'Routine VPS checks required repeated SSH access and manual commands, which slowed down basic monitoring and made status review less accessible on mobile.',
    solution:
      'I built a Telegram bot with explicit commands and menu actions for server status, resource usage, uptime, services, logs, alerts, and approved file-management operations.',
    outcome:
      'The live bot returns real CPU, memory, disk, uptime, system, and service information and presents the result through a mobile interface.',
    role:
      'Command design, Linux integration, Telegram workflow, validation, security boundaries, deployment, and live operational testing.',
    technologies: ['Python', 'Telegram Bot API', 'Linux', 'System monitoring', 'Automation'],
    evidence: [
      'The command menu exposes monitoring, services, logs, alerts, and controlled administration actions.',
      'The real status response reports Linux version, uptime, CPU, memory, disk, and a current resource chart.',
      'The bot is presented as an operational tool, not as an autonomous system with unrestricted server access.',
    ],
    image: 'https://drive.google.com/thumbnail?id=1rE3_bC_axR9pCdEokeR6BphinSPy9CX7&sz=w1600',
    imageAlt: 'VPS Monitor Bot real server status response in Telegram',
    links: [
      {
        label: 'Open real status evidence',
        href: 'https://drive.google.com/file/d/1rE3_bC_axR9pCdEokeR6BphinSPy9CX7/view',
      },
      {
        label: 'Open command-menu evidence',
        href: 'https://drive.google.com/file/d/1SbWdx7T9TyCa-UwVRVlf398GZIIxfrzK/view',
      },
    ],
  },
]

const navigation = [
  { route: 'home', label: 'Home', href: '#/' },
  { route: 'work', label: 'Work', href: '#/work' },
  { route: 'about', label: 'About', href: '#/about' },
  { route: 'notes', label: 'Notes', href: '#/notes' },
  { route: 'contact', label: 'Contact', href: '#/contact' },
]

const routeMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Abdullah Ragab — Software Systems & Automation',
    description: 'Evidence-backed software systems, developer tools, and workflow automation case studies.',
  },
  work: {
    title: 'Work — Abdullah Ragab',
    description: 'Case studies for business systems, repository intelligence, and infrastructure automation.',
  },
  about: {
    title: 'About — Abdullah Ragab',
    description: 'Software engineering with an operations mindset and explicit evidence boundaries.',
  },
  notes: {
    title: 'Build Notes — Abdullah Ragab',
    description: 'Decisions, hardening work, and the next-case maintenance plan for the portfolio.',
  },
  contact: {
    title: 'Contact — Abdullah Ragab',
    description: 'Send one workflow that should be replaced or improved through a working contact form.',
  },
  cv: {
    title: 'CV — Abdullah Ragab',
    description: 'Software engineering education, experience, technical focus, and selected projects.',
  },
  dns: {
    title: 'DNS and HTTPS Walkthrough — Abdullah Ragab',
    description: 'A plain-language explanation of GitHub Pages, DNS, CNAME records, TLS, and HTTPS.',
  },
  verification: {
    title: 'FlyRank Verification Status — Abdullah Ragab',
    description: 'Public status page for the FlyRank AI portfolio, track evidence, and graduate badge verification.',
  },
}

function currentRoute() {
  return window.location.hash.replace(/^#\/?/, '') || 'home'
}

function App() {
  const [route, setRoute] = useState(currentRoute)

  const selectedProject = useMemo(() => {
    if (!route.startsWith('work/')) return undefined
    return projects.find((project) => project.slug === route.split('/')[1])
  }, [route])

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = currentRoute()
      setRoute(nextRoute)
      trackPageView(nextRoute)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    trackPageView(route)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const metaKey = selectedProject ? 'work' : routeMeta[route] ? route : 'home'
    const metadata = routeMeta[metaKey]
    const title = selectedProject ? `${selectedProject.name} — Abdullah Ragab` : metadata.title
    const description = selectedProject ? selectedProject.summary : metadata.description

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [route, selectedProject])

  const activeRoute = route.startsWith('work') ? 'work' : route

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#/" aria-label="Abdullah Ragab portfolio home">
          <span className="brand-mark" aria-hidden="true">
            AR
          </span>
          <span>
            <strong>Abdullah Ragab</strong>
            <small>Software systems & automation</small>
          </span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.route}
              className={activeRoute === item.route ? 'active' : ''}
              href={item.href}
              aria-current={activeRoute === item.route ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        {selectedProject ? (
          <CaseStudy project={selectedProject} />
        ) : route === 'work' ? (
          <WorkPage />
        ) : route === 'about' ? (
          <AboutPage />
        ) : route === 'contact' ? (
          <ContactPage />
        ) : route === 'notes' ? (
          <NotesPage />
        ) : route === 'cv' ? (
          <CvPage />
        ) : route === 'dns' ? (
          <DnsPage />
        ) : route === 'verification' ? (
          <VerificationPage />
        ) : (
          <HomePage />
        )}
      </main>

      <footer className="site-footer">
        <a className="flyrank-badge" href="#/verification" aria-label="Open FlyRank verification status">
          <span>FlyRank AI</span>
          <strong>Graduate verification</strong>
          <small>Official badge pending issuance</small>
        </a>
        <p>Built as a public, reviewable FlyRank AI portfolio project.</p>
        <div className="footer-links">
          <a href="#/dns">DNS walkthrough</a>
          <a href="#/cv">CV</a>
          <a href="https://github.com/3bud-ZC" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">FlyRank AI Portfolio · Week 9 hardening build</p>
          <h1 id="hero-title">I turn fragmented manual workflows into working software systems.</h1>
          <p className="hero-lead">
            I design and build practical web applications, developer tools, and automation systems for
            small businesses and technical teams. The work below is documented through real outputs,
            public code where possible, and explicit limitations where the evidence is private.
          </p>
          <div className="button-row">
            <a className="button primary" href="#/work">
              Review the work
            </a>
            <a className="button secondary" href="#/contact">
              Send one workflow
            </a>
          </div>
        </div>

        <aside className="hero-proof" aria-label="Portfolio proof summary">
          <p className="proof-kicker">Current proof</p>
          <strong>3 focused case studies</strong>
          <ul>
            <li>Business operations software</li>
            <li>Repository intelligence tooling</li>
            <li>Infrastructure monitoring automation</li>
          </ul>
          <a href="#/work">Open evidence-backed cases →</a>
        </aside>
      </section>

      <section className="section-wrap section-block" aria-labelledby="featured-work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-work-title">Systems that replace repeated manual work</h2>
          <p>Each case explains the problem, what I built, the current proof, and what remains next.</p>
        </div>
        <ProjectGrid projects={projects} />
      </section>

      <section className="section-wrap through-line" aria-labelledby="through-line-title">
        <div>
          <p className="eyebrow">How I work</p>
          <h2 id="through-line-title">Evidence before polish</h2>
        </div>
        <ol>
          <li>
            <strong>Understand the workflow.</strong>
            <span>Map the repeated steps, decision points, data, and failure conditions.</span>
          </li>
          <li>
            <strong>Build the narrowest useful loop.</strong>
            <span>Ship one end-to-end path before adding dashboards, agents, or infrastructure.</span>
          </li>
          <li>
            <strong>Verify the result.</strong>
            <span>Use real captures, reproducible runs, tests, and clear human-review boundaries.</span>
          </li>
        </ol>
      </section>

      <section className="section-wrap call-to-action">
        <div>
          <p className="eyebrow">One clear next step</p>
          <h2>Send me one workflow you want to replace or improve.</h2>
        </div>
        <a className="button primary" href="#/contact">
          Start the conversation
        </a>
      </section>
    </>
  )
}

function WorkPage() {
  return (
    <section className="section-wrap page-intro" aria-labelledby="work-title">
      <p className="eyebrow">Work</p>
      <h1 id="work-title">Case studies with real project evidence</h1>
      <p>
        The strongest work leads. Promotional covers are used only as secondary visuals; terminal
        outputs, application captures, repository links, and live responses are labeled as primary
        evidence.
      </p>
      <ProjectGrid projects={projects} />
    </section>
  )
}

function ProjectGrid({ projects: projectItems }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projectItems.map((project) => (
        <article className="project-card" key={project.slug}>
          <div className="project-image-wrap">
            <img src={project.image} alt={project.imageAlt} loading="lazy" referrerPolicy="no-referrer" />
          </div>
          <div className="project-card-body">
            <p className="project-category">{project.category}</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <div className="tag-list" aria-label={`${project.name} technologies`}>
              {project.technologies.slice(0, 3).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <a className="text-link" href={`#/work/${project.slug}`}>
              Read case study →
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="section-wrap case-study" aria-labelledby="case-title">
      <a className="back-link" href="#/work">
        ← Back to work
      </a>
      <header className="case-header">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1 id="case-title">{project.name}</h1>
          <p>{project.summary}</p>
        </div>
        <img src={project.image} alt={project.imageAlt} referrerPolicy="no-referrer" />
      </header>

      <div className="case-layout">
        <div className="case-main">
          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>What I built</h2>
            <p>{project.solution}</p>
          </section>
          <section>
            <h2>Current outcome</h2>
            <p>{project.outcome}</p>
          </section>
          <section>
            <h2>Evidence available now</h2>
            <ul className="evidence-list">
              {project.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Next improvement</h2>
            <p>
              Increase the depth of the measurable outcome record, add more verified product captures,
              and keep the evidence hierarchy explicit as the system evolves.
            </p>
          </section>
        </div>

        <aside className="case-sidebar">
          <div>
            <p className="sidebar-label">My role</p>
            <p>{project.role}</p>
          </div>
          <div>
            <p className="sidebar-label">Technologies</p>
            <div className="tag-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="sidebar-label">Supporting links</p>
            <ul className="link-list">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  )
}

function AboutPage() {
  return (
    <section className="section-wrap page-intro about-page" aria-labelledby="about-title">
      <p className="eyebrow">About</p>
      <h1 id="about-title">Software engineering with an operations mindset</h1>
      <div className="prose-grid">
        <div>
          <p>
            I am a Computer Science student focused on software engineering, full-stack systems,
            automation, and practical AI tooling. My earlier work in e-commerce and digital operations
            shaped how I approach software: the system must reduce friction, expose the real workflow,
            and remain maintainable after the first demo.
          </p>
          <p>
            I use AI as a build and review partner, not as a substitute for understanding the project.
            I keep the implementation boundaries visible, verify important outputs, and avoid claiming
            results that were not measured.
          </p>
        </div>
        <div className="capability-card">
          <h2>Current focus</h2>
          <ul>
            <li>Full-stack business applications</li>
            <li>Developer tools and repository intelligence</li>
            <li>Workflow automation and AI-assisted systems</li>
            <li>Deployment, server operations, and verification</li>
          </ul>
        </div>
      </div>
      <div className="button-row">
        <a className="button primary" href="#/cv">
          Open CV
        </a>
        <a className="button secondary" href="https://www.linkedin.com/in/abudxali/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function ContactPage() {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting' || status === 'success') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const workflow = String(formData.get('workflow') ?? '').trim()
    const desiredResult = String(formData.get('desired_result') ?? '').trim()
    const honey = String(formData.get('_honey') ?? '').trim()

    if (honey) return
    if (name.length < 2 || workflow.length < 20 || desiredResult.length < 10 || !email.includes('@')) {
      setStatus('error')
      setMessage('Please complete every field with enough detail for a useful reply.')
      return
    }

    setStatus('submitting')
    setMessage('Sending your workflow securely…')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          workflow,
          desired_result: desiredResult,
          _subject: `FlyRank portfolio workflow request from ${name}`,
          _template: 'table',
        }),
      })

      const result = (await response.json()) as { success?: string | boolean; message?: string }
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The form service rejected the request.')
      }

      setStatus('success')
      setMessage('Sent successfully. I will review the workflow and reply by email.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The message could not be sent. Please try again.')
    }
  }

  return (
    <section className="section-wrap page-intro contact-page" aria-labelledby="contact-title">
      <p className="eyebrow">Working feature</p>
      <h1 id="contact-title">Send one workflow you want to replace or improve.</h1>
      <p>
        This is a real end-to-end contact flow. The browser validates the input, sends one JSON request
        to a hosted form backend, and the backend forwards the submission to my inbox.
      </p>

      <form className="workflow-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" maxLength={160} required />
          </label>
        </div>
        <label>
          What happens today, and where does it break?
          <textarea name="workflow" minLength={20} maxLength={2000} rows={6} required />
        </label>
        <label>
          What would a useful result look like?
          <textarea name="desired_result" minLength={10} maxLength={1000} rows={4} required />
        </label>
        <label className="honeypot" aria-hidden="true">
          Leave this field empty
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="form-actions">
          <button className="button primary" type="submit" disabled={status === 'submitting' || status === 'success'}>
            {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Message sent' : 'Send workflow'}
          </button>
          <p className={`form-status ${status}`} role="status" aria-live="polite">
            {message || 'No account is required. Do not include passwords, API keys, or confidential client data.'}
          </p>
        </div>
      </form>

      <div className="contact-grid">
        <a href="mailto:abudfun@gmail.com?subject=Workflow%20system%20inquiry">
          <span>Email fallback</span>
          <strong>abudfun@gmail.com</strong>
        </a>
        <a href="mailto:abudfun@gmail.com?subject=Book%20a%2020-minute%20project%20call">
          <span>Booking request</span>
          <strong>Request a 20-minute call</strong>
        </a>
        <a href="https://www.linkedin.com/in/abudxali/" target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          <strong>Professional profile</strong>
        </a>
        <a href="https://github.com/3bud-ZC" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <strong>Public repositories</strong>
        </a>
      </div>
    </section>
  )
}

function NotesPage() {
  return (
    <section className="section-wrap page-intro" aria-labelledby="notes-title">
      <p className="eyebrow">Field notes</p>
      <h1 id="notes-title">Build decisions and the maintenance path</h1>
      <p>
        This page records the decisions behind the public portfolio and preserves enough context to add
        the next case study without rebuilding the site.
      </p>
      <div className="notes-list">
        <article>
          <time dateTime="2026-08-01">1 August 2026</time>
          <h2>One dynamic feature, not several half-wired features</h2>
          <p>
            The contact form is the single Week 8 feature. It validates input, prevents duplicate clicks
            while sending, calls a hosted backend, and reports a clear success or failure state.
          </p>
        </article>
        <article>
          <time dateTime="2026-08-01">1 August 2026</time>
          <h2>Hardening before launch</h2>
          <p>
            Week 9 adds source-level break tests, SEO metadata, analytics support, a verification route,
            and an honest limitations list. The next case planned for this structure is FlyRank Opportunity Scout.
          </p>
        </article>
        <article>
          <time dateTime="2026-07-31">31 July 2026</time>
          <h2>Why the strongest three projects lead</h2>
          <p>
            OG ERP demonstrates business-system thinking, RepoRadar demonstrates developer tooling,
            and VPS Monitor Bot demonstrates infrastructure automation. Secondary work can be added
            later, but the first view stays focused on one claim and one audience.
          </p>
        </article>
      </div>
    </section>
  )
}

function CvPage() {
  return (
    <section className="section-wrap page-intro cv-page" aria-labelledby="cv-title">
      <p className="eyebrow">Curriculum vitae</p>
      <h1 id="cv-title">Abdullah Ragab Al Ali</h1>
      <p className="cv-summary">
        Software Engineering student and full-stack builder focused on practical business systems,
        automation, developer tools, and AI-assisted workflows.
      </p>

      <div className="cv-grid">
        <section>
          <h2>Education</h2>
          <h3>Zewail City of Science, Technology and Innovation</h3>
          <p>BSc Computer Science · Software Engineering focus</p>
        </section>
        <section>
          <h2>Experience</h2>
          <h3>Digital commerce and independent project work</h3>
          <p>
            Experience across e-commerce operations, customer service, content production, marketing,
            project management, and software product development.
          </p>
        </section>
        <section>
          <h2>Technical focus</h2>
          <ul>
            <li>Python and TypeScript</li>
            <li>React and full-stack web development</li>
            <li>Automation and AI tool integration</li>
            <li>Linux, Nginx, PM2, PostgreSQL, and VPS operations</li>
            <li>Testing, deployment, and project documentation</li>
          </ul>
        </section>
        <section>
          <h2>Selected projects</h2>
          <ul>
            <li>OG ERP System</li>
            <li>RepoRadar AI</li>
            <li>VPS Monitor Bot</li>
            <li>FlyRank Opportunity Analysis Workflow</li>
          </ul>
        </section>
      </div>

      <div className="button-row">
        <a className="button primary" href="mailto:abudfun@gmail.com?subject=CV%20inquiry">
          Contact me
        </a>
        <a className="button secondary" href="https://github.com/3bud-ZC" target="_blank" rel="noreferrer">
          Review GitHub
        </a>
      </div>
    </section>
  )
}

function DnsPage() {
  return (
    <section className="section-wrap page-intro dns-page" aria-labelledby="dns-title">
      <p className="eyebrow">Deployment walkthrough</p>
      <h1 id="dns-title">How this public URL, DNS, and HTTPS fit together</h1>
      <p>
        The current site is served from the clean free-host URL
        <code>3bud-zc.github.io/flyrank-ai-portfolio/</code>. A custom subdomain can point to the same
        hosted project without rebuilding the site.
      </p>

      <div className="dns-steps">
        <section>
          <span>01</span>
          <div>
            <h2>The browser asks for an address</h2>
            <p>
              When a visitor enters a domain, the browser asks a DNS resolver where that hostname should
              go. The resolver may already have a cached answer; otherwise it follows the domain's
              authoritative nameservers.
            </p>
          </div>
        </section>
        <section>
          <span>02</span>
          <div>
            <h2>The authoritative nameserver returns the record</h2>
            <p>
              A custom subdomain normally uses a CNAME record. The CNAME does not copy or move the
              website. It makes the new hostname an alias for the hosting target supplied by GitHub Pages.
            </p>
          </div>
        </section>
        <section>
          <span>03</span>
          <div>
            <h2>The host selects the correct deployment</h2>
            <p>
              After DNS resolves, the browser connects to the hosting platform and includes the requested
              hostname. The platform maps that hostname to this repository's published build and returns
              the generated HTML, CSS, JavaScript, and images.
            </p>
          </div>
        </section>
        <section>
          <span>04</span>
          <div>
            <h2>HTTPS proves the connection is protected</h2>
            <p>
              Once the host verifies the custom hostname, it issues a TLS certificate. The browser checks
              that certificate before showing HTTPS. The final validation is to open the address in a
              private window and confirm that no certificate warning appears.
            </p>
          </div>
        </section>
      </div>

      <aside className="dns-note">
        <h2>Propagation and caching</h2>
        <p>
          DNS changes can appear at different times because resolvers keep previous answers until their
          time-to-live expires. A delay does not mean the application must be rebuilt; it means some
          resolvers are still using a cached DNS response.
        </p>
      </aside>
    </section>
  )
}

function VerificationPage() {
  return (
    <section className="section-wrap page-intro verification-page" aria-labelledby="verification-title">
      <p className="eyebrow">Public verification</p>
      <h1 id="verification-title">FlyRank AI portfolio status</h1>
      <p>
        This page provides a stable destination for the portfolio badge and separates completed public
        evidence from credentials that have not yet been officially issued.
      </p>

      <div className="verification-grid">
        <article>
          <span className="status-pill complete">Verified public evidence</span>
          <h2>Portfolio build</h2>
          <p>Live GitHub Pages deployment, public source history, case studies, mobile evidence, and hardening logs.</p>
          <a href="https://github.com/3bud-ZC/flyrank-ai-portfolio" target="_blank" rel="noreferrer">
            Review repository
          </a>
        </article>
        <article>
          <span className="status-pill pending">Pending official issuance</span>
          <h2>FlyRank graduate badge</h2>
          <p>
            The footer placement and verification destination are implemented. The badge remains clearly
            marked pending until FlyRank issues the official graduate asset and verification URL.
          </p>
        </article>
        <article>
          <span className="status-pill complete">Working feature</span>
          <h2>Contact workflow</h2>
          <p>The live contact form sends validated submissions through a hosted backend to the portfolio inbox.</p>
          <a href="#/contact">Open the working form</a>
        </article>
      </div>
    </section>
  )
}

export default App
