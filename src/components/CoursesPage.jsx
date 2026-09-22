import React, { useMemo, useState } from "react";
import { Search, BookOpen, Users2, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { COURSES_LIST } from "../data/adminData";
import DetailModal from "./DetailModal";
import "./CoursesPage.css";

const PAGE_SIZE = 10;

const STATUS_CLASS = {
  ONGOING: "ongoing",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box crp-summary-box">
      <div>
        <div className="crp-summary-value">{value}</div>
        <div className="crp-summary-label">{label}</div>
      </div>
      <div className="icon-circle crp-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COURSES_LIST;
    return COURSES_LIST.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.trainer.toLowerCase().includes(q) ||
        c.batch.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const rows = filtered.slice(start, end);

  const ongoingCount = COURSES_LIST.filter((c) => c.status === "ONGOING").length;
  const totalEnrolled = COURSES_LIST.reduce((sum, c) => sum + c.enrolled, 0);

  return (
    <div>
      <div className="responsive-summary-row crp-summary-row">
        <SummaryBox icon={BookOpen} iconBg="rgba(37,99,235,0.10)" iconColor="#2563EB" value={COURSES_LIST.length} label="Total Course Batches" />
        <SummaryBox icon={PlayCircle} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" value={ongoingCount} label="Ongoing" />
        <SummaryBox icon={Users2} iconBg="rgba(147,51,234,0.12)" iconColor="#9333EA" value={totalEnrolled} label="Total Enrolled" />
      </div>

      <div className="crp-search-wrap">
        <Search size={16} color="#6B7280" />
        <input
          className="crp-search-input"
          placeholder="Search by course, trainer, batch or category..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />
      </div>

      <div className="responsive-table-scroll crp-table-card">
        <div className="responsive-table-grid">
          <div className="crp-table-header">
            <div>Course</div>
            <div>Trainer</div>
            <div>Batch</div>
            <div>Seats</div>
            <div>Fee</div>
            <div>Status</div>
          </div>
          {rows.length === 0 ? (
            <div className="crp-empty-row">No courses match your search.</div>
          ) : (
            rows.map((c, i) => (
              <div
                key={c.id}
                className={`table-row-hover crp-table-row ${i === rows.length - 1 ? "last" : ""}`}
                onClick={() => setSelected(c)}
              >
                <div className="crp-title-cell">
                  <div className="crp-title-text">{c.title}</div>
                  <div className="crp-category-text">{c.category}</div>
                </div>
                <div className="crp-trainer-cell">{c.trainer}</div>
                <div>{c.batch}</div>
                <div>
                  <span className="crp-seats-chip">{c.enrolled}/{c.capacity}</span>
                </div>
                <div>Rs {c.fee.toLocaleString()}</div>
                <div>
                  <span className={`crp-status-badge ${STATUS_CLASS[c.status]}`}>{c.status}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="crp-pagination-footer">
          <span>Showing {total === 0 ? 0 : start + 1}-{end} of {total} course batches</span>
          <div className="crp-pagination-controls">
            <button
              className={`pill-btn crp-nav-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                className={`page-num-btn crp-page-num-btn ${p === currentPage ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pill-btn crp-nav-btn ${currentPage === totalPages ? "disabled" : ""}`}
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
        title={selected?.title}
        subtitle={selected ? `${selected.batch} · ${selected.category}` : ""}
        avatarText={selected ? <BookOpen size={20} /> : ""}
        fields={
          selected
            ? [
                { label: "Trainer", value: selected.trainer },
                { label: "Campus", value: selected.campus },
                { label: "Duration", value: selected.duration },
                { label: "Timing", value: selected.timing },
                { label: "Start Date", value: selected.startDate },
                { label: "Seats", value: `${selected.enrolled} / ${selected.capacity} enrolled` },
                { label: "Course Fee", value: `Rs ${selected.fee.toLocaleString()}` },
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
