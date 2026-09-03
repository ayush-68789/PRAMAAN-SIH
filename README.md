SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 1
## SIH26188
AI-Powered Identity Integrity &
## Document Fraud Detection
10/10 Project Blueprint & SIH Demo Strategy
MERN + Python ML/CV Architecture
## Core Pitch
“We don't just detect fake documents — we verify whether an applicant's entire identity is
consistent across trusted records.”
The central idea is to move beyond single-document OCR and binary FAKE/REAL decisions. The system constructs
an identity trail/graph, cross-verifies attributes across documents, checks biometrics, detects duplicate identities, and
produces an explainable fraud-risk score.
- What Makes This a 10/10 SIH Project
- Identity consistency: detects contradictions across multiple documents instead of inspecting only one file.
- Identity Graph: links a person to birth, identity, education and address records and exposes relationships visually.
- Evidence-based risk scoring: combines independent checks into an explainable score rather than a black-box
verdict.
- Live biometric verification: combines document-photo matching with challenge-based liveness.
- Duplicate identity detection: searches stored face embeddings for possible re-use under another identity.
- Human-in-the-loop: routes medium/high-risk cases to a reviewer instead of pretending AI is infallible.
- Auditability and privacy: records verification events and emphasizes consent, access control and minimal data
retention.
## 2. Final System Architecture
LayerMain ResponsibilityTechnology
Applicant PortalDocument upload, webcam/selfie, status and resultsReact + Tailwind
Document IntelligenceClassification, preprocessing, OCR and field extractionPython + FastAPI +
PaddleOCR/OpenCV
Document IntegrityTamper signals, metadata checks, checksum/format
validation
OpenCV + Node.js validation
Identity ResolutionName/parent/DOB/address matching across recordsNode.js + MongoDB + fuzzy matching
Identity GraphVisual relationships between applicant and
trusted/reference records
React visualization + MongoDB
Face VerificationFace similarity and challenge-based livenessface-api.js / TensorFlow.js
Evidence FusionCombine independent checks and normalize resultsNode.js risk engine
Human ReviewReview evidence and approve/reject/request
verification
React dashboard

SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 2
LayerMain ResponsibilityTechnology
Audit TrailVerification events, decisions and timestampsMongoDB
## 3. Identity Graph — The Killer Feature
Every submitted document contributes evidence to one applicant identity. The graph makes consistency and conflicts
immediately understandable to a judge.
- Birth Record → Aadhaar → PAN → School Certificate → Address Proof → Selfie
- Shared attributes such as name, parents' names, DOB and address are normalized before comparison.
- A contradiction becomes an explicit graph/evidence relationship instead of an unexplained model prediction.
Example: Birth Record DOB = 15/03/2004; Aadhaar DOB = 15/03/2010; School Certificate DOB =
15/03/2004 → HIGH-SEVERITY DOB INCONSISTENCY, subject to review and confidence
thresholds.
- Explainable Fraud-Risk Engine
CheckExample ResultRisk Contribution
OCR confidence96%0
PAN structureValid0
Aadhaar checksumValid0
Document tamperingSuspicious+22
Face similarity94%0
LivenessPassed0
DOB consistencyMismatch+35
Duplicate identityPossible match+28
FinalHIGH RISK85 / 100
Important: keep fraud risk separate from detection confidence. For example: Fraud Risk = 85/100; Detection
## Confidence = 94%.
## 5. Core Verification Modules
Document Classification & OCR — Identify document type, preprocess camera images, extract structured fields and
OCR confidence.
Tamper / Forgery Detection — Use ELA/copy-move and image/metadata anomaly signals as evidence, not as an
absolute truth.
Checksum / Format Validation — Perform deterministic format and checksum checks for supported Indian document
identifiers.
Face Match + Liveness — Compare document photo with a live capture and perform a challenge-based liveness
check.
DOB Consistency — Match the applicant to a trusted/reference birth record and compare normalized DOB values.
Duplicate Identity Detection — Search stored face embeddings for high-similarity identities using different
names/DOBs.

SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 3
Human Review — Show all evidence and allow a reviewer to approve, reject or request additional verification.
Audit Trail — Record verification stages, timestamps, risk changes and reviewer decisions.
## 6. Duplicate Identity Detection Demo
New Applicant: Rohan Kumar, DOB 12/06/2002
Existing Identity: Mohit Singh, DOB 18/02/2001
## Face Similarity: 96.7%
System Result: n Possible Duplicate Identity → send to manual verification
This feature reuses the face-verification pipeline and turns the result into a high-impact visual demo.

SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 4
- Human-in-the-Loop Decision Model
Risk LevelRecommended System Action
LowAuto-pass / continue normal workflow
MediumManual review with evidence summary
HighFlag for investigation; reviewer decides final action
This avoids overclaiming that an AI model can make an irreversible fraud decision. The system provides evidence
and prioritizes cases for human action.
- Privacy-by-Design
- Explicit user consent before biometric verification.
- Encrypt sensitive records and apply role-based access control.
- Store only the minimum biometric/identity data required for the workflow.
- Maintain an audit log for access and verification decisions.
- Define retention and deletion/anonymization policies.
- Present the prototype as privacy-aware; do not claim legal compliance without a formal review.
## 9. Recommended Tech Stack
AreaTechnologyPurpose
FrontendReact + Tailwind CSSPortal, dashboard, identity graph, reviewer UI
BackendNode.js + ExpressAPI, orchestration, auth, risk engine
DatabaseMongoDBDocuments, identities, reports, embeddings, audit logs
ML/CVPython + FastAPIOCR, preprocessing, tamper/image analysis
OCRPaddleOCRMultilingual/robust document text extraction
CVOpenCVImage processing and tamper-analysis signals
Faceface-api.js / TensorFlow.jsBrowser-side face matching and liveness prototype
RealtimeSocket.ioProgressive verification updates
ChartsRechartsRisk/evidence visualization
## 10. Database Collections
CollectionKey Data
applicantsApplicant profile and verification state
documentsFile reference, document type, OCR fields, integrity signals
identityRecordsNormalized identity attributes and linked references
birthRecordsTrusted/reference DOB data for prototype
embeddingsFace descriptors and associated identity references

SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 5
CollectionKey Data
verificationReportsChecks, scores, reasons, evidence and final status
auditLogsTimestamped verification/reviewer events
- The 5-Minute SIH Demo
- Upload five documents: birth certificate, Aadhaar, PAN, school certificate and address proof.
- Show document classification and OCR extracting fields progressively.
- Show checksum/format validation and tamper-analysis signals.
- Capture a live selfie and demonstrate face similarity + challenge-based liveness.
- Open the Identity Graph and show the connected applicant records.
- Trigger a DOB mismatch: trusted/reference record = 2004, submitted identity document = 2010.
- Show the evidence panel and final risk score, e.g. HIGH RISK with the reasons clearly listed.
- Run a second applicant whose face matches an existing identity under a different name and demonstrate duplicate
detection.
- Open the reviewer screen and show the audit trail.
## 12. Final Build Priority
PriorityFeatureWhy
1Base pipeline + risk dashboardFoundation for every other feature
2Checksum / format validationFast, deterministic and easy to demonstrate
3Face match + livenessInteractive live-demo feature
4Identity Graph + DOB consistencyHeadline differentiator
5Duplicate identity detectionHigh wow factor; reuses face pipeline
6Human review + audit trailMakes the system operationally realistic
7Marriage-age use caseReuse DOB logic; strong social-impact narrative
FutureDomicile / school-chain / incomeExtensibility after core system is stable
- Claims to Avoid / Better Wording
AvoidUse instead
“100% reliable fraud detection”“Deterministic format/checksum validation with predictable
outcomes.”
“Hospital birth record is the source of truth”“Trusted/reference record for the prototype; production would use
authorized integration.”
“Confirms the applicant is a live human”“Performs challenge-based liveness verification.”
“AI decides fake or real”“AI produces evidence and risk; high-risk cases can be sent to
human review.”
- Final SIH Pitch

SIH26188 — AI-Powered Identity Integrity & Document Fraud DetectionPage 6
“Existing document verification systems primarily ask whether a document looks authentic.
Our system goes one step further. It constructs an identity graph from an applicant's
documents, verifies the consistency of identity attributes and biometrics, detects conflicting or
duplicate identities, and produces an explainable fraud-risk score with evidence for human
review.”
## 10/10 Feature Set
FeaturePriority
Document classification + OCRMust
Tamper detectionMust
PAN/Aadhaar format/checksum validationMust
Face matchingMust
Challenge-based livenessMust
Identity GraphCritical differentiator
DOB consistencyCritical differentiator
Duplicate identity detectionCritical differentiator
Explainable risk score + confidenceCritical
Human review workflowHigh
Audit trailHigh
Privacy-aware controlsHigh
Domicile / education / income modulesFuture scope
Prepared as an enhanced version of the uploaded SIH26188 Project Blueprint. The strongest original concepts—identity
consistency, explainable scoring, face verification, checksum validation, DOB consistency and duplicate identity detection—are
retained and organized into a tighter product/demo strategy.