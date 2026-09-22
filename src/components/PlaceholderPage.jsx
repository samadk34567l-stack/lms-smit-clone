import React from "react";
import "./PlaceholderPage.css";

export default function PlaceholderPage({ title }) {
  return (
    <div className="pp-card">
      <div className="pp-title">{title}</div>
      <div className="pp-subtitle">Yeh section abhi build nahi hua — jaldi add hoga.</div>
    </div>
  );
}
