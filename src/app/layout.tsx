import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://omoyelejd.co.uk'),
  title: 'Daramola Joseph Omoyele | Economist, Policy Researcher & Data Analyst',
  description: 'Academic repository and research portfolio of Daramola Joseph Omoyele. Explore research on digital governance, tax policy, and development economics.',
  openGraph: {
    title: 'Research & Publications | Daramola Joseph Omoyele',
    description: 'Academic repository and research portfolio focused on Digital Governance, Tax Policy, and Political Economy.',
    url: 'https://omoyelejd.co.uk',
    siteName: 'Daramola Joseph Omoyele Publications',
    images: [
      {
        url: '/new-logo.png',
        width: 800,
        height: 800,
        alt: 'DJO Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research & Publications | Daramola Joseph Omoyele',
    description: 'Academic archive and research portfolio.',
    images: ['/new-logo.png'],
  },
  icons: {
    icon: '/djo-logo.png',
  },
  keywords: [
    'Daramola Joseph Omoyele',
    'DJO',
    'Economist',
    'Chartered Accountant',
    'Data Analyst',
    'Regulatory and Policy Analytics',
    'Tax Policy',
    'Digital Governance',
    'Development Economics',
  ],
  authors: [{ name: 'Daramola Joseph Omoyele', url: 'https://omoyelejd.co.uk' }],
  creator: 'Daramola Joseph Omoyele',
  publisher: 'Daramola Joseph Omoyele',
  alternates: {
    canonical: 'https://omoyelejd.co.uk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://omoyelejd.co.uk/#person',
      name: 'Daramola Joseph Omoyele',
      alternateName: 'DJO',
      url: 'https://omoyelejd.co.uk',
      image: 'https://omoyelejd.co.uk/new-logo.png',
      jobTitle: [
        'Economist',
        'Chartered Accountant',
        'Data Analyst',
        'Regulatory & Policy Analytics Specialist',
      ],
      sameAs: ['https://daramolajo.co.uk'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://omoyelejd.co.uk/#website',
      url: 'https://omoyelejd.co.uk',
      name: 'Daramola Joseph Omoyele | Research & Publications',
      description:
        'Academic repository and research portfolio focused on Digital Governance, Tax Policy, and Political Economy.',
      publisher: { '@id': 'https://omoyelejd.co.uk/#person' },
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <header>
          <div className="container nav-content">
            <a href="/" className="logo" aria-label="Daramola Joseph Omoyele — Home">
              <img src="/new-logo.png" alt="Daramola Joseph Omoyele (DJO) logo" className="logo-img" />
            </a>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="/" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Home</a>
              <a href="/about" style={{ fontSize: '0.95rem', fontWeight: '500' }}>About</a>
              <a href="/publications" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Publications</a>
              <a href="https://daramolajo.co.uk" target="_blank" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Portfolio</a>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ background: 'white', padding: '3rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <div className="container">
            <p className="text-muted">© 2026 Daramola Joseph Omoyele. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
