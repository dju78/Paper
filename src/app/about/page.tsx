import React from 'react';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="display-large" style={{ marginBottom: '2rem' }}>About Joseph Omoyele Daramola</h1>
        
        <section style={{ marginBottom: '4rem' }}>
          <p className="lead" style={{ marginBottom: '1.5rem' }}>
            Joseph Omoyele Daramola is a distinguished <strong>Economist and Senior Data Analyst</strong> with over 15 years of professional experience spanning regulatory compliance, applied econometrics, and digital governance.
          </p>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
            Currently serving as a Lead Consultant at Univelcity Consulting (UK), Joseph leverages advanced data analytics and economic modeling to provide strategic policy recommendations and regulatory frameworks. His career is characterized by a deep integration of data-driven insights with complex public sector challenges, particularly in the areas of tax administration and electoral participation.
          </p>
          <p style={{ lineHeight: '1.8' }}>
            His expertise lies at the intersection of <strong>Social Institutions and Economic Performance</strong>, exploring how digital identification infrastructure and behavioural distortions influence state capacity and citizen engagement.
          </p>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 className="title-medium" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Research & Policy Interests</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Digital Governance</h3>
              <p className="text-muted">Interoperability of identity systems, digital tax administration, and the evolution of the "Making Tax Digital" regime.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Political Economy</h3>
              <p className="text-muted">State capacity in emerging economies, administrative barriers in voting, and the institutional role of religion.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Applied Econometrics</h3>
              <p className="text-muted">NARDL frameworks, wavelet coherence analysis, and time-frequency effects in macroeconomic dynamics.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Climate Policy</h3>
              <p className="text-muted">The fiscal and economic implications of carbon taxation within the UK’s net-zero transition goals.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 className="title-medium" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Academic & Publication Highlights</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <strong>Digital Transformation:</strong> Published research on behavioural reporting noise under the UK's "Making Tax Digital" regime (WJARR, 2026).
            </li>
            <li style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <strong>Institutional Analysis:</strong> Seminal work on religion as an economic institution and its impact on long-run development.
            </li>
            <li style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <strong>Electoral Policy:</strong> Empirical evidence on administrative barriers to participation in recent presidential elections.
            </li>
          </ul>
        </section>

        <section style={{ background: 'var(--bg-accent)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h2 className="title-medium" style={{ marginBottom: '1.5rem' }}>Contact & Connectivity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Email:</span>
              <a href="mailto:1978dju@gmail.com" style={{ color: 'var(--primary)', fontWeight: '500' }}>1978dju@gmail.com</a>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Portfolio:</span>
              <a href="https://daramolajo.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '500' }}>daramolajo.co.uk</a>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: 'var(--text-muted)' }}>ORCID:</span>
              <span style={{ fontWeight: '500' }}>0000-0003-3177-8051</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
