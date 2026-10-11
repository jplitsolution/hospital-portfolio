import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Stethoscope, FileText, PhoneCall, ShieldCheck, Star, Activity, Clock, ArrowRight } from 'lucide-react';
import { HOSPITAL_INFO, DOCTORS } from '../../data/hospitalData';

interface Props {
  onOpenBooking: () => void;
  onOpenDoctorFinder: () => void;
  onOpenReports: () => void;
}

export const HeroBentoGrid: React.FC<Props> = ({
  onOpenBooking,
  onOpenDoctorFinder,
  onOpenReports
}) => {
  return (
    <section id="home" style={{
      padding: '40px 0 60px 0',
      background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-page) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Soft Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(14, 86, 168, 0.08) 0%, rgba(0, 191, 165, 0.04) 70%, transparent 100%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Top Hero Layout: Left Content + Right Bento Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '40px'
        }} className="hero-grid">
          <style>{`
            @media (max-width: 1024px) {
              .hero-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
            }
          `}</style>

          {/* Left Column: Hospital Tagline & Call-To-Action */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '20px',
              border: '1px solid rgba(14, 86, 168, 0.15)'
            }}>
              <ShieldCheck size={16} />
              <span>NABH & JCI ACCREDITED SUPERSPECIALITY CARE</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              color: 'var(--dark-navy)',
              lineHeight: 1.15
            }}>
              Your Health, <br />
              <span style={{
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Our Sacred Priority
              </span>
            </h1>

            <p style={{
              fontSize: '1.12rem',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              maxWidth: '540px',
              lineHeight: 1.6
            }}>
              Providing trusted, compassionate healthcare with India’s leading specialists, robotic-assisted surgical theatres, and 24/7 emergency trauma care.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}>
              <Link
                to="/book-appointment"
                className="btn btn-primary btn-lg"
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </Link>

              <button
                onClick={onOpenDoctorFinder}
                className="btn btn-outline btn-lg"
              >
                <Stethoscope size={18} color="var(--primary)" />
                <span>Find Doctor by Symptoms</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--secondary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>Zero Waiting Emergency ER</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>Cashless Mediclaim Approved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Bento Grid Showcase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '18px'
          }} className="bento-box-grid">
            <style>{`
              @media (max-width: 640px) {
                .bento-box-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* Bento Card 1: On-Duty Doctors Live Widget */}
            <div className="bento-card" style={{
              gridColumn: 'span 2',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--primary-light) 100%)',
              border: '1px solid rgba(14, 86, 168, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 10px #10B981'
                  }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                    OPD ACTIVE TODAY
                  </span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>45+ Specialists</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                Senior Consultants Available
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Cardiology, Orthopaedics, Neurology, and Maternal Specialists are currently on duty.
              </p>

              {/* Doctor Avatars Stack */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {DOCTORS.slice(0, 4).map((doc, idx) => (
                    <img
                      key={doc.id}
                      src={doc.photoUrl}
                      alt={doc.name}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '2px solid var(--bg-surface)',
                        marginLeft: idx === 0 ? 0 : '-10px',
                        objectFit: 'cover'
                      }}
                    />
                  ))}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '-10px',
                    border: '2px solid var(--bg-surface)'
                  }}>
                    +40
                  </div>
                </div>

                <Link
                  to="/book-appointment"
                  style={{
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Select Slot</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: 24/7 Ambulance Readiness */}
            <div className="bento-card" style={{
              backgroundColor: 'var(--bg-surface)',
              borderTop: '3px solid var(--emergency)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--emergency-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--emergency)',
                marginBottom: '12px'
              }}>
                <Activity size={20} />
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
                24/7 Ambulance
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                GPS-tracked mobile ICU units stationed across city corridors.
              </p>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--emergency)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <PhoneCall size={14} />
                <span>Call 108 / {HOSPITAL_INFO.emergencyNumber}</span>
              </div>
            </div>

            {/* Bento Card 3: Patient Trust & Ratings */}
            <div className="bento-card" style={{
              backgroundColor: 'var(--bg-surface)',
              borderTop: '3px solid var(--secondary)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--secondary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary-hover)',
                marginBottom: '12px'
              }}>
                <Star size={20} fill="var(--secondary)" />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-navy)' }}>4.8</span>
                <span style={{ fontSize: '0.82rem', color: '#F59E0B' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Based on 1,200+ verified Google Patient Reviews & Recovery stories.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Floating Dock (Below Hero) */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '16px 24px',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }} className="quick-dock">
          <style>{`
            @media (max-width: 900px) {
              .quick-dock { grid-template-columns: repeat(2, 1fr) !important; padding: 16px !important; }
            }
            @media (max-width: 480px) {
              .quick-dock { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Quick Action 1: Book Appointment */}
          <Link
            to="/book-appointment"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              background: 'var(--bg-subtle)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0
            }}>
              <Calendar size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Book Appointment</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Choose Doctor & Slot</div>
            </div>
          </Link>

          {/* Quick Action 2: Find a Doctor */}
          <div
            onClick={onOpenDoctorFinder}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              background: 'var(--bg-subtle)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--secondary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary-hover)',
              flexShrink: 0
            }}>
              <Stethoscope size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Find a Doctor</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Search by Symptoms</div>
            </div>
          </div>

          {/* Quick Action 3: Download Reports */}
          <div
            onClick={onOpenReports}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              background: 'var(--bg-subtle)'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3B82F6',
              flexShrink: 0
            }}>
              <FileText size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Download Reports</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Enter UHID or Mobile</div>
            </div>
          </div>

          {/* Quick Action 4: Emergency Contact */}
          <a
            href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
            className="hero-emergency-quick-action"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              transition: 'transform 0.2s'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--emergency)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              <PhoneCall size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--emergency)' }}>24/7 Emergency</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--emergency-hover)', fontWeight: 600 }}>{HOSPITAL_INFO.emergencyNumber}</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
