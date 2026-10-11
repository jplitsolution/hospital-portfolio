import React from 'react';
import { Shield, Award, CheckCircle2, Users, Building, HeartHandshake, Bed } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

export const TrustAndStats: React.FC = () => {
  const stats = [
    { label: 'Specialist Doctors', value: HOSPITAL_INFO.stats.specialists, icon: <Users size={24} color="var(--primary)" /> },
    { label: 'Centres of Excellence', value: HOSPITAL_INFO.stats.departments, icon: <Building size={24} color="var(--secondary)" /> },
    { label: 'Lives Touched', value: HOSPITAL_INFO.stats.patientsServed, icon: <HeartHandshake size={24} color="#E11D48" /> },
    { label: 'Hospital Beds & ICU', value: HOSPITAL_INFO.stats.bedCount, icon: <Bed size={24} color="#8B5CF6" /> },
  ];

  const accreditations = [
    { code: 'NABH', title: 'NABH Accredited Hospital', subtitle: 'Highest National Standard of Patient Care' },
    { code: 'NABL', title: 'NABL Certified Diagnostic Lab', subtitle: 'Accurate & Automated Pathology Testing' },
    { code: 'JCI', title: 'JCI Standard Compliance', subtitle: 'International Benchmark for Clinical Safety' },
    { code: 'ISO', title: 'ISO 9001:2015 Quality Care', subtitle: 'Strict Infection Control Protocols' },
  ];

  return (
    <section style={{
      padding: '40px 0 60px 0',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Accreditation Strip */}
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '50px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--primary)" />
              <span style={{
                fontFamily: 'var(--font-main)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--dark-navy)'
              }}>
                Accreditations & Quality Certifications
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Verified Quality Benchmarks
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }} className="trust-grid">
            <style>{`
              @media (max-width: 900px) {
                .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 500px) {
                .trust-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {accreditations.map((item) => (
              <div key={item.code} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.code}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Statistics Counter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="stats-grid">
          <style>{`
            @media (max-width: 900px) {
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 480px) {
              .stats-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bento-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px'
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  color: 'var(--dark-navy)',
                  lineHeight: 1.1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  marginTop: '4px'
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
