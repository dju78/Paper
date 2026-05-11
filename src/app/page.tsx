import { getAllPublications } from '../lib/publications';
import ArchiveHub from '../components/ArchiveHub';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Daramola Joseph Omoyele — Research & Publications',
  url: 'https://omoyelejd.co.uk',
  description: 'An academic publication hub and research archive by Daramola Joseph Omoyele, Economist and Senior Data Analyst.',
  author: {
    '@type': 'Person',
    name: 'Daramola Joseph Omoyele',
    url: 'https://omoyelejd.co.uk',
    sameAs: [
      'https://daramolajo.co.uk',
      'https://orcid.org/0009-0006-0347-0499',
      'https://scholar.google.co.uk/citations?user=gw0w3s4AAAAJ&hl=en',
      'https://www.linkedin.com/in/daramola-omoyele-bbb006244/',
      'https://github.com/dju78'
    ],
    jobTitle: 'Economist & Senior Data Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Univelcity Consulting',
      address: { '@type': 'PostalAddress', addressCountry: 'GB' },
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://omoyelejd.co.uk/?search={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default async function Page() {
  const publications = await getAllPublications();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="container">
        <div style={{ maxWidth: '800px', marginBottom: '5rem', paddingTop: '1rem' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', fontWeight: '800', lineHeight: '1.15' }}>
            Daramola Joseph Omoyele
          </h1>
          <p style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '1rem', marginBottom: '2.5rem', letterSpacing: '0.01em' }}>
            Economist · Chartered Accountant · Data Analyst · Regulatory &amp; Policy Analytics Specialist
          </p>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.9', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
            Daramola Joseph Omoyele is an economist, Chartered Accountant, and senior data analyst whose work focuses on the intersection of public policy, regulatory governance, digital administration, and applied economic analysis. His research explores how institutions, compliance systems, and administrative design influence economic outcomes, public accountability, and state capacity.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.9', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
            With experience spanning both private-sector analytics and public service, he brings a practical and interdisciplinary perspective to questions of development, taxation, digital governance, and institutional performance. His work is guided by a commitment to rigorous, policy-relevant research that connects empirical analysis with real-world governance challenges.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            This website presents a collection of his publications, policy contributions, and analytical work.
          </p>
        </div>

        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Recently Added</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {publications.slice(0, 3).map((pub) => (
              <a key={pub.slug} href={`/${pub.slug}`} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ marginBottom: '0.75rem', color: 'var(--accent)', fontWeight: '600', fontSize: '0.85rem' }}>
                  {pub.type} • {pub.year}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.3' }}>
                  {pub.title}
                </h3>
                {pub.journal && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {pub.journal}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Full Archive</h2>
          <ArchiveHub 
            initialPublications={publications} 
            allowedTypes={['Journal Articles', 'Working Papers / Preprints', 'Books / Handbooks']} 
          />
        </div>
      </div>
    </>
  );
}
