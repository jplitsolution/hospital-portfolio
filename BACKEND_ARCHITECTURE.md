# 🏥 Hospital Portfolio & Management System - Backend Architecture

Yeh document ek modern, secure aur scalable Hospital Web Platform ke backend ka complete architectural blueprint hai. Isme tech stack selection, core modules, API specifications, security compliance aur **Phase-by-Phase Implementation Plan** diya gaya hai.

---

## 1. Executive Architecture Summary

Hospital platform do alag-alag user bases ke liye kaam karta hai:
1. **Public / Patients:** Doctor dhoondhna, slots dekhna, appointment book karna, reports download karna, emergency contact karna.
2. **Internal Hospital Staff (Admin/Doctors/Reception/Lab):** OPD schedules manage karna, appointments confirm/reschedule karna, lab reports upload karna, billing aur enquiries monitor karna.

```
       [ Client Applications ]
 (Patient Web / Mobile / Staff Admin)
                 │
                 ▼  HTTPS / WSS
       [ API Gateway / Nginx ]
    (Rate Limiting, SSL, Compression)
                 │
                 ▼
       [ Backend Core (Node.js / NestJS or Express) ]
    ├── Auth & Role-based Access Control (RBAC)
    ├── Doctor & Slot Scheduling Engine (Race Condition Safe)
    ├── Appointment Booking & Payment Processing
    ├── Lab Report & Medical Records Vault (Presigned URLs)
    └── Notification & Communication Worker (WhatsApp / SMS)
         │              │                 │
         ▼              ▼                 ▼
  [ PostgreSQL ]     [ Redis ]     [ Private Object Storage ]
 (Relational Data)  (Locks & Cache) (Encrypted Lab Reports - S3)
```

---

## 2. Recommended Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Language & Runtime** | **Node.js (TypeScript)** | Enterprise type-safety, fast execution, extensive healthcare SDK ecosystem. |
| **Framework** | **NestJS** (or Express.js + TS) | Modular architecture, dependency injection, built-in validation pipes, microservice-ready. |
| **Database ORM** | **Prisma** ya **Drizzle ORM** | Type-safe database queries, automated migrations, zero runtime overhead. |
| **In-Memory Cache & Lock** | **Redis** | OTP caching, doctor slot double-booking locking (`Redlock`), session storage, rate limiting. |
| **Background Job Queue** | **BullMQ** (powered by Redis) | Asynchronous WhatsApp/SMS reminders, PDF report generation, automated status updates. |
| **File Storage** | **AWS S3** / **Cloudflare R2** | Private encrypted buckets for patient reports with short-lived Pre-signed download URLs. |
| **Payment Gateway** | **Razorpay** / **Stripe** | UPI, Credit/Debit cards, Net Banking for OPD booking token fees & health packages. |
| **Communication Gateway**| **WhatsApp Cloud API / Gupshup** + **Fast2SMS / Twilio** | Instant appointment confirmation on WhatsApp, OTP delivery, lab report ready alerts. |
| **Documentation & Tests** | **Swagger (OpenAPI 3.0) + Jest** | Self-documenting API explorer, unit & integration testing. |

---

## 3. Phase-by-Phase Implementation Roadmap

Ek hospital backend ko hum 4 structured phases me implement karenge taaki core MVP jaldi live ho sake aur complex features step-by-step add ho sakein.

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│        PHASE 1          │     │        PHASE 2          │     │        PHASE 3          │     │        PHASE 4          │
│        Core MVP         │ ──> │   Diagnostics & Money   │ ──> │ Communication & Telemed │ ──> │  Enterprise & Scaling   │
│ ─────────────────────── │     │ ─────────────────────── │     │ ─────────────────────── │     │ ─────────────────────── │
│ • Doctor/Dept Directory │     │ • UHID Generation       │     │ • WhatsApp/SMS Workflows│     │ • Full Audit Logs       │
│ • Schedule & Slot Engine│     │ • Lab Reports Upload    │     │ • Video Consultation    │     │ • Hospital Analytics    │
│ • OPD Appointment Flow  │     │ • Pre-signed S3 URLs    │     │ • TPA/Insurance Desk    │     │ • Automated Queue System│
│ • Emergency / Enquiries │     │ • Health Check Packages │     │ • Multi-location Support│     │ • DISHA / HIPAA Audit   │
│ • Basic Admin Portal    │     │ • Payment Gateway       │     │ • Automated Reminders   │     │ • Microservices Scaling │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

