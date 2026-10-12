import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Award,
  Globe,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, HOSPITAL_INFO } from '../data/hospitalData';

export const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = DOCTORS.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="subpage-wrapper" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Specialist Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            The doctor profile you are searching for does not exist or has been moved.
          </p>
          <Link to="/doctors" className="btn btn-primary">
            Back to Doctors Directory
          </Link>
        </div>
      </div>
    );
  }

  const department = DEPARTMENTS.find((d) => d.id === doctor.departmentId);
  const peerDoctors = DOCTORS.filter((d) => d.departmentId === doctor.departmentId && d.id !== doctor.id);

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
            <Link to="/doctors" style={{ color: 'var(--text-muted)' }}>
              Doctors
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
              {doctor.name}
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
          className="doctor-detail-layout"
        >
          <style>{`
            @media (max-width: 992px) {
              .doctor-detail-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Doctor Profile & Qualifications */}
          <div>
            {/* Header Hero Card */}
            <div className="bento-card" style={{ padding: '36px', marginBottom: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap'
                }}
              >
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
                  }}
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '24px',
                    objectFit: 'cover',
                    boxShadow: 'var(--shadow-md)',
                    border: '3px solid var(--bg-surface)'
                  }}
                />

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}
                  >
                    <Stethoscope size={14} />
                    <span>{doctor.departmentName}</span>
                  </div>

                  <h1 style={{ fontSize: '1.8rem', color: 'var(--dark-navy)', lineHeight: 1.25, marginBottom: '6px' }}>
                    {doctor.name}
                  </h1>

                  <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {doctor.designation}
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '14px' }}>
                    {doctor.qualifications}
                  </div>

                  {/* Rating & Experience Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} fill="#F59E0B" color="#F59E0B" />
                      <strong style={{ fontSize: '1rem', color: 'var(--dark-navy)' }}>{doctor.rating}</strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        ({doctor.reviewsCount} verified reviews)
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--text-main)'
                      }}
                    >
                      {doctor.experienceYears}+ Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Biography */}
            <div className="bento-card" style={{ padding: '32px', marginBottom: '28px' }}>
              <div className="subheading" style={{ marginBottom: '8px' }}>
                <Award size={16} />
                <span>EXPERT BACKGROUND</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '14px' }}>
                About {doctor.name}
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '24px' }}>
                {doctor.bio}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '12px' }}>
                Areas of Clinical Specialization:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {department?.keyServices.map((srv, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--secondary)" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>

              {/* Consultation Schedule Info */}
              <h4 style={{ fontSize: '1rem', color: 'var(--dark-navy)', marginBottom: '12px' }}>
                Available OPD Days:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {doctor.availableDays.map((day) => (
                  <span
                    key={day}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking CTA Box */}
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
                DIRECT CONSULTATION
              </span>

              <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)', marginBottom: '8px' }}>
                Schedule Consultation
              </h3>

              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>OPD Consultation Fee:</span>
                  <strong style={{ fontSize: '1.4rem', color: '#10B981' }}>₹{doctor.opdFee}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>OPD Cabin:</span>
                  <strong>{doctor.roomNumber}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Languages:</span>
                  <strong>{doctor.languages.join(', ')}</strong>
                </div>
              </div>

              {/* Direct Booking Route Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to={`/book-appointment?doctorId=${doctor.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem' }}
                >
                  <Calendar size={18} />
                  <span>Book Slot With {doctor.name.split(' ')[1]}</span>
                </Link>

                <a
                  href={`tel:${HOSPITAL_INFO.opdBoardline.replace(/[^0-9]/g, '')}`}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <PhoneCall size={16} />
                  <span>Call OPD: {HOSPITAL_INFO.opdBoardline}</span>
                </a>
              </div>
            </div>

            {/* Peer Doctors in this Department */}
            {peerDoctors.length > 0 && (
              <div className="bento-card" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                  Other {doctor.departmentName} Specialists
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {peerDoctors.map((pd) => (
                    <Link
                      key={pd.id}
                      to={`/doctors/${pd.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-subtle)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <img
                        src={pd.photoUrl}
                        alt={pd.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
                        }}
                        style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {pd.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Fee: ₹{pd.opdFee} • {pd.experienceYears}+ Yrs Exp
                        </div>
                      </div>
                      <ChevronRight size={16} color="var(--primary)" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
