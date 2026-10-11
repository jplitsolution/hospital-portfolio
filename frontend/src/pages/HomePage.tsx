import React from 'react';
import { HeroBentoGrid } from '../components/home/HeroBentoGrid';
import { TrustAndStats } from '../components/home/TrustAndStats';
import { SpecialtiesSection } from '../components/specialties/SpecialtiesSection';
import { DoctorDirectory } from '../components/doctors/DoctorDirectory';
import { FacilitiesSection } from '../components/facilities/FacilitiesSection';
import { HealthPackagesSection } from '../components/packages/HealthPackagesSection';
import { InsuranceTpaSection } from '../components/insurance/InsuranceTpaSection';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { BlogSection } from '../components/blog/BlogSection';
import { ContactSection } from '../components/contact/ContactSection';
import { Doctor, HealthPackage } from '../data/hospitalData';

interface Props {
  onOpenBooking: (doctor?: Doctor | null, deptId?: string | null) => void;
  onOpenDoctorFinder: () => void;
  onOpenReports: () => void;
  onBookPackage: (pkg: HealthPackage) => void;
}

export const HomePage: React.FC<Props> = ({
  onOpenBooking,
  onOpenDoctorFinder,
  onOpenReports,
  onBookPackage
}) => {
  return (
    <div className="home-page-container">
      {/* 1. Hero Section with Bento Grid */}
      <HeroBentoGrid
        onOpenBooking={() => onOpenBooking()}
        onOpenDoctorFinder={onOpenDoctorFinder}
        onOpenReports={onOpenReports}
      />

      {/* 2. Trust Badges & Hospital Stats */}
      <TrustAndStats />

      {/* 3. Clinical Specialties Showcase */}
      <SpecialtiesSection
        onSelectDepartment={(deptId) => {
          onOpenBooking(null, deptId);
        }}
        onOpenBookingForDept={(deptId) => onOpenBooking(null, deptId)}
      />

      {/* 4. Senior Consultants & Specialists Directory */}
      <DoctorDirectory
        onBookDoctor={(doc) => onOpenBooking(doc)}
      />

      {/* 5. Hospital Facilities & Lightbox Gallery */}
      <FacilitiesSection />

      {/* 6. Health Packages Section */}
      <HealthPackagesSection onBookPackage={onBookPackage} />

      {/* 7. 100% Cashless Mediclaim Network */}
      <InsuranceTpaSection />

      {/* 8. Patient Recovery Stories */}
      <TestimonialsSection />

      {/* 9. Hospital Blog & Wellness Articles */}
      <BlogSection />

      {/* 10. Contact, Emergency & Campus Location */}
      <ContactSection />
    </div>
  );
};
