import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { TrustAndStats } from '../components/home/TrustAndStats';
import { InsuranceTpaSection } from '../components/insurance/InsuranceTpaSection';

interface Props {
  onOpenBooking: () => void;
}

export const TestimonialsPage: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="PATIENT SUCCESS STORIES"
        title="Trusted by Over 1,50,000+ Families"
        description="Read firsthand recovery journeys, verified Google Reviews, and heartfelt clinical feedback from patients treated at Gaikwad Critical Care Hospital, Nagpur."
        currentPage="Testimonials"
        onOpenBooking={onOpenBooking}
      />

      <TestimonialsSection isSubpage={true} />
      <TrustAndStats />
      <InsuranceTpaSection />
    </div>
  );
};
