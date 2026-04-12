import type { Metadata } from 'next';

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

export default function AboutPage() {
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
            Economist · Senior Data Analyst · Regulatory &amp; Policy Analytics Specialist
          </p>

          <section style={{ marginBottom: '4rem' }}>
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Joseph Omoyele Daramola is a distinguished <strong>Economist and Senior Data Analyst</strong> with over 15 years of professional experience spanning regulatory compliance, applied econometrics, and digital governance.
            </p>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.9' }}>
              Currently serving as a Finance &amp; Economic Analyst at Univelcity Consulting (UK), he delivers economic analysis for donor-funded development programmes, builds automated dashboards, and leads data governance aligned with GDPR and international standards. His work integrates advanced econometric modelling across GBP, USD, EUR, and NGN environments for regulatory and policy clients.
            </p>
            <p style={{ lineHeight: '1.9' }}>
              Prior to his current role, Joseph served as a Financial &amp; Economic Data Analyst at the Office of the Accountant General of Nigeria, where he evaluated fiscal policy performance, delivered impact assessments, and produced senior-level policy briefings — reducing reporting cycles by 35%.
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
              {[
                { label: 'Digital Tax Reform', desc: 'Introduced the concept of Behavioural Reporting Noise (BRN) to explain compliance distortions under the UK Making Tax Digital regime (WJARR, 2026).', slug: 'behavioural-reporting-noise-tax' },
                { label: 'Institutional Economics', desc: 'Seminal analysis of religion as an economic institution in Sub-Saharan Africa and its long-run development implications (WJARR, 2026).', slug: 'religion-economic-institution' },
                { label: 'Electoral Policy', desc: "Empirical evidence on how administrative barriers suppress voter participation in Nigeria\u2019s 2023 Presidential Election (African Studies Quarterly, 2026).", slug: 'administrative-barriers-electoral-participation' },
                { label: 'State Capacity', desc: "Examined interoperability failures in Nigeria\u2019s digital identification infrastructure and their impact on administrative reach (IJDES, 2026).", slug: 'administrative-reach-state-capacity' },
              ].map(item => (
                <li key={item.slug} style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <strong>{item.label}: </strong>{item.desc}{' '}
                  <a href={`/${item.slug}`} style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>Read →</a>
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
