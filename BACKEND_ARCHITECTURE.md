# 🏥 Gaikwad Critical Care Hospital - Backend Architecture & API Specifications

Yeh document **Gaikwad Critical Care Hospital** ke modern, secure aur scalable backend ka complete architectural blueprint hai. Isme tech stack selection, core modules, API specifications, database integration, security compliance aur **Phase-by-Phase Implementation Plan** diya gaya hai.

---

## 1. Executive Architecture Summary

Gaikwad Critical Care Hospital ek dedicated 450-bed critical care hospital hai (jisme 60-bed ICU, 24×7 Level-1 Emergency & Trauma Resuscitation, 70+ Specialist Doctors aur NABL/NABH accredited facilities shamil hain). Backend system do alag-alag user bases ke liye kaam karta hai:

1. **Public & Patients:** Doctor find karna, live OPD slots dekhna, appointment book karna, clinical symptom triage, patient/visitor guides access karna, online payment (OPD/IPD Deposit/Diagnostics), digital lab reports download karna aur 24×7 ambulance/ICU emergency alert bhejna.
2. **Hospital Staff & Administration (Super Admin / Doctors / Intensivists / Reception / Lab / TPA Desk):** Weekly OPD schedules manage karna, slot allocations, emergency casualty bay triage monitor karna, lab reports secure S3 par upload karna, IPD advance billing aur insurance claims process karna.

```
                    [ Client Applications ]
    (Patient Portal / Staff Dashboard / Mobile / WhatsApp Bot)
                             │
                             ▼  HTTPS / WSS (TLS 1.3)
                    [ API Gateway / Nginx ]
        (Rate Limiting, SSL Termination, Compression, CORS)
                             │
                             ▼
         [ Backend Core (Node.js / NestJS or Express) ]
    ├── Authentication & RBAC (Patient Phone OTP / Staff JWT)
    ├── Doctor & Slot Scheduling Engine (Race Condition Safe - Redlock)
    ├── OPD & Video Appointment Booking System
    ├── Clinical Symptom Triage & Department Routing
    ├── Patient & Visitor Guidelines & FAQ Knowledge Base
    ├── Lab Report & Medical Records Vault (Encrypted S3 Pre-signed URLs)
    ├── Multi-Purpose Payments Engine (OPD, IPD Advance, Diagnostics Billing)
    └── Notification & Communication Worker (WhatsApp / SMS via BullMQ)
         │                   │                     │
         ▼                   ▼                     ▼
  [ PostgreSQL 16+ ]     [ Redis 7+ ]     [ Private Object Storage ]
 (Relational Health DB)  (Locks & Caching) (Encrypted Lab Reports - AWS S3)
```

---

## 2. Recommended Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Language & Runtime** | **Node.js (TypeScript)** | Enterprise type-safety, fast execution, extensive healthcare SDK ecosystem. |
| **Framework** | **NestJS** (or Express.js + TS) | Modular architecture, dependency injection, built-in validation pipes, microservice-ready. |
| **Database ORM** | **Prisma** ya **Drizzle ORM** | Type-safe database queries, automated migrations, zero runtime overhead. |
| **In-Memory Cache & Lock**| **Redis 7+** | OTP caching, doctor slot double-booking locking (`Redlock`), session storage, rate limiting. |
| **Background Job Queue** | **BullMQ** (powered by Redis) | Asynchronous WhatsApp/SMS reminders, PDF report generation, automated emergency alerts. |
| **File Storage** | **AWS S3** / **Cloudflare R2** | Private encrypted buckets for patient reports with short-lived (15-min) Pre-signed URLs. |
| **Payment Gateway** | **Razorpay** / **Stripe** | UPI, Credit/Debit cards, Net Banking for OPD fees, IPD advance deposit, diagnostics & checkup packages. |
| **Communication Gateway**| **WhatsApp Cloud API** + **Twilio / Fast2SMS** | Instant appointment confirmation on WhatsApp, OTP delivery, lab report ready alerts in EN/HI. |
| **Documentation & Tests** | **Swagger (OpenAPI 3.0) + Jest** | Self-documenting API explorer, unit & integration testing with automated schema validation. |

---

## 3. Phase-by-Phase Implementation Roadmap

