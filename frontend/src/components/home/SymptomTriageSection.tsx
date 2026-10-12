import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowUpRight, PhoneCall } from 'lucide-react';
import { SYMPTOMS_TRIAGE, HOSPITAL_INFO } from '../../data/hospitalData';

interface Props {
  onSelectDepartment?: (deptId: string) => void;
}

export const SymptomTriageSection: React.FC<Props> = ({ onSelectDepartment }) => {
  const navigate = useNavigate();

  const handleSymptomClick = (deptId: string) => {
    if (onSelectDepartment) {
      onSelectDepartment(deptId);
    }
    navigate(`/book-appointment?deptId=${deptId}`);
  };

  return (
    <section style={{
      padding: '72px 0',
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Header matching PDF Page 2 */}
        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.02em',
            marginBottom: '10px'
          }}>
            What are you feeling?
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '640px',
              margin: 0
            }}>
              Tap a symptom to find the right team. For severe symptoms, call emergency straight away.
            </p>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--coral)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={16} />
              <span>Call Emergency Hotline: {HOSPITAL_INFO.emergencyNumber}</span>
            </a>
          </div>
        </div>

        {/* 8 Symptom Cards Grid (4x2) matching Lilavati & Bombay Hospital reference in PDF */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }} className="symptom-triage-grid">
          <style>{`
            @media (max-width: 1024px) {
              .symptom-triage-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 540px) {
              .symptom-triage-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {SYMPTOMS_TRIAGE.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSymptomClick(item.departmentId)}
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 22px',
                border: '1.5px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
                e.currentTarget.style.borderColor = 'var(--coral)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top pulse line icon + arrow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  color: 'var(--coral)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Activity size={22} strokeWidth={2.5} />
                </div>
                <div style={{
                  color: 'var(--text-light)',
                  transition: 'transform 0.2s'
                }}>
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Symptom name & referred team */}
              <div>
                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  marginBottom: '6px',
                  lineHeight: 1.3
                }}>
                  {item.symptom}
                </h4>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--primary)'
                }}>
                  {item.team}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
