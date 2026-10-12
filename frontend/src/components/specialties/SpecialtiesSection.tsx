import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Search,
  CheckCircle2,
  Stethoscope,
  Activity
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/hospitalData';

interface Props {
  onSelectDepartment?: (deptId: string) => void;
  onOpenBookingForDept?: (deptId: string) => void;
  isSubpage?: boolean;
}

export const SpecialtiesSection: React.FC<Props> = ({ isSubpage = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('CRITICAL_CARE');

  // Showcase data corresponding to Bombay Hospital Indore reference in PDF
  const departmentShowcaseData: Record<string, {
    title: string;
    description: string;
    photoUrl: string;
    services: string[];
  }> = {
    CRITICAL_CARE: {
      title: 'Critical Care & Intensive Services',
      description: 'Dedicated 60-bed multi-disciplinary ICU with 1:1 nurse-to-patient ratio, advanced invasive mechanical ventilators, and round-the-clock intensivists.',
      photoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900',
      services: [
        'Medical ICU',
        'Surgical ICU',
        'Cardiac Care Unit (CCU)',
        'Neuro Critical Care',
        'Ventilator Support',
        'Dialysis & CRRT Unit'
      ]
    },
    EMERGENCY: {
      title: '24×7 Emergency & Trauma Resuscitation',
      description: 'Level-1 Emergency Trauma Care equipped with rapid triage, zero-wait triage bay, minor OT, and mobile ICU ambulance integration.',
      photoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
      services: [
        'Acute Cardiac Arrest STEMI Bay',
        'Acute Stroke Thrombolysis',
        'Polytrauma & Road Accident Care',
        'Toxicology & Poisoning ICU',
        'Dedicated Emergency Triage Bed',
        '24/7 Blood Bank & Crossmatch'
      ]
    },
    DIAGNOSTICS: {
      title: 'Advanced Diagnostic Imaging & Pathology',
      description: 'Whisper-quiet 3T MRI, 128-slice dual source CT, high-definition sonography, and fully computerized automated pathology testing.',
      photoUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900',
      services: [
        '3 Tesla Digital MRI',
        '128-Slice Cardiac CT Angio',
        'High-Resolution 4D Ultrasound',
        'Automated NABL Pathology Lab',
        'Digital Fluoroscopy & X-Ray',
        'Echocardiography & TMT'
      ]
    },
    SUPPORT: {
      title: 'Support Services & Therapeutic Care',
      description: 'Holistic clinical support ensuring rapid patient recovery, continuous pharmaceutical supply, and specialized rehabilitation.',
      photoUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=900',
      services: [
        '24/7 In-House Pharmacy',
        'Physiotherapy & Neuro Rehab',
        'Clinical Nutrition & Dietetics',
        'Medical Social Counselling',
        'Infection Control & CSSD',
        'Hemodialysis Daycare Suite'
      ]
    }
  };

  const activeShowcase = departmentShowcaseData[activeCategory] || departmentShowcaseData.CRITICAL_CARE;

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.headDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.keyServices.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <section id="specialties" style={{
      padding: isSubpage ? '40px 0 80px 0' : '72px 0 84px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="container">
        {/* Section Header matching PDF: Our Specialities & Services */}
        {!isSubpage ? (
          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              fontFamily: 'var(--font-main)',
              letterSpacing: '-0.02em',
              marginBottom: '10px'
            }}>
              Our Specialities & Services
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '650px',
              margin: '0 0 24px 0'
            }}>
              Choose a department to see what is available. Comprehensive clinical excellence across medical, surgical, and round-the-clock emergency care.
            </p>

            {/* Department Filter Tabs matching PDF: Critical Care, Emergency, Diagnostics, Support Services */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '32px'
            }}>
              {[
                { label: 'Critical Care', value: 'CRITICAL_CARE' },
                { label: 'Emergency', value: 'EMERGENCY' },
                { label: 'Diagnostics', value: 'DIAGNOSTICS' },
                { label: 'Support Services', value: 'SUPPORT' }
              ].map((tab) => {
                const isActive = activeCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveCategory(tab.value)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      border: `1.5px solid ${isActive ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface)',
                      color: isActive ? '#FFFFFF' : 'var(--text-main)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Interactive Search Toolbar on Specialties Subpage */
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 24px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                position: 'relative',
                flex: '1',
                minWidth: '280px',
                maxWidth: '520px'
              }}>
                <Search
                  size={18}
                  color="var(--text-light)"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  placeholder="Search department, procedure, doctor or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 46px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-subtle)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span>Showing <strong>{filteredDepartments.length}</strong> Clinical Centres</span>
              </div>
            </div>
          </div>
        )}

        {/* Reference: Bombay Hospital Indore - Interactive Department Showcase: Photo beside service list */}
        {!isSubpage && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.3fr',
            gap: '36px',
            alignItems: 'center',
            marginBottom: '48px'
          }} className="department-showcase-box">
            <style>{`
              @media (max-width: 900px) {
                .department-showcase-box { grid-template-columns: 1fr !important; gap: 24px !important; padding: 20px !important; }
              }
            `}</style>

            {/* Left: Department Photo matching PDF Page 2 */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              maxHeight: '320px',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <img
                src={activeShowcase.photoUrl}
                alt={activeShowcase.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(12, 74, 78, 0.85) 100%)',
                color: '#FFFFFF'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {activeShowcase.title}
                </div>
              </div>
            </div>

            {/* Right: Service list bullet grid matching PDF Page 2 */}
            <div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                DEPARTMENT CAPABILITIES
              </div>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-heading)',
                marginBottom: '12px'
              }}>
                {activeShowcase.title}
              </h3>
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                {activeShowcase.description}
              </p>

              {/* 2-Column Medical Unit Bullets */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px 20px'
              }}>
                {activeShowcase.services.map((srv, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--secondary)',
                      flexShrink: 0
                    }} />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section Title for Specialty Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
              Centres of Excellence
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Dedicated clinical departments with senior consultants and sub-specialists.
            </p>
          </div>
        </div>

        {/* Specialties Bento Grid with IMAGES INSTEAD OF ICONS (as specifically requested by user) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="specialties-grid">
          <style>{`
            @media (max-width: 1024px) {
              .specialties-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 640px) {
              .specialties-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bento-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onClick={() => navigate(`/specialties/${dept.id}`)}
            >
              <div>
                {/* Header: DEPARTMENT IMAGE REPLACES THE ICON (as in user screenshot) + 24/7 OPD Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  {/* Real Medical Image instead of Icon */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(12, 74, 78, 0.12)',
                    border: '1.5px solid var(--border-subtle)',
                    flexShrink: 0
                  }}>
                    <img
                      src={dept.imageUrl}
                      alt={dept.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* 24/7 OPD pill */}
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--primary-light)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    24/7 OPD
                  </span>
                </div>

                {/* Department Name */}
                <h3 style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  marginBottom: '8px',
                  color: 'var(--text-heading)',
                  lineHeight: 1.3
                }}>
                  {dept.name}
                </h3>

                {/* Short Description */}
                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginBottom: '16px'
                }}>
                  {dept.shortDesc}
                </p>

                {/* Key Services Pill Tags */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginBottom: '20px'
                }}>
                  {dept.keyServices.slice(0, 2).map((srv, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.78rem',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-main)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 500,
                        display: 'inline-block'
                      }}
                    >
                      • {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Head Doctor & Action Link matching user screenshot */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700 }}>
                    LED BY
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {dept.headDoctor}
                  </div>
                </div>

                <Link
                  to={`/book-appointment?deptId=${dept.id}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--primary)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textDecoration: 'none'
                  }}
                >
                  <span>Book</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
