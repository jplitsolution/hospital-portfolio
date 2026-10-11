import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { SpecialtiesSection } from '../components/specialties/SpecialtiesSection';
import { InsuranceTpaSection } from '../components/insurance/InsuranceTpaSection';

interface Props {
  onOpenBooking: (doctor?: any, deptId?: string | null) => void;
}

export const SpecialtiesPage: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="SUPER-SPECIALITY DEPARTMENTS"
        title="Centres of Clinical Excellence"
        description="Our NABH & JCI accredited super-speciality centres feature robotic surgery systems, flat-panel catheterisation labs, modular laminar airflow theatres, and dedicated intensive care units."
        currentPage="Specialties"
        onOpenBooking={() => onOpenBooking()}
      />

      <SpecialtiesSection
        isSubpage={true}
        onSelectDepartment={(deptId) => onOpenBooking(null, deptId)}
        onOpenBookingForDept={(deptId) => onOpenBooking(null, deptId)}
      />

      <InsuranceTpaSection />
    </div>
  );
};
