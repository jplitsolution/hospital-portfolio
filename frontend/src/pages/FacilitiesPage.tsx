import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { FacilitiesSection } from '../components/facilities/FacilitiesSection';

interface Props {
  onOpenBooking: () => void;
}

export const FacilitiesPage: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="WORLD-CLASS INFRASTRUCTURE"
        title="Modern Hospital Facilities & ICU Units"
        description="Experience 450-bed inpatient capacity, Level-III Neonatal ICU, modular positive-pressure surgical theatres, and advanced 3.0T MRI diagnostic suites."
        currentPage="Facilities"
        onOpenBooking={onOpenBooking}
      />

      <FacilitiesSection isSubpage={true} />
    </div>
  );
};
