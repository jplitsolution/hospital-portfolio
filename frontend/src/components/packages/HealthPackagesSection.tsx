import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, ChevronDown, ChevronUp, Sparkles, ChevronRight } from 'lucide-react';
import { HEALTH_PACKAGES, HealthPackage } from '../../data/hospitalData';

interface Props {
  onBookPackage?: (pkg: HealthPackage) => void;
  isSubpage?: boolean;
}

export const HealthPackagesSection: React.FC<Props> = ({ onBookPackage, isSubpage = false }) => {
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <section id="packages" style={{
      padding: isSubpage ? '35px 0 80px 0' : '80px 0',
      backgroundColor: 'var(--bg-surface)',
      borderTop: isSubpage ? 'none' : '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Preventive Health Checkup Packages Banner matching PDF Page 4 */}
        {!isSubpage ? (
          <div style={{
            backgroundColor: '#0C4A4E',
            borderRadius: '28px',
            padding: '36px 44px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-main)',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '8px'
              }}>
                Preventive health checkup packages
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
                maxWidth: '600px'
              }}>
                Comprehensive full body, cardiac, and senior citizen checkup packages starting from ₹2,499 with same-day digital reports.
              </p>
            </div>

            <Link
              to="/book-appointment"
              className="btn"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--primary)',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none'
              }}
            >
              <span>Book a checkup</span>
            </Link>
          </div>
        ) : (
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <h2>Executive Health Packages</h2>
            <p>Preventive testing packages with same-day reports.</p>
          </div>
        )}

        {/* Packages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="packages-grid">
          <style>{`
            @media (max-width: 1100px) {
              .packages-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 640px) {
              .packages-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {HEALTH_PACKAGES.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;
            const discountPercent = Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100);

            return (
              <div
                key={pkg.id}
                className="bento-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  borderTop: '3px solid var(--primary)'
                }}
              >
                <div>
                  {/* Discount Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {discountPercent}% SAVING
                    </span>

                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      <Clock size={12} />
                      <span>{pkg.fastingRequired ? '10h Fasting' : 'No Fasting'}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                    <Link to={`/packages/${pkg.id}`} style={{ color: 'inherit' }}>
                      {pkg.title}
                    </Link>
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ₹{pkg.discountedPrice.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      ({pkg.totalTests} Parameters)
                    </span>
                  </div>

                  {/* Included Tests Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                      Key Tests Included:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(isExpanded ? pkg.includedTests : pkg.includedTests.slice(0, 4)).map((t, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                          <Check size={13} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    {pkg.includedTests.length > 4 && (
                      <button
                        onClick={() => toggleExpand(pkg.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.78rem',
                          color: 'var(--primary)',
                          fontWeight: 700,
                          marginTop: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{isExpanded ? 'Show Less' : `View All ${pkg.includedTests.length} Tests`}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions: View Details & Book Package */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    <span>View Package Details</span>
                    <ChevronRight size={14} />
                  </Link>

                  <Link
                    to={`/book-appointment?packageId=${pkg.id}`}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.88rem', justifyContent: 'center' }}
                  >
                    Book Package
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
