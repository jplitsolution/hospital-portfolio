export interface Department {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  keyServices: string[];
  headDoctor: string;
  symptoms: string[];
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  qualifications: string;
  experienceYears: number;
  opdFee: number;
  rating: number;
  reviewsCount: number;
  roomNumber: string;
  availableDays: string[];
  availableSlots: string[];
  languages: string[];
  photoUrl: string;
  bio: string;
}

export interface HealthPackage {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  originalPrice: number;
  discountedPrice: number;
  fastingRequired: boolean;
  totalTests: number;
  includedTests: string[];
  recommendedFor: string;
}

export interface Facility {
  id: string;
  title: string;
  category: 'ICU' | 'OT' | 'ROOMS' | 'DIAGNOSTICS' | 'PHARMACY';
  description: string;
  imageUrl: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  quote: string;
  doctorName: string;
  date: string;
  avatarUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorDoctor: string;
  readTime: string;
  publishDate: string;
  coverImage: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'OPD' | 'EMERGENCY' | 'INSURANCE' | 'REPORTS' | 'VISITORS';
}

export const HOSPITAL_INFO = {
  name: 'AuraCare Superspeciality Hospital',
  tagline: 'Compassionate Care, Advanced Technology',
  description: 'A 450-bed NABH & JCI accredited premier hospital offering super-specialised clinical excellence, world-class modular operation theatres, and 24/7 dedicated emergency care.',
  emergencyNumber: '011-4771-9999',
  ambulanceNumber: '108 / +91-9871-108108',
  opdBoardline: '011-4771-0000',
  whatsappNumber: '+919871108108',
  email: 'care@auracarehospital.com',
  address: 'Plot 12, Institutional Area, Sector 44, New Delhi - 110003',
  landmark: 'Near Metro Station & NH-48 Expressway',
  opdTimings: 'Monday – Saturday: 08:30 AM – 08:00 PM | Sunday: 09:00 AM – 02:00 PM',
  emergencyTimings: '24 Hours, 365 Days Open',
  stats: {
    specialists: '45+',
    departments: '18+',
    patientsServed: '1,50,000+',
    bedCount: '450+',
    rating: '4.8'
  }
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cardio',
    name: 'Cardiology & Cardiac Surgery',
    slug: 'cardiology',
    icon: 'Heart',
    shortDesc: 'Comprehensive care for heart disorders, primary angioplasty, and bypass surgery.',
    fullDesc: 'Our Centre of Excellence in Cardiac Sciences features 2 dedicated Flat-Panel Cath Labs, modular cardiac operation theatres, and a 24/7 STEMI heart attack intervention team.',
    keyServices: ['Coronary Angiography & Angioplasty', 'CABG (Bypass Surgery)', 'Pacemaker & TAVI', 'Echocardiography & TMT'],
    headDoctor: 'Dr. Arvind Sharma',
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Heart Palpitations', 'High Blood Pressure', 'Dizziness']
  },
  {
    id: 'dept-ortho',
    name: 'Orthopaedics & Joint Replacement',
    slug: 'orthopaedics',
    icon: 'Bone',
    shortDesc: 'Robotic knee replacement, trauma surgery, sports injury rehabilitation.',
    fullDesc: 'Advanced robotic-assisted knee and hip replacements, arthroscopy, spine surgery, and 24/7 trauma care backed by modern laminar airflow theatres.',
    keyServices: ['Robotic Knee Replacement', 'Hip Replacement', 'Arthroscopy & Sports Injury', 'Spine & Disc Surgery'],
    headDoctor: 'Dr. Rajesh Mehra',
    symptoms: ['Knee Pain', 'Joint Stiffness', 'Back Pain', 'Fracture / Bone Injury', 'Sciatica']
  },
  {
    id: 'dept-neuro',
    name: 'Neurosciences (Neurology & Neurosurgery)',
    slug: 'neurology',
    icon: 'Brain',
    shortDesc: 'Advanced brain and spine surgery, stroke management, and epilepsy care.',
    fullDesc: 'Equipped with neuro-navigation systems, operating microscopes, and a dedicated 20-bed Neuro ICU to treat stroke, brain tumors, and neuromuscular disorders.',
    keyServices: ['Acute Stroke Thrombolysis', 'Brain Tumor Surgery', 'Epilepsy & Migraine Clinic', 'Deep Brain Stimulation'],
    headDoctor: 'Dr. Sunita Kapoor',
    symptoms: ['Severe Headache / Migraine', 'Memory Loss', 'Seizures / Fits', 'Numbness / Weakness', 'Tremors']
  },
  {
    id: 'dept-paediatrics',
    name: 'Paediatrics & Neonatology (NICU)',
    slug: 'paediatrics',
    icon: 'Baby',
    shortDesc: 'Dedicated Level-III NICU, child vaccination, pediatric intensive care.',
    fullDesc: 'Child-friendly environment with 24/7 pediatric emergency coverage, neonatal intensive care unit for premature babies, and developmental clinics.',
    keyServices: ['Level-III Neonatal ICU (NICU)', 'Pediatric Surgery', 'Child Immunization', 'Developmental Assessment'],
    headDoctor: 'Dr. Priya Nambiar',
    symptoms: ['Child Fever', 'Delayed Milestones', 'Persistent Cough in Child', 'Infant Feeding Issues', 'Vaccination Due']
  },
  {
    id: 'dept-gynae',
    name: 'Obstetrics & Gynaecology',
    slug: 'gynaecology',
    icon: 'Users',
    shortDesc: 'Painless normal delivery, high-risk pregnancy care, laparoscopic surgery.',
    fullDesc: 'Specialized suite for maternal care, painless labor techniques (LDR rooms), fertility workup, and minimally invasive laparoscopic gynecological surgeries.',
    keyServices: ['Painless Delivery (LDR Rooms)', 'High-Risk Pregnancy Management', 'Laparoscopic Hysterectomy', 'PCOS & Fertility Care'],
    headDoctor: 'Dr. Meenakshi Sundaram',
    symptoms: ['Pregnancy Consultation', 'Irregular Periods / PCOS', 'Pelvic Pain', 'Heavy Bleeding', 'Menopause Issues']
  },
  {
    id: 'dept-onco',
    name: 'Oncology & Cancer Care',
    slug: 'oncology',
    icon: 'Activity',
    shortDesc: 'Comprehensive cancer therapy: Surgical, Medical Chemotherapy, and Daycare.',
    fullDesc: 'Multi-disciplinary Tumor Board approach, modern targeted chemotherapy daycare, surgical oncology, and patient-centric cancer rehabilitation.',
    keyServices: ['Chemotherapy & Immunotherapy', 'Surgical Oncology', 'Cancer Screening Packages', 'Palliative & Pain Relief'],
    headDoctor: 'Dr. Vikram Malhotra',
    symptoms: ['Unexplained Weight Loss', 'Lump or Swelling', 'Abnormal Bleeding', 'Chronic Fatigue', 'Persistent Hoarseness']
  },
  {
    id: 'dept-gastro',
    name: 'Gastroenterology & Hepatology',
    slug: 'gastroenterology',
    icon: 'Shield',
    shortDesc: 'Advanced endoscopy, liver disease treatment, laparoscopic GI surgery.',
    fullDesc: 'Complete digestive disease diagnosis and intervention, high-definition video endoscopes, colonoscopy, and specialized liver disease care.',
    keyServices: ['Upper GI Endoscopy & Colonoscopy', 'Liver Cirrhosis & Fatty Liver Clinic', 'ERCP', 'Gallbladder Stone Surgery'],
    headDoctor: 'Dr. Rakesh Singhal',
    symptoms: ['Severe Acidity / GERD', 'Abdominal Pain', 'Jaundice / Yellow Eyes', 'Blood in Stool', 'Persistent Vomiting']
  },
  {
    id: 'dept-derma',
    name: 'Dermatology & Cosmetology',
    slug: 'dermatology',
    icon: 'Sparkles',
    shortDesc: 'Clinical dermatology, laser treatments, allergy and hair care.',
    fullDesc: 'Evidence-based clinical skincare for eczema, psoriasis, acne, and advanced aesthetic dermatology using US-FDA approved technologies.',
    keyServices: ['Acne & Scar Laser Treatment', 'Psoriasis & Eczema Care', 'Hair Loss Therapy (PRP)', 'Skin Allergy Testing'],
    headDoctor: 'Dr. Ananya Sen',
    symptoms: ['Skin Rashes', 'Severe Acne', 'Sudden Hair Fall', 'Itching & Allergy', 'Psoriasis Patches']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Arvind Sharma',
    departmentId: 'dept-cardio',
    departmentName: 'Cardiology',
    designation: 'Director & Chief Interventional Cardiologist',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    experienceYears: 22,
    opdFee: 1000,
    rating: 4.9,
    reviewsCount: 420,
    roomNumber: 'OPD Suite 101 (First Floor)',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM', '12:00 PM', '04:00 PM', '04:30 PM'],
    languages: ['English', 'Hindi', 'Punjabi'],
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    bio: 'Dr. Sharma has performed over 12,000 successful coronary angioplasties and complex heart interventions. Former Senior Professor at AIIMS.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Nambiar',
    departmentId: 'dept-paediatrics',
    departmentName: 'Paediatrics & NICU',
    designation: 'Senior Consultant & Head - Neonatal Care',
    qualifications: 'MBBS, DCH, MD (Paediatrics), Fellowship in Neonatology (UK)',
    experienceYears: 16,
    opdFee: 800,
    rating: 4.9,
    reviewsCount: 310,
    roomNumber: 'Child Care Wing, Room 204',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['10:00 AM', '10:45 AM', '11:30 AM', '02:00 PM', '03:00 PM', '05:00 PM'],
    languages: ['English', 'Hindi', 'Malayalam'],
    photoUrl: 'https://images.unsplash.com/photo-1594824813590-410a71146244?auto=format&fit=crop&q=80&w=600',
    bio: 'Specialist in high-risk newborn care, neonatal survival, and pediatric respiratory conditions. Dedicated to gentle, kid-friendly clinical treatment.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Mehra',
    departmentId: 'dept-ortho',
    departmentName: 'Orthopaedics',
    designation: 'Senior Consultant - Robotic Joint Replacement',
    qualifications: 'MBBS, MS (Ortho), M.Ch (Ortho - UK), Fellowship in Arthroscopy',
    experienceYears: 19,
    opdFee: 900,
    rating: 4.8,
    reviewsCount: 295,
    roomNumber: 'Bone & Joint Clinic, Suite 108',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableSlots: ['11:00 AM', '11:45 AM', '12:30 PM', '03:30 PM', '04:15 PM'],
    languages: ['English', 'Hindi'],
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    bio: 'Pioneer in computer navigation and robotic-assisted total knee replacements with minimal recovery downtime and fast patient mobilization.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sunita Kapoor',
    departmentId: 'dept-neuro',
    departmentName: 'Neurosciences',
    designation: 'Principal Consultant - Neurology & Stroke',
    qualifications: 'MBBS, MD, DM (Neurology), FINR (Neuro-Intervention)',
    experienceYears: 17,
    opdFee: 950,
    rating: 4.9,
    reviewsCount: 180,
    roomNumber: 'Neuro Care Lounge, Room 302',
    availableDays: ['Monday', 'Tuesday', 'Friday', 'Saturday'],
    availableSlots: ['10:30 AM', '11:15 AM', '12:00 PM', '02:30 PM', '03:45 PM'],
    languages: ['English', 'Hindi'],
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    bio: 'Specializes in hyper-acute stroke intervention, headache disorders, neuromuscular illnesses, and long-term Parkinson’s disease management.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Meenakshi Sundaram',
    departmentId: 'dept-gynae',
    departmentName: 'Obstetrics & Gynaecology',
    designation: 'Head of Women’s Health & Minimal Access Surgery',
    qualifications: 'MBBS, MS (OBG), DNB, Fellowship in Advanced Laparoscopy',
    experienceYears: 20,
    opdFee: 850,
    rating: 4.9,
    reviewsCount: 520,
    roomNumber: 'Mother & Child Centre, Suite 210',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '04:00 PM', '05:30 PM'],
    languages: ['English', 'Hindi', 'Tamil'],
    photoUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600',
    bio: 'Over 6,000 safe deliveries conducted. Expert in high-risk pregnancy management, painless childbirth, and robotic hysterectomy.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Vikram Malhotra',
    departmentId: 'dept-onco',
    departmentName: 'Oncology',
    designation: 'Senior Consultant - Medical & Surgical Oncology',
    qualifications: 'MBBS, MS (Surgery), M.Ch (Surgical Oncology - Tata Memorial)',
    experienceYears: 18,
    opdFee: 1100,
    rating: 4.8,
    reviewsCount: 140,
    roomNumber: 'Cancer Care Centre, Room 405',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableSlots: ['11:00 AM', '12:00 PM', '02:00 PM', '03:30 PM'],
    languages: ['English', 'Hindi'],
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    bio: 'Trained at Tata Memorial Hospital. Renowned for organ-sparing cancer surgeries, breast reconstruction, and personalized immunotherapy.'
  },
  {
    id: 'doc-7',
    name: 'Dr. Rakesh Singhal',
    departmentId: 'dept-gastro',
    departmentName: 'Gastroenterology',
    designation: 'Consultant - Gastroenterology & Hepatology',
    qualifications: 'MBBS, MD, DM (Gastroenterology)',
    experienceYears: 14,
    opdFee: 850,
    rating: 4.7,
    reviewsCount: 165,
    roomNumber: 'Digestive Care, Room 112',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '04:00 PM'],
    languages: ['English', 'Hindi'],
    photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600',
    bio: 'Specialist in therapeutic endoscopy, fatty liver reversal protocols, and chronic inflammatory bowel disease (IBD) treatments.'
  },
  {
    id: 'doc-8',
    name: 'Dr. Ananya Sen',
    departmentId: 'dept-derma',
    departmentName: 'Dermatology',
    designation: 'Consultant Dermatologist & Dermatosurgeon',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 11,
    opdFee: 750,
    rating: 4.9,
    reviewsCount: 210,
    roomNumber: 'Aesthetics & Skin Care, Suite 315',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    availableSlots: ['11:30 AM', '12:30 PM', '03:00 PM', '04:30 PM', '05:30 PM'],
    languages: ['English', 'Hindi', 'Bengali'],
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    bio: 'Passionate about holistic skin health, acne scar laser surgery, eczema therapies, and medically proven hair loss interventions.'
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-executive',
    title: 'Executive Full Body Health Checkup',
    slug: 'executive-full-body',
    tagline: 'Comprehensive 68-parameter full body diagnostic assessment for all adults.',
    originalPrice: 4999,
    discountedPrice: 2499,
    fastingRequired: true,
    totalTests: 68,
    includedTests: [
      'Complete Blood Count (CBC with ESR)',
      'Liver Function Test (LFT - 11 Tests)',
      'Kidney Function Test (KFT with Electrolytes)',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Fasting Blood Sugar (HbA1c & Glucose)',
      'Thyroid Profile (T3, T4, TSH)',
      'Chest X-Ray & Resting ECG',
      'Doctor Consultation & Lifestyle Advice'
    ],
    recommendedFor: 'Men & Women aged 25+ for yearly health evaluation'
  },
  {
    id: 'pkg-cardiac',
    title: 'Advanced Healthy Heart Screening',
    slug: 'advanced-cardiac-screening',
    tagline: 'Specialized cardiac test battery to detect hidden cardiovascular risks early.',
    originalPrice: 6500,
    discountedPrice: 3499,
    fastingRequired: true,
    totalTests: 42,
    includedTests: [
      '2D Echocardiography (Echo Doppler)',
      'Treadmill Stress Test (TMT)',
      'Lipid Profile & Apolipoproteins',
      'High Sensitivity CRP (hs-CRP)',
      'Homocysteine Levels',
      'HbA1c & Fasting Glucose',
      'Senior Cardiologist Consultation'
    ],
    recommendedFor: 'Individuals with family history of heart disease, stress, or high BP'
  },
  {
    id: 'pkg-women',
    title: 'Women Wellness & Hormone Care',
    slug: 'women-wellness',
    tagline: 'Tailored specifically for female metabolic, bone, and hormonal health.',
    originalPrice: 5200,
    discountedPrice: 2899,
    fastingRequired: true,
    totalTests: 54,
    includedTests: [
      'Complete Hemogram & Iron Profile',
      'Thyroid Panel (TSH, Free T3, Free T4)',
      'Vitamin D3 & Calcium (Bone Health)',
      'Vitamin B12 Levels',
      'Pelvis Ultrasound (USG Abdomen & Pelvis)',
      'Pap Smear Screening',
      'Senior Gynaecologist Consultation'
    ],
    recommendedFor: 'Women of all ages (PCOS, fatigue, hormonal balance)'
  },
  {
    id: 'pkg-senior',
    title: 'Senior Citizen Comprehensive Check',
    slug: 'senior-citizen-health',
    tagline: 'Dedicated vital screening addressing arthritis, heart, kidney, and prostate health.',
    originalPrice: 7000,
    discountedPrice: 3999,
    fastingRequired: true,
    totalTests: 74,
    includedTests: [
      'Full Blood, Kidney & Liver Profile',
      'PSA (For Men) / Bone Dexa Scan',
      'Uric Acid (Gout & Joint Health)',
      'Resting ECG & Chest X-Ray',
      'Ophthalmic Eye & Cataract Check',
      'Physiotherapist & Geriatric Doctor Review'
    ],
    recommendedFor: 'Seniors aged 60+ for proactive age-related health management'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-icu',
    title: 'Critical Care & Multi-disciplinary ICU',
    category: 'ICU',
    description: '60-bed state-of-the-art intensive care unit equipped with high-end Philips multi-para monitors, Hamilton invasive ventilators, and round-the-clock intensivist coverage.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900',
    features: ['1:1 Nurse-to-Patient Ratio', 'Dedicated Isolation Negative Pressure Pods', 'Continuous Hemodynamic Monitoring', 'In-Unit Arterial Blood Gas (ABG) Lab']
  },
  {
    id: 'fac-ot',
    title: 'Laminar Airflow Modular Operation Theatres',
    category: 'OT',
    description: '8 ultra-clean modular operation suites with HEPA filtration, zero-touch pneumatic doors, and integrated robotic surgical consoles for infection-free operations.',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=900',
    features: ['Class 100 HEPA Air Quality', 'Stryker Integrated 4K Laparoscopy Towers', 'Robotic Joint Replacement System', 'C-Arm Image Intensifiers']
  },
  {
    id: 'fac-diagnostics',
    title: '3T Digital MRI & 128-Slice Cardiac CT',
    category: 'DIAGNOSTICS',
    description: 'Ultra-fast, whisper-quiet 3 Tesla MRI scanner and low-radiation 128-slice CT providing high-definition diagnostic imaging within minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
    features: ['Wide Bore 70cm for Zero Claustrophobia', 'Cardiac Angiography in Single Breath Hold', 'Fully Automated 24/7 Pathology Analyzers', 'Digital PACS Cloud Report Access']
  },
  {
    id: 'fac-rooms',
    title: 'Deluxe Patient Suites & Private Rooms',
    category: 'ROOMS',
    description: 'Designed for patient comfort and hygiene, featuring electric motorized beds, companion sofas, ensuite private restrooms, and Wi-Fi smart entertainment.',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=900',
    features: ['Electric Nurse Call Button System', 'Nutrient-curated Patient Meal Service', 'Companion Lounge Couch', 'Daily Infection Sanity Protocols']
  },
  {
    id: 'fac-pharmacy',
    title: '24/7 In-House Pharmacy & Delivery',
    category: 'PHARMACY',
    description: 'Temperature-controlled accredited pharmacy stocking 100% genuine critical-care medicines, surgical supplies, and patient prescription support.',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=900',
    features: ['24 Hours Open', 'Computerized Batch & Expiry Tracking', 'Cold Chain Refrigerated Vaccines', 'Bedside Medication Delivery']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Rameshwar Khurana',
    treatment: 'Emergency Angioplasty (STEMI)',
    rating: 5,
    quote: 'When I had sudden severe chest pain at 2:00 AM, AuraCare’s emergency response was lightning fast. The Cath Lab team was ready before our ambulance even arrived. Dr. Arvind Sharma saved my life within 45 minutes.',
    doctorName: 'Dr. Arvind Sharma (Cardiology)',
    date: 'August 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-2',
    patientName: 'Kavita Deshmukh',
    treatment: 'Robotic Knee Replacement',
    rating: 5,
    quote: 'I was unable to walk without support for 4 years. Dr. Rajesh Mehra performed robotic knee surgery on both my knees. I started walking with minimal pain on the very next morning! World-class infrastructure.',
    doctorName: 'Dr. Rajesh Mehra (Orthopaedics)',
    date: 'September 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-3',
    patientName: 'Pooja & Sameer Verma',
    treatment: 'Painless Child Delivery & NICU Care',
    rating: 5,
    quote: 'Welcoming our baby girl at AuraCare was the most comforting experience. The LDR suite was like a luxury hotel room, and Dr. Priya Nambiar and nursing staff treated our premature baby with pure maternal care.',
    doctorName: 'Dr. Priya Nambiar & Dr. Meenakshi',
    date: 'July 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  }
];

