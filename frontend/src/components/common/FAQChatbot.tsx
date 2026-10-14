import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone, Calendar, ArrowRight } from 'lucide-react';
import { FAQS, HOSPITAL_INFO } from '../../data/hospitalData';

interface Props {
  onOpenBooking: () => void;
}

export const FAQChatbot: React.FC<Props> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; action?: 'booking' | 'call' }>>([
    {
      sender: 'bot',
      text: 'Namaste! 🙏 I am your Gaikwad Critical Care Virtual Assistant. How can I assist you with 24x7 ICU & Emergency services, doctor schedules, or reports today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    { label: 'OPD Timings', query: 'OPD' },
    { label: 'Ambulance & Emergency', query: 'EMERGENCY' },
    { label: 'Cashless Insurance', query: 'INSURANCE' },
    { label: 'Download Lab Reports', query: 'REPORTS' },
    { label: 'ICU Visiting Hours', query: 'VISITORS' }
  ];

  const handleSelectPrompt = (category: string, label: string) => {
    const faq = FAQS.find(f => f.category === category);
    if (!faq) return;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `Tell me about ${label}` },
      { sender: 'bot', text: faq.answer }
    ]);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    // Find keyword match
    const lower = userText.toLowerCase();
    let reply = `Our team is here to help! You can book an appointment online or contact our 24/7 hospital desk at ${HOSPITAL_INFO.emergencyNumber}.`;

    if (lower.includes('timing') || lower.includes('opd') || lower.includes('time') || lower.includes('samay')) {
      reply = `OPD Consultation hours: ${HOSPITAL_INFO.opdTimings}. Emergency services are open 24 Hours, 365 days.`;
    } else if (lower.includes('emergency') || lower.includes('ambulance') || lower.includes('urgent')) {
      reply = `🚨 In case of an emergency, please immediately call our 24/7 hotline at ${HOSPITAL_INFO.emergencyNumber} or dial 108. Our cardiac & trauma team is always ready.`;
    } else if (lower.includes('report') || lower.includes('test') || lower.includes('blood') || lower.includes('result')) {
      reply = 'You can download all your verified pathology and radiology reports by clicking the "Reports" button in our top menu with your registered mobile or UHID.';
    } else if (lower.includes('insurance') || lower.includes('cashless') || lower.includes('tpa') || lower.includes('claim')) {
      reply = 'We offer 100% cashless treatment with Star Health, HDFC ERGO, ICICI Lombard, Ayushman Bharat, and 30+ leading TPA providers.';
    } else if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('book')) {
      reply = 'You can browse our doctors and choose your preferred date and time slot using our 5-Step Appointment Wizard.';
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: reply }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(14, 86, 168, 0.4)',
          zIndex: 900,
          cursor: 'pointer',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Open Hospital Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          maxHeight: 'calc(100vh - 120px)',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 900,
          overflow: 'hidden',
          animation: 'scaleUp 0.25s ease-out'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Gaikwad Critical Care Assistant</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.85)' }}>24x7 Active • Reshim Bagh, Nagpur</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#FFFFFF', opacity: 0.8, padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'var(--bg-subtle)'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}
              >
                {msg.sender === 'bot' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  fontSize: '0.86rem',
                  lineHeight: 1.45,
                  backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-surface)',
                  color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                  boxShadow: 'var(--shadow-sm)',
                  border: msg.sender === 'bot' ? '1px solid var(--border-subtle)' : 'none'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Prompt Suggestions */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Quick Assistance Topics:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPrompt(p.query, p.label)}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--primary)',
                      border: '1px solid rgba(14, 86, 168, 0.2)',
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Footer Strip */}
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              style={{
                flex: 1,
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Calendar size={13} />
              <span>Book Doctor</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
              style={{
                flex: 1,
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: 'var(--emergency)',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Phone size={13} />
              <span>Call Hotline</span>
            </a>
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={handleSendCustomMessage}
            style={{
              padding: '10px 16px',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about hospital..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
