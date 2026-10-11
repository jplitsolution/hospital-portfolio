import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { EmergencyTopBar } from './components/layout/EmergencyTopBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { SpecialtyDetailPage } from './pages/SpecialtyDetailPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { BookingPage } from './pages/BookingPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQChatbot } from './components/common/FAQChatbot';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';
import { DoctorFinderModal } from './components/doctors/DoctorFinderModal';
import { DownloadReportsModal } from './components/reports/DownloadReportsModal';
import { Doctor, HealthPackage } from './data/hospitalData';

export function App() {
  const navigate = useNavigate();

  // Theme & Accessibility States
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('auracare_theme') as 'light' | 'dark') || 'light';
  });
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Modals for ancillary tools
  const [isDoctorFinderOpen, setIsDoctorFinderOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  // Sync Theme & Accessibility to HTML root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auracare_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  // Route to dedicated Booking Page with query parameters
  const handleOpenBooking = (doctor?: Doctor | null, deptId?: string | null) => {
    const params = new URLSearchParams();
    if (doctor?.id) params.set('doctorId', doctor.id);
    if (deptId) params.set('deptId', deptId);
    const query = params.toString() ? `?${params.toString()}` : '';
    navigate(`/book-appointment${query}`);
  };

  const handleBookPackage = (pkg: HealthPackage) => {
    navigate(`/book-appointment?packageId=${pkg.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Route-change scroll reset */}
      <ScrollToTop />

      {/* 1. 24x7 Emergency Sticky Bar */}
      <EmergencyTopBar
        theme={theme}
        toggleTheme={toggleTheme}
        highContrast={highContrast}
        toggleHighContrast={toggleHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* 2. Main Navigation Header with Active Route Highlighting */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenReports={() => setIsReportsOpen(true)}
      />

      {/* 3. Main Multi-Page Routed Views */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onOpenDoctorFinder={() => setIsDoctorFinderOpen(true)}
                onOpenReports={() => setIsReportsOpen(true)}
                onBookPackage={handleBookPackage}
              />
            }
          />

          {/* Specialties Overview & Details */}
          <Route
            path="/specialties"
            element={
              <SpecialtiesPage
                onOpenBooking={handleOpenBooking}
              />
            }
          />
          <Route
            path="/specialties/:id"
            element={<SpecialtyDetailPage />}
          />

          {/* Doctors Directory & Details */}
          <Route
            path="/doctors"
            element={
              <DoctorsPage
                onBookDoctor={handleOpenBooking}
                onOpenDoctorFinder={() => setIsDoctorFinderOpen(true)}
              />
            }
          />
          <Route
            path="/doctors/:id"
            element={<DoctorDetailPage />}
          />

          {/* Health Packages Overview & Details */}
          <Route
            path="/packages"
            element={
              <PackagesPage
                onBookPackage={handleBookPackage}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/packages/:id"
            element={<PackageDetailPage />}
          />

          {/* Facilities Infrastructure & Details (Replaces modal) */}
          <Route
            path="/facilities"
            element={
              <FacilitiesPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/facilities/:id"
            element={<FacilityDetailPage />}
          />

          {/* Dedicated Separate Booking Page */}
          <Route
            path="/book-appointment"
            element={<BookingPage />}
          />

          {/* Testimonials & Patient Stories */}
          <Route
            path="/testimonials"
            element={
              <TestimonialsPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* Contact, Emergency & Campus Location */}
          <Route
            path="/contact"
            element={
              <ContactPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onOpenDoctorFinder={() => setIsDoctorFinderOpen(true)}
                onOpenReports={() => setIsReportsOpen(true)}
                onBookPackage={handleBookPackage}
              />
            }
          />
        </Routes>
      </main>

      {/* 4. Comprehensive Footer with Route Links */}
      <Footer />

      {/* 5. Floating Interactive Assistants */}
      <FAQChatbot onOpenBooking={() => handleOpenBooking()} />
      <WhatsAppFloating />

      {/* 6. Ancillary Modals */}
      <DoctorFinderModal
        isOpen={isDoctorFinderOpen}
        onClose={() => setIsDoctorFinderOpen(false)}
        onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
      />

      <DownloadReportsModal
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />
    </div>
  );
}

export default App;
