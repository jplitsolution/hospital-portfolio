import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ContactSection } from '../components/contact/ContactSection';

interface Props {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<Props> = ({ onOpenBooking }) => {
  return (
    <div className="subpage-wrapper">
      <PageHeader
        badge="24/7 EMERGENCY & ADMISSIONS"
        title="Contact Gaikwad Critical Care Hospital"
        description="Advanced Critical Care Facility strategically located in Reshim Bagh, Nagpur with 24x7 ICU & Emergency Care, ventilator support, and direct ambulance access."
        currentPage="Contact"
        onOpenBooking={onOpenBooking}
      />

      <ContactSection />
    </div>
  );
};
