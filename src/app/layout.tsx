import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://omoyelejd.co.uk'),
  title: 'Publications | Daramola Joseph Omoyele',
  description: 'Academic repository and research portfolio of Daramola Joseph Omoyele. Explore research on digital governance, tax policy, and development economics.',
  openGraph: {
    title: 'Research & Publications | Daramola Joseph Omoyele',
    description: 'Academic repository and research portfolio focused on Digital Governance, Tax Policy, and Political Economy.',
    url: 'https://omoyelejd.co.uk',
    siteName: 'Daramola Joseph Omoyele Publications',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research & Publications | Daramola Joseph Omoyele',
    description: 'Academic archive and research portfolio.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container nav-content">
            <a href="/" className="logo">Daramola Joseph Omoyele</a>
            <nav>
              <a href="https://daramolajo.co.uk" target="_blank">Portfolio</a>
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
