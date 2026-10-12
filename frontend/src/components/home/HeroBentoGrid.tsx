import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Stethoscope, 
  PhoneCall, 
  Activity, 
  User, 
  Heart, 
  Video, 
  CreditCard,
  X,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [uhid, setUhid] = useState('');

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uhid) return;
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPaymentModal(false);
      setUhid('');
    }, 2500);
  };

  return (
    <section id="home" style={{
      padding: '48px 0 64px 0',
      backgroundColor: 'var(--bg-page)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Soft Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(209, 77, 51, 0.04) 70%, transparent 100%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Top Hero Layout: Left Content + Right High-Res ICU Image Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '52px'
        }} className="hero-main-grid">
          <style>{`
            @media (max-width: 1024px) {
              .hero-main-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
            }
          `}</style>

          {/* Left Column: Hospital Tagline & 3 CTA Buttons */}
          <div>
            {/* Tagline Strip matching PDF: INTENSIVE CARE · EMERGENCY · DIAGNOSTICS */}
            <div style={{
              display: 'inline-block',
              color: 'var(--secondary)',
              fontWeight: 800,
              fontSize: '0.86rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '18px',
              fontFamily: 'var(--font-main)'
            }}>
              INTENSIVE CARE · EMERGENCY · DIAGNOSTICS
            </div>

            {/* Headline matching PDF: Expert critical care, awake every hour of the day. */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '22px',
              color: 'var(--text-heading)',
              lineHeight: 1.15,
              fontFamily: 'var(--font-main)'
            }}>
              Expert critical care, <br />
              awake every hour of <br />
              the day.
            </h1>

            {/* Subtext description */}
            <p style={{
              fontSize: '1.12rem',
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '560px',
              lineHeight: 1.65
            }}>
              A dedicated critical care hospital where senior doctors, trained nurses and modern ICU equipment work together when it matters most.
            </p>

            {/* 3 Buttons Side-by-side matching Cloudnine reference */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
                className="btn btn-coral"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <PhoneCall size={18} />
                <span>Call Emergency</span>
              </a>

              <Link
                to="/book-appointment"
                className="btn btn-dark-teal"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </Link>

              <button
                onClick={onOpenDoctorFinder}
                className="btn btn-outline"
                style={{
                  padding: '14px 26px',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--primary)'
                }}
              >
                <Stethoscope size={18} color="var(--primary)" />
                <span>Find a Doctor</span>
              </button>
            </div>

            {/* Quality Trust Pill Strip */}
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
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Zero Waiting Emergency ICU
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  NABH & Cashless Mediclaim Approved
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Rounded Mint Card with ICU Image & 24x7 ICU Backup floating badge */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#CDEAEA',
              borderRadius: '32px',
              padding: '16px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                maxHeight: '440px',
                position: 'relative'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
                  alt="ICU ward with modern patient bed, ventilator and vital monitors"
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
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(12, 74, 78, 0.05) 0%, rgba(12, 74, 78, 0.35) 100%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>

            {/* Floating Pill Badge: 24×7 ICU backup - Always staffed, always ready */}
            <div style={{
              position: 'absolute',
              bottom: '32px',
              left: '32px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 20px 10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 12px 32px rgba(12, 74, 78, 0.16)',
              border: '1px solid var(--border-subtle)',
              zIndex: 3
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--coral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0
              }}>
                <Activity size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-heading)', lineHeight: 1.2 }}>
                  24×7 ICU backup
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Always staffed, always ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference: Lilavati Quick-Link Row (5 Action Cards) */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '18px'
        }} className="quick-links-row">
          <style>{`
            @media (max-width: 1024px) {
              .quick-links-row { grid-template-columns: repeat(3, 1fr) !important; gap: 14px !important; }
            }
            @media (max-width: 640px) {
              .quick-links-row { grid-template-columns: repeat(2, 1fr) !important; padding: 16px !important; }
            }
          `}</style>

          {/* Quick-Link 1: Find a Doctor */}
          <div
            onClick={onOpenDoctorFinder}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 10px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--secondary)';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary)'
            }}>
              <User size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', textAlign: 'center' }}>
              Find a Doctor
            </div>
          </div>

          {/* Quick-Link 2: Book Appointment */}
          <Link
            to="/book-appointment"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 10px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-subtle)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--coral)';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--coral-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--coral)'
            }}>
              <Calendar size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', textAlign: 'center' }}>
              Book Appointment
            </div>
          </Link>

          {/* Quick-Link 3: Health Checkup */}
          <Link
            to="/packages"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 10px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-subtle)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Heart size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', textAlign: 'center' }}>
              Health Checkup
            </div>
          </Link>

          {/* Quick-Link 4: Video Consultation */}
          <div
            onClick={() => setShowVideoModal(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 10px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0284C7';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7'
            }}>
              <Video size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', textAlign: 'center' }}>
              Video Consultation
            </div>
          </div>

          {/* Quick-Link 5: Pay Online */}
          <div
            onClick={() => setShowPaymentModal(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 10px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(5, 150, 105, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <CreditCard size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', textAlign: 'center' }}>
              Pay Online
            </div>
          </div>
        </div>
      </div>

      {/* Pay Online Modal */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 37, 46, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              Online Hospital Payment
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Pay OPD consultation fee, IPD advance deposit, or lab investigation charges securely.
            </p>

            {paymentSuccess ? (
              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={44} color="var(--secondary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: 'var(--text-heading)', marginBottom: '4px' }}>Payment Portal Connected</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Redirecting to secure gateway...</p>
              </div>
            ) : (
              <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>
                    Patient UHID or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UHID-90812 or 9871108108"
                    value={uhid}
                    onChange={(e) => setUhid(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-main)',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>
                    Payment Purpose
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}>
                    <option>OPD Specialist Consultation Fee</option>
                    <option>In-Patient Admission Deposit</option>
                    <option>Diagnostics / MRI / CT Scan Billing</option>
                    <option>Preventive Health Package</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-coral"
                  style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
                >
                  Proceed to Secure Payment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Consultation Modal */}
      {showVideoModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 37, 46, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
              marginBottom: '16px'
            }}>
              <Video size={24} />
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              Telemedicine & Video Consultation
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Consult senior professors and specialists from home with digital prescription delivery.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="var(--secondary)" />
                <span>HD Video Call with Senior Clinician</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="var(--secondary)" />
                <span>Upload past lab reports & prescriptions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="var(--secondary)" />
                <span>Instant Digital Verified E-Prescription</span>
              </div>
            </div>

            <Link
              to="/book-appointment"
              onClick={() => setShowVideoModal(false)}
              className="btn btn-dark-teal"
              style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
            >
              Book Video Appointment Slot
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
