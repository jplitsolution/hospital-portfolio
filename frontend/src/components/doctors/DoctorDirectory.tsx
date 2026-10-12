import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Calendar, MapPin, Stethoscope, Award } from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor } from '../../data/hospitalData';

interface Props {
  onBookDoctor?: (doctor: Doctor) => void;
  selectedDeptFilter?: string;
  isSubpage?: boolean;
}

export const DoctorDirectory: React.FC<Props> = ({
  onBookDoctor,
  selectedDeptFilter,
  isSubpage = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState<string>(selectedDeptFilter || 'ALL');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = activeDept === 'ALL' || doc.departmentId === activeDept;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesSearch;
  });

  return (
    <section id="doctors" style={{
      padding: isSubpage ? '30px 0 80px 0' : '80px 0',
      backgroundColor: 'var(--bg-surface)',
      borderTop: isSubpage ? 'none' : '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Header (Only on Home Page) matching PDF Page 3 */}
        {!isSubpage && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 800,
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-main)',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Meet our doctors
              </h2>
              <p style={{
                fontSize: '1.02rem',
                color: 'var(--text-muted)',
                marginTop: '6px',
                marginBottom: 0
              }}>
                Dedicated team of critical care specialists, surgeons, and physicians available 24×7.
              </p>
            </div>
            <Link
              to="/doctors"
              style={{
                fontSize: '0.98rem',
                fontWeight: 700,
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <span>View all doctors</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            width: '100%'
          }}>
            <Search
              size={18}
              color="var(--text-light)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search doctor by name, qualification, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Department Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '6px'
          }}>
            <button
              onClick={() => setActiveDept('ALL')}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                backgroundColor: activeDept === 'ALL' ? 'var(--primary)' : 'var(--bg-surface)',
                color: activeDept === 'ALL' ? '#FFFFFF' : 'var(--text-main)',
                border: `1px solid ${activeDept === 'ALL' ? 'var(--primary)' : 'var(--border-subtle)'}`
              }}
            >
              All Specialists ({DOCTORS.length})
            </button>

            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  backgroundColor: activeDept === dept.id ? 'var(--primary)' : 'var(--bg-surface)',
                  color: activeDept === dept.id ? '#FFFFFF' : 'var(--text-main)',
                  border: `1px solid ${activeDept === dept.id ? 'var(--primary)' : 'var(--border-subtle)'}`
                }}
              >
                {dept.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-muted)'
          }}>
            <Stethoscope size={40} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
            <h3>No specialist found matching your search.</h3>
            <p>Try searching with a different doctor name or clear your filters.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }} className="doctors-grid">
            <style>{`
              @media (max-width: 1024px) {
                .doctors-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 680px) {
                .doctors-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bento-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Doctor Profile Header */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Link to={`/doctors/${doc.id}`} style={{ display: 'block', flexShrink: 0 }}>
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
                        }}
                        style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '20px',
                          objectFit: 'cover',
                          boxShadow: 'var(--shadow-sm)',
                          cursor: 'pointer'
                        }}
                      />
                    </Link>
                    <div style={{ flex: 1 }}>
                      <Link
                        to={`/specialties/${doc.departmentId}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--primary)',
                          backgroundColor: 'var(--primary-light)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: '6px'
                        }}
                      >
                        {doc.departmentName}
                      </Link>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-navy)', lineHeight: 1.25 }}>
                        <Link to={`/doctors/${doc.id}`} style={{ color: 'inherit' }}>
                          {doc.name}
                        </Link>
                      </h3>

                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                        lineHeight: 1.3
                      }}>
                        {doc.designation}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Credentials & Badges */}
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    fontSize: '0.82rem',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Qualification:</span>
                      <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{doc.qualifications}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Experience:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{doc.experienceYears}+ Years</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>OPD Fee:</span>
                      <strong style={{ color: '#10B981', fontSize: '0.9rem' }}>₹{doc.opdFee}</strong>
                    </div>
                  </div>

                  {/* OPD Room & Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="var(--primary)" />
                      <span>{doc.roomNumber.split('(')[0]}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <strong style={{ color: 'var(--dark-navy)' }}>{doc.rating}</strong>
                      <span>({doc.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: View Bio page & Book Slot on separate page */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.3fr',
                  gap: '10px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <Link
                    to={`/doctors/${doc.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    View Bio
                  </Link>

                  <Link
                    to={`/book-appointment?doctorId=${doc.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    <Calendar size={14} />
                    <span>Book Slot</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
