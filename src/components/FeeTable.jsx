import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import "./FeeTable.css";

export default function FeeTable({ rows }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (voucherId) => {
    try {
      navigator.clipboard.writeText(voucherId);
    } catch (err) {
      // clipboard may be unavailable in some environments; fail silently
    }
    setCopiedId(voucherId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fee-table-wrapper">
      <div className="fee-table-title">Fee</div>
      <div className="fee-table-card">
        <div className="fee-table-scroll-inner">
        <table className="fee-table">
          <thead>
            <tr>
              {["Month", "Amount", "Type", "Due date", "Voucher ID", "Status"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="month-cell">{row.month}</td>
                <td>{row.amount}</td>
                <td>{row.type}</td>
                <td>{row.dueDate}</td>
                <td>
                  <div className="fee-voucher-cell">
                    {row.voucherId}
                    <button
                      onClick={() => handleCopy(row.voucherId)}
                      aria-label="Copy voucher ID"
                      className="fee-copy-btn"
                    >
                      {copiedId === row.voucherId ? (
                        <Check size={13} color="#22C55E" />
                      ) : (
                        <Copy size={13} color="#6B7280" />
                      )}
                    </button>
                  </div>
                </td>
                <td>
                  <span
                    className={`fee-status-badge ${row.status === "PAID" ? "paid" : "pending"}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
