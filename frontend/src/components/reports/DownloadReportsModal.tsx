import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadReportsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useLockBodyScroll(isOpen);

  const [uhidOrPhone, setUhidOrPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uhidOrPhone.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234' || otp.length === 4) {
      setVerified(true);
    } else {
      alert('Demo verification: Please enter any 4-digit code (e.g. 1234).');
    }
  };

  const sampleReports = [
    { id: 'rep-1', testName: 'Complete Blood Count (CBC with ESR)', date: 'Oct 08, 2026', doctor: 'Dr. Priya Nambiar', size: '1.2 MB' },
    { id: 'rep-2', testName: 'Lipid Profile & Liver Function Panel', date: 'Oct 08, 2026', doctor: 'Dr. Arvind Sharma', size: '2.1 MB' },
    { id: 'rep-3', testName: 'Chest X-Ray Digital Imaging (PA View)', date: 'Sep 24, 2026', doctor: 'Dr. Sunita Kapoor', size: '4.8 MB' },
  ];

  const handleDownload = (testName: string) => {
    setDownloadSuccessMessage(`Downloading verified report: "${testName}" (AES-256 Encrypted)...`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 3500);
  };

  const resetModal = () => {
    setUhidOrPhone('');
    setOtpSent(false);
    setOtp('');
    setVerified(false);
    setDownloadSuccessMessage(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={resetModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '32px' }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              marginBottom: '4px'
            }}>
              <Lock size={13} />
              <span>SECURE PATIENT VAULT</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)' }}>
              Download Diagnostic & Lab Reports
            </h2>
          </div>

          <button
            onClick={resetModal}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {downloadSuccessMessage && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Step 1: Mobile/UHID Entry */}
        {!verified && !otpSent && (
          <form onSubmit={handleSendOtp}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Please enter your 10-digit registered mobile number or Patient UHID (e.g. <code>HOSP-1002</code>) to receive a secure login OTP.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                Mobile Number or UHID
              </label>
              <input
                type="text"
                required
                placeholder="Enter Mobile / UHID (e.g. 9876543210)"
                value={uhidOrPhone}
                onChange={(e) => setUhidOrPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                <span>Send Verification OTP</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {!verified && otpSent && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{
              backgroundColor: 'var(--primary-light)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '0.85rem',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>OTP sent to <strong>{uhidOrPhone}</strong></span>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.78rem' }}
              >
                Change
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                Enter 4-Digit OTP Code (Demo code: 1234)
              </label>
              <input
                type="text"
                maxLength={4}
                required
                placeholder="1 2 3 4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontSize: '1.2rem',
                  letterSpacing: '0.3em',
                  textAlign: 'center',
                  fontWeight: 800
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="btn btn-outline btn-sm"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <span>Verify & View Reports</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Verified - Show Reports Vault */}
        {verified && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>
                  Patient: Rameshwar Khurana (UHID: HOSP-2026-8912)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Phone: {uhidOrPhone} • Verified Record
                </div>
              </div>
              <span className="badge badge-secondary">Verified</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {sampleReports.map((rep) => (
                <div
                  key={rep.id}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(239, 68, 68, 0.12)',
                      color: 'var(--emergency)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
                        {rep.testName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Date: {rep.date} • Ordered by: {rep.doctor} • PDF ({rep.size})
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(rep.testName)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem', gap: '6px' }}
                  >
                    <Download size={14} color="var(--primary)" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={resetModal} className="btn btn-primary btn-sm">
                Done / Close Vault
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
