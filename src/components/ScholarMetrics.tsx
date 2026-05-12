"use client";

import React from 'react';
import metricsData from '../data/scholar_metrics.json';

export default function ScholarMetrics() {
  const stats = [
    { label: 'Total Citations', value: metricsData.citations, detail: 'Cumulative impact' },
    { label: 'h-index', value: metricsData.h_index, detail: 'Productivity & impact' },
    { label: 'i10-index', value: metricsData.i10_index, detail: 'Publications with 10+ citations' },
  ];

  return (
    <div style={{ marginBottom: '4rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ 
            padding: '1.5rem', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: idx === 0 ? '4px solid var(--accent)' : '1px solid var(--border)'
          }}>
            <div style={{ 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '0.75rem'
            }}>
              {stat.label}
            </div>
            <div style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              color: 'var(--primary)',
              lineHeight: 1,
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '0.75rem',
              letterSpacing: '-0.03em'
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)',
              fontWeight: 500
            }}>
              {stat.detail}
            </div>
          </div>
        ))}
      </div>
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: 'var(--text-muted)', 
        textAlign: 'right' 
      }}>
        Source: Google Scholar • Last updated: {metricsData.last_updated}
      </div>
    </div>
  );
}
