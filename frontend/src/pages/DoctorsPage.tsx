import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DoctorDirectory } from '../components/doctors/DoctorDirectory';
import { Stethoscope } from 'lucide-react';
import { Doctor } from '../data/hospitalData';

interface Props {
  onBookDoctor: (doctor: Doctor) => void;
  onOpenDoctorFinder: () => void;
}

export const DoctorsPage: React.FC<Props> = ({ onBookDoctor, onOpenDoctorFinder }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="SENIOR CLINICAL FACULTY"
        title="Find & Book Top Medical Specialists"
        description="Consult with India's leading medical minds, senior interventional cardiologists, robotic joint replacement surgeons, and neurosurgeons with guaranteed zero waiting queues."
        currentPage="Doctors"
        onOpenBooking={() => onBookDoctor(undefined as any)}
      />

      {/* Smart Triage Banner */}
      <div className="container" style={{ marginTop: '30px', marginBottom: '10px' }}>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Stethoscope size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                Not sure which doctor to consult?
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Select your symptoms, and our Smart Triage Matcher will instantly recommend the right specialist.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDoctorFinder}
            className="btn btn-primary btn-sm"
          >
            <span>Match by Symptoms</span>
          </button>
        </div>
      </div>

      <DoctorDirectory onBookDoctor={onBookDoctor} isSubpage={true} />
    </div>
  );
};