Ek modern critical care hospital backend ko hum 4 structured phases me implement karenge taaki core MVP jaldi live ho sake aur complex features step-by-step add ho sakein.

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│        PHASE 1          │     │        PHASE 2          │     │        PHASE 3          │     │        PHASE 4          │
│   Core MVP & Triage     │ ──> │   Diagnostics & Money   │ ──> │ Communication & Telemed │ ──> │  Enterprise & Scaling   │
│ ─────────────────────── │     │ ─────────────────────── │     │ ─────────────────────── │     │ ─────────────────────── │
│ • Doctor/Dept Directory │     │ • UHID Generation       │     │ • WhatsApp/SMS Workflows│     │ • Full Audit Logs       │
│ • Schedule & Slot Engine│     │ • Lab Reports Upload    │     │ • Video Consultation    │     │ • Hospital Analytics    │
│ • OPD Appointment Flow  │     │ • Pre-signed S3 URLs    │     │ • TPA/Insurance Desk    │     │ • Automated Queue System│
│ • Symptom Triage Router │     │ • Health Check Packages │     │ • Patient Guides CMS    │     │ • DISHA / HIPAA Audit   │
│ • 24x7 Emergency Hotlines│    │ • Razorpay Multi-Pay    │     │ • Bilingual (EN/HI) API │     │ • Microservices Scaling │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

### Phase 1: Core Foundation & MVP (Week 1 – Week 3)
**Lakshya:** Gaikwad Hospital ki digital identity live karna, doctor & department directory banana, real-time slot booking aur clinical symptom triage enable karna.

1. **System & Database Setup:**
   * PostgreSQL setup, Prisma ORM schema & initial migrations.
   * Standard error handling middleware, logging (Winston/Pino), CORS whitelist, Helmet security headers.
2. **Authentication & Roles:**
   * JWT based Auth with Refresh Tokens.
   * Roles: `SUPER_ADMIN`, `HOSPITAL_STAFF`, `DOCTOR`, `INTENSIVIST`, `LAB_TECH`, `PATIENT`.
   * Patient ke liye Phone Number + OTP Authentication.
3. **Centres of Excellence & Doctor Directory:**
   * CRUD for Departments (Cardiology, Orthopaedics, Neurosciences, Paediatrics, Pulmonology, Nephrology, Gastroenterology, Oncology).
   * Doctor profile management: qualifications, experience, room number, OPD fee, profile photo.
   * Weekly schedule builder (e.g., Dr. Arvind Sharma: Mon-Sat 09:00 AM - 01:00 PM, 15 min slots).
4. **Slot Generation & Atomic Booking:**
   * Real-time slot availability calculator.
   * Concurrency control (Redis `Redlock`) taaki do patients ek hi slot sath me book na karein.
   * Booking status workflow: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.
5. **Clinical Symptom Triage & Emergency Hotlines:**
   * Symptom triage lookup service (e.g., "Severe Chest Pressure" -> Critical Cardiac Care STEMI Bay).
   * 24×7 Emergency & Mobile ICU Ambulance hotline logging with urgent SMS/WhatsApp alert to ER reception desk.

### Phase 2: Diagnostics, Patient Portal & Payments (Week 4 – Week 6)
**Lakshya:** Patients ko lab reports download karne ki facility dena aur multi-purpose online payment gateway chalu karna.

1. **Patient UHID (Unique Hospital Identifier) System:**
   * Har patient ke liye unique identification number (e.g., `GCH-2026-08912`) generate karna.
   * Mobile number se linking taaki patient apne saare past records ek jagah dekh sake.
2. **Encrypted Lab Reports Vault:**
   * AWS S3 / Cloudflare R2 bucket integration (`Block Public Access: ON`).
   * Backend se 15-minute validity wala secure Pre-signed URL generate hoga.
   * Lab technician portal: Patient UHID search, PDF report upload, test category tagging.
3. **Health Checkup Packages Module:**
   * Preventive checkup packages CRUD (e.g., "Executive Full Body Checkup", "Senior Citizen Comprehensive Package").
   * Included tests parameter breakdown, fasting requirements instructions.
   * Package booking & preferred date selection flow.
4. **Multi-Purpose Payment Gateway (Razorpay):**
   * Multi-purpose payment support:
     * `OPD_CONSULTATION`: OPD token booking fee.
     * `IPD_ADVANCE_DEPOSIT`: Hospital in-patient admission deposit.
     * `DIAGNOSTICS_BILLING`: MRI, CT scan, blood investigation billing.
     * `HEALTH_PACKAGE`: Preventive health checkup package payment.
   * Webhook handling for automated reconciliation (`payment.captured`, `payment.failed`).
   * Automated digital receipt & invoice generation (PDF via PDFKit).

