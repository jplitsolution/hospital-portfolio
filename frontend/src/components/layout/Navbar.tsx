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
    { label: 'Home', path: '/' },
    { label: 'Specialties', path: '/specialties' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Health Packages', path: '/packages' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="hospital-navbar">
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="navbar-logo-icon">
            <Plus size={28} strokeWidth={3} />
          </div>
          <div>
            <div className="navbar-brand-name">
              <span className="brand-name-aura">Aura</span>
              <span className="brand-name-care">Care</span>
            </div>
            <div className="brand-sub-tag">
              Superspeciality Hospital
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav { display: flex !important; align-items: center; gap: clamp(10px, 1.4vw, 22px) !important; }
              .desktop-actions { display: flex !important; align-items: center; gap: 10px !important; }
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
          >
            <FileText size={15} />
            <span>Reports</span>
          </button>

          <Link
            to="/book-appointment"
            className="btn btn-primary btn-sm navbar-book-btn"
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
