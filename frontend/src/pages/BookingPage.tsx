import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Printer,
  ShieldCheck,
  Building2,
  Stethoscope,
  Phone,
  Sparkles,
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, HEALTH_PACKAGES, Doctor, Department } from '../data/hospitalData';
import { PageHeader } from '../components/common/PageHeader';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctorIdParam = searchParams.get('doctorId');
  const deptIdParam = searchParams.get('deptId');
  const packageIdParam = searchParams.get('packageId');

  // Initial step determination
  const initialDoctor = doctorIdParam ? DOCTORS.find((d) => d.id === doctorIdParam) || null : null;
  const initialDeptId = initialDoctor
    ? initialDoctor.departmentId
    : deptIdParam || (packageIdParam ? 'dept-cardio' : DEPARTMENTS[0].id);

  const [currentStep, setCurrentStep] = useState<number>(initialDoctor ? 3 : (deptIdParam ? 2 : 1));
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDeptId);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    initialDoctor || DOCTORS.find((d) => d.departmentId === initialDeptId) || DOCTORS[0]
  );

  // Sync when searchParams change
  useEffect(() => {
    if (doctorIdParam) {
      const foundDoc = DOCTORS.find((d) => d.id === doctorIdParam);
      if (foundDoc) {
        setSelectedDoctor(foundDoc);
        setSelectedDeptId(foundDoc.departmentId);
        setCurrentStep(3);
      }
    } else if (deptIdParam) {
      setSelectedDeptId(deptIdParam);
      const firstDoc = DOCTORS.find((d) => d.departmentId === deptIdParam) || null;
      setSelectedDoctor(firstDoc);
      setCurrentStep(2);
    }
  }, [doctorIdParam, deptIdParam]);

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

  // Next 7 days generation
  const dateOptions = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const handleDeptSelect = (deptId: string) => {
    setSelectedDeptId(deptId);
    const firstDoc = DOCTORS.find((d) => d.departmentId === deptId) || null;
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

    const randomToken = `APT-202610-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingToken(randomToken);
    setCurrentStep(5);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const selectedDepartment = DEPARTMENTS.find((d) => d.id === selectedDeptId);
  const matchedPackage = packageIdParam ? HEALTH_PACKAGES.find((p) => p.id === packageIdParam) : null;

  return (
    <div className="subpage-wrapper" style={{ minHeight: '80vh', paddingBottom: '80px' }}>
      <PageHeader
        badge="ONLINE OPD & DIAGNOSTICS RESERVATION"
        title="Book Doctor Appointment"
        description="Select clinical speciality, browse verified consultant credentials, pick your preferred consultation slot, and receive instant digital confirmation."
        currentPage="Book Appointment"
      />

      <div className="container" style={{ marginTop: '-20px' }}>
        {/* Package Banner Notice (if routed from a package) */}
        {matchedPackage && (
          <div
            style={{
              backgroundColor: 'var(--primary-light)',
              border: '1.5px solid var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 24px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={22} color="var(--primary)" />
              <div>
                <strong style={{ color: 'var(--dark-navy)', fontSize: '0.98rem' }}>
                  Booking For Health Package: {matchedPackage.title}
                </strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {matchedPackage.totalTests} Diagnostic Parameters Included • ₹{matchedPackage.discountedPrice}
                </div>
              </div>
            </div>
            <Link
              to={`/packages/${matchedPackage.id}`}
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textDecoration: 'underline'
              }}
            >
              View Package Details
            </Link>
          </div>
        )}

        {/* Wizard Card Container */}
        <div
          className="bento-card"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '36px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Wizard Header & Stepper Indicators */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Step {currentStep} of 5
                </span>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-navy)', marginTop: '4px' }}>
                  {currentStep === 1 && 'Select Speciality Department'}
                  {currentStep === 2 && 'Choose Your Consulting Doctor'}
                  {currentStep === 3 && 'Pick Consultation Date & Time Slot'}
                  {currentStep === 4 && 'Enter Patient Particulars'}
                  {currentStep === 5 && 'Appointment Confirmed!'}
                </h2>
              </div>

              {currentStep > 1 && currentStep < 5 && (
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ArrowLeft size={14} />
                  <span>Previous Step</span>
                </button>
              )}
            </div>

            {/* Visual Step Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px',
                marginBottom: '14px'
              }}
            >
              {[
                '1. Department',
                '2. Specialist',
                '3. Date & Slot',
                '4. Patient Info',
                '5. Confirmation'
              ].map((stepTitle, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <div
                    key={stepNum}
                    onClick={() => {
                      if (stepNum < currentStep) setCurrentStep(stepNum);
                    }}
                    style={{
                      padding: '8px 4px',
                      textAlign: 'center',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: isCurrent
                        ? 'var(--primary)'
                        : isCompleted
                        ? 'var(--primary-light)'
                        : 'var(--bg-subtle)',
                      color: isCurrent
                        ? '#FFFFFF'
                        : isCompleted
                        ? 'var(--primary)'
                        : 'var(--text-muted)',
                      border: `1px solid ${
                        isCurrent
                          ? 'var(--primary)'
                          : isCompleted
                          ? 'rgba(14, 86, 168, 0.2)'
                          : 'var(--border-subtle)'
                      }`,
                      cursor: isCompleted ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {stepTitle}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar Line */}
            <div
              style={{
                height: '6px',
                width: '100%',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(currentStep / 5) * 100}%`,
                  backgroundColor: 'var(--primary)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* ================= STEP 1: SELECT DEPARTMENT ================= */}
          {currentStep === 1 && (
            <div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Select the clinical department best suited for your symptoms or physician referral:
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px'
                }}
                className="booking-dept-grid"
              >
                <style>{`
                  @media (max-width: 680px) {
                    .booking-dept-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>

                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDeptId === dept.id;
                  const docCount = DOCTORS.filter((d) => d.departmentId === dept.id).length;

                  return (
                    <div
                      key={dept.id}
                      onClick={() => handleDeptSelect(dept.id)}
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                          {dept.name}
                        </strong>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            backgroundColor: 'var(--bg-subtle)',
                            color: 'var(--text-muted)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          {docCount} Doctor{docCount > 1 ? 's' : ''}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Led by <strong>{dept.headDoctor}</strong>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '4px' }}>
                        Common concerns: {dept.symptoms.slice(0, 3).join(', ')}
                      </div>

                      <div
                        style={{
                          marginTop: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--primary)',
                          fontSize: '0.82rem',
                          fontWeight: 700
                        }}
                      >
                        <span>Select Department</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 2: SELECT DOCTOR ================= */}
          {currentStep === 2 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Department:</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-navy)', marginLeft: '6px' }}>
                    {selectedDepartment?.name}
                  </strong>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}
                >
                  Change Department
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {DOCTORS.filter((d) => d.departmentId === selectedDeptId).map((doc) => {
                  const isSelected = selectedDoctor?.id === doc.id;

                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleDoctorSelect(doc)}
                      style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img
                          src={doc.photoUrl}
                          alt={doc.name}
                          style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '16px',
                            objectFit: 'cover',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--dark-navy)' }}>
                            {doc.name}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            {doc.designation} • {doc.experienceYears}+ Yrs Experience
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>
                            {doc.qualifications}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>
                            OPD Consultation Fee: ₹{doc.opdFee} • {doc.roomNumber.split('(')[0]}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Link
                          to={`/doctors/${doc.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          View Bio
                        </Link>
                        <button className="btn btn-primary btn-sm">
                          <span>Select Doctor</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 3: SELECT DATE & SLOT ================= */}
          {currentStep === 3 && selectedDoctor && (
            <div>
              {/* Doctor Summary Bar */}
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={selectedDoctor.photoUrl}
                    alt={selectedDoctor.name}
                    style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--dark-navy)' }}>
                      {selectedDoctor.name}
                    </strong>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {selectedDoctor.departmentName} • Room: {selectedDoctor.roomNumber.split('(')[0]}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OPD Fee</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>
                      ₹{selectedDoctor.opdFee}
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Change Doctor
                  </button>
                </div>
              </div>

              {/* 1. Date Options */}
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
                1. Select Consultation Date:
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '10px',
                  marginBottom: '28px',
                  overflowX: 'auto',
                  paddingBottom: '6px'
                }}
                className="date-selector-row"
              >
                <style>{`
                  @media (max-width: 768px) {
                    .date-selector-row { grid-template-columns: repeat(4, 1fr) !important; }
                  }
                  @media (max-width: 480px) {
                    .date-selector-row { grid-template-columns: repeat(3, 1fr) !important; }
                  }
                `}</style>
                {dateOptions.map((opt) => {
                  const isSelected = selectedDate === opt.dateStr;
                  return (
                    <button
                      key={opt.dateStr}
                      onClick={() => setSelectedDate(opt.dateStr)}
                      style={{
                        padding: '14px 10px',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.85 }}>
                        {opt.dayName}
                      </span>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>{opt.dateNum}</span>
                      <span style={{ fontSize: '0.75rem' }}>{opt.monthName}</span>
                    </button>
                  );
                })}
              </div>

              {/* 2. Available Slots */}
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
                2. Select Available Time Slot:
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '36px'
                }}
              >
                {selectedDoctor.availableSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.88rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? 'var(--secondary)' : 'var(--bg-subtle)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                        border: `1.5px solid ${isSelected ? 'var(--secondary)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Clock size={14} />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step 3 Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary btn-md"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: PATIENT PARTICULARS ================= */}
          {currentStep === 4 && (
            <form onSubmit={handleConfirmBooking}>
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.88rem',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <strong>{selectedDoctor?.name}</strong> • {selectedDate} at {selectedSlot}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  Edit Slot
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                  marginBottom: '20px'
                }}
                className="patient-form-grid"
              >
                <style>{`
                  @media (max-width: 680px) {
                    .patient-form-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
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
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    Mobile Number (SMS / WhatsApp Slip) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 42"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    Gender *
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                  Symptoms / Primary Health Concern (Optional)
                </label>
                <textarea
                  placeholder="Describe your current symptoms or previous prescriptions..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
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
                  <span>Back to Slots</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                >
                  <CheckCircle size={18} />
                  <span>Confirm & Generate Token</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 5: CONFIRMATION TOKEN SLIP ================= */}
          {currentStep === 5 && bookingToken && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '2px dashed var(--primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 24px',
                  textAlign: 'center',
                  marginBottom: '28px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}
                >
                  <CheckCircle size={40} />
                </div>

                <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-navy)', marginBottom: '6px' }}>
                  Appointment Successfully Booked!
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  A confirmation SMS & WhatsApp reminder have been dispatched to <strong>{patientPhone}</strong>
                </p>

                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    color: 'var(--primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '24px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {bookingToken} • Token #{Math.floor(10 + Math.random() * 20)}
                </div>

                {/* Details Breakdown Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    textAlign: 'left',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                  className="token-summary-grid"
                >
                  <style>{`
                    @media (max-width: 600px) {
                      .token-summary-grid { grid-template-columns: 1fr !important; }
                    }
                  `}</style>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Patient Name:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {patientName} ({patientAge} Yrs, {patientGender})
                    </div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Consulting Specialist:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {selectedDoctor?.name}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Appointment Schedule:</span>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', marginTop: '2px' }}>
                      {selectedDate} at {selectedSlot}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>OPD Suite / Room:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {selectedDoctor?.roomNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation CTAs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => window.print()}
                  className="btn btn-outline btn-md"
                >
                  <Printer size={16} />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="btn btn-primary btn-md"
                >
                  <span>Return to Home</span>
                </button>

                {selectedDoctor && (
                  <Link
                    to={`/doctors/${selectedDoctor.id}`}
                    className="btn btn-outline btn-md"
                  >
                    <span>View Doctor Profile</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
