import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Bone,
  Brain,
  Baby,
  Users,
  Activity,
  Shield,
  Sparkles,
  Stethoscope,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Star,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';

export const SpecialtyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const department = DEPARTMENTS.find((d) => d.id === id || d.slug === id);

  if (!department) {
    return (
      <div className="subpage-wrapper" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Department Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            The requested medical specialty could not be found.
          </p>
          <Link to="/specialties" className="btn btn-primary">
            View All Specialties
          </Link>
        </div>
      </div>
    );
  }

  const deptDoctors = DOCTORS.filter((d) => d.departmentId === department.id);
  const otherDepts = DEPARTMENTS.filter((d) => d.id !== department.id).slice(0, 4);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart size={32} color="#E11D48" />;
      case 'Bone': return <Bone size={32} color="#0E56A8" />;
      case 'Brain': return <Brain size={32} color="#8B5CF6" />;
      case 'Baby': return <Baby size={32} color="#00BFA5" />;
      case 'Users': return <Users size={32} color="#EC4899" />;
      case 'Activity': return <Activity size={32} color="#F59E0B" />;
      case 'Shield': return <Shield size={32} color="#10B981" />;
      case 'Sparkles': return <Sparkles size={32} color="#06B6D4" />;
      default: return <Stethoscope size={32} color="#0E56A8" />;
    }
  };

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
            <Link to="/specialties" style={{ color: 'var(--text-muted)' }}>
              Specialties
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
              {department.name}
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
          className="dept-detail-layout"
        >
          <style>{`
            @media (max-width: 992px) {
              .dept-detail-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Department Overview & Doctors */}
          <div>
            {/* Header Banner */}
            <div className="bento-card" style={{ padding: '36px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {getIcon(department.icon)}
                </div>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
                    CENTRE OF CLINICAL EXCELLENCE
                  </span>
                  <h1 style={{ fontSize: '1.8rem', color: 'var(--dark-navy)' }}>
                    {department.name}
                  </h1>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '24px' }}>
                {department.fullDesc}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Department Chairperson & Lead
                  </div>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                    {department.headDoctor}
                  </strong>
                </div>

                <Link
                  to={`/book-appointment?deptId=${department.id}`}
                  className="btn btn-primary btn-sm"
                >
                  <Calendar size={15} />
                  <span>Book in this Department</span>
                </Link>
              </div>
            </div>

            {/* Key Clinical Procedures */}
            <div className="bento-card" style={{ padding: '32px', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Key Procedures & Diagnostic Services:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {department.keyServices.map((srv, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text-main)'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--secondary)" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>

              {/* Symptoms Treated */}
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '14px' }}>
                Conditions & Symptoms Treated:
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {department.symptoms.map((sym, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      color: 'var(--text-main)',
                      fontWeight: 500
                    }}
                  >
                    • {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Department Specialists */}
            <div className="bento-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '20px' }}>
                Consultants in {department.name} ({deptDoctors.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {deptDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      padding: '18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                          {doc.name}
                        </strong>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {doc.designation} • {doc.experienceYears}+ Yrs Exp
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>
                          OPD Fee: ₹{doc.opdFee} • {doc.roomNumber.split('(')[0]}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`/doctors/${doc.id}`} className="btn btn-outline btn-sm">
                        View Bio
                      </Link>
                      <Link to={`/book-appointment?doctorId=${doc.id}`} className="btn btn-primary btn-sm">
                        <Calendar size={14} />
                        <span>Book Slot</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Fast Booking & Other Specialties */}
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
                ONLINE CONSULTATION
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
                Book Appointment
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
                Book an in-person clinic visit with specialists under {department.name}. Same-day slots and emergency consultations available.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to={`/book-appointment?deptId=${department.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Calendar size={18} />
                  <span>Book in {department.name.split('&')[0]}</span>
                </Link>

                <a
                  href={`tel:${HOSPITAL_INFO.opdBoardline.replace(/[^0-9]/g, '')}`}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>OPD Boardline: {HOSPITAL_INFO.opdBoardline}</span>
                </a>
              </div>
            </div>

            {/* Other Departments */}
            <div className="bento-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Other Clinical Specialties
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {otherDepts.map((od) => (
                  <Link
                    key={od.id}
                    to={`/specialties/${od.id}`}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{od.name}</span>
                    <ChevronRight size={16} color="var(--primary)" />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link
                  to="/specialties"
                  style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}
                >
                  View All Specialties →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
