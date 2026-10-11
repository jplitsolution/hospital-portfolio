import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Calendar,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Activity,
  Heart,
  Clock,
  Building2,
  CheckCircle2,
  Star,
  Stethoscope,
  Check
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../data/hospitalData';

export interface PageStat {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export interface PageHighlight {
  text: string;
  icon?: React.ReactNode;
}

interface Props {
  badge: string;
  title: string;
  description: string;
  currentPage: string;
  onOpenBooking?: () => void;
  stats?: PageStat[];
  highlights?: PageHighlight[];
  extraWidget?: React.ReactNode;
}

export const PageHeader: React.FC<Props> = ({
  badge,
  title,
  description,
  currentPage,
  onOpenBooking,
  stats,
  highlights,
  extraWidget
}) => {
  // Get default stats per page
  const getDefaultStats = (): PageStat[] => {
    switch (currentPage) {
      case 'Specialties':
        return [
          { value: '32+', label: 'Clinical Centres', sublabel: 'Super-Specialities', icon: <Stethoscope size={20} color="#0E56A8" /> },
          { value: '150+', label: 'Specialists', sublabel: 'Robotic & HoD Faculty', icon: <Users size={20} color="#00BFA5" /> },
          { value: '99.4%', label: 'Clinical Success', sublabel: 'Verified Outcomes', icon: <ShieldCheck size={20} color="#10B981" /> },
          { value: '24/7', label: 'Emergency Care', sublabel: 'Cath Lab & Trauma', icon: <Activity size={20} color="#E11D48" /> }
        ];
      case 'Doctors':
        return [
          { value: '150+', label: 'Top Specialists', sublabel: 'Full-Time Faculty', icon: <Users size={20} color="#0E56A8" /> },
          { value: '15+ Yrs', label: 'Avg Experience', sublabel: 'AIIMS & Global Minds', icon: <Award size={20} color="#F59E0B" /> },
          { value: '4.9 ★', label: 'Patient Rating', sublabel: '45,000+ Reviews', icon: <Star size={20} color="#00BFA5" /> },
          { value: '0 Min', label: 'Guaranteed Queue', sublabel: 'FastTrack OPD Slot', icon: <Clock size={20} color="#10B981" /> }
        ];
      case 'Health Packages':
        return [
          { value: '90+', label: 'Lab Tests', sublabel: 'Automated Pathology', icon: <Activity size={20} color="#0E56A8" /> },
          { value: 'Same Day', label: 'Digital Reports', sublabel: 'NABL Certified Labs', icon: <Clock size={20} color="#00BFA5" /> },
          { value: '50% OFF', label: 'Package Savings', sublabel: 'Preventive Bundles', icon: <Sparkles size={20} color="#F59E0B" /> },
          { value: 'Free', label: 'Doctor Review', sublabel: 'Post-Report Consult', icon: <CheckCircle2 size={20} color="#10B981" /> }
        ];
      case 'Facilities':
        return [
          { value: '450+', label: 'Smart Beds', sublabel: 'ICU & Inpatient Suites', icon: <Building2 size={20} color="#0E56A8" /> },
          { value: '12+', label: 'Modular OTs', sublabel: 'Class 100 Sterile Suites', icon: <ShieldCheck size={20} color="#00BFA5" /> },
          { value: '3.0T', label: 'Precision MRI', sublabel: '128-Slice Low-Dose CT', icon: <Activity size={20} color="#8B5CF6" /> },
          { value: '24/7', label: 'Trauma & Blood', sublabel: 'Immediate Triage Bay', icon: <Clock size={20} color="#E11D48" /> }
        ];
      case 'Testimonials':
        return [
          { value: '1.5L+', label: 'Families Healed', sublabel: 'Inpatient Care', icon: <Heart size={20} color="#E11D48" /> },
          { value: '4.9 / 5.0', label: 'Verified Rating', sublabel: 'Google & Practo', icon: <Star size={20} color="#F59E0B" /> },
          { value: '98.6%', label: 'Family Trust', sublabel: 'Recommendation Index', icon: <Award size={20} color="#00BFA5" /> },
          { value: '#1', label: 'Excellence', sublabel: 'Voted in Delhi-NCR', icon: <ShieldCheck size={20} color="#10B981" /> }
        ];
      case 'Contact':
        return [
          { value: '< 15m', label: 'Emergency Help', sublabel: '108 Fleet Dispatch', icon: <Clock size={20} color="#E11D48" /> },
          { value: '500+', label: 'Valet Parking', sublabel: 'Multi-Level Campus', icon: <Building2 size={20} color="#0E56A8" /> },
          { value: '24/7', label: 'Trauma & Meds', sublabel: 'Round-the-Clock Desk', icon: <Activity size={20} color="#00BFA5" /> },
          { value: '100%', label: 'Cashless TPA', sublabel: '40+ Insurers Covered', icon: <ShieldCheck size={20} color="#10B981" /> }
        ];
      case 'Book Appointment':
        return [
          { value: 'Instant', label: 'Digital Token', sublabel: 'Zero Counter Queue', icon: <Clock size={20} color="#10B981" /> },
          { value: '0 Min', label: 'Counter Wait', sublabel: 'Guaranteed Priority', icon: <CheckCircle2 size={20} color="#00BFA5" /> },
          { value: '150+', label: 'Super Doctors', sublabel: 'All Specialities', icon: <Users size={20} color="#0E56A8" /> },
          { value: 'Free', label: 'Rescheduling', sublabel: 'Flexible OPD Times', icon: <ShieldCheck size={20} color="#F59E0B" /> }
        ];
      default:
        return [
          { value: 'NABH', label: 'Quality Standard', sublabel: 'Certified Healthcare', icon: <ShieldCheck size={20} color="#0E56A8" /> },
          { value: '24/7', label: 'Emergency Care', sublabel: 'Round-the-Clock', icon: <Activity size={20} color="#00BFA5" /> },
          { value: '150+', label: 'Specialists', sublabel: 'Senior Faculty', icon: <Users size={20} color="#10B981" /> },
          { value: '4.9 ★', label: 'Patient Trust', sublabel: 'Verified Feedback', icon: <Star size={20} color="#F59E0B" /> }
        ];
    }
  };

  // Get default highlights per page
  const getDefaultHighlights = (): PageHighlight[] => {
    switch (currentPage) {
      case 'Specialties':
        return [
          { text: 'Dual NABH & JCI Accredited Excellence' },
          { text: 'DaVinci 4th-Gen Robotic Surgical Technology' },
          { text: '24/7 Level-1 Emergency & Flat-Panel Cath Lab' },
          { text: '40+ Cashless TPA / Insurance Empanelled' }
        ];
      case 'Doctors':
        return [
          { text: 'Board-Certified AIIMS & Global Specialists' },
          { text: 'Guaranteed Zero-Queue OPD Time Slots' },
          { text: '4.9★ Average Verified Patient Score' },
          { text: 'In-Clinic & Virtual Video OPD Consults' }
        ];
      case 'Health Packages':
        return [
          { text: 'NABL-Accredited Automated Pathology' },
          { text: 'Same-Day Digital Lab Reports on WhatsApp' },
          { text: 'Complimentary Senior Doctor Consultation' },
          { text: 'Free Home Sample Collection Facility' }
        ];
      case 'Facilities':
        return [
          { text: '450-Bed High-Tech Inpatient Hospital' },
          { text: 'Class-100 Laminar Flow Sterile OTs' },
          { text: 'Level-III Neonatal & Paediatric ICUs' },
          { text: 'Next-Gen 3.0T MRI & Spectral CT Suite' }
        ];
      case 'Testimonials':
        return [
          { text: 'Over 1,50,000+ Happy Recoveries' },
          { text: '100% Authentic Verified Patient Stories' },
          { text: 'Voted #1 Super-Speciality Hospital in NCR' },
          { text: '98.6% Family Recommendation Rate' }
        ];
      case 'Contact':
        return [
          { text: '24/7 Emergency & Level-1 Trauma Care' },
          { text: 'GPS-Tracked 108 Ambulance Dispatch' },
          { text: 'Direct Metro Connectivity (Gate 2)' },
          { text: 'Dedicated Cashless Insurance Helpdesk' }
        ];
      case 'Book Appointment':
        return [
          { text: 'Guaranteed Instant Slot Confirmation' },
          { text: 'SMS & WhatsApp Digital OPD Passes' },
          { text: 'Zero Advance Consultation Fee' },
          { text: '100% HIPAA Patient Data Privacy' }
        ];
      default:
        return [
          { text: 'NABH & JCI Accredited Hospital' },
          { text: '24/7 Dedicated Emergency Care' },
          { text: 'Cashless Mediclaim with 40+ TPAs' }
        ];
    }
  };

  const activeStats = stats || getDefaultStats();
  const activeHighlights = highlights || getDefaultHighlights();

  return (
    <div className="subpage-hero-banner">
      {/* Ambient background decoration */}
      <div className="subpage-hero-ambient-glow" />
      <div className="subpage-hero-pattern" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <div className="subpage-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="breadcrumb-arrow" />
          <span className="breadcrumb-current">{currentPage}</span>
        </div>

        {/* Header Main Grid */}
        <div className="subpage-header-grid">
          {/* Left Column: Title, Badge, Description, Highlights */}
          <div className="subpage-header-left">
            <div className="subpage-badge">
              <span className="subpage-badge-pulse" />
              <span>{badge}</span>
            </div>

            <h1 className="subpage-title">{title}</h1>

            <p className="subpage-desc">{description}</p>

            {/* Feature Highlights Pills */}
            {activeHighlights.length > 0 && (
              <div className="subpage-highlights-row">
                {activeHighlights.map((hl, idx) => (
                  <div key={idx} className="subpage-highlight-chip">
                    <span className="highlight-icon">
                      {hl.icon || <Check size={12} strokeWidth={3} />}
                    </span>
                    <span>{hl.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Visual Metrics Showcase Card */}
          <div className="subpage-header-right">
            {extraWidget ? (
              extraWidget
            ) : (
              <div className="subpage-stats-card">
                {/* Card Header */}
                <div className="subpage-stats-card-header">
                  <div className="stats-card-tag">
                    <ShieldCheck size={14} />
                    <span>CLINICAL BENCHMARKS</span>
                  </div>
                  <div className="stats-card-status">
                    <span className="status-dot-live" />
                    <span>24/7 Verified</span>
                  </div>
                </div>

                {/* 2x2 Stats Grid */}
                <div className="subpage-stats-grid">
                  {activeStats.map((item, idx) => (
                    <div key={idx} className="subpage-stat-item">
                      <div className="stat-icon-wrapper">
                        {item.icon}
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{item.value}</div>
                        <div className="stat-label">{item.label}</div>
                        {item.sublabel && (
                          <div className="stat-sublabel">{item.sublabel}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Action Buttons */}
                <div className="subpage-stats-actions">
                  {onOpenBooking ? (
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="btn btn-primary btn-md subpage-btn-action"
                    >
                      <Calendar size={16} />
                      <span>Book Appointment</span>
                    </button>
                  ) : (
                    <Link
                      to="/book-appointment"
                      className="btn btn-primary btn-md subpage-btn-action"
                    >
                      <Calendar size={16} />
                      <span>Book Appointment</span>
                    </Link>
                  )}

                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyNumber.replace(/[^0-9]/g, '')}`}
                    className="btn btn-emergency btn-md subpage-btn-action"
                  >
                    <Phone size={16} />
                    <span>24/7 Helpline</span>
                  </a>
                </div>

                {/* Micro-Trust Footer */}
                <div className="subpage-card-footer">
                  <CheckCircle2 size={13} color="var(--primary)" />
                  <span>NABH & JCI Certified • Cashless Insurance with 40+ TPAs</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
