import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShieldCheck } from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../../data/hospitalData';

export const Footer: React.FC = () => {
  return (
    <footer className="hospital-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: '40px',
          marginBottom: '50px'
        }} className="footer-grid">
          <style>{`
            @media (max-width: 1024px) {
              .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .footer-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Column 1: Hospital Brand & Accreditation */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div className="footer-logo-icon">
                <Plus size={24} strokeWidth={3} />
              </div>
              <span className="footer-brand-title">
                <span className="footer-brand-aura">Aura</span>
                <span className="footer-brand-care">Care</span>
              </span>
            </Link>

            <p className="footer-desc">
              {HOSPITAL_INFO.description}
            </p>

            <div className="footer-accreditation-badge">
              <ShieldCheck size={14} className="accreditation-icon" />
              <span>NABH & JCI Accredited Hospital</span>
            </div>
          </div>

          {/* Column 2: Clinical Specialties */}
          <div>
            <h4 className="footer-column-heading">
              Centres of Excellence
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <Link
                  key={dept.id}
                  to="/specialties"
                  className="footer-link"
                >
                  • {dept.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Patient Services */}
          <div>
            <h4 className="footer-column-heading">
              Patient Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link to="/doctors" className="footer-link">Find a Doctor</Link>
              <Link to="/packages" className="footer-link">Health Checkup Packages</Link>
              <Link to="/facilities" className="footer-link">Hospital Facilities & ICU</Link>
              <Link to="/testimonials" className="footer-link">Patient Success Stories</Link>
              <Link to="/contact" className="footer-link">Contact & Location</Link>
            </div>
          </div>

          {/* Column 4: 24/7 Contacts */}
          <div>
            <h4 className="footer-column-heading">
              Emergency & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <div className="footer-emergency-title">
                  24/7 Emergency Helpline:
                </div>
                <div className="footer-emergency-number">
                  {HOSPITAL_INFO.emergencyNumber}
                </div>
              </div>

              <div>
                <div className="footer-muted-text">Ambulance Dispatch:</div>
                <div className="footer-ambulance-number">{HOSPITAL_INFO.ambulanceNumber}</div>
              </div>

              <div>
                <div className="footer-muted-text">Campus Address:</div>
                <div className="footer-address-text">{HOSPITAL_INFO.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Compliance & Disclaimers */}
        <div className="footer-bottom-bar">
          <div>
            © 2026 {HOSPITAL_INFO.name}. All Rights Reserved. | Registration No: HOSP/ND/2026/8901
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>Bio-Medical Waste (BMW) Compliance</span>
            <span>NPPA Implant Pricing Transparency</span>
            <span>Privacy Policy</span>
            <span>Terms of Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
