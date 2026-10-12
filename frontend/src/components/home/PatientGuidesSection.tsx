import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, FileText, CheckCircle2, X } from 'lucide-react';
import { PATIENT_VISITOR_GUIDES, PatientGuideItem } from '../../data/hospitalData';

export const PatientGuidesSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<PatientGuideItem | null>(null);

  const accreditations = [
    { label: 'NABH Accredited', desc: 'National Quality Standards' },
    { label: 'NABL Certified Lab', desc: 'Pathology & Diagnostics' },
    { label: 'JCI Clinical Care', desc: 'Infection & Safety Protocols' },
    { label: '30+ Cashless TPA Panel', desc: 'Seamless Mediclaim Desk' },
  ];

  return (
    <section style={{
      padding: '76px 0',
      backgroundColor: 'var(--bg-page)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Recognitions & Accreditations strip matching PDF Page 4 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 32px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{
            fontSize: '0.94rem',
            fontWeight: 800,
            color: 'var(--text-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Award size={20} color="var(--primary)" />
            <span>Recognitions & accreditations</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {accreditations.map((acc, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-heading)'
                }}
              >
                <ShieldCheck size={16} color="var(--secondary)" />
                <span>{acc.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header: For patients & visitors matching PDF Page 4 */}
        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.02em',
            marginBottom: '8px'
          }}>
            For patients & visitors
          </h2>
          <p style={{
            fontSize: '1.02rem',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: 0
          }}>
            Everything a family needs to know before and during a stay.
          </p>
        </div>

        {/* 4 In-Patient Guide Cards Grid matching PDF Page 4 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="patient-guides-grid">
          <style>{`
            @media (max-width: 1024px) {
              .patient-guides-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 580px) {
              .patient-guides-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {PATIENT_VISITOR_GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '210px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  marginBottom: '10px'
                }}>
                  {guide.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  margin: 0
                }}>
                  {guide.summary}
                </p>
              </div>

              <div style={{
                paddingTop: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.88rem'
              }}>
                <span>Read more</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedGuide && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 37, 46, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedGuide(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              {selectedGuide.title} Guide
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {selectedGuide.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {selectedGuide.points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle2 size={18} color="var(--secondary)" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedGuide(null)}
              className="btn btn-dark-teal"
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-full)' }}
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
