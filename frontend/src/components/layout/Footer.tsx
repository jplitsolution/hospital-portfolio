import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, PhoneCall } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#082C35',
      color: '#FFFFFF',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        {/* Main Footer Grid matching PDF Page 5 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: '40px',
          marginBottom: '50px'
        }} className="footer-grid">
          <style>{`
            @media (max-width: 1024px) {
              .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
            }
            @media (max-width: 600px) {
              .footer-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Column 1: Gaikwad Critical Care Hospital branding matching PDF */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px', textDecoration: 'none' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Plus size={22} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Gaikwad
              </span>
            </Link>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Advanced Critical Care Facility
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.6,
              marginBottom: '10px',
              maxWidth: '320px'
            }}>
              24×7 ICU & Emergency Care with experienced intensivists and modern life-support systems.
            </p>

            <div style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '14px', lineHeight: 1.5 }}>
              📍 Reshim Bagh, Nagpur<br />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>Plot No. 31, Sakkardara Square, Umrer Rd</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              Instagram: <br />
              <strong style={{ color: 'var(--secondary)' }}>@gaikwad_critical_care_hospital</strong>
            </div>
          </div>

          {/* Column 2: Quick links matching PDF Page 5 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              marginBottom: '18px'
            }}>
              Quick links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <Link to="/doctors" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Find a Doctor
              </Link>
              <Link to="/specialties" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Specialities
              </Link>
              <Link to="/packages" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Health Checkups
              </Link>
              <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Column 3: Patients matching PDF Page 5 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              marginBottom: '18px'
            }}>
              Patients
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <Link to="/facilities" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Admission
              </Link>
              <Link to="/facilities" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Billing
              </Link>
              <Link to="/#insurance" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Insurance
              </Link>
              <Link to="/facilities" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
                Visiting Hours
              </Link>
            </div>
          </div>

          {/* Column 4: Emergency with Call now button matching PDF Page 5 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              marginBottom: '18px'
            }}>
              24×7 Emergency & ICU
            </h4>

            <div style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--coral-light)',
              marginBottom: '4px'
            }}>
              {HOSPITAL_INFO.emergencyNumber}
            </div>

            <div style={{
              fontSize: '0.86rem',
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: '16px'
            }}>
              24×7, every day • Reshim Bagh, Nagpur
            </div>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
              className="btn btn-coral"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={16} />
              <span>Call: 0712 274 0741</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar matching PDF */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <div>
            © 2026 Gaikwad Critical Care Hospital. All rights reserved.
          </div>
          <div>
            NABH Accredited & 100% Cashless Mediclaim Partner
          </div>
        </div>
      </div>
    </footer>
  );
};
