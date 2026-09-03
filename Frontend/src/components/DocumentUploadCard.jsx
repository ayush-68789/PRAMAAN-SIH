import React from "react";
import { Upload, Check, Loader2 } from "lucide-react";

const STATUS_STYLES = {
  empty: { label: "Not uploaded", pillClass: "bg-slate-100 text-slate-500" },
  processing: { label: "Processing", pillClass: "bg-amber-50 text-amber-600" },
  verified: { label: "Verified", pillClass: "bg-[#E1F5EE] text-[#0F6E56]" },
  flagged: { label: "Inconsistent", pillClass: "bg-[#FAECE7] text-[#993C1D]" },
  error: { label: "Upload failed", pillClass: "bg-[#FAECE7] text-[#993C1D]" },
};

export default function DocumentUploadCard({ doc, state, onFileSelect }) {
  const { label, note, icon: Icon } = doc;
  const { fileName, status } = state;
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.empty;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E1F5EE] text-[#0F6E56]">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1E2A45]">{label}</p>
            <p className="text-xs text-slate-400">{note}</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle.pillClass}`}>
          {statusStyle.label}
        </span>
      </div>

      <label
        htmlFor={`file-${doc.id}`}
        className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-[#1D9E75] hover:bg-[#E1F5EE]/40"
      >
        {status === "processing" ? (
          <>
            <Loader2 size={16} className="mb-1 animate-spin text-[#1D9E75]" />
            <p className="max-w-[200px] truncate text-xs font-medium text-[#1E2A45]">{fileName}</p>
            <p className="mt-0.5 text-xs text-slate-400">Running checks...</p>
          </>
        ) : fileName ? (
          <>
            <Check size={16} className="mb-1 text-[#0F6E56]" />
            <p className="max-w-[200px] truncate text-xs font-medium text-[#1E2A45]">{fileName}</p>
            <p className="mt-0.5 text-xs text-slate-400">Click to replace</p>
          </>
        ) : (
          <>
            <Upload size={16} className="mb-1 text-slate-400" />
            <p className="text-xs text-slate-500">Drag & drop or click to upload</p>
          </>
        )}
        <input
          id={`file-${doc.id}`}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFileSelect(doc.id, e.target.files[0])}
        />
      </label>
    </div>
  );
}