### Phase 3: Automation, WhatsApp Bot & Teleconsultation (Week 7 – Week 9)
**Lakshya:** Staff ka physical load kam karna, bilingual support dena aur patients ko automated updates bhejna.

1. **Automated WhatsApp & SMS Engine (BullMQ):**
   * Appointment Book hote hi WhatsApp message (English aur Hindi dono me): *"Aapka appointment Dr. Arvind Sharma ke sath kal 10:30 AM par confirm ho gaya hai. Cabin: OPD-104."* + Google Maps location link.
   * 24 ghante aur 2 ghante pehle automated reminder message.
   * Lab report ready hote hi WhatsApp par direct secure download link.
2. **Teleconsultation (Online Video Consult):**
   * Agora / Twilio WebRTC video room integration.
   * Doctor aur patient ko secure 1-on-1 video call link provide karna appointment slot ke time.
   * Post-consult digital prescription upload.
3. **Patient & Visitor Guidelines CMS:**
   * In-patient admission essentials, ICU visiting hours, discharge process, insurance tpa guidelines.
   * Dynamic search aur category filter support.
4. **Cashless TPA & Mediclaim Query Desk:**
   * Insurance query form: Policy photo/document upload, TPA company selection.
   * TPA desk coordinator portal: Pre-authorization tracking (`RECEIVED`, `UNDER_REVIEW`, `APPROVED`).

### Phase 4: Enterprise Scale, Compliance & Analytics (Week 10 – Week 12)
**Lakshya:** Hospital ko legal healthcare standards (DISHA / HIPAA principles) par lana aur executive analytics dashboard provide karna.

1. **Healthcare Data Compliance:**
   * Patient health data encrypted at rest (AES-256) and in transit (TLS 1.3).
   * **Strict Audit Trail:** Har bar jab koi doctor ya staff kisi patient ki report ya history open karega, uska access record (`who`, `when`, `which_ip`, `which_record`) permanently log hoga.
2. **Executive Admin Dashboard & Analytics:**
   * Daily/Monthly OPD footfall stats, bed occupancy rate.
   * Revenue analytics by department, payment mode & doctor.
   * Slot utilization rate (kaun sa specialist kitna booked rehta hai).
3. **Emergency SOS & Ambulance Telemetry:**
   * Emergency incoming dashboard for ER room reception with sound alert and caller geolocation.
4. **Performance Tuning & Caching:**
   * Redis caching for frequent static data (Departments, Doctors list, FAQs, Triage symptoms).
   * Database read-replicas for heavy reporting queries.

---

## 4. RESTful API Specifications & Endpoints

Sabhi endpoints standard RESTful structure follow karenge with JSON responses and standard error envelopes:

### 4.1 Authentication & User Management
```http
POST /api/v1/auth/patient/send-otp
Body: { "phone": "+919871108108" }

POST /api/v1/auth/patient/verify-otp
Body: { "phone": "+919871108108", "otp": "4521" }
Response: { 
  "token": "JWT_TOKEN", 
  "user": { "id": "usr_991", "uhid": "GCH-1002", "fullName": "Aarav Sharma" } 
}

POST /api/v1/auth/staff/login
Body: { "email": "dr.sharma@gaikwadhospital.com", "password": "SecurePassword!" }
Response: { "token": "JWT_TOKEN", "role": "DOCTOR", "name": "Dr. Arvind Sharma" }
```

### 4.2 Doctors & Departments (Centres of Excellence)
```http
GET  /api/v1/departments                     # List all active clinical departments
GET  /api/v1/departments/:id                 # Department details, services, head doctor
GET  /api/v1/departments/:id/doctors         # Specialists by department
GET  /api/v1/doctors                         # Filter by speciality, name, experience
GET  /api/v1/doctors/:id                     # Full doctor profile, degrees, room, OPD fee
GET  /api/v1/doctors/:id/available-slots     # Query: ?date=2026-10-15
POST /api/v1/admin/doctors                   # [Protected: ADMIN] Add new doctor
PUT  /api/v1/admin/doctors/:id/schedule      # [Protected: ADMIN] Update weekly OPD routine
```

