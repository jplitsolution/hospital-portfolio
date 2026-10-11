import React from 'react';
import { MessageCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

export const WhatsAppFloating: React.FC = () => {
  const whatsappUrl = `https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello AuraCare Hospital Desk, I would like to inquire about OPD Doctor Consultation and Facilities.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        zIndex: 890,
        cursor: 'pointer',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      title="Chat on WhatsApp with Reception Desk"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={30} fill="#FFFFFF" color="#25D366" />
    </a>
  );
};