export const INSURANCE_PARTNERS = [
  { name: 'Star Health', logo: '🛡️ Star Health Insurance' },
  { name: 'HDFC ERGO', logo: '🏦 HDFC ERGO General' },
  { name: 'ICICI Lombard', logo: '💳 ICICI Lombard' },
  { name: 'Max Bupa / Niva', logo: '✨ Niva Bupa Health' },
  { name: 'Care Health', logo: '🩺 Care Health Insurance' },
  { name: 'Ayushman Bharat', logo: '🇮🇳 PM-JAY Ayushman Bharat' },
  { name: 'Bajaj Allianz', logo: '💼 Bajaj Allianz' },
  { name: 'Tata AIG', logo: '🌐 Tata AIG General' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Recognizing Early Warning Signs of a Heart Attack',
    slug: 'heart-attack-early-warning-signs',
    excerpt: 'Not all heart attacks begin with dramatic chest pain. Learn subtle symptoms like jaw pain, sweating, and shortness of breath.',
    category: 'Heart Health',
    authorDoctor: 'Dr. Arvind Sharma',
    readTime: '4 min read',
    publishDate: 'Oct 04, 2026',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b-2',
    title: 'Robotic Surgery vs Traditional Joint Replacement: What You Must Know',
    slug: 'robotic-vs-traditional-joint-replacement',
    excerpt: 'How sub-millimeter robotic precision minimizes muscle damage, speeds up recovery, and extends prosthetic implant life.',
    category: 'Orthopaedics',
    authorDoctor: 'Dr. Rajesh Mehra',
    readTime: '5 min read',
    publishDate: 'Sep 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b-3',
    title: 'Essential Childhood Vaccinations Guide for New Parents',
    slug: 'childhood-vaccination-guide-2026',
    excerpt: 'A complete schedule of essential immunizations from birth to age 5 to protect against communicable pediatric infections.',
    category: 'Paediatrics',
    authorDoctor: 'Dr. Priya Nambiar',
    readTime: '6 min read',
    publishDate: 'Sep 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book an OPD appointment with a specialist?',
    answer: 'You can easily book online using our 5-Step Appointment Wizard on this website, or call our OPD boardline at 011-4771-0000. You will receive an instant confirmation SMS and WhatsApp message with your token number.',
    category: 'OPD'
  },
  {
    id: 'faq-2',
    question: 'What is the procedure during a medical emergency or heart attack?',
    answer: 'Call our 24x7 Ambulance Helpline at 108 or 011-4771-9999 immediately. Our ICU-equipped emergency ambulance with an onboard medical officer will be dispatched. Our Emergency ER room is staffed round-the-clock.',
    category: 'EMERGENCY'
  },
  {
    id: 'faq-3',
    question: 'Do you offer Cashless Mediclaim and TPA Insurance facilities?',
    answer: 'Yes! We are partnered with over 30+ leading insurance providers including Star Health, HDFC ERGO, ICICI Lombard, and Ayushman Bharat. Our dedicated 24/7 TPA Desk on the ground floor assists with pre-authorizations and seamless claims.',
    category: 'INSURANCE'
  },
  {
    id: 'faq-4',
    question: 'How can I access and download my pathology/radiology lab reports?',
    answer: 'Click the "Download Reports" button on our homepage header. Enter your registered Mobile Number or Patient UHID. You will receive an OTP, after which all your verified digital PDF reports can be viewed and downloaded.',
    category: 'REPORTS'
  },
  {
    id: 'faq-5',
    question: 'What are the visiting hours for relatives in ICU and Wards?',
    answer: 'For General & Deluxe Wards: 11:00 AM – 01:00 PM and 05:00 PM – 07:00 PM. For Intensive Care Units (ICU): 05:00 PM – 06:00 PM only, strictly limited to 1 attendant at a time to ensure infection control.',
    category: 'VISITORS'
  }
];
