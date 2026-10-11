import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { HealthPackagesSection } from '../components/packages/HealthPackagesSection';
import { HealthPackage } from '../data/hospitalData';

interface Props {
  onBookPackage: (pkg: HealthPackage) => void;
  onOpenBooking: () => void;
}

export const PackagesPage: React.FC<Props> = ({ onBookPackage, onOpenBooking }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="PREVENTIVE HEALTHCARE"
        title="Comprehensive Health Checkup Packages"
        description="Early diagnosis saves lives. Choose from specially curated full-body checkups, cardiac evaluations, and diabetes monitoring packages with accredited pathology testing."
        currentPage="Health Packages"
        onOpenBooking={onOpenBooking}
      />

      <HealthPackagesSection onBookPackage={onBookPackage} isSubpage={true} />
    </div>
  );
};
