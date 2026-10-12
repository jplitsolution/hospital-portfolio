import React from 'react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

export const TrustAndStats: React.FC = () => {
  const statItems = [
    { number: '450', suffix: '', label: 'Critical care beds' },
    { number: '70', suffix: '+', label: 'Specialist doctors' },
    { number: '25', suffix: '+', label: 'Years of care' },
    { number: '24×7', suffix: '', label: 'Emergency & ICU' },
  ];

  return (
    <section style={{
      padding: '44px 0',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Big-Number Strip matching Cloudnine & Bombay Hospital reference */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'center',
          textAlign: 'left'
        }} className="big-stats-strip">
          <style>{`
            @media (max-width: 900px) {
              .big-stats-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
              .stat-divider-col { border-right: none !important; border-bottom: 1px solid var(--border-subtle) !important; padding-bottom: 16px !important; }
            }
            @media (max-width: 480px) {
              .big-stats-strip { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {statItems.map((item, index) => (
            <div
              key={index}
              className="stat-divider-col"
              style={{
                padding: '12px 32px',
                borderRight: index < 3 ? '1.5px solid var(--border-subtle)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(2.6rem, 3.8vw, 3.6rem)',
                fontWeight: 800,
                color: 'var(--text-heading)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                display: 'flex',
                alignItems: 'baseline'
              }}>
                <span>[{item.number}]</span>
                {item.suffix && (
                  <span style={{ fontSize: '0.7em', color: 'var(--primary)', marginLeft: '2px' }}>
                    {item.suffix}
                  </span>
                )}
              </div>
              <div style={{
                fontSize: '0.96rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                marginTop: '8px',
                letterSpacing: '-0.01em'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
