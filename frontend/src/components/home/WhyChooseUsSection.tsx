import React from 'react';
import { Check } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../../data/hospitalData';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-page)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '52px',
          alignItems: 'center'
        }} className="why-choose-grid">
          <style>{`
            @media (max-width: 960px) {
              .why-choose-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
            }
          `}</style>

          {/* Left Column: High-Resolution Photo of Doctors & Nurses at Patient Bedside matching PDF Page 2 */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '28px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-subtle)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000"
                alt="Doctors and nurses at a patient bedside providing compassionate critical care"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Experience Stamp */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '24px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 22px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'var(--primary)',
                lineHeight: 1
              }}>
                1:1
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                Nurse to Patient <br /> Critical Care Ratio
              </div>
            </div>
          </div>

          {/* Right Column: Why Families Choose Gaikwad Checklist matching PDF Page 2 & 3 */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              fontFamily: 'var(--font-main)',
              letterSpacing: '-0.02em',
              marginBottom: '32px'
            }}>
              Why families choose Gaikwad
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {WHY_CHOOSE_US_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  {/* Teal circle checkmark matching PDF */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--secondary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                  }}>
                    <Check size={18} strokeWidth={3} />
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.12rem',
                      fontWeight: 800,
                      color: 'var(--text-heading)',
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
