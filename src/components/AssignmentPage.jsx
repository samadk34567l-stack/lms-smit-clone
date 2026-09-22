import React, { useState } from "react";
import { ClipboardList, FileEdit, Clock as ClockIcon, Eye, Upload, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import "./AssignmentPage.css";

const ASSIGNMENTS = [
  { name: "Admin panel (E commerce Dashbod)", tag: null, topics: "7 Topics", dueDate: "September 10, 2026", status: "SUBMITTED", closed: false },
  { name: "QUICKSERVE WMA (Batch-20)", tag: "HACKATHON", topics: "No topics", dueDate: "August 30, 2026", status: "NOT SUBMITTED", closed: true },
  { name: "E-Commerce Website (React js)", tag: null, topics: "4 Topics", dueDate: "August 17, 2026", status: "APPROVED", closed: false },
  { name: "Furniture E-Commerce Website", tag: null, topics: "5 Topics", dueDate: "August 10, 2026", status: "SUBMITTED", closed: false },
  { name: "MaintainIQ (Batch-20)", tag: "HACKATHON", topics: "No topics", dueDate: "July 12, 2026", status: "NOT SUBMITTED", closed: true },
  { name: "JavaScript Assignment – 25 Questions", tag: null, topics: "8 Topics", dueDate: "July 10, 2026", status: "LATE SUBMITTED", closed: false },
  { name: "Budgetting App", tag: null, topics: "12 Topics", dueDate: "June 1, 2026", status: "APPROVED", closed: false },
  { name: "Landing Page Assignment", tag: null, topics: "11 Topics", dueDate: "March 6, 2026", status: "APPROVED", closed: false },
  { name: "Grid Assignment no 2", tag: null, topics: "1 Topic", dueDate: "February 16, 2026", status: "APPROVED", closed: false },
  { name: "Grid Assignment no 1", tag: null, topics: "1 Topic", dueDate: "February 16, 2026", status: "APPROVED", closed: false },
  { name: "ÇSs Figma website", tag: null, topics: "No topics", dueDate: "January 23, 2026", status: "SUBMITTED", closed: false },
  { name: "HTML - Registration Form", tag: null, topics: "No topics", dueDate: "December 29, 2025", status: "SUBMITTED", closed: false },
  { name: "HTML - Links with multiple pages", tag: null, topics: "No topics", dueDate: "December 17, 2025", status: "SUBMITTED", closed: false },
];

const PAGE_SIZE = 7;

const STATUS_CLASS = {
  SUBMITTED: "submitted",
  "NOT SUBMITTED": "not-submitted",
  APPROVED: "approved",
  "LATE SUBMITTED": "late-submitted",
};

const ICON_BG_CLASS = {
  blue: "rgba(37,99,235,0.10)",
  green: "rgba(34,197,94,0.12)",
  yellow: "rgba(234,179,8,0.15)",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box ap-summary-box">
      <div>
        <div className="ap-summary-value">{value}</div>
        <div className="ap-summary-label">{label}</div>
      </div>
      <div className="icon-circle ap-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function AssignmentPage() {
  const [page, setPage] = useState(1);

  const total = ASSIGNMENTS.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const rows = ASSIGNMENTS.slice(start, end);

  const assigned = 16;
  const submitted = 13;
  const pending = 3;

  return (
    <div>
      {/* Top summary boxes */}
      <div className="responsive-summary-row ap-summary-row">
        <SummaryBox icon={ClipboardList} iconBg={ICON_BG_CLASS.blue} iconColor="#2563EB" value={assigned} label="Assigned" />
        <SummaryBox icon={FileEdit} iconBg={ICON_BG_CLASS.green} iconColor="#16A34A" value={submitted} label="Submitted" />
        <SummaryBox icon={ClockIcon} iconBg={ICON_BG_CLASS.yellow} iconColor="#CA8A04" value={pending} label="Pending" />
      </div>

      {/* Assignment table */}
      <div className="responsive-table-scroll ap-table-card">
        <div className="responsive-table-grid">
          <div className="ap-table-header">
            <div>Assignment</div>
            <div>Topics</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          {rows.map((a, i) => {
            const statusClass = STATUS_CLASS[a.status] || STATUS_CLASS.SUBMITTED;
            return (
              <div
                key={start + i}
                className={`table-row-hover ap-table-row ${i === rows.length - 1 ? "last" : ""} ${a.tag ? "tagged" : ""}`}
              >
                <div className="ap-name-cell">
                  <span className={`ap-name-text ${a.tag ? "tagged" : ""}`}>{a.name}</span>
                  {a.tag && <span className="ap-hackathon-tag">{a.tag}</span>}
                </div>
                <div className={`ap-topics-cell ${a.topics !== "No topics" ? "has-topics" : ""}`}>
                  {a.topics === "No topics" ? (
                    a.topics
                  ) : (
                    <span className="ap-topics-chip">{a.topics}</span>
                  )}
                </div>
                <div className={`ap-due-date ${a.tag ? "tagged" : ""}`}>{a.dueDate}</div>
                <div>
                  <span className={`ap-status-badge ${statusClass}`}>{a.status}</span>
                </div>
                <div>
                  {a.closed ? (
                    <div className="ap-action-cell">
                      <Eye className="eye-icon ap-action-icon" size={16} color="#6B7280" />
                      <span className="ap-closed-text">Submissions closed</span>
                    </div>
                  ) : (
                    <div className="ap-action-cell">
                      <Eye className="eye-icon ap-action-icon" size={16} color="#6B7280" />
                      <Upload className="upload-icon ap-action-icon" size={16} color="#6B7280" />
                      <Pencil className="edit-icon ap-action-icon" size={16} color="#6B7280" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination footer */}
        <div className="ap-pagination-footer">
          <span>Showing {start + 1}-{end} of {total} records</span>
          <div className="ap-pagination-controls">
            <button
              className={`pill-btn ap-nav-btn ${page === 1 ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                className={`page-num-btn ap-page-num-btn ${p === page ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pill-btn ap-nav-btn ${page === totalPages ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
