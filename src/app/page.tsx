import { getAllPublications } from '../lib/publications';
import ArchiveHub from '../components/ArchiveHub';

export default async function Page() {
  const publications = await getAllPublications();

  return (
    <div className="container">
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Research & Publications</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
          An archive of scholarly work, policy analysis, and research outputs by Daramola Joseph Omoyele.
        </p>
      </div>

      <ArchiveHub initialPublications={publications} />
    </div>
  );
}
