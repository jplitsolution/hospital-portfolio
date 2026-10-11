import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { HEALTH_PACKAGES, HOSPITAL_INFO } from '../data/hospitalData';

export const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pkg = HEALTH_PACKAGES.find((p) => p.id === id || p.slug === id);

  if (!pkg) {
    return (
      <div className="subpage-wrapper" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Health Package Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            The requested diagnostic package could not be located.
          </p>
          <Link to="/packages" className="btn btn-primary">
            View All Health Packages
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100);
  const otherPackages = HEALTH_PACKAGES.filter((p) => p.id !== pkg.id);

  return (
    <div className="subpage-wrapper" style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb Header */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap'
            }}
          >
            <Link to="/" style={{ color: 'var(--text-muted)' }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/packages" style={{ color: 'var(--text-muted)' }}>
              Packages
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
              {pkg.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '36px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="pkg-detail-layout"
        >
          <style>{`
            @media (max-width: 992px) {
              .pkg-detail-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Package Inclusions & Preparation */}
          <div>
            <div className="bento-card" style={{ padding: '36px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-primary">
                  NABL ACCREDITED DIAGNOSTICS
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {discountPercent}% SAVINGS
                </span>
              </div>

              <h1 style={{ fontSize: '1.85rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                {pkg.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '24px' }}>
                {pkg.tagline}
              </p>

              {/* Price Banner */}
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  marginBottom: '28px'
                }}
              >
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{pkg.discountedPrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ₹{pkg.originalPrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: 'auto', fontWeight: 600 }}>
                  Includes {pkg.totalTests} Parameters
                </span>
              </div>

              {/* Included Investigations */}
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Tests & Investigations Included in Package:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {pkg.includedTests.map((test, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{test}</span>
                  </div>
                ))}
              </div>

              {/* Recommended For */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(14, 86, 168, 0.06)',
                  border: '1px solid rgba(14, 86, 168, 0.15)',
                  marginBottom: '28px'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                  RECOMMENDED TARGET GROUP:
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--dark-navy)', fontWeight: 600 }}>
                  {pkg.recommendedFor}
                </div>
              </div>

              {/* Fasting & Preparation */}
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '14px' }}>
                Fasting & Preparation Instructions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Clock size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {pkg.fastingRequired
                      ? '10-12 hours overnight fasting is required before sample collection. Plain water is permitted.'
                      : 'No special fasting is required for this package. Tests can be done at any time.'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <FileText size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Reports generated on the same evening and automatically dispatched via WhatsApp and available in our online report portal.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Booking Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              className="bento-card"
              style={{
                padding: '32px',
                borderTop: '4px solid var(--primary)',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                PREVENTIVE CHECKUP
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                Book This Health Package
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
                Book your package online for priority counter queuing and automated report tracking.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <Link
                  to={`/book-appointment?packageId=${pkg.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}
                >
                  <Calendar size={18} />
                  <span>Book Package Now (₹{pkg.discountedPrice})</span>
                </Link>

                <a
                  href={`tel:${HOSPITAL_INFO.opdBoardline.replace(/[^0-9]/g, '')}`}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <PhoneCall size={16} />
                  <span>Call Pathology Desk</span>
                </a>
              </div>

              {/* Inclusions Recap */}
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pathology Lab:</span>
                  <strong>NABL Accredited Auto-Analyzer</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Doctor Consultation:</span>
                  <strong style={{ color: '#10B981' }}>Included (Free)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Digital Report:</span>
                  <strong>Same-Day SMS & WhatsApp</strong>
                </div>
              </div>
            </div>

            {/* Other Packages */}
            <div className="bento-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Other Recommended Packages
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {otherPackages.map((op) => (
                  <Link
                    key={op.id}
                    to={`/packages/${op.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--dark-navy)' }}>
                        {op.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        ₹{op.discountedPrice} • {op.totalTests} Tests
                      </div>
                    </div>
                    <ChevronRight size={16} color="var(--primary)" />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link
                  to="/packages"
                  style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}
                >
                  View All Packages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
