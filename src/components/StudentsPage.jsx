import React, { useMemo, useState } from "react";
import { Search, GraduationCap, UserCheck, Clock3, ChevronLeft, ChevronRight } from "lucide-react";
import { STUDENTS } from "../data/adminData";
import DetailModal from "./DetailModal";
import "./StudentsPage.css";

const PAGE_SIZE = 10;

const STATUS_CLASS = {
  ACTIVE: "active",
  "PENDING FEE": "pending",
  "ON LEAVE": "leave",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box stp-summary-box">
      <div>
        <div className="stp-summary-value">{value}</div>
        <div className="stp-summary-label">{label}</div>
      </div>
      <div className="icon-circle stp-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STUDENTS;
    return STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        String(s.roll).includes(q) ||
        s.batch.toLowerCase().includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const rows = filtered.slice(start, end);

  const activeCount = STUDENTS.filter((s) => s.feeStatus === "ACTIVE").length;
  const pendingCount = STUDENTS.filter((s) => s.feeStatus === "PENDING FEE").length;

  return (
    <div>
      <div className="responsive-summary-row stp-summary-row">
        <SummaryBox icon={GraduationCap} iconBg="rgba(37,99,235,0.10)" iconColor="#2563EB" value={STUDENTS.length} label="Total Students" />
        <SummaryBox icon={UserCheck} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" value={activeCount} label="Active" />
        <SummaryBox icon={Clock3} iconBg="rgba(234,179,8,0.15)" iconColor="#B45309" value={pendingCount} label="Pending Fee" />
      </div>

      <div className="stp-search-wrap">
        <Search size={16} color="#6B7280" />
        <input
          className="stp-search-input"
          placeholder="Search by name, roll no, course or batch..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />
      </div>

      <div className="responsive-table-scroll stp-table-card">
        <div className="responsive-table-grid">
          <div className="stp-table-header">
            <div>Student</div>
            <div>Course</div>
            <div>Batch</div>
            <div>Attendance</div>
            <div>Status</div>
          </div>
          {rows.length === 0 ? (
            <div className="stp-empty-row">No students match your search.</div>
          ) : (
            rows.map((s, i) => (
              <div
                key={s.id}
                className={`table-row-hover stp-table-row ${i === rows.length - 1 ? "last" : ""}`}
                onClick={() => setSelected(s)}
              >
                <div className="stp-name-cell">
                  <div className="stp-mini-avatar">
                    {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="stp-name-text">{s.name}</div>
                    <div className="stp-roll-text">Roll #{s.roll}</div>
                  </div>
                </div>
                <div className="stp-course-cell">{s.course}</div>
                <div>{s.batch}</div>
                <div>{s.attendance}%</div>
                <div>
                  <span className={`stp-status-badge ${STATUS_CLASS[s.feeStatus]}`}>{s.feeStatus}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="stp-pagination-footer">
          <span>Showing {total === 0 ? 0 : start + 1}-{end} of {total} students</span>
          <div className="stp-pagination-controls">
            <button
              className={`pill-btn stp-nav-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                className={`page-num-btn stp-page-num-btn ${p === currentPage ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pill-btn stp-nav-btn ${currentPage === totalPages ? "disabled" : ""}`}
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
        subtitle={selected ? `Roll #${selected.roll} · ${selected.course}` : ""}
        avatarText={selected ? selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : ""}
        fields={
          selected
            ? [
                { label: "CNIC", value: selected.cnic },
                { label: "Email", value: selected.email },
                { label: "Phone", value: selected.phone },
                { label: "Batch", value: selected.batch },
                { label: "Campus", value: selected.campus },
                { label: "City", value: selected.city },
                { label: "Attendance", value: `${selected.attendance}%` },
                { label: "Grade (CGPA)", value: selected.grade },
                { label: "Joined", value: selected.joined },
                {
                  label: "Fee Status",
                  value: selected.feeStatus,
                  badge: true,
                  badgeClass: STATUS_CLASS[selected.feeStatus],
                },
              ]
            : []
        }
      />
    </div>
  );
}
