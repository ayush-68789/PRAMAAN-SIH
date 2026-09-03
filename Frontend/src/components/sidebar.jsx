import React from "react";
import { Upload, Camera, Share2, Gauge, ClipboardCheck } from "lucide-react";

const NAV_ITEMS = [
  { id: "upload", label: "Document upload", icon: Upload },
  { id: "liveness", label: "Webcam / liveness", icon: Camera },
  { id: "graph", label: "Identity graph", icon: Share2 },
  { id: "risk", label: "Risk dashboard", icon: Gauge },
  { id: "reviewer", label: "Reviewer dashboard", icon: ClipboardCheck },
];

export default function Sidebar({ active = "upload", onNavigate }) {
  return (
    <nav className="flex h-full w-56 shrink-0 flex-col gap-1 rounded-2xl bg-[#101B33] p-3">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onNavigate?.(id)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
              isActive
                ? "bg-[#1D9E75]/15 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Icon size={16} className={isActive ? "text-[#5DCAA5]" : "text-slate-500"} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}