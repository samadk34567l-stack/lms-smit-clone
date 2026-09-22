import React, { useMemo, useState } from "react";
import { Calendar, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import "./AttendancePage.css";

// Attendance records grouped by month (add more months here as needed)
const ATTENDANCE_BY_MONTH = {
  "Sep 2026": [
    { classNo: 1, date: "Wed, Sep 2, 2026", status: "PRESENT" },
    { classNo: 2, date: "Fri, Sep 4, 2026", status: "PRESENT" },
    { classNo: 3, date: "Mon, Sep 7, 2026", status: "ABSENT" },
    { classNo: 4, date: "Wed, Sep 9, 2026", status: "PRESENT" },
  ],
  "Aug 2026": [
    { classNo: 1, date: "Mon, Aug 3, 2026", status: "PRESENT" },
    { classNo: 2, date: "Wed, Aug 5, 2026", status: "PRESENT" },
    { classNo: 3, date: "Fri, Aug 7, 2026", status: "ABSENT" },
    { classNo: 4, date: "Mon, Aug 10, 2026", status: "PRESENT" },
    { classNo: 5, date: "Wed, Aug 12, 2026", status: "PRESENT" },
    { classNo: 6, date: "Fri, Aug 14, 2026", status: "ABSENT" },
    { classNo: 7, date: "Mon, Aug 17, 2026", status: "PRESENT" },
    { classNo: 8, date: "Wed, Aug 19, 2026", status: "PRESENT" },
    { classNo: 9, date: "Fri, Aug 21, 2026", status: "PRESENT" },
    { classNo: 10, date: "Mon, Aug 24, 2026", status: "ABSENT" },
    { classNo: 11, date: "Wed, Aug 26, 2026", status: "PRESENT" },
    { classNo: 12, date: "Fri, Aug 28, 2026", status: "PRESENT" },
    { classNo: 13, date: "Mon, Aug 31, 2026", status: "PRESENT" },
  ],
  "Jul 2026": [
    { classNo: 1, date: "Wed, Jul 1, 2026", status: "PRESENT" },
    { classNo: 2, date: "Fri, Jul 3, 2026", status: "PRESENT" },
    { classNo: 3, date: "Mon, Jul 6, 2026", status: "PRESENT" },
    { classNo: 4, date: "Wed, Jul 8, 2026", status: "PRESENT" },
    { classNo: 5, date: "Fri, Jul 10, 2026", status: "PRESENT" },
    { classNo: 6, date: "Mon, Jul 13, 2026", status: "PRESENT" },
    { classNo: 7, date: "Wed, Jul 15, 2026", status: "PRESENT" },
    { classNo: 8, date: "Fri, Jul 17, 2026", status: "PRESENT" },
    { classNo: 9, date: "Mon, Jul 20, 2026", status: "PRESENT" },
    { classNo: 10, date: "Wed, Jul 22, 2026", status: "PRESENT" },
    { classNo: 11, date: "Fri, Jul 24, 2026", status: "PRESENT" },
    { classNo: 12, date: "Mon, Jul 27, 2026", status: "PRESENT" },
    { classNo: 13, date: "Wed, Jul 29, 2026", status: "PRESENT" },
    { classNo: 14, date: "Fri, Jul 31, 2026", status: "PRESENT" },
  ],
  "Jun 2026": [
    { classNo: 1, date: "Mon, Jun 1, 2026", status: "PRESENT" },
    { classNo: 2, date: "Wed, Jun 3, 2026", status: "PRESENT" },
    { classNo: 3, date: "Fri, Jun 5, 2026", status: "PRESENT" },
    { classNo: 4, date: "Mon, Jun 8, 2026", status: "PRESENT" },
    { classNo: 5, date: "Wed, Jun 10, 2026", status: "PRESENT" },
    { classNo: 6, date: "Fri, Jun 12, 2026", status: "PRESENT" },
    { classNo: 7, date: "Mon, Jun 15, 2026", status: "PRESENT" },
    { classNo: 8, date: "Wed, Jun 17, 2026", status: "PRESENT" },
    { classNo: 9, date: "Fri, Jun 19, 2026", status: "PRESENT" },
    { classNo: 10, date: "Mon, Jun 22, 2026", status: "PRESENT" },
    { classNo: 11, date: "Wed, Jun 24, 2026", status: "PRESENT" },
    { classNo: 12, date: "Fri, Jun 26, 2026", status: "PRESENT" },
  ],
  "May 2026": [
    { classNo: 1, date: "Fri, May 1, 2026", status: "PRESENT" },
    { classNo: 2, date: "Mon, May 4, 2026", status: "PRESENT" },
    { classNo: 3, date: "Wed, May 6, 2026", status: "PRESENT" },
    { classNo: 4, date: "Fri, May 8, 2026", status: "PRESENT" },
    { classNo: 5, date: "Mon, May 11, 2026", status: "PRESENT" },
    { classNo: 6, date: "Wed, May 13, 2026", status: "PRESENT" },
    { classNo: 7, date: "Fri, May 15, 2026", status: "PRESENT" },
    { classNo: 8, date: "Mon, May 18, 2026", status: "PRESENT" },
    { classNo: 9, date: "Wed, May 20, 2026", status: "PRESENT" },
    { classNo: 10, date: "Fri, May 22, 2026", status: "PRESENT" },
  ],
  "Apr 2026": [
    { classNo: 1, date: "Wed, Apr 1, 2026", status: "PRESENT" },
    { classNo: 2, date: "Fri, Apr 3, 2026", status: "PRESENT" },
    { classNo: 3, date: "Mon, Apr 6, 2026", status: "PRESENT" },
    { classNo: 4, date: "Wed, Apr 8, 2026", status: "PRESENT" },
    { classNo: 5, date: "Fri, Apr 10, 2026", status: "PRESENT" },
    { classNo: 6, date: "Wed, Apr 15, 2026", status: "PRESENT" },
    { classNo: 7, date: "Fri, Apr 17, 2026", status: "PRESENT" },
    { classNo: 8, date: "Wed, Apr 22, 2026", status: "PRESENT" },
    { classNo: 9, date: "Fri, Apr 24, 2026", status: "ABSENT" },
    { classNo: 10, date: "Mon, Apr 27, 2026", status: "PRESENT" },
    { classNo: 11, date: "Wed, Apr 29, 2026", status: "PRESENT" },
  ],
  "Mar 2026": [
    { classNo: 1, date: "Mon, Mar 2, 2026", status: "PRESENT" },
    { classNo: 2, date: "Wed, Mar 4, 2026", status: "PRESENT" },
    { classNo: 3, date: "Fri, Mar 6, 2026", status: "PRESENT" },
    { classNo: 4, date: "Mon, Mar 9, 2026", status: "PRESENT" },
    { classNo: 5, date: "Wed, Mar 11, 2026", status: "PRESENT" },
    { classNo: 6, date: "Wed, Mar 25, 2026", status: "PRESENT" },
    { classNo: 7, date: "Fri, Mar 27, 2026", status: "PRESENT" },
    { classNo: 8, date: "Mon, Mar 30, 2026", status: "PRESENT" },
  ],
  "Feb 2026": [
    { classNo: 1, date: "Mon, Feb 2, 2026", status: "ABSENT" },
    { classNo: 2, date: "Wed, Feb 4, 2026", status: "PRESENT" },
    { classNo: 3, date: "Fri, Feb 6, 2026", status: "PRESENT" },
    { classNo: 4, date: "Mon, Feb 9, 2026", status: "PRESENT" },
    { classNo: 5, date: "Wed, Feb 11, 2026", status: "ABSENT" },
    { classNo: 6, date: "Fri, Feb 13, 2026", status: "PRESENT" },
    { classNo: 7, date: "Mon, Feb 16, 2026", status: "PRESENT" },
    { classNo: 8, date: "Wed, Feb 18, 2026", status: "PRESENT" },
    { classNo: 9, date: "Fri, Feb 20, 2026", status: "PRESENT" },
    { classNo: 10, date: "Mon, Feb 23, 2026", status: "PRESENT" },
    { classNo: 11, date: "Wed, Feb 25, 2026", status: "PRESENT" },
    { classNo: 12, date: "Fri, Feb 27, 2026", status: "PRESENT" },
  ],
  "Jan 2026": [
    { classNo: 1, date: "Fri, Jan 2, 2026", status: "PRESENT" },
    { classNo: 2, date: "Mon, Jan 5, 2026", status: "PRESENT" },
    { classNo: 3, date: "Wed, Jan 7, 2026", status: "PRESENT" },
    { classNo: 4, date: "Fri, Jan 9, 2026", status: "PRESENT" },
    { classNo: 5, date: "Mon, Jan 12, 2026", status: "PRESENT" },
    { classNo: 6, date: "Wed, Jan 14, 2026", status: "PRESENT" },
    { classNo: 7, date: "Fri, Jan 16, 2026", status: "PRESENT" },
    { classNo: 8, date: "Mon, Jan 19, 2026", status: "PRESENT" },
    { classNo: 9, date: "Wed, Jan 21, 2026", status: "PRESENT" },
    { classNo: 10, date: "Fri, Jan 23, 2026", status: "PRESENT" },
    { classNo: 11, date: "Mon, Jan 26, 2026", status: "PRESENT" },
    { classNo: 12, date: "Fri, Jan 30, 2026", status: "PRESENT" },
  ],
  "Dec 2025": [
    { classNo: 1, date: "Wed, Dec 3, 2025", status: "PRESENT" },
    { classNo: 2, date: "Fri, Dec 5, 2025", status: "PRESENT" },
    { classNo: 3, date: "Mon, Dec 8, 2025", status: "PRESENT" },
    { classNo: 4, date: "Wed, Dec 10, 2025", status: "PRESENT" },
    { classNo: 5, date: "Fri, Dec 12, 2025", status: "PRESENT" },
    { classNo: 6, date: "Mon, Dec 15, 2025", status: "PRESENT" },
    { classNo: 7, date: "Wed, Dec 17, 2025", status: "PRESENT" },
    { classNo: 8, date: "Fri, Dec 19, 2025", status: "PRESENT" },
    { classNo: 9, date: "Mon, Dec 22, 2025", status: "PRESENT" },
    { classNo: 10, date: "Wed, Dec 24, 2025", status: "ABSENT" },
    { classNo: 11, date: "Fri, Dec 26, 2025", status: "PRESENT" },
    { classNo: 12, date: "Mon, Dec 29, 2025", status: "PRESENT" },
    { classNo: 13, date: "Wed, Dec 31, 2025", status: "PRESENT" },
  ],
};

const MONTH_OPTIONS = [
  "Sep 2026", "Aug 2026", "Jul 2026", "Jun 2026", "May 2026",
  "Apr 2026", "Mar 2026", "Feb 2026", "Jan 2026", "Dec 2025",
];

const STATUS_CLASS = {
  PRESENT: "present",
  ABSENT: "absent",
  LEAVE: "leave",
};

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box att-summary-box">
      <div>
        <div className="att-summary-value">{value}</div>
        <div className="att-summary-label">{label}</div>
      </div>
      <div className="icon-circle att-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function AttendancePage() {
  const [month, setMonth] = useState("Sep 2026");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const records = ATTENDANCE_BY_MONTH[month] || [];

  const { total, present, leave, absent, pct } = useMemo(() => {
    const total = 109;
    const present = 100;
    const leave = 0;
    const absent = 9;
    const pct = total ? Math.round((present / total) * 100) : 0;
    return { total, present, leave, absent, pct };
  }, [month]);

  return (
    <div>
      {/* Top summary boxes */}
      <div className="responsive-summary-row att-summary-row">
        <SummaryBox icon={Calendar} iconBg="#F3F4F6" iconColor="#374151" value={total} label="Total Classes" />
        <SummaryBox icon={CheckCircle2} iconBg="rgba(34,197,94,0.12)" iconColor="#1cb05276" value={present} label="Present" />
        <SummaryBox icon={XCircle} iconBg="rgba(245,158,11,0.12)" iconColor="#d97706ba" value={leave} label="Leave" />
        <SummaryBox icon={XCircle} iconBg="rgba(239,68,68,0.12)" iconColor="#dc26269f" value={absent} label="Absent" />
      </div>

      {/* Overview bar */}
      <div className="att-overview-card">
        <div className="att-overview-top">
          <div>
            <div className="att-overview-title">Attendance Overview</div>
            <div className="att-overview-sub">Your attendance is good. Keep it up!</div>
          </div>
          <div className="att-overview-pct">{pct}%</div>
        </div>
        <div className="att-overview-track">
          <div className="att-overview-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Month dropdown */}
      <div className="att-dropdown-wrap">
        <button
          className="dropdown-toggle att-dropdown-toggle"
          onClick={() => setDropdownOpen((o) => !o)}
        >
          {month}
          <ChevronDown size={14} color="#6B7280" />
        </button>
        {dropdownOpen && (
          <div className="att-dropdown-menu">
            {MONTH_OPTIONS.map((m) => (
              <div
                key={m}
                className={`dropdown-option att-dropdown-option ${m === month ? "active" : ""}`}
                onClick={() => { setMonth(m); setDropdownOpen(false); }}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Attendance table */}
      <div className="responsive-table-scroll att-table-card">
        <div className="responsive-table-grid">
          <div className="att-table-header">
            <div>Class</div>
            <div>Date</div>
            <div>Status</div>
          </div>
          {records.length === 0 ? (
            <div className="att-empty-row">
              Is month ke liye koi record nahi mila.
            </div>
          ) : (
            records.map((r, i) => {
              const statusClass = STATUS_CLASS[r.status] || STATUS_CLASS.PRESENT;
              return (
                <div
                  key={i}
                  className={`table-row-hover att-table-row ${i === records.length - 1 ? "last" : ""}`}
                >
                  <div>{r.classNo}</div>
                  <div>{r.date}</div>
                  <div>
                    <span className={`att-status-badge ${statusClass}`}>{r.status}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
