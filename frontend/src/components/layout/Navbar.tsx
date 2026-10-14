import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Calendar, Plus, PhoneCall } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

interface Props {
  onOpenBooking: () => void;
  onOpenReports: () => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenBooking,
  onOpenReports
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Find a Doctor', path: '/doctors' },
    { label: 'Specialities', path: '/specialties' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Health Packages', path: '/packages' },
    { label: 'Insurance', path: '/#insurance' },
    { label: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header className="hospital-navbar">
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        gap: '20px'
      }}>
        {/* Brand Logo - Gaikwad Critical Care Hospital */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'var(--secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
            flexShrink: 0
          }}>
            <Plus size={26} strokeWidth={3.5} />
          </div>
          <div>
            <div style={{
              fontSize: '1.24rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--primary)'
            }}>
              Gaikwad
            </div>
            <div style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}>
              Critical Care Hospital
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav { 
                display: flex !important; 
                align-items: center; 
                gap: clamp(10px, 1.4vw, 22px) !important; 
                flex-shrink: 1;
              }
              .desktop-actions { 
                display: flex !important; 
                align-items: center; 
                gap: 12px !important; 
                flex-shrink: 0;
              }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`nav-link-item ${active ? 'active' : ''}`}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--primary)' : 'var(--text-main)',
                  textDecoration: 'none',
                  padding: '6px 2px'
                }}
              >
                {link.label}
                {active && <span className="nav-active-pill" />}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="desktop-actions" style={{ display: 'none' }}>
          <button
            onClick={onOpenReports}
            className="btn btn-outline btn-sm navbar-reports-btn"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <FileText size={15} />
            <span>Reports</span>
          </button>

          <Link
            to="/book-appointment"
            className="btn btn-coral btn-sm navbar-book-btn"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 20px', fontSize: '0.88rem' }}
          >
            <Calendar size={15} />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            padding: '8px',
            color: 'inherit',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)'
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-menu" style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-md)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link-item ${active ? 'active' : ''}`}
                style={{
                  fontSize: '1rem',
                  fontWeight: active ? 700 : 600,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.label}</span>
                {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
              </Link>
            );
          })}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReports();
              }}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              <FileText size={16} />
              <span>Download Lab Reports</span>
            </button>

            <Link
              to="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Calendar size={16} />
              <span>Book Appointment Wizard</span>
            </Link>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
              className="btn btn-emergency"
              style={{ width: '100%' }}
            >
              <PhoneCall size={16} />
              <span>Call Emergency: {HOSPITAL_INFO.emergencyNumber}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
