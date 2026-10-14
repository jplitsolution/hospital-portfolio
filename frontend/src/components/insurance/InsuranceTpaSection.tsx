import React from 'react';
import { ShieldCheck, PhoneCall, FileCheck, CheckCircle } from 'lucide-react';
import { INSURANCE_PARTNERS, HOSPITAL_INFO } from '../../data/hospitalData';

export const InsuranceTpaSection: React.FC = () => {
  return (
    <section style={{
      padding: '70px 0',
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.8fr',
          gap: '40px',
          alignItems: 'center'
        }} className="insurance-grid">
          <style>{`
            @media (max-width: 900px) {
              .insurance-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Info Column */}
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={14} />
              <span>HASSLE-FREE MEDICLAIM</span>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--dark-navy)' }}>
              100% Cashless Mediclaim & TPA Network
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              We partner with all major private and government insurance providers to ensure immediate, zero-advance cashless hospital admissions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                <CheckCircle size={16} color="var(--secondary)" />
                <span>Dedicated 24/7 TPA Helpdesk (Ground Floor, Room 10)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                <CheckCircle size={16} color="var(--secondary)" />
                <span>Pre-Authorization clearance within 60 minutes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                <CheckCircle size={16} color="var(--secondary)" />
                <span>Empanelled for Ayushman Bharat (PM-JAY) & CGHS</span>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.88rem'
            }}>
              <a
                href={`tel:${HOSPITAL_INFO.opdBoardline.replace(/[^0-9]/g, '')}`}
                style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PhoneCall size={18} color="var(--primary)" />
                <span>TPA Desk Helpline: <strong>{HOSPITAL_INFO.opdBoardline}</strong></span>
              </a>
            </div>
          </div>

          {/* Right Partner Logos Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px'
          }} className="tpa-badges-grid">
            <style>{`
              @media (max-width: 600px) {
                .tpa-badges-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
            `}</style>
            {INSURANCE_PARTNERS.map((partner, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--dark-navy)',
                  minHeight: '80px',
                  transition: 'all 0.2s'
                }}
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
