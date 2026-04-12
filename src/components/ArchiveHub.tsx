'use client';

import { useState, useEffect } from 'react';
import { Publication } from '../lib/publications';
import Fuse from 'fuse.js';

interface ArchiveHubProps {
    initialPublications: Publication[];
    defaultType?: string;
    allowedTypes?: string[];
}


export default function ArchiveHub({ initialPublications, defaultType = 'All Types', allowedTypes }: ArchiveHubProps) {
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState('All Topics');
  const [activeType, setActiveType] = useState(defaultType);
  
  const basePublications = allowedTypes 
    ? initialPublications.filter(p => allowedTypes.includes(p.type)) 
    : initialPublications;

  const [filtered, setFiltered] = useState<Publication[]>(basePublications);

  const topics = [
    'All Topics',
    'Tax Administration and Compliance',
    'Digital Governance',
    'Public Policy',
    'Governance and State Capacity',
    'Political Economy',
    'Development Economics',
    'Electoral Politics',
    'Migration and International Education',
    'Data Protection and UK GDPR',
    'Public Sector Data Analytics',
    'Financial Reporting and Economic Analysis',
    'Nigeria Governance Studies',
    'UK Policy and Administrative Reform'
  ];

  const predefinedTypes = ['Journal Articles', 'Working Papers / Preprints', 'Books / Handbooks', 'Articles & Essays'];
  const types = ['All Types', ...(allowedTypes || predefinedTypes)];

  useEffect(() => {
    let result = basePublications;

    if (activeTopic !== 'All Topics') {
      result = result.filter(p => p.topics.includes(activeTopic));
    }

    if (activeType !== 'All Types') {
      result = result.filter(p => p.type === activeType);
    }

    if (search.trim()) {
      const fuse = new Fuse(result, {
        keys: ['title', 'abstract', 'journal'],
        threshold: 0.3
      });
      result = fuse.search(search).map(r => r.item);
    }

    setFiltered(result);
  }, [search, activeTopic, activeType, allowedTypes, initialPublications]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexDirection: 'column' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by title, abstract or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '1.1rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={activeType} 
            onChange={(e) => setActiveType(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'white' }}
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select 
            value={activeTopic} 
            onChange={(e) => setActiveTopic(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'white' }}
          >
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filtered.map((pub) => (
          <div key={pub.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem' }}>
              {pub.type} • {pub.year}
            </div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
              <a href={`/${pub.slug}`}>{pub.title}</a>
            </h2>
            <p className="text-muted" style={{ fontSize: '0.95rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', flexGrow: 1 }}>
              {pub.abstract}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pub.topics.slice(0, 2).map(topic => (
                <span key={topic} style={{ padding: '0.2rem 0.6rem', background: '#F1F5F9', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h3>No publications found matching your criteria.</h3>
          <p className="text-muted">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}