### Phase 1: Core Foundation & MVP (Week 1 – Week 3)
**Lakshya:** Hospital ki primary identity online lana, doctor directory set karna, aur direct OPD appointment booking chalu karna.

1. **System & Database Setup:**
   * PostgreSQL setup, Prisma ORM migrations, environment configuration.
   * Standard error handling middleware, logging (Winston/Pino), CORS, Helmet security.
2. **Authentication & Roles:**
   * JWT based Auth with Refresh Tokens.
   * Roles: `SUPER_ADMIN`, `HOSPITAL_STAFF`, `DOCTOR`, `PATIENT`.
   * Patient ke liye Phone Number + OTP Authentication.
3. **Doctors & Speciality Engine:**
   * CRUD for Departments (Cardiology, Orthopaedics, Neurology, etc.).
   * Doctor profile management: degrees, experience, room number, OPD fee, profile picture.
   * Weekly schedule builder (e.g., Dr. Sharma: Mon-Wed 10:00 AM - 02:00 PM, 15 min slots).
4. **Slot Generation & Appointment Booking:**
   * Real-time slot availability calculator.
   * Concurrency control (Redis lock) taaki 2 log ek hi slot ko sath me book na kar paayein.
   * Basic appointment status: `BOOKED`, `CANCELLED`, `COMPLETED`.
5. **Emergency & Contact Leaddesk:**
   * 24x7 Ambulance & Emergency request logging with priority SMS alert to reception desk.
   * General inquiry & callback requests form handler.

---

### Phase 2: Diagnostics, Patient Portal & Payments (Week 4 – Week 6)
**Lakshya:** Patients ko lab reports download karne ki facility dena aur health checkup packages sell karna.

1. **Patient UHID (Unique Hospital Identifier) System:**
   * Har patient ke liye unique identification number (e.g., `HOSP-2026-08912`) generate karna.
   * Mobile number se linking taaki patient apne saare past records ek jagah dekh sake.
2. **Encrypted Lab Reports Vault:**
   * S3 / Cloudflare R2 bucket integration.
   * **Security Rule:** Bucket public nahi hogi. Backend se 15-minute validity wala secure Pre-signed URL generate hoga.
   * Lab technician portal: Patient UHID search karo, PDF report upload karo, test category tag karo.
3. **Health Checkup Packages Module:**
   * Preventive packages CRUD (e.g., "Full Body Health Check", "Senior Citizen Cardiac Check").
   * Package inclusion tests list, fasting requirements instructions.
   * Package booking & date selection flow.
4. **Payment Gateway Integration (Razorpay / Stripe):**
   * Webhook handling for payment verification (`payment.captured`, `payment.failed`).
   * OPD registration token fee ya health package advance payment collection.
   * Automated digital invoice / receipt generation (PDF via PDFKit/Puppeteer).

---

### Phase 3: Automation, WhatsApp Bot & Teleconsultation (Week 7 – Week 9)
**Lakshya:** Staff ka physical load kam karna aur patients ko automated updates bhejna.

1. **Automated WhatsApp & SMS Engine (BullMQ):**
   * Appointment Book hote hi WhatsApp message: *"Aapka appointment Dr. Verma ke sath kal 11:30 AM par confirm ho gaya hai. Location: Room 204."* + Google Maps link.
   * 24 ghante aur 2 ghante pehle automated reminder message.
   * Lab report ready hote hi WhatsApp par direct download link.
2. **Teleconsultation (Online Video Consult):**
   * Agora / Daily.co / 100ms ya Twilio WebRTC video room integration.
   * Doctor aur patient ko secure 1-on-1 video call link provide karna appointment slot ke time.
   * Post-consult digital prescription upload.
3. **Cashless TPA & Mediclaim Query Desk:**
   * Insurance query form: Policy photo/document upload, TPA company select karna.
   * TPA desk coordinator portal: Eligibility check karna, status update karna (`RECEIVED`, `UNDER_REVIEW`, `APPROVED`).
4. **Multi-Branch / Multi-Location Architecture:**
   * Agar hospital ki ek se zyada branches hain (e.g., Delhi, Noida, Gurgaon), toh location-based filtering enable karna.

---

### Phase 4: Enterprise Scale, Compliance & Analytics (Week 10 – Week 12)
**Lakshya:** Hospital ko legal healthcare standards par lana aur management ko analytics dena.

