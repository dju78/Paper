import { getPublicationData, getAllPublications } from '../../lib/publications';
import CitationSection from '../../components/CitationSection';

export async function generateStaticParams() {
  const publications = await getAllPublications();
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = await getPublicationData(slug);

  if (!pub) return <div className="container">Publication not found.</div>;

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        ← Back to Archive
      </a>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '1rem' }}>
          {pub.type} • {pub.year}
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{pub.title}</h1>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} target="_blank" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              DOI: {pub.doi}
            </a>
          )}
          {pub.pdf && (
            <a href={pub.pdf} target="_blank" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              Download PDF
            </a>
          )}
          {pub.external_url && (
            <a href={pub.external_url} target="_blank" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              External Link
            </a>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Abstract</h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '3rem' }}>
            {pub.abstract}
          </div>

          <h2 style={{ marginBottom: '1rem' }}>Keywords & Topics</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {pub.topics.map(topic => (
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
    </div>
  );
}
