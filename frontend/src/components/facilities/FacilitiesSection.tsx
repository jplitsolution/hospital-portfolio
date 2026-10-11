import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { FACILITIES, Facility } from '../../data/hospitalData';

interface Props {
  isSubpage?: boolean;
}

export const FacilitiesSection: React.FC<Props> = ({ isSubpage = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const navigate = useNavigate();

  const categories = [
    { label: 'All Facilities', value: 'ALL' },
    { label: 'Critical Care ICU', value: 'ICU' },
    { label: 'Modular OTs', value: 'OT' },
    { label: '3T MRI & Radiology', value: 'DIAGNOSTICS' },
    { label: 'Patient Suites', value: 'ROOMS' },
    { label: '24/7 Pharmacy', value: 'PHARMACY' },
  ];

  const filteredFacilities = FACILITIES.filter(
    (fac) => activeCategory === 'ALL' || fac.category === activeCategory
  );

  return (
    <section id="facilities" style={{
      padding: isSubpage ? '35px 0 80px 0' : '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="container">
        {/* Section Header (Only on Home Page) */}
        {!isSubpage && (
          <div className="section-header">
            <div className="subheading">
              <Building2 size={16} />
              <span>WORLD-CLASS INFRASTRUCTURE</span>
            </div>
            <h2>Hospital Facilities & Technology</h2>
            <p>
              Designed to international JCI and NABH standards with HEPA-filtered clean air, digital patient monitors, and advanced surgical equipment.
            </p>
          </div>
        )}

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 600,
                backgroundColor: activeCategory === cat.value ? 'var(--primary)' : 'var(--bg-surface)',
                color: activeCategory === cat.value ? '#FFFFFF' : 'var(--text-main)',
                border: `1px solid ${activeCategory === cat.value ? 'var(--primary)' : 'var(--border-subtle)'}`,
                boxShadow: activeCategory === cat.value ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }} className="facilities-grid">
          <style>{`
            @media (max-width: 1024px) {
              .facilities-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 640px) {
              .facilities-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bento-card"
              style={{
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/facilities/${fac.id}`)}
            >
              {/* Photo with Overlay Badge */}
              <div style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden'
              }}>
                <img
                  src={fac.imageUrl}
                  alt={fac.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(10, 37, 64, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {fac.category} UNIT
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                    {fac.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {fac.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {fac.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        <CheckCircle2 size={14} color="var(--secondary)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--primary)'
                }}>
                  <span>View Full Details & Specs</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
