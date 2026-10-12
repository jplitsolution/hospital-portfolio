import React from 'react';
import { Phone, Ambulance, Moon, Sun, Eye, Globe } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

interface Props {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
}

export const EmergencyTopBar: React.FC<Props> = ({
  theme,
  toggleTheme,
  highContrast,
  toggleHighContrast,
  fontSize,
  setFontSize,
  language,
  toggleLanguage
}) => {
  return (
    <div className="emergency-top-bar">
      <style>{`
        .emergency-top-bar .topbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          gap: 12px;
          min-height: 40px;
          width: 100%;
        }
        .emergency-top-bar .topbar-left {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .emergency-top-bar .topbar-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          flex-shrink: 0;
          white-space: nowrap;
        }
        @media (max-width: 1220px) {
          .emergency-top-bar .topbar-email {
            display: none !important;
          }
        }
        @media (max-width: 1080px) {
          .emergency-top-bar .topbar-ambulance-detail {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .emergency-top-bar .topbar-font-group,
          .emergency-top-bar .topbar-contrast-label,
          .emergency-top-bar .topbar-ambulance {
            display: none !important;
          }
          .emergency-top-bar .emergency-badge-link {
            font-size: 0.76rem !important;
            padding: 3px 8px !important;
          }
        }
      `}</style>

      <div className="container topbar-container">
        {/* Left: Emergency Hotlines & Email */}
        <div className="topbar-left">
          <a
            href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
            className="emergency-badge-link"
          >
            <Phone size={13} style={{ flexShrink: 0 }} />
            <span>24×7 Emergency & ICU: {HOSPITAL_INFO.emergencyNumber}</span>
          </a>

          <a
            href="tel:108"
            className="ambulance-link topbar-ambulance"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.82rem',
              color: '#E2E8F0'
            }}
          >
            <Ambulance size={14} className="ambulance-icon" style={{ flexShrink: 0 }} />
            <span>
              Ambulance: 108 <span className="topbar-ambulance-detail">/ +91-9871-108108</span>
            </span>
          </a>

          <a
            href={`mailto:${HOSPITAL_INFO.email}`}
            className="topbar-email"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.85)',
              textDecoration: 'none'
            }}
          >
            <span>Email: {HOSPITAL_INFO.email}</span>
          </a>
        </div>

        {/* Right: Accessibility & Language & Theme Controls */}
        <div className="topbar-right">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="topbar-btn"
            title="Switch Language"
          >
            <Globe size={13} style={{ flexShrink: 0 }} />
            <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
          </button>

          {/* Font Size A- / A / A+ */}
          <div className="topbar-font-group">
            <button
              onClick={() => setFontSize('small')}
              style={{
                color: fontSize === 'small' ? 'var(--secondary)' : 'inherit',
                fontWeight: fontSize === 'small' ? 800 : 500,
                fontSize: '0.75rem',
                padding: '2px 6px'
              }}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('medium')}
              style={{
                color: fontSize === 'medium' ? 'var(--secondary)' : 'inherit',
                fontWeight: fontSize === 'medium' ? 800 : 500,
                fontSize: '0.85rem',
                padding: '2px 6px'
              }}
              title="Default text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              style={{
                color: fontSize === 'large' ? 'var(--secondary)' : 'inherit',
                fontWeight: fontSize === 'large' ? 800 : 500,
                fontSize: '0.95rem',
                padding: '2px 6px'
              }}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`topbar-btn ${highContrast ? 'contrast-active' : ''}`}
            title="Toggle High Contrast Mode"
          >
            <Eye size={13} style={{ flexShrink: 0 }} />
            <span className="topbar-contrast-label">Contrast</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="topbar-theme-toggle"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} className="topbar-sun-icon" /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};
