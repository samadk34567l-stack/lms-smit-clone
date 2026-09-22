import React, { useMemo, useState } from "react";
import { Search, Users, Star, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { TRAINERS } from "../data/adminData";
import DetailModal from "./DetailModal";
import "./TrainersPage.css";

const PAGE_SIZE = 10;

const STATUS_CLASS = {
  ACTIVE: "active",
  "ON LEAVE": "leave",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box trp-summary-box">
      <div>
        <div className="trp-summary-value">{value}</div>
        <div className="trp-summary-label">{label}</div>
      </div>
      <div className="icon-circle trp-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function TrainersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TRAINERS;
    return TRAINERS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.expertise.toLowerCase().includes(q) ||
        t.empId.toLowerCase().includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const rows = filtered.slice(start, end);

  const activeCount = TRAINERS.filter((t) => t.status === "ACTIVE").length;
  const totalStudentsCovered = TRAINERS.reduce((sum, t) => sum + t.studentsCount, 0);

  return (
    <div>
      <div className="responsive-summary-row trp-summary-row">
        <SummaryBox icon={Users} iconBg="rgba(147,51,234,0.12)" iconColor="#9333EA" value={TRAINERS.length} label="Total Trainers" />
        <SummaryBox icon={BookOpen} iconBg="rgba(37,99,235,0.10)" iconColor="#2563EB" value={activeCount} label="Active" />
        <SummaryBox icon={Star} iconBg="rgba(234,179,8,0.15)" iconColor="#B45309" value={totalStudentsCovered} label="Students Covered" />
      </div>

      <div className="trp-search-wrap">
        <Search size={16} color="#6B7280" />
        <input
          className="trp-search-input"
          placeholder="Search by name, expertise or employee ID..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />
      </div>

      <div className="responsive-table-scroll trp-table-card">
        <div className="responsive-table-grid">
          <div className="trp-table-header">
            <div>Trainer</div>
            <div>Expertise</div>
            <div>Experience</div>
            <div>Students</div>
            <div>Rating</div>
            <div>Status</div>
          </div>
          {rows.length === 0 ? (
            <div className="trp-empty-row">No trainers match your search.</div>
          ) : (
            rows.map((t, i) => (
              <div
                key={t.id}
                className={`table-row-hover trp-table-row ${i === rows.length - 1 ? "last" : ""}`}
                onClick={() => setSelected(t)}
              >
                <div className="trp-name-cell">
                  <div className="trp-mini-avatar">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="trp-name-text">{t.name}</div>
                    <div className="trp-empid-text">{t.empId}</div>
                  </div>
                </div>
                <div className="trp-expertise-cell">{t.expertise}</div>
                <div>{t.experience} yrs</div>
                <div>{t.studentsCount}</div>
                <div className="trp-rating-cell">
                  <Star size={13} color="#B45309" fill="#B45309" /> {t.rating}
                </div>
                <div>
                  <span className={`trp-status-badge ${STATUS_CLASS[t.status]}`}>{t.status}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="trp-pagination-footer">
          <span>Showing {total === 0 ? 0 : start + 1}-{end} of {total} trainers</span>
          <div className="trp-pagination-controls">
            <button
              className={`pill-btn trp-nav-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                className={`page-num-btn trp-page-num-btn ${p === currentPage ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pill-btn trp-nav-btn ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle={selected ? `${selected.empId} · ${selected.expertise}` : ""}
        avatarText={selected ? selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : ""}
        fields={
          selected
            ? [
                { label: "Employee ID", value: selected.empId },
                { label: "Email", value: selected.email },
                { label: "Phone", value: selected.phone },
                { label: "Campus", value: selected.campus },
                { label: "Experience", value: `${selected.experience} years` },
                { label: "Courses Taught", value: selected.coursesTaught },
                { label: "Students Covered", value: selected.studentsCount },
                { label: "Rating", value: `${selected.rating} / 5.0` },
                {
                  label: "Status",
                  value: selected.status,
                  badge: true,
                  badgeClass: STATUS_CLASS[selected.status],
                },
              ]
            : []
        }
      />
    </div>
  );
}
