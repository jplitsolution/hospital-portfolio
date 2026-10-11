import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../../data/hospitalData';

interface Props {
  isSubpage?: boolean;
}

export const TestimonialsSection: React.FC<Props> = ({ isSubpage = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setCurrentIndex((currentIndex + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" style={{
      padding: isSubpage ? '40px 0 80px 0' : '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="container">
        {/* Section Header (Only on Home Page) */}
        {!isSubpage && (
          <div className="section-header">
            <div className="subheading">
              <HeartHandshake size={16} />
              <span>PATIENT STORIES</span>
            </div>
            <h2>Stories of Hope, Healing & Recovery</h2>
            <p>
              Real feedback from patients and families whose lives were touched by our clinical care and compassionate staff.
            </p>
          </div>
        )}

        {/* Testimonial Showcase Card */}
        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div className="bento-card" style={{
            padding: '40px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '40px',
              color: 'rgba(14, 86, 168, 0.1)'
            }}>
              <Quote size={80} />
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>

            {/* Treatment Tag */}
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
              marginBottom: '18px'
            }}>
              <CheckCircle2 size={13} />
              <span>Treated for: {current.treatment}</span>
            </div>

            {/* Quote Body */}
            <p style={{
              fontSize: '1.18rem',
              color: 'var(--dark-navy)',
              lineHeight: 1.65,
              fontStyle: 'italic',
              marginBottom: '28px'
            }}>
              "{current.quote}"
            </p>

            {/* Patient Info Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={current.avatarUrl}
                  alt={current.patientName}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--secondary)'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                    {current.patientName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Attending Team: {current.doctorName} • {current.date}
                  </div>
                </div>
              </div>

              {/* Slider Prev / Next Controls */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={prev}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--dark-navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}
                  aria-label="Previous story"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Next story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
