import { getAllPublications } from '../../lib/publications';
import ArchiveHub from '../../components/ArchiveHub';

export default async function ArticlesPage() {
  const publications = await getAllPublications();
  
  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1 className="display-large" style={{ marginBottom: '1.5rem' }}>Articles & Essays</h1>
        <p className="lead text-muted" style={{ maxWidth: '800px' }}>
          Reflections and commentary on public policy, governance, and development economics. 
          This section features policy briefs, media articles, and academic essays.
        </p>
      </header>
      
      <ArchiveHub 
        initialPublications={publications} 
        allowedTypes={['Articles & Essays']} 
        defaultType="All Types" 
      />
    </div>
  );
}
