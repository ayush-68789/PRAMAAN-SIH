import React, { useState } from "react";
import { FileText, IdCard, GraduationCap, Home, Camera, AlertTriangle, ShieldCheck, X, Check } from "lucide-react";
import Sidebar from "../components/sidebar";
import DocumentUploadCard from "../components/DocumentUploadCard";
import { uploadDocument, getDocumentStatus } from "../services/documentService";

const REQUIRED_DOCS = [
  { id: "birth", label: "Birth certificate", note: "Trusted source record", icon: FileText },
  { id: "aadhaar", label: "Aadhaar", note: "Verhoeff checksum validated", icon: IdCard },
  { id: "pan", label: "PAN card", note: "Format + structure check", icon: IdCard },
  { id: "school", label: "School certificate", note: "DOB cross-reference", icon: GraduationCap },
  { id: "address", label: "Address proof", note: "Any govt.-issued document", icon: Home },
  { id: "selfie", label: "Live selfie", note: "Liveness + face match", icon: Camera },
];

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30000;

export default function DocumentUploadPage({ applicantId, applicantName = "Applicant" }) {
  const [docs, setDocs] = useState(
    Object.fromEntries(REQUIRED_DOCS.map((d) => [d.id, { fileName: null, status: "empty" }]))
  );

  const uploadedCount = Object.values(docs).filter((d) => d.status !== "empty").length;
  const progressPct = Math.round((uploadedCount / REQUIRED_DOCS.length) * 100);
  const allUploaded = uploadedCount === REQUIRED_DOCS.length;
  const hasFlag = Object.values(docs).some((d) => d.status === "flagged");

  function setDocState(id, patch) {
    setDocs((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function handleFileSelect(docType, file) {
    setDocState(docType, { fileName: file.name, status: "processing" });
    try {
      const { documentId, status } = await uploadDocument(applicantId, docType, file);
      if (status !== "processing") {
        setDocState(docType, { status });
        return;
      }
      pollForResult(docType, documentId);
    } catch (err) {
      setDocState(docType, { status: "error" });
    }
  }

  function pollForResult(docType, documentId) {
    const startedAt = Date.now();
    const interval = setInterval(async () => {
      if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        clearInterval(interval);
        setDocState(docType, { status: "error" });
        return;
      }
      try {
        const { status } = await getDocumentStatus(applicantId, documentId);
        if (status !== "processing") {
          clearInterval(interval);
          setDocState(docType, { status });
        }
      } catch {
        clearInterval(interval);
        setDocState(docType, { status: "error" });
      }
    }, POLL_INTERVAL_MS);
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans">
      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-10">
        <Sidebar active="upload" />

        <div className="flex-1">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#0F6E56]">Applicant portal</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#1E2A45]">
              Upload your identity documents
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              We cross-check every document against the others before approving your
              application — upload all six to start the consistency review.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#1D9E75] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-sm font-medium text-[#1E2A45]">
                {uploadedCount}/{REQUIRED_DOCS.length} uploaded
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {REQUIRED_DOCS.map((doc) => (
              <DocumentUploadCard
                key={doc.id}
                doc={doc}
                state={docs[doc.id]}
                onFileSelect={handleFileSelect}
              />
            ))}
          </div>

          <button
            disabled={!allUploaded}
            className={`mt-8 w-full rounded-xl px-6 py-3 text-sm font-medium transition ${
              allUploaded
                ? "bg-[#0F6E56] text-white hover:bg-[#085041]"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            {allUploaded ? "Submit for identity review" : "Upload all documents to continue"}
          </button>
        </div>

        <aside className="w-80 shrink-0 rounded-2xl bg-[#101B33] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9E75] text-sm font-semibold">
              {applicantName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{applicantName}</p>
              <p className="text-xs text-slate-400">Applicant ID · {applicantId}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white/5 p-4">
            <p className="text-xs font-medium text-slate-300">Identity graph</p>
            <ul className="mt-3 space-y-2.5">
              {REQUIRED_DOCS.map(({ id, label }) => {
                const doc = docs[id];
                const icon =
                  doc.status === "flagged" ? (
                    <X size={14} className="text-[#F0997B]" />
                  ) : doc.status === "verified" ? (
                    <Check size={14} className="text-[#5DCAA5]" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-slate-500" />
                  );
                return (
                  <li key={id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{label}</span>
                    {icon}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2">
              {hasFlag ? (
                <AlertTriangle size={16} className="text-[#F0997B]" />
              ) : (
                <ShieldCheck size={16} className="text-[#5DCAA5]" />
              )}
              <p className="text-xs font-medium text-slate-300">
                {hasFlag ? "Inconsistency detected" : "No conflicts found yet"}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {hasFlag
                ? "One or more documents don't agree with the rest of the identity trail. This will be sent to the reviewer dashboard."
                : "As documents come in, we compare name, DOB, parent name, and address across all of them."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}