### 4.3 Appointments & Slot Locking (Race-Condition Protected)
```http
POST /api/v1/appointments/lock-slot
# Locks the slot for 5 minutes in Redis while user completes details/payment
Body: { "doctorId": "doc_101", "slotDate": "2026-10-15", "slotStartTime": "10:30:00" }
Response: { "lockId": "lock_9981", "expiresInSeconds": 300 }

POST /api/v1/appointments/book
Body: {
  "lockId": "lock_9981",
  "doctorId": "doc_101",
  "patientName": "Aarav Sharma",
  "patientPhone": "+919871108108",
  "patientAge": 38,
  "gender": "MALE",
  "appointmentType": "IN_CLINIC", // ya "VIDEO_CONSULT"
  "symptoms": "Occasional chest tightness after climbing stairs"
}
Response: { 
  "appointmentId": "apt_7712", 
  "appointmentNumber": "GCH-APT-20261015-0014",
  "status": "CONFIRMED", 
  "tokenNumber": 14 
}

GET  /api/v1/patient/appointments            # [Protected: PATIENT] My appointments
PUT  /api/v1/appointments/:id/cancel         # Cancel appointment
PUT  /api/v1/admin/appointments/:id/status   # [Protected: STAFF] Mark COMPLETED / NO_SHOW
```

### 4.4 Clinical Symptom Triage & Patient Guides
```http
GET  /api/v1/triage/symptoms                 # List all symptom triage items (Chest Pain, Fracture, etc.)
POST /api/v1/triage/route                    # Auto-route symptom to department & urgency
Body: { "symptomId": "sym-1" }
Response: { 
  "departmentId": "dept-cardio", 
  "departmentName": "Cardiology & Cardiac Surgery", 
  "urgency": "critical",
  "recommendedAction": "Immediate STEMI Bay assessment / Call 011-4771-9999"
}

GET  /api/v1/patient-guides                  # List all visitor/patient guides (ICU rules, Admission, etc.)
GET  /api/v1/patient-guides/:id              # Full guide details & downloadable PDF checklist
```

### 4.5 Encrypted Lab Reports & Records Vault
```http
POST /api/v1/reports/request-upload-url      # [Protected: LAB_TECH]
Body: { "patientUhid": "GCH-1002", "testName": "Complete Blood Count (CBC)" }
Response: { "uploadUrl": "https://s3.amazonaws.com/...", "reportId": "rep_551" }

POST /api/v1/reports/:id/confirm-upload      # Confirms upload done & triggers WhatsApp alert
GET  /api/v1/patient/reports                 # [Protected: PATIENT] My uploaded reports list
GET  /api/v1/patient/reports/:id/download    # Generates 15-min signed temporary S3 URL
```

### 4.6 Multi-Purpose Online Hospital Payments
```http
POST /api/v1/payments/razorpay/create-order
Body: {
  "purpose": "IPD_ADVANCE_DEPOSIT",          # 'OPD_CONSULTATION' | 'IPD_ADVANCE_DEPOSIT' | 'DIAGNOSTICS_BILLING' | 'HEALTH_PACKAGE'
  "uhidOrPhone": "GCH-1002",
  "amount": 15000.00,
  "currency": "INR",
  "patientName": "Aarav Sharma"
}
Response: {
  "orderId": "order_Hj892KaPq1",
  "amount": 1500000,                         # In paise
  "currency": "INR",
  "keyId": "rzp_live_GaikwadHospital"
}

POST /api/v1/payments/razorpay/verify-webhook # Validates HMAC signature & marks paid
GET  /api/v1/payments/:id/receipt             # Download digital verified invoice PDF
```

### 4.7 Emergency SOS & Mobile ICU Dispatch
```http
POST /api/v1/emergency/sos
Body: {
  "callerName": "Vikram Singh",
  "callerPhone": "+919871108108",
  "emergencyType": "CARDIAC_ARREST",
  "locationAddress": "Plot 14, Sector 44, New Delhi",
  "latitude": 28.5355,
  "longitude": 77.3910
}
Response: {
  "requestId": "emg_8812",
  "status": "DISPATCHED",
  "emergencyDesk": "011-4771-9999",
  "ambulanceContact": "+91-9871-108108"
}
```

### 4.8 Hospital Leadership, Accreditations & Content
```http
GET  /api/v1/hospital-info                   # Hospital metadata, stats (450+ beds, 70+ docs)
GET  /api/v1/hospital-info/leadership        # Director message & profile (Dr. Rajesh Gaikwad)
GET  /api/v1/hospital-info/accreditations    # NABH, NABL, ISO, AERB, JCI certifications
GET  /api/v1/faqs                            # Interactive FAQs for AI chatbot assistant
GET  /api/v1/blogs                           # Health articles with search & pagination
GET  /api/v1/testimonials                    # Video stories & approved patient reviews
GET  /api/v1/facilities                      # Clinical facilities & modular ICU gallery
```