1. **Healthcare Data Compliance (DISHA & HIPAA Principles):**
   * Patient health data encrypted at rest (AES-256) and in transit (TLS 1.3).
   * **Strict Audit Trail:** Har bar jab koi doctor ya staff kisi patient ki report ya history open karega, uska access record (`who`, `when`, `which_ip`, `which_record`) permanently log hoga.
2. **Executive Admin Dashboard & Analytics:**
   * Daily/Monthly OPD footfall stats.
   * Revenue analytics by department & doctor.
   * Slot utilization rate (kon sa doctor kitna booked rehta hai).
   * Patient drop-off & cancellation rate.
3. **Emergency SOS Triage System:**
   * Emergency incoming dashboard for ER room reception with sound alert and caller geolocation.
4. **Performance Tuning & Caching:**
   * Redis caching for frequent static data (Departments, Doctors list, FAQs).
   * Database read-replicas for heavy reporting queries.

---

## 4. RESTful API Specifications & Endpoints

Sabhi endpoints standard RESTful structure follow karenge with JSON responses:

### 4.1 Authentication & User Management
```http
POST /api/v1/auth/patient/send-otp
Body: { "phone": "+919876543210" }

POST /api/v1/auth/patient/verify-otp
Body: { "phone": "+919876543210", "otp": "4521" }
Response: { "token": "JWT_TOKEN", "user": { "id": "...", "uhid": "HOSP-1002" } }

POST /api/v1/auth/staff/login
Body: { "email": "dr.sharma@hospital.com", "password": "SecurePassword!" }
Response: { "token": "JWT_TOKEN", "role": "DOCTOR" }
```

### 4.2 Doctors & Departments (Public & Admin)
```http
GET  /api/v1/departments                     # List all active departments
GET  /api/v1/departments/:id/doctors         # Doctors by department
GET  /api/v1/doctors                         # Filter by speciality, name, branch
GET  /api/v1/doctors/:id                     # Full doctor profile, qualification, bio
GET  /api/v1/doctors/:id/available-slots     # Query: ?date=2026-10-15
POST /api/v1/admin/doctors                   # [Protected: ADMIN] Add new doctor
PUT  /api/v1/admin/doctors/:id/schedule      # [Protected: ADMIN] Update weekly schedule
```

### 4.3 Appointments & Slot Locking (Race-Condition Protected)
```http
POST /api/v1/appointments/lock-slot
# Locks the slot for 5 minutes while user completes booking/payment
Body: { "doctorId": "doc_123", "slotTime": "2026-10-15T10:30:00Z" }
Response: { "lockId": "lock_9981", "expiresInSeconds": 300 }

POST /api/v1/appointments/book
Body: {
  "lockId": "lock_9981",
  "patientName": "Aarav Patel",
  "patientPhone": "+919876543210",
  "patientAge": 32,
  "gender": "MALE",
  "appointmentType": "IN_CLINIC", // ya "VIDEO_CONSULT"
  "symptoms": "Mild chest pain since 2 days"
}
Response: { "appointmentId": "apt_7712", "status": "CONFIRMED", "tokenNo": 14 }

GET  /api/v1/patient/appointments            # [Protected: PATIENT] My appointments
PUT  /api/v1/appointments/:id/cancel         # Cancel appointment
PUT  /api/v1/admin/appointments/:id/status   # [Protected: STAFF] Mark COMPLETED / NO_SHOW
```

### 4.4 Lab Reports & Records (Secure Vault)
```http
POST /api/v1/reports/request-upload-url      # [Protected: LAB_TECH]
Body: { "patientUhid": "HOSP-1002", "testName": "Complete Blood Count (CBC)" }
Response: { "uploadUrl": "https://s3.amazonaws.com/...", "reportId": "rep_551" }

POST /api/v1/reports/:id/confirm-upload      # Confirms upload done & triggers WhatsApp alert
GET  /api/v1/patient/reports                 # [Protected: PATIENT] My uploaded reports list
GET  /api/v1/patient/reports/:id/download    # Generates 15-min signed temporary URL
```

### 4.5 Health Packages & Payments
```http
GET  /api/v1/packages                        # List all packages (Cardiac, Full Body, etc.)
GET  /api/v1/packages/:id                    # Details and list of included tests
POST /api/v1/packages/:id/book               # Book package & create payment order
POST /api/v1/payments/razorpay/create-order  # Creates gateway order
POST /api/v1/payments/razorpay/verify-webhook # Validates HMAC signature & marks paid
```

