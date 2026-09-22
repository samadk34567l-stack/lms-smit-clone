import React, { useMemo, useState } from "react";
import { Search, Wallet, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { FEE_RECORDS } from "../data/adminData";
import DetailModal from "./DetailModal";
import "./FeesPage.css";

const PAGE_SIZE = 10;

const STATUS_CLASS = {
  PAID: "paid",
  PENDING: "pending",
  OVERDUE: "overdue",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box fep-summary-box">
      <div>
        <div className="fep-summary-value">{value}</div>
        <div className="fep-summary-label">{label}</div>
      </div>
      <div className="icon-circle fep-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function FeesPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FEE_RECORDS;
    return FEE_RECORDS.filter(
      (f) =>
        f.studentName.toLowerCase().includes(q) ||
        f.voucherId.toLowerCase().includes(q) ||
        f.course.toLowerCase().includes(q) ||
        String(f.roll).includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const rows = filtered.slice(start, end);

  const totalCollected = FEE_RECORDS.filter((f) => f.status === "PAID").reduce((sum, f) => sum + f.amount, 0);
  const overdueCount = FEE_RECORDS.filter((f) => f.status === "OVERDUE").length;

  return (
    <div>
      <div className="responsive-summary-row fep-summary-row">
        <SummaryBox icon={Wallet} iconBg="rgba(37,99,235,0.10)" iconColor="#2563EB" value={`Rs ${totalCollected.toLocaleString()}`} label="Total Collected" />
        <SummaryBox icon={CheckCircle2} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" value={FEE_RECORDS.length} label="Total Records" />
        <SummaryBox icon={AlertTriangle} iconBg="rgba(220,38,38,0.10)" iconColor="#DC2626" value={overdueCount} label="Overdue" />
      </div>

      <div className="fep-search-wrap">
        <Search size={16} color="#6B7280" />
        <input
          className="fep-search-input"
          placeholder="Search by student name, roll no, voucher ID or course..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        />
      </div>

      <div className="responsive-table-scroll fep-table-card">
        <div className="responsive-table-grid">
          <div className="fep-table-header">
            <div>Student</div>
            <div>Voucher ID</div>
            <div>Month</div>
            <div>Amount</div>
            <div>Due Date</div>
            <div>Status</div>
          </div>
          {rows.length === 0 ? (
            <div className="fep-empty-row">No fee records match your search.</div>
          ) : (
            rows.map((f, i) => (
              <div
                key={f.id}
                className={`table-row-hover fep-table-row ${i === rows.length - 1 ? "last" : ""}`}
                onClick={() => setSelected(f)}
              >
                <div className="fep-name-cell">
                  <div className="fep-name-text">{f.studentName}</div>
                  <div className="fep-roll-text">Roll #{f.roll}</div>
                </div>
                <div className="fep-voucher-cell">{f.voucherId}</div>
                <div>{f.month}</div>
                <div>Rs {f.amount.toLocaleString()}</div>
                <div>{f.dueDate}</div>
                <div>
                  <span className={`fep-status-badge ${STATUS_CLASS[f.status]}`}>{f.status}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="fep-pagination-footer">
          <span>Showing {total === 0 ? 0 : start + 1}-{end} of {total} fee records</span>
          <div className="fep-pagination-controls">
            <button
              className={`pill-btn fep-nav-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                className={`page-num-btn fep-page-num-btn ${p === currentPage ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pill-btn fep-nav-btn ${currentPage === totalPages ? "disabled" : ""}`}
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
        title={selected?.studentName}
        subtitle={selected ? `Roll #${selected.roll} · ${selected.course}` : ""}
        avatarText={selected ? selected.studentName.split(" ").map((n) => n[0]).join("").slice(0, 2) : ""}
        fields={
          selected
            ? [
                { label: "Voucher ID", value: selected.voucherId },
                { label: "Month", value: selected.month },
                { label: "Amount", value: `Rs ${selected.amount.toLocaleString()}` },
                { label: "Due Date", value: selected.dueDate },
                { label: "Paid Date", value: selected.paidDate },
                { label: "Payment Method", value: selected.method },
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
