import React, { useState } from 'react';
import { Play, Star, X, CheckCircle2, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '../../data/hospitalData';

interface Props {
  isSubpage?: boolean;
}

export const TestimonialsSection: React.FC<Props> = ({ isSubpage = false }) => {
  const [activeVideoModal, setActiveVideoModal] = useState<Testimonial | null>(null);

  return (
    <section id="testimonials" style={{
      padding: isSubpage ? '40px 0 80px 0' : '76px 0',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Header matching PDF Page 3 */}
        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.02em',
            marginBottom: '8px'
          }}>
            Patient stories
          </h2>
          <p style={{
            fontSize: '1.02rem',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: 0
          }}>
            Real recovery journeys and testimonials from patients treated by our critical care and surgical team.
          </p>
        </div>

        {/* 3-Column Video Thumbnail Grid matching Cloudnine & Lilavati reference in PDF Page 4 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px'
        }} className="patient-stories-grid">
          <style>{`
            @media (max-width: 960px) {
              .patient-stories-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
            }
          `}</style>

          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideoModal(item)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Video Thumbnail Box with Play Icon Overlay */}
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                backgroundColor: 'var(--bg-subtle)',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '16px'
              }}>
                <img
                  src={item.videoThumbnail || item.avatarUrl}
                  alt={item.patientName}
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

                {/* Subtle dark gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(12, 74, 78, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Play Button Icon matching PDF */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--coral)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                    paddingLeft: '4px'
                  }}>
                    <Play size={24} fill="var(--coral)" strokeWidth={0} />
                  </div>
                </div>

                {/* Procedure badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(8, 44, 53, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backdropFilter: 'blur(4px)'
                }}>
                  {item.treatment}
                </div>
              </div>

              {/* Patient Name */}
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-heading)',
                marginBottom: '6px'
              }}>
                {item.patientName}
              </h3>

              {/* Short patient quote */}
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: 0
              }}>
                "{item.quote.slice(0, 110)}..."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video / Full Story Modal */}
      {activeVideoModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 37, 46, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            maxWidth: '540px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveVideoModal(null)}
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

            {/* Video preview / story */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              marginBottom: '20px',
              position: 'relative'
            }}>
              <img
                src={activeVideoModal.videoThumbnail || activeVideoModal.avatarUrl}
                alt={activeVideoModal.patientName}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(12, 74, 78, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--coral)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: '#FFFFFF'
                  }}>
                    <Play size={26} fill="#FFFFFF" strokeWidth={0} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Play Full Patient Video Story</div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              <CheckCircle2 size={13} />
              <span>{activeVideoModal.treatment}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              {activeVideoModal.patientName}
            </h3>

            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-main)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              "{activeVideoModal.quote}"
            </p>

            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.84rem',
              color: 'var(--text-muted)'
            }}>
              Attending Team: <strong>{activeVideoModal.doctorName}</strong> · {activeVideoModal.date}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
