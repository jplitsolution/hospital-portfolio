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
        title="Contact AuraCare Hospital Campus"
        description="Strategically located in Sector 44, New Delhi with 24/7 emergency trauma access, dedicated multi-level visitor parking, and immediate metro connectivity."
        currentPage="Contact"
        onOpenBooking={onOpenBooking}
      />

      <ContactSection />
    </div>
  );
};
