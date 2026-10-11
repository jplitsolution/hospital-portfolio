import React, { useState } from 'react';
import { X, Stethoscope, ArrowRight, CheckCircle2, Search, RotateCcw, Sparkles } from 'lucide-react';
import { DEPARTMENTS, DOCTORS, Doctor } from '../../data/hospitalData';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctorToBook: (doctor: Doctor) => void;
}

export const DoctorFinderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectDoctorToBook
}) => {
  useLockBodyScroll(isOpen);

  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  // Flatten all symptoms from departments with clean short names
  const allSymptoms = DEPARTMENTS.flatMap(d => {
    const shortName = d.name.includes('&') ? d.name.split('&')[0].trim() : d.name.split('(')[0].trim();
    return d.symptoms.map(s => ({
      symptom: s,
      deptId: d.id,
      deptName: d.name,
      deptShortName: shortName
    }));
  });

  // Toggle selection: click to select, click again to deselect
  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptom(prev => (prev === symptom ? null : symptom));
  };

  // Filter symptoms by category and search query
  const filteredSymptoms = allSymptoms.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.deptId === activeCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      item.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deptName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Category filter tabs with clean concise names
  const categoryTabs = [
    { id: 'all', label: `All (${allSymptoms.length})` },
    { id: 'dept-cardio', label: 'Cardiology' },
    { id: 'dept-ortho', label: 'Orthopaedics' },
    { id: 'dept-neuro', label: 'Neurology' },
    { id: 'dept-paediatrics', label: 'Paediatrics' },
    { id: 'dept-gynae', label: 'Gynaecology' },
    { id: 'dept-onco', label: 'Oncology' },
    { id: 'dept-gastro', label: 'Gastroenterology' },
  ];

  // Find matching department & doctors for the selected symptom
  const matchingDept = selectedSymptom
    ? DEPARTMENTS.find(d => d.symptoms.includes(selectedSymptom))
    : null;

  const matchingDoctors = matchingDept
    ? DOCTORS.filter(doc => doc.departmentId === matchingDept.id)
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content doctor-finder-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="df-header">
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              marginBottom: '4px'
            }}>
              <Stethoscope size={14} />
              <span>SMART SYMPTOM TRIAGE</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--dark-navy)' }}>
              Interactive Doctor Finder
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Select your symptom below to discover the right specialist. Click an active symptom again to deselect.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            title="Close dialog"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="df-body">
          {/* Triage Controls: Search Bar & Category Filter Pills */}
          <div className="symptom-triage-controls">
            {/* Search Bar */}
            <div className="symptom-search-bar">
              <Search size={15} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search symptom (e.g. chest pain, headache, knee pain...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="symptom-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--text-muted)', padding: '2px 4px' }}
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="symptom-category-pills">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`symptom-cat-btn ${activeCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Heading & Counter */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Clinical Symptoms ({filteredSymptoms.length}):
            </div>
            {selectedSymptom && (
              <button
                onClick={() => setSelectedSymptom(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--emergency)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} />
                <span>Clear Selection</span>
              </button>
            )}
          </div>

          {/* Aligned Grid of Unique Symptom Cards (No Checkboxes) */}
          <div className="symptom-cards-grid">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map(({ symptom, deptShortName }) => {
                const isSelected = selectedSymptom === symptom;
                return (
                  <div
                    key={symptom}
                    onClick={() => handleToggleSymptom(symptom)}
                    className={`symptom-card-item ${isSelected ? 'selected' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggleSymptom(symptom);
                      }
                    }}
                    title={isSelected ? 'Click again to deselect' : 'Click to select'}
                  >
                    <div className="card-content-left">
                      <span className="symptom-beacon" />
                      <div className="symptom-details">
                        <div className="symptom-title">
                          {symptom}
                        </div>
                        <div className="symptom-dept-badge">
                          {deptShortName}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                No symptoms found for "{searchQuery}". Try a different keyword or category.
              </div>
            )}
          </div>

          {/* Result & Recommendation Section */}
          {matchingDept ? (
            <div style={{
              backgroundColor: 'var(--primary-light)',
              border: '1.5px solid var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 18px',
              animation: 'fadeIn 0.2s ease-out',
              marginTop: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  <CheckCircle2 size={17} />
                  <span>Recommended: {matchingDept.name}</span>
                </div>

                <button
                  onClick={() => setSelectedSymptom(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    color: 'var(--text-main)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Deselect symptom"
                >
                  <X size={11} />
                  <span>Deselect</span>
                </button>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.4 }}>
                For symptom <strong>"{selectedSymptom}"</strong>, our {matchingDept.name} department specialists provide targeted diagnosis and evidence-based care.
              </p>

              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark-navy)', marginBottom: '8px' }}>
                Specialists on Duty:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {matchingDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border-subtle)',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {doc.designation} • {doc.experienceYears}+ Yrs Exp
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectDoctorToBook(doc);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                    >
                      <span>Book with Doctor</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              padding: '18px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-subtle)',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.84rem'
            }}>
              <Sparkles size={20} color="var(--primary)" style={{ margin: '0 auto 6px auto' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                Click any symptom card above to discover specialist doctors on duty.
              </div>
              <div style={{ fontSize: '0.78rem' }}>
                Clicking the selected card again will deselect it. No checkboxes needed.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
