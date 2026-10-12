import React from 'react';
import { HeroBentoGrid } from '../components/home/HeroBentoGrid';
import { TrustAndStats } from '../components/home/TrustAndStats';
import { SpecialtiesSection } from '../components/specialties/SpecialtiesSection';
import { SymptomTriageSection } from '../components/home/SymptomTriageSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { DirectorMessageSection } from '../components/home/DirectorMessageSection';
import { DoctorDirectory } from '../components/doctors/DoctorDirectory';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { PatientGuidesSection } from '../components/home/PatientGuidesSection';
import { HealthPackagesSection } from '../components/packages/HealthPackagesSection';
import { FacilitiesSection } from '../components/facilities/FacilitiesSection';
import { InsuranceTpaSection } from '../components/insurance/InsuranceTpaSection';
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
      {/* 1. Hero Section matching PDF Page 1 (Cloudnine header + Lilavati 5 quick links) */}
      <HeroBentoGrid
        onOpenBooking={() => onOpenBooking()}
        onOpenDoctorFinder={onOpenDoctorFinder}
        onOpenReports={onOpenReports}
      />

      {/* 2. Big-Number Strip with Vertical Dividers matching PDF Page 1 */}
      <TrustAndStats />

      {/* 3. Our Specialities & Services with Department Photo + Specialty Cards with Images instead of icons (as in user screenshot) */}
      <SpecialtiesSection
        onSelectDepartment={(deptId) => {
          onOpenBooking(null, deptId);
        }}
        onOpenBookingForDept={(deptId) => onOpenBooking(null, deptId)}
      />

      {/* 4. What are you feeling? (8 Symptom Cards) matching PDF Page 2 */}
      <SymptomTriageSection
        onSelectDepartment={(deptId) => onOpenBooking(null, deptId)}
      />

      {/* 5. Why Families Choose Gaikwad (Bedside care photo + 5-point checklist) matching PDF Page 2 */}
      <WhyChooseUsSection />

      {/* 6. Message from the Director (Director portrait photo + Dark slate card) matching PDF Page 3 */}
      <DirectorMessageSection />

      {/* 7. Meet Our Doctors (Senior specialists with photos & View all doctors link) matching PDF Page 3 */}
      <DoctorDirectory
        onBookDoctor={(doc) => onOpenBooking(doc)}
      />

      {/* 8. Patient Stories (Video thumbnail cards with play buttons) matching PDF Page 3 & 4 */}
      <TestimonialsSection />

      {/* 9. Recognitions & Accreditations strip + For Patients & Visitors (4 cards) matching PDF Page 4 */}
      <PatientGuidesSection />

      {/* 10. Preventive Health Checkup Packages (Dark teal banner container) matching PDF Page 4 */}
      <HealthPackagesSection onBookPackage={onBookPackage} />

      {/* 11. Hospital Facilities & Infrastructure Showcase */}
      <FacilitiesSection />

      {/* 12. Cashless Mediclaim & TPA Partners */}
      <InsuranceTpaSection />

      {/* 13. Health Updates From Our Doctors (Blog cards with photos) matching PDF Page 5 */}
      <BlogSection />

      {/* 14. Request an Appointment & Contact / Map Location matching PDF Page 5 */}
      <ContactSection />
    </div>
  );
};
