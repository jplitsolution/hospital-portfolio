import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Calendar,
  PhoneCall,
  ShieldCheck,
  Activity,
  ArrowLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { FACILITIES, HOSPITAL_INFO } from '../data/hospitalData';

export const FacilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const facility = FACILITIES.find((f) => f.id === id);

  if (!facility) {
    return (
      <div className="subpage-wrapper" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Facility Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            The requested hospital facility could not be located.
          </p>
          <Link to="/facilities" className="btn btn-primary">
            Back to All Facilities
          </Link>
        </div>
      </div>
    );
  }

  // Related other facilities
  const otherFacilities = FACILITIES.filter((f) => f.id !== facility.id).slice(0, 3);

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
            <Link to="/facilities" style={{ color: 'var(--text-muted)' }}>
              Facilities
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
              {facility.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Detail Content */}
      <div className="container" style={{ marginTop: '36px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="facility-detail-layout"
        >
          <style>{`
            @media (max-width: 992px) {
              .facility-detail-layout { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left Column: Photo & Deep Specifications */}
          <div>
            {/* Main Facility Image Banner */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '28px',
                height: '420px'
              }}
            >
              <img
                src={facility.imageUrl}
                alt={facility.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(10, 37, 64, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em'
                }}
              >
                {facility.category} INFRASTRUCTURE
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(0, 191, 165, 0.9)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={16} />
                <span>NABH & JCI Certified Sterile Facility</span>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="bento-card" style={{ padding: '32px', marginBottom: '28px' }}>
              <div className="subheading" style={{ marginBottom: '8px' }}>
                <Building2 size={16} />
                <span>CLINICAL OVERVIEW</span>
              </div>
              <h1 style={{ fontSize: '1.9rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                {facility.title}
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '28px' }}>
                {facility.description}
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Key Technical & Clinical Capabilities:
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '14px',
                  marginBottom: '28px'
                }}
                className="capabilities-grid"
              >
                <style>{`
                  @media (max-width: 600px) {
                    .capabilities-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
                {facility.features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--secondary)" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Protocol Highlights */}
              <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-navy)', marginBottom: '14px' }}>
                Hygiene, Sterilization & Safety Protocols
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Continuous laminar air circulation with HEPA H14 filters delivering 99.997% bacterial filtration efficiency.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Activity size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Redundant uninterruptible power supply (UPS) backed by dual industrial generators for uninterrupted life support.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Users size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Round-the-clock intensivist, surgical registrar, and specialized biomedical nursing team on duty.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Desk & Booking Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Action Box */}
            <div
              className="bento-card"
              style={{
                padding: '32px',
                borderTop: '4px solid var(--primary)',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                DIRECT ADMISSION & OPD
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
                Facility Admission & Consultation
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
                Whether you require planned inpatient surgical admission, critical care transfer, or OPD specialist review, our 24/7 care coordination desk is ready.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <Link
                  to="/book-appointment"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Calendar size={16} />
                  <span>Book Doctor Appointment</span>
                </Link>

                <a
                  href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
                  className="btn btn-emergency"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <PhoneCall size={16} />
                  <span>24/7 Emergency: {HOSPITAL_INFO.emergencyNumber}</span>
                </a>

                <Link
                  to="/contact"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Admission Desk Enquiry</span>
                </Link>
              </div>

              {/* Quick Info Box */}
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
                  <span style={{ color: 'var(--text-muted)' }}>Operations:</span>
                  <strong>24 Hours, 365 Days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Visiting Hours:</span>
                  <strong>11 AM - 1 PM | 5 PM - 7 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Insurance TPA:</span>
                  <strong style={{ color: '#10B981' }}>100% Cashless Supported</strong>
                </div>
              </div>
            </div>

            {/* Other Facilities Widget */}
            <div className="bento-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Explore Other Facilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {otherFacilities.map((of) => (
                  <Link
                    key={of.id}
                    to={`/facilities/${of.id}`}
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
                      src={of.imageUrl}
                      alt={of.title}
                      style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          color: 'var(--dark-navy)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {of.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {of.category} Unit
                      </div>
                    </div>
                    <ChevronRight size={16} color="var(--primary)" />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link
                  to="/facilities"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                >
                  View All Facilities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
