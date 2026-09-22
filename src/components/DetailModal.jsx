import React, { useEffect } from "react";
import { X } from "lucide-react";
import "./DetailModal.css";

export default function DetailModal({ open, onClose, title, subtitle, avatarText, fields = [], footer }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dm-backdrop" onClick={onClose}>
      <div className="dm-panel" onClick={(e) => e.stopPropagation()}>
        <button className="dm-close-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <div className="dm-header">
          <div className="dm-avatar">{avatarText}</div>
          <div>
            <div className="dm-title">{title}</div>
            {subtitle && <div className="dm-subtitle">{subtitle}</div>}
          </div>
        </div>

        <div className="dm-fields-grid">
          {fields.map((f, i) => (
            <div className="dm-field" key={i}>
              <div className="dm-field-label">{f.label}</div>
              <div className={`dm-field-value ${f.badge ? `dm-badge ${f.badgeClass || ""}` : ""}`}>
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {footer && <div className="dm-footer">{footer}</div>}
      </div>
    </div>
  );
}
