import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Bone,
  Brain,
  Baby,
  Users,
  Activity,
  Shield,
  Sparkles,
  ChevronRight,
  Stethoscope,
  Search,
  CheckCircle2
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
  const [activeCategory, setActiveCategory] = useState('ALL');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart size={26} color="#E11D48" />;
      case 'Bone': return <Bone size={26} color="#0E56A8" />;
      case 'Brain': return <Brain size={26} color="#8B5CF6" />;
      case 'Baby': return <Baby size={26} color="#00BFA5" />;
      case 'Users': return <Users size={26} color="#EC4899" />;
      case 'Activity': return <Activity size={26} color="#F59E0B" />;
      case 'Shield': return <Shield size={26} color="#10B981" />;
      case 'Sparkles': return <Sparkles size={26} color="#06B6D4" />;
      default: return <Stethoscope size={26} color="#0E56A8" />;
    }
  };

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.headDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.keyServices.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      activeCategory === 'ALL' ||
      (activeCategory === 'SURGICAL' && ['cardiology', 'orthopaedics', 'neurosciences'].includes(dept.id)) ||
      (activeCategory === 'WOMEN_CHILD' && ['pediatrics', 'gynaecology'].includes(dept.id)) ||
      (activeCategory === 'MEDICINE' && ['gastroenterology', 'oncology', 'nephrology'].includes(dept.id));

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="specialties" style={{
      padding: isSubpage ? '40px 0 80px 0' : '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="container">
        {/* Section Header (Only shown on Home Page) */}
        {!isSubpage ? (
          <div className="section-header">
            <div className="subheading">
              <Stethoscope size={16} />
              <span>CLINICAL EXPERTISE</span>
            </div>
            <h2>Centres of Excellence</h2>
            <p>
              Equipped with state-of-the-art diagnostic technology, hybrid surgical suites, and distinguished super-specialist clinicians.
            </p>
          </div>
        ) : (
          /* Interactive Search & Filter Toolbar on Specialties Page */
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
              {/* Search input */}
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

              {/* Department Count Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span>Showing <strong>{filteredDepartments.length}</strong> of {DEPARTMENTS.length} Clinical Centres</span>
              </div>
            </div>

            {/* Category Quick Filter Pills */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {[
                { label: 'All Centres', value: 'ALL' },
                { label: 'Surgical & Interventional', value: 'SURGICAL' },
                { label: 'Women & Child Health', value: 'WOMEN_CHILD' },
                { label: 'Medical Super-Specialties', value: 'MEDICINE' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    border: `1px solid ${activeCategory === cat.value ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: activeCategory === cat.value ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: activeCategory === cat.value ? '#FFFFFF' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Specialties Bento Grid */}
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
                padding: '28px',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/specialties/${dept.id}`)}
            >
              <div>
                {/* Header Icon + Name */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {getIcon(dept.icon)}
                  </div>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    backgroundColor: 'var(--primary-light)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    24/7 OPD
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '8px',
                  color: 'var(--dark-navy)'
                }}>
                  {dept.name}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginBottom: '16px'
                }}>
                  {dept.shortDesc}
                </p>

                {/* Key Services Pill Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '20px'
                }}>
                  {dept.keyServices.slice(0, 2).map((srv, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-main)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 500
                      }}
                    >
                      • {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Head Doctor & Action Link */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Led by
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                    fontWeight: 700,
                    fontSize: '0.85rem'
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
