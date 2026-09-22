import React from "react";
import "./StatCard.css";

export default function StatCard({ label, value, iconBg, icon: Icon, iconColor }) {
  return (
    <div className="sc-card">
      <div>
        <div className="sc-value">{value}</div>
        <div className="sc-label">{label}</div>
      </div>
      <div className="sc-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}
