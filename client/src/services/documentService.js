const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

/**
 * Uploads one document to the Verification Orchestrator.
 * Backend route: POST /api/applicants/:applicantId/documents
 * Expected response: { documentId, status: "processing" | "verified" | "flagged", reason? }
 */
export async function uploadDocument(applicantId, docType, file) {
  const formData = new FormData();
  formData.append("docType", docType);
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/applicants/${applicantId}/documents`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Upload failed");
  }
  return res.json();
}

/**
 * Polls a single document's verification result once the ML service
 * (OCR + tamper detection) and Risk Engine have processed it.
 * Backend route: GET /api/applicants/:applicantId/documents/:documentId
 */
export async function getDocumentStatus(applicantId, documentId) {
  const res = await fetch(`${API_BASE}/applicants/${applicantId}/documents/${documentId}`);
  if (!res.ok) throw new Error("Could not fetch document status");
  return res.json();
}

/**
 * Fetches the applicant's current identity graph — used by the panel
 * on the right of the upload page and by the standalone Identity Graph view.
 * Backend route: GET /api/applicants/:applicantId/identity-graph
 */
export async function getIdentityGraph(applicantId) {
  const res = await fetch(`${API_BASE}/applicants/${applicantId}/identity-graph`);
  if (!res.ok) throw new Error("Could not fetch identity graph");
  return res.json();
}