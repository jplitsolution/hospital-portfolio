import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../../data/hospitalData';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  useLockBodyScroll(!!selectedArticle);

  return (
    <section id="blog" style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="container">
        {/* Section Header matching PDF Page 5 */}
        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            fontFamily: 'var(--font-main)',
            letterSpacing: '-0.02em',
            marginBottom: '8px'
          }}>
            Health updates from our doctors
          </h2>
          <p style={{
            fontSize: '1.02rem',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: 0
          }}>
            Doctor-authored advice on disease prevention, surgical advancements, and healthy lifestyles for you and your family.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }} className="blog-grid">
          <style>{`
            @media (max-width: 900px) {
              .blog-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bento-card"
              style={{
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedArticle(post)}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {post.category}
                    </span>

                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    By {post.authorDoctor}
                  </span>

                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>Read</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '750px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-primary">{selectedArticle.category}</span>
              <button onClick={() => setSelectedArticle(null)} style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--dark-navy)', marginBottom: '12px' }}>
              {selectedArticle.title}
            </h2>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Authored by <strong>{selectedArticle.authorDoctor}</strong> • Published {selectedArticle.publishDate} • {selectedArticle.readTime}
            </div>

            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}
            />

            <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '24px' }}>
              <p style={{ marginBottom: '16px' }}>{selectedArticle.excerpt}</p>
              <p style={{ marginBottom: '16px' }}>
                In clinical medicine, awareness and early diagnosis remain the strongest pillars of positive health outcomes. Modern hospital care has shifted from reactive treatments to proactive wellness programs that preserve long-term vitality.
              </p>
              <p>
                If you or your loved ones experience any persistent symptoms discussed in this guide, our outpatient department (OPD) is open Monday through Saturday with dedicated senior consultants.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedArticle(null)}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
