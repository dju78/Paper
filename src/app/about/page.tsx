import type { Metadata } from 'next';
import { getAllPublications } from '../../lib/publications';

export const metadata: Metadata = {
  title: 'About | Daramola Joseph Omoyele',
  description: 'Learn about Daramola Joseph Omoyele — Economist and Senior Data Analyst with 15+ years of experience in applied econometrics, digital governance, and public policy.',
  alternates: { canonical: 'https://omoyelejd.co.uk/about' },
  openGraph: {
    title: 'About Daramola Joseph Omoyele',
    description: 'Economist and Senior Data Analyst specialising in digital governance, tax administration, and development economics.',
    url: 'https://omoyelejd.co.uk/about',
    type: 'profile',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daramola Joseph Omoyele',
  url: 'https://omoyelejd.co.uk',
  sameAs: [
    'https://daramolajo.co.uk',
    'https://orcid.org/0009-0006-0347-0499',
    'https://github.com/dju78',
  ],
  jobTitle: 'Economist & Senior Data Analyst',
  worksFor: {
    '@type': 'Organization',
    name: 'Univelcity Consulting',
    address: { '@type': 'PostalAddress', addressCountry: 'GB' },
  },
  email: 'mailto:1978dju@gmail.com',
  knowsAbout: [
    'Digital Governance',
    'Tax Administration and Compliance',
    'Applied Econometrics',
    'Public Policy',
    'Development Economics',
    'Nigeria Governance Studies',
  ],
};

export default async function AboutPage() {
  const publications = await getAllPublications();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container" style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Daramola Joseph Omoyele</h1>
          <p style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '3rem' }}>
            Economist · Chartered Accountant · Senior Data Analyst · Regulatory &amp; Policy Analytics Specialist
          </p>

          <section style={{ marginBottom: '4rem' }}>
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Daramola Joseph Omoyele is an economist, Chartered Accountant, and senior data analyst whose work sits at the intersection of applied economics, public policy, and regulatory governance. His research focuses on how administrative systems, institutional design, and compliance structures shape economic behaviour, policy implementation, and state effectiveness.
            </p>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.9' }}>
              He currently works in the private sector with Univelcity Consulting in the United Kingdom, where he contributes to data-driven analysis, reporting systems, dashboard development, and governance-focused analytics. His work emphasises data quality, analytical rigour, and the production of practical insight for decision-makers operating in complex policy and operational environments.
            </p>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.9' }}>
              Before this, he developed substantial experience in the public service, where he worked on financial analysis, policy reporting, performance assessment, and administrative data improvement. These roles strengthened his interest in institutional performance, compliance systems, public accountability, and the practical realities of governance.
            </p>
            <p style={{ lineHeight: '1.9' }}>
              His broader academic and professional interests include development economics, tax administration, digital governance, applied econometrics, and institutional reform. Across both research and practice, he is committed to evidence-based work that connects quantitative analysis with real-world policy challenges.
            </p>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.6rem' }}>Research &amp; Policy Interests</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Digital Governance', body: 'Interoperability of identity systems, digital tax administration, and the UK Making Tax Digital regime.' },
                { title: 'Political Economy', body: 'State capacity in emerging economies, electoral participation, and the institutional role of religion.' },
                { title: 'Applied Econometrics', body: 'NARDL frameworks, wavelet coherence analysis, panel ARDL, and macroeconomic dynamics.' },
                { title: 'Climate & Fiscal Policy', body: 'Carbon taxation, net-zero policy architecture, and fiscal coverage gaps in UK climate frameworks.' },
                { title: 'Tax Administration', body: 'Compliance behaviour, HMRC risk selection, and tax administration reform in emerging economies.' },
                { title: 'Development Economics', body: 'FDI-growth nexus, capital flight consequences, and insecurity effects on economic growth in Nigeria.' },
              ].map(item => (
                <div key={item.title} style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.6rem' }}>Selected Publication Highlights</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {publications.map(pub => (
                <li key={pub.slug} style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: '600', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{pub.title}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{pub.type} • {pub.year} {pub.journal ? `• ${pub.journal}` : ''}</div>
                  <a href={`/${pub.slug}`} style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '500' }}>Read Publication →</a>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ background: '#F8FAFC', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem' }}>Contact &amp; Connectivity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', value: '1978dju@gmail.com', href: 'mailto:1978dju@gmail.com' },
                { label: 'Portfolio', value: 'daramolajo.co.uk', href: 'https://daramolajo.co.uk' },
                { label: 'ORCID', value: '0009-0006-0347-0499', href: 'https://orcid.org/0009-0006-0347-0499' },
                { label: 'Location', value: 'Colchester, Essex, United Kingdom', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ width: '100px', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</span>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '500' }}>{value}</a>
                  ) : (
                    <span style={{ fontWeight: '500' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
