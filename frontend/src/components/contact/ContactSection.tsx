import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Ambulance, ShieldAlert } from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../../data/hospitalData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', department: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="subheading">
            <MapPin size={16} />
            <span>CONNECT WITH US</span>
          </div>
          <h2>Contact & Campus Location</h2>
          <p>
            Conveniently situated in the city center with 24/7 emergency trauma access, multi-level parking, and close metro connectivity.
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="contact-emergency-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="emergency-banner-icon-box">
              <Ambulance size={28} />
            </div>
            <div>
              <h3 className="emergency-banner-title">
                Life-Threatening Emergency or Heart Attack?
              </h3>
              <p className="emergency-banner-subtitle">
                Our 24×7 Ambulance fleet and Emergency Trauma ER team are on standby.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
              className="btn btn-emergency btn-lg"
            >
              <Phone size={18} />
              <span>Call Emergency: {HOSPITAL_INFO.emergencyNumber}</span>
            </a>
            <a
              href="tel:108"
              className="btn emergency-dial-btn btn-lg"
            >
              <span>Dial 108 Ambulance</span>
            </a>
          </div>
        </div>

        {/* Two-Column Grid: Contact Form & Campus Map Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }} className="contact-grid">
          <style>{`
            @media (max-width: 900px) {
              .contact-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left: Interactive Inquiry Form */}
          <div className="bento-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)', marginBottom: '10px' }}>
              Send an Online Inquiry
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Have questions regarding appointments, doctor availability, or medical reports? Send us a message.
            </p>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <CheckCircle size={36} style={{ margin: '0 auto 12px auto' }} />
                <h4>Thank you! Message Received.</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                  Our hospital patient relations desk will contact you within 2 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anjali Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      {DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="anjali@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Your Inquiry / Question
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your health question or appointment preference..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  <Send size={16} />
                  <span>Submit Inquiry Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Hospital Details & Location Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="bento-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)', marginBottom: '16px' }}>
                Hospital Campus Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <MapPin size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Hospital Address:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {HOSPITAL_INFO.address}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                      Landmark: {HOSPITAL_INFO.landmark}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Clock size={22} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>OPD Consultation Hours:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {HOSPITAL_INFO.opdTimings}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--emergency)', fontWeight: 700 }}>
                      Emergency ER: {HOSPITAL_INFO.emergencyTimings}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Phone size={22} color="#8B5CF6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Telephone Numbers:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      OPD Appointments: {HOSPITAL_INFO.opdBoardline} <br />
                      Emergency Hotline: {HOSPITAL_INFO.emergencyNumber}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Mail size={22} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>Email Correspondence:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {HOSPITAL_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Visual Map Card */}
            <div className="bento-card" style={{
              padding: '24px',
              background: 'linear-gradient(135deg, var(--bg-subtle) 0%, var(--primary-light) 100%)',
              border: '1px solid rgba(14, 86, 168, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>
                  Interactive Google Navigation
                </strong>
                <span className="badge badge-primary">GPS Ready</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Directly route your ambulance or private cab to AuraCare Main Emergency Gate 1.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MapPin size={15} color="var(--primary)" />
                <span>Open in Google Maps Application</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