---

## 5. Critical Technical Challenges & Robust Solutions

### 1. Doctor Slot Double-Booking (Concurrency Race Condition)
* **Problem:** Agar do patients ek hi doctor ke 10:30 AM slot par ek sath "Book" click karein, toh dono book ho sakte hain.
* **Solution:**
  * Redis `SET lock:slot:{doctorId}:{date}:{slotTime} {userId} NX EX 300` use karke temporary 5-minute atomic lock lagana.
  * Database level par `UNIQUE (doctor_id, appointment_date, slot_start_time)` constraint enforce karna aur transaction me `SELECT ... FOR UPDATE` use karna.

### 2. Patient Data Privacy & Medical Report Leakage
* **Problem:** Reports ka public link hone par koi bhi kisi ka confidential test dekh sakta hai.
* **Solution:**
  * S3 Bucket ko strictly `Block Public Access: ON` rakhna.
  * Report download karne se pehle verify karna ki requester patient ka logged-in UHID wahi hai jo report se linked hai.
  * Sirf short-lived (15 minutes) signed URL return karna.

### 3. Asynchronous Heavy Background Tasks
* **Problem:** WhatsApp message bhejna, PDF receipt banana, ya email bhejna API response ko slow karta hai.
* **Solution:**
  * BullMQ worker queues use karna. API user ko turant 200 OK bhejti hai aur background worker WhatsApp alert process karta hai.

---

## 6. Directory Structure (Clean Architecture)

```
hospital-backend/
├── src/
│   ├── config/              # Env variables, database, Redis & S3 configs
│   ├── common/              # Global filters, interceptors, error handler
│   │   ├── decorators/      # CurrentUser, Roles decorators
│   │   ├── guards/          # JwtAuthGuard, RolesGuard
│   │   └── middlewares/     # RateLimiter, AuditLogger, LanguageHeaderMiddleware
│   ├── modules/
│   │   ├── auth/            # OTP login, Staff login, JWT tokens
│   │   ├── users/           # Patient profiles, Staff accounts
│   │   ├── departments/     # Clinical specialities & Centres of Excellence
│   │   ├── doctors/         # Profiles, qualification, timings, OPD charges
│   │   ├── appointments/    # Booking engine, slot generator, Redis Redlock
│   │   ├── triage/          # Symptom triage & automated clinical routing
│   │   ├── patient-guides/  # Visitor guides, admission procedures CMS
│   │   ├── reports/         # Lab reports, S3 presigned URLs, UHID vault
│   │   ├── packages/        # Preventive health checkup packages
│   │   ├── payments/        # Razorpay multi-purpose payments & webhook handlers
│   │   ├── emergency/       # SOS requests, Mobile ICU ambulance dispatch
│   │   ├── hospital-info/   # Director message, accreditations, stats
│   │   ├── inquiries/       # TPA insurance claims, contact forms
│   │   └── notifications/   # WhatsApp & SMS BullMQ queues (Bilingual EN/HI)
│   ├── database/
│   │   ├── prisma/          # schema.prisma, migrations
│   │   └── seeders/         # Departments, doctors, triage symptoms seed data
│   └── app.ts / main.ts     # Application bootstrapper
├── tests/                   # E2E and unit test suites
├── Dockerfile               # Production container image
├── docker-compose.yml       # App + Postgres + Redis setup
├── package.json
└── tsconfig.json
```

---

## 7. Security & Healthcare Compliance Checklist

- [x] **Strict Rate Limiting:** IP aur Phone number par rate limit (Redis based) taaki OTP flooding na ho sake.
- [x] **SQL Injection & XSS Protection:** Parameterized queries via Prisma ORM + Class Validator DTOs.
- [x] **CORS Whitelist:** Sirf hospital ke frontend domain aur admin portal ko allow karna.
- [x] **Audit Logging:** Har patient record access ka timestamp, user ID, aur IP address store karna (DISHA / HIPAA principle).
- [x] **Environment Security:** Saari secret keys (`JWT_SECRET`, `S3_KEY`, `RAZORPAY_SECRET`) `.env` me rakhna aur vault use karna.
