import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../../data/hospitalData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Critical Care'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', department: 'Critical Care' });
    }, 4000);
  };

  return (
    <section id="contact" style={{
      padding: '76px 0',
      backgroundColor: 'var(--bg-page)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Dark Slate Container matching PDF Page 5 */}
        <div style={{
          backgroundColor: '#0C3844',
          borderRadius: '32px',
          padding: '48px',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '52px',
          boxShadow: 'var(--shadow-lg)'
        }} className="contact-dark-box">
          <style>{`
            @media (max-width: 960px) {
              .contact-dark-box { grid-template-columns: 1fr !important; gap: 36px !important; padding: 28px !important; }
            }
          `}</style>

          {/* Left Column: Request an appointment Form matching PDF Page 5 */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: 'var(--font-main)',
              letterSpacing: '-0.02em',
              marginBottom: '28px'
            }}>
              Request an appointment
            </h2>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(13, 148, 136, 0.2)',
                border: '1.5px solid var(--secondary)',
                color: '#FFFFFF',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center'
              }}>
                <CheckCircle size={40} color="var(--secondary)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Request Submitted Successfully!</h4>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                  Our critical care desk will call you back at {formData.phone || 'your number'} within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '8px'
                  }}>
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '8px'
                  }}>
                    Phone number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '8px'
                  }}>
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backgroundColor: '#0A2D37',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Critical Care">Critical Care & ICU</option>
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Warm Coral Pill Button matching PDF Page 5 */}
                <button
                  type="submit"
                  className="btn btn-coral"
                  style={{
                    padding: '15px 32px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginTop: '8px',
                    width: 'fit-content'
                  }}
                >
                  Submit request
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Address, Working Hours, Phone, Map placeholder matching PDF Page 5 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Address */}
            <div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--secondary)',
                marginBottom: '4px'
              }}>
                ADDRESS
              </div>
              <div style={{ fontSize: '0.95rem', color: '#FFFFFF', lineHeight: 1.5 }}>
                {HOSPITAL_INFO.address}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '2px' }}>
                Landmark: {HOSPITAL_INFO.landmark}
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--secondary)',
                marginBottom: '4px'
              }}>
                WORKING HOURS
              </div>
              <div style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>
                Emergency & ICU: <strong>24×7</strong>
              </div>
              <div style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                OPD: {HOSPITAL_INFO.opdTimings}
              </div>
            </div>

            {/* Phone */}
            <div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--secondary)',
                marginBottom: '4px'
              }}>
                PHONE
              </div>
              <div style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>
                Emergency: <strong style={{ color: 'var(--coral-light)' }}>{HOSPITAL_INFO.emergencyNumber}</strong>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Reception: {HOSPITAL_INFO.opdBoardline}
              </div>
            </div>

            {/* Map visual card matching PDF Page 5 (Map placeholder: Get Directions) */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#CDEAEA',
              height: '180px',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=900"
                alt="Hospital campus location map"
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
                backgroundColor: 'rgba(12, 74, 78, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--primary)',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  <Navigation size={16} color="var(--primary)" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
