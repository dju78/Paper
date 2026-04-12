import { getAllPublications } from '../../lib/publications';
import ArchiveHub from '../../components/ArchiveHub';

export default async function PapersPage() {
  const publications = await getAllPublications();
  
  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1 className="display-large" style={{ marginBottom: '1.5rem' }}>Scholarly Papers</h1>
        <p className="lead text-muted" style={{ maxWidth: '800px' }}>
          Explore research on tax administration, digital governance, and applied econometrics. 
          This archive includes peer-reviewed journal articles, working papers, and policy contributions.
        </p>
      </header>
      
      <ArchiveHub initialPublications={publications} defaultType="Journal Article" />
    </div>
  );
}
