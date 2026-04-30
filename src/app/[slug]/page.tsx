import { getPublicationData, getAllPublications, Publication } from '../../lib/publications';
import CitationSection from '../../components/CitationSection';
import type { Metadata } from 'next';

const BASE_URL = 'https://omoyelejd.co.uk';

export async function generateStaticParams() {
  const publications = await getAllPublications();
  return publications.map((pub) => ({ slug: pub.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const pub = await getPublicationData(slug);
  const description = pub.abstract
    ? pub.abstract.slice(0, 160).replace(/\n/g, ' ')
    : `Read ${pub.title} by Daramola Joseph Omoyele.`;

  return {
    title: `${pub.title} | Daramola Joseph Omoyele`,
    description,
    authors: [{ name: 'Daramola Joseph Omoyele' }],
    alternates: { canonical: `${BASE_URL}/${slug}` },
    openGraph: {
      title: pub.title,
      description,
      url: `${BASE_URL}/${slug}`,
      type: 'article',
      publishedTime: `${pub.year}-01-01`,
      authors: ['Daramola Joseph Omoyele'],
    },
    twitter: {
      card: 'summary_large_image',
      title: pub.title,
      description,
    },
  };
}

function ScholarlyArticleJsonLd({ pub }: { pub: Publication }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': pub.type === 'Book' ? 'Book' : 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    abstract: pub.abstract,
    author: {
      '@type': 'Person',
      name: 'Daramola Joseph Omoyele',
      url: 'https://daramolajo.co.uk',
      sameAs: ['https://orcid.org/0009-0006-0347-0499'],
    },
    datePublished: `${pub.year}-01-01`,
    publisher: pub.journal
      ? { '@type': 'Organization', name: pub.journal }
      : undefined,
    ...(pub.doi ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi } } : {}),
    url: `${BASE_URL}/${pub.slug}`,
    keywords: pub.topics?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublicationData(slug);
  const allPublications = await getAllPublications();

  if (!pub) return <div className="container">Publication not found.</div>;

  // Related: same topics, exclude self, limit 3
  const related = allPublications
    .filter((p) => p.slug !== slug && p.topics?.some((t) => pub.topics?.includes(t)))
    .slice(0, 3);

  return (
    <>
      <ScholarlyArticleJsonLd pub={pub} />
      <div className="container" style={{ maxWidth: '900px', padding: '4rem 0' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          ← Back to Archive
        </a>

        <div style={{ marginBottom: '3rem' }}>
          {pub.cover_image && (
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src={pub.cover_image} 
                alt={`Cover of ${pub.title}`} 
                style={{ maxWidth: '250px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
              />
            </div>
          )}
          <div style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '1rem' }}>
            {pub.type} • {pub.year}
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{pub.title}</h1>

          {/* Author block — visible on page and indexed by search engines */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0 }}>
                JD
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Daramola Joseph Omoyele</a>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Economist &amp; Senior Data Analyst ·{' '}
                  <a href="https://orcid.org/0009-0006-0347-0499" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                    ORCID: 0009-0006-0347-0499
                  </a>
                </div>
              </div>
            </div>
            {pub.journal && (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem' }}>
                <span style={{ fontWeight: '600' }}>Published in: </span>{pub.journal}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {pub.doi && (
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                DOI: {pub.doi}
              </a>
            )}
            {pub.pdf && (
              <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                Download PDF
              </a>
            )}
            {pub.external_url && (
              <a href={pub.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                {pub.type === 'Books / Handbooks' ? 'Buy on Amazon' : 'View Publication'}
              </a>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
          <section>
            <h2 style={{ marginBottom: '1rem' }}>Abstract</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8', marginBottom: '3rem' }}>
              {pub.abstract}
            </div>

            <h2 style={{ marginBottom: '1rem' }}>Keywords &amp; Topics</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
              {pub.topics?.map(topic => (
                <span key={topic} style={{ padding: '0.4rem 0.8rem', background: '#F1F5F9', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {topic}
                </span>
              ))}
            </div>
          </section>

          <aside>
            <CitationSection
              citation_apa={pub.citation_apa}
              citation_bibtex={pub.citation_bibtex}
              journal={pub.journal}
            />
          </aside>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Related Publications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/${r.slug}`}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    background: 'white',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <div style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {r.type} • {r.year}
                  </div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.4' }}>
                    {r.title}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
