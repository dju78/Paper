'use client';

import { useState } from 'react';

interface CitationSectionProps {
  citation_apa?: string;
  citation_bibtex?: string;
  journal?: string;
}

export default function CitationSection({ citation_apa, citation_bibtex, journal }: CitationSectionProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'apa' | 'bib'>('idle');

  const copyToClipboard = (text: string, type: 'apa' | 'bib') => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Cite this work</h3>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          onClick={() => copyToClipboard(citation_apa || '', 'apa')}
          className="btn btn-outline" 
          style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}
        >
          {copyStatus === 'apa' ? 'Copied APA!' : 'Copy APA Citation'}
        </button>
        <button 
          onClick={() => copyToClipboard(citation_bibtex || '', 'bib')}
          className="btn btn-outline" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
        >
          {copyStatus === 'bib' ? 'Copied BibTeX!' : 'Copy BibTeX'}
        </button>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong>Published in:</strong><br />
          {journal || 'Research Paper'}
        </p>
      </div>
    </div>
  );
}
