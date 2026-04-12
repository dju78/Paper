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
    url: 'https://daramolajo.co.uk',
    sameAs: ['https://orcid.org/0009-0006-0347-0499'],
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
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Research &amp; Publications</h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            An archive of scholarly work, policy analysis, and research outputs by Daramola Joseph Omoyele.
          </p>
        </div>

        <ArchiveHub initialPublications={publications} />
      </div>
    </>
  );
}
