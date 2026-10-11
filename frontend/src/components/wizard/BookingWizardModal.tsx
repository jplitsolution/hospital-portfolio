import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle, ArrowRight, ArrowLeft, Printer, ShieldCheck, QrCode } from 'lucide-react';
import { DEPARTMENTS, DOCTORS, Doctor, Department } from '../../data/hospitalData';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDoctor?: Doctor | null;
  preSelectedDepartmentId?: string | null;
}

export const BookingWizardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  preSelectedDoctor,
  preSelectedDepartmentId
}) => {
  // Lock background scrolling whenever wizard is open
  useLockBodyScroll(isOpen);

  // Wizard steps: 1: Department, 2: Doctor, 3: Date & Slot, 4: Patient Info, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(preSelectedDoctor ? 3 : (preSelectedDepartmentId ? 2 : 1));
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    preSelectedDoctor?.departmentId || preSelectedDepartmentId || DEPARTMENTS[0].id
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    preSelectedDoctor || DOCTORS.find(d => d.departmentId === selectedDeptId) || DOCTORS[0]
  );
  
  // Date & Slot state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  // Patient Info Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('MALE');
  const [symptoms, setSymptoms] = useState('');
  const [bookingToken, setBookingToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeptSelect = (deptId: string) => {
    setSelectedDeptId(deptId);
    const firstDoc = DOCTORS.find(d => d.departmentId === deptId) || null;
    setSelectedDoctor(firstDoc);
    setCurrentStep(2);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(3);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !patientAge) {
      alert('Please fill all mandatory fields (Name, Phone, Age).');
      return;
    }

    // Generate random booking token
    const randomToken = `APT-202610-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingToken(randomToken);
    setCurrentStep(5);
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setBookingToken(null);
    onClose();
  };

  // Next 5 days generation
  const dateOptions = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '32px' }}
      >
        {/* Modal Top Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Appointment Wizard • Step {currentStep} of 5
            </div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--dark-navy)' }}>
              {currentStep === 1 && 'Select Medical Department'}
              {currentStep === 2 && 'Choose Your Doctor'}
              {currentStep === 3 && 'Pick Consultation Date & Time Slot'}
              {currentStep === 4 && 'Enter Patient Information'}
              {currentStep === 5 && 'Appointment Confirmed!'}
            </h2>
          </div>

          <button
            onClick={resetAndClose}
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

        {/* Progress Bar */}
        <div style={{
          height: '6px',
          width: '100%',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: '3px',
          marginBottom: '28px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(currentStep / 5) * 100}%`,
            backgroundColor: 'var(--primary)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* ================= STEP 1: SELECT DEPARTMENT ================= */}
        {currentStep === 1 && (
          <div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Please select the medical speciality suited for your health concern:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              maxHeight: '340px',
              overflowY: 'auto',
              padding: '4px'
            }}>
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => handleDeptSelect(dept.id)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${selectedDeptId === dept.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: selectedDeptId === dept.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>
                    {dept.name}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Led by {dept.headDoctor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT DOCTOR ================= */}
        {currentStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Doctors available under <strong>{DEPARTMENTS.find(d => d.id === selectedDeptId)?.name}</strong>:
              </p>
              <button
                onClick={() => setCurrentStep(1)}
                style={{ fontSize: '0.82rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <ArrowLeft size={13} />
                <span>Change Department</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '340px', overflowY: 'auto' }}>
              {DOCTORS.filter(d => d.departmentId === selectedDeptId).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDoctorSelect(doc)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${selectedDoctor?.id === doc.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: selectedDoctor?.id === doc.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark-navy)' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {doc.designation} • {doc.experienceYears}+ Yrs Exp
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600, marginTop: '2px' }}>
                        OPD Fee: ₹{doc.opdFee} | {doc.roomNumber.split('(')[0]}
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm">
                    <span>Select</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 3: SELECT DATE & SLOT ================= */}
        {currentStep === 3 && selectedDoctor && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)' }}>
                  Consultation with {selectedDoctor.name}
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {selectedDoctor.departmentName} • Fee: ₹{selectedDoctor.opdFee}
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                style={{ fontSize: '0.82rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <ArrowLeft size={13} />
                <span>Change Doctor</span>
              </button>
            </div>

            {/* Date Picker Cards */}
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
              1. Select Date:
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              marginBottom: '24px',
              paddingBottom: '4px'
            }}>
              {dateOptions.map((opt) => {
                const isSelected = selectedDate === opt.dateStr;
                return (
                  <button
                    key={opt.dateStr}
                    onClick={() => setSelectedDate(opt.dateStr)}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      flex: '1',
                      minWidth: '80px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.85 }}>{opt.dayName}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{opt.dateNum}</div>
                    <div style={{ fontSize: '0.75rem' }}>{opt.monthName}</div>
                  </button>
                );
              })}
            </div>

            {/* Time Slot Chips */}
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
              2. Available Time Slots:
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '32px'
            }}>
              {selectedDoctor.availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--secondary)' : 'var(--bg-subtle)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                      border: `1px solid ${isSelected ? 'var(--secondary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Clock size={13} />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setCurrentStep(4)}
                className="btn btn-primary"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PATIENT DETAILS ================= */}
        {currentStep === 4 && (
          <form onSubmit={handleConfirmBooking}>
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.85rem'
            }}>
              <div>
                <strong>{selectedDoctor?.name}</strong> • {selectedDate} at {selectedSlot}
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                Edit Slot
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  Mobile Number (For WhatsApp / SMS Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  Age *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 42"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  Gender *
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                Brief Health Concern / Symptoms (Optional)
              </label>
              <textarea
                placeholder="Mention any ongoing complaints or medication details..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn btn-outline btn-sm"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                <CheckCircle size={16} />
                <span>Confirm & Generate Token</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 5: CONFIRMATION TOKEN SLIP ================= */}
        {currentStep === 5 && bookingToken && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {/* Digital Token Card */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '2px dashed var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              textAlign: 'center',
              marginBottom: '24px',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-navy)', marginBottom: '4px' }}>
                Appointment Confirmed!
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                SMS and WhatsApp confirmation sent to <strong>{patientPhone}</strong>
              </p>

              <div style={{
                display: 'inline-block',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'var(--primary)',
                letterSpacing: '0.04em',
                marginBottom: '20px'
              }}>
                {bookingToken} • Token #{Math.floor(10 + Math.random() * 20)}
              </div>

              {/* Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                textAlign: 'left',
                backgroundColor: 'var(--bg-surface)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Patient Name:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{patientName} ({patientAge} Yrs, {patientGender})</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Consulting Doctor:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{selectedDoctor?.name}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time Slot:</span>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedDate} at {selectedSlot}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Location / Room:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{selectedDoctor?.roomNumber}</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.print()}
                className="btn btn-outline btn-sm"
              >
                <Printer size={15} />
                <span>Print Appointment Slip</span>
              </button>

              <button
                onClick={resetAndClose}
                className="btn btn-primary btn-sm"
              >
                <span>Done / Back to Home</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