### 4.6 Emergency, TPA & General Enquiries
```http
POST /api/v1/emergency/sos                   # Priority ambulance alert
POST /api/v1/inquiries/tpa-claim             # Submit insurance documents for pre-check
POST /api/v1/inquiries/general               # Contact form query
```

### 4.7 Content, Assistant & Community (Frontend Support)
```http
GET  /api/v1/faqs                            # List FAQs by category for Chatbot Assistant
GET  /api/v1/blogs                           # List health articles (Pagination & category filters)
GET  /api/v1/blogs/:slug                     # Single article detail
GET  /api/v1/testimonials                    # List approved & featured patient reviews
GET  /api/v1/facilities                      # List hospital facilities & gallery photos
POST /api/v1/admin/blogs                     # [Protected: ADMIN] Publish health blog
POST /api/v1/admin/faqs                      # [Protected: ADMIN] Add chatbot FAQ
```

---

## 5. Critical Technical Challenges & Best Solutions

### 1. Doctor Slot Double-Booking (Concurrency Race Condition)
* **Problem:** Agar do patients ek hi doctor ke 11:00 AM slot par ek sath "Book Now" click karein, toh dono book ho sakte hain.
* **Solution:**
  * Redis `SET slot:{doctorId}:{timestamp} {userId} NX EX 300` use karke temporary 5-minute atomic lock lagana.
  * Database level par `UNIQUE (doctor_id, slot_start_time)` constraint enforce karna aur transaction me `SELECT ... FOR UPDATE` use karna.

### 2. Patient Data Privacy & Medical Report Leakage
* **Problem:** Reports ka public link hone par koi bhi kisi ka confidential test dekh sakta hai.
* **Solution:**
  * S3 Bucket ko strictly `Block Public Access: ON` rakhna.
  * Report download karne se pehle verify karna ki requester patient ka logged-in UHID wahi hai jo report se linked hai.
  * Sirf short-lived (15 minutes) signed URL return karna.

### 3. Asynchronous Heavy Tasks
* **Problem:** WhatsApp message bhejna, PDF receipt banana, ya email bhejna API response ko slow karta hai.
* **Solution:**
  * BullMQ worker queues use karna. API user ko turant 200 OK bhejti hai aur background worker WhatsApp alert process karta hai.

---

## 6. Directory Structure (Production Clean Architecture)

```
hospital-backend/
├── src/
│   ├── config/              # Env variables, database & S3 configs
│   ├── common/              # Global filters, interceptors, error handler
│   │   ├── decorators/      # CurrentUser, Roles decorators
│   │   ├── guards/          # JwtAuthGuard, RolesGuard
│   │   └── middlewares/     # RateLimiter, AuditLogger
│   ├── modules/
│   │   ├── auth/            # OTP login, Staff login, JWT tokens
│   │   ├── users/           # Patient profiles, Staff accounts
│   │   ├── departments/     # Medical specialities & centres of excellence
│   │   ├── doctors/         # Profiles, qualification, timings
│   │   ├── appointments/    # Booking engine, slot generator, Redis locks
│   │   ├── reports/         # Lab reports, S3 presigned URLs, UHID vault
│   │   ├── packages/        # Health checkup packages
│   │   ├── payments/        # Razorpay webhooks, invoices
│   │   ├── emergency/       # SOS requests, ambulance dispatch alerts
│   │   ├── inquiries/       # TPA insurance, contact us
│   │   └── notifications/   # WhatsApp & SMS BullMQ queues
│   ├── database/
│   │   ├── prisma/          # schema.prisma, migrations
│   │   └── seeders/         # Default departments, test doctors
│   └── app.ts / main.ts     # Application bootstrapper
├── tests/                   # E2E and unit test suites
├── Dockerfile               # Production container image
├── docker-compose.yml       # App + Postgres + Redis setup
├── package.json
└── tsconfig.json
```

---

## 7. Security & Compliance Checklist

- [x] **Rate Limiting:** IP aur Phone number par rate limit (Redis based) taaki OTP flooding na ho sake.
- [x] **SQL Injection & XSS Protection:** Parameterized queries via Prisma ORM + Class Validator DTOs.
- [x] **CORS Whitelist:** Sirf hospital ke frontend domain aur admin portal ko allow karna.
- [x] **Audit Logging:** Har patient record access ka timestamp, user ID, aur IP address store karna.
- [x] **Environment Security:** Saari secret keys (`JWT_SECRET`, `S3_KEY`, `RAZORPAY_SECRET`) `.env` me rakhna aur vault use karna.
