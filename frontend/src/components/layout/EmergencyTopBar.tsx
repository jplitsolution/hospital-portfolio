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
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: Emergency Hotlines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a
            href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
            className="emergency-badge-link"
          >
            <Phone size={13} />
            <span>24/7 EMERGENCY: {HOSPITAL_INFO.emergencyNumber}</span>
          </a>

          <a
            href={`tel:108`}
            className="ambulance-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.82rem'
            }}
          >
            <Ambulance size={14} className="ambulance-icon" />
            <span>AMBULANCE: {HOSPITAL_INFO.ambulanceNumber}</span>
          </a>
        </div>

        {/* Right: Accessibility & Language & Theme Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="topbar-btn"
            title="Switch Language"
          >
            <Globe size={13} />
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
            <Eye size={13} />
            <span>Contrast</span>
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
