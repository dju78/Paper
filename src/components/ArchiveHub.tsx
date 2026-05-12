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
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  const toggleAbstract = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedAbstracts(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

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
    'UK Policy and Administrative Reform',
    'Making Tax Digital',
    'UK Fiscal Policy',
    'Tax Gap',
    'Behavioural Tax Compliance'
  ];

  const predefinedTypes = ['Journal Articles', 'Working Papers / Preprints', 'Books / Handbooks', 'Articles & Essays'];
  const types = ['All Types', ...(allowedTypes || predefinedTypes)];

  useEffect(() => {
    let result = basePublications;

    if (activeTopic !== 'All Topics') {
      result = result.filter(p => p.topics?.includes(activeTopic));
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
      <div style={{ marginBottom: '4rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input
            type="text"
            placeholder="Search by title, abstract or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem 1.25rem 3.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              fontSize: '1.1rem',
              outline: 'none',
              background: 'white',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.boxShadow = '0 0 0 4px rgba(180, 83, 9, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'var(--shadow-sm)';
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by:</span>
          <select 
            value={activeType} 
            onChange={(e) => setActiveType(e.target.value)}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border)', 
              background: activeType !== 'All Types' ? 'var(--primary)' : 'white',
              color: activeType !== 'All Types' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {types.map(t => <option key={t} value={t} style={{ color: 'black' }}>{t}</option>)}
          </select>

          <select 
            value={activeTopic} 
            onChange={(e) => setActiveTopic(e.target.value)}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border)', 
              background: activeTopic !== 'All Topics' ? 'var(--primary)' : 'white',
              color: activeTopic !== 'All Topics' ? 'white' : 'var(--text-main)',
              fontWeight: '600',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {topics.map(t => <option key={t} value={t} style={{ color: 'black' }}>{t}</option>)}
          </select>
          
          {(activeType !== 'All Types' || activeTopic !== 'All Topics' || search) && (
            <button 
              onClick={() => { setActiveType('All Types'); setActiveTopic('All Topics'); setSearch(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filtered.map((pub) => (
          <div key={pub.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem' }}>
                {pub.type} • {pub.year}
              </div>
              {pub.journal?.toLowerCase().includes('working draft') && (
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  background: 'var(--accent-light)', 
                  color: 'var(--accent)', 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Working Draft
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              <a href={`/${pub.slug}`}>{pub.title}</a>
            </h2>
            {(pub.journal || pub.doi || pub.external_url) && (
              <div style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                {pub.journal && (
                  <span style={{ fontStyle: 'italic' }}>
                    {pub.journal}
                    {(pub.volume || pub.issue) && `, ${pub.volume || ''}${pub.issue ? `(${pub.issue})` : ''}`}
                  </span>
                )}
                {pub.journal && (pub.doi || pub.external_url) && ' • '}
                {pub.doi ? (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>DOI: {pub.doi}</a>
                ) : pub.external_url ? (
                  <a href={pub.external_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>View Resource</a>
                ) : null}
              </div>
            )}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p className={`text-muted abstract-text ${expandedAbstracts[pub.slug] ? 'expanded' : ''}`}>
                {pub.abstract}
              </p>
              <button 
                className="mobile-only-toggle" 
                onClick={(e) => toggleAbstract(pub.slug, e)}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--text-muted)', fontSize: '0.85rem',
                  textDecoration: 'underline', cursor: 'pointer',
                  textAlign: 'left', marginBottom: '1rem',
                  alignSelf: 'flex-start'
                }}
              >
                {expandedAbstracts[pub.slug] ? 'Read less' : 'Read more'}
              </button>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pub.topics?.slice(0, 2).map(topic => (
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
