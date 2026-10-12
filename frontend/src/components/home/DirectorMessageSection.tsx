import React from 'react';
import { DIRECTOR_INFO } from '../../data/hospitalData';

export const DirectorMessageSection: React.FC = () => {
  return (
    <section style={{
      padding: '76px 0',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Dark Slate Teal Container matching PDF Page 3 */}
        <div style={{
          backgroundColor: '#0C3844',
          borderRadius: '32px',
          padding: '48px',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '48px',
          alignItems: 'center',
          boxShadow: '0 20px 48px rgba(8, 44, 53, 0.25)',
          overflow: 'hidden',
          position: 'relative'
        }} className="director-message-box">
          <style>{`
            @media (max-width: 960px) {
              .director-message-box { grid-template-columns: 1fr !important; gap: 32px !important; padding: 28px !important; }
            }
          `}</style>

          {/* Left Column: Portrait photo of Director / Founder matching PDF Page 3 */}
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '3/4',
            maxHeight: '440px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.12)'
          }}>
            <img
              src={DIRECTOR_INFO.photoUrl}
              alt={DIRECTOR_INFO.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=900';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 60%, rgba(8, 44, 53, 0.85) 100%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px'
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                {DIRECTOR_INFO.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {DIRECTOR_INFO.designation}
              </div>
            </div>
          </div>

          {/* Right Column: Message matching PDF Page 3 */}
          <div>
            <div style={{
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              marginBottom: '14px',
              fontFamily: 'var(--font-main)'
            }}>
              MESSAGE FROM THE DIRECTOR
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: 'var(--font-main)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}>
              {DIRECTOR_INFO.title}
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.88)',
              marginBottom: '32px'
            }}>
              {DIRECTOR_INFO.paragraphs.map((p, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature & Credentials */}
            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '4px'
              }}>
                {DIRECTOR_INFO.name}
              </div>
              <div style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 500
              }}>
                {DIRECTOR_INFO.qualifications} · {DIRECTOR_INFO.designation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
