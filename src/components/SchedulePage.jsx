import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import "./SchedulePage.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// key format: YYYY-M-D (month is 0-indexed)
const EVENTS = {
  "2026-8-2": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-4": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-7": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-8": [{ type: "fee", label: "Fee Due · Rs 1000" }],
  "2026-8-9": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-10": [{ type: "assignment", label: "Admin Panel Assignment Due" }],
  "2026-8-11": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-14": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-16": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-17": [{ type: "quiz", label: "Javascript Quiz - 4" }],
  "2026-8-18": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-21": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-23": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-25": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-28": [{ type: "class", label: "Class · 01:00 - 03:00" }],
  "2026-8-30": [
    { type: "assignment", label: "QUICKSERVE WMA Hackathon Due" },
    { type: "class", label: "Class · 01:00 - 03:00" },
  ],
};

const LEGEND = [
  { type: "class", label: "Class" },
  { type: "assignment", label: "Assignment" },
  { type: "quiz", label: "Quiz" },
  { type: "fee", label: "Fee" },
];

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({ day: cells.length - (startWeekday + daysInMonth) + 1, inMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export default function SchedulePage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(2026, 8, 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const weeks = useMemo(() => buildMonthGrid(year, month), [year, month]);

  const goPrev = () => setViewDate(new Date(year, month - 1, 1));
  const goNext = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const isSameDay = (day) =>
    day.inMonth &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day.day;

  return (
    <div>
      <div className="sch-card">
        <div className="sch-header-row">
          <div className="sch-title-group">
            <CalendarDays size={18} color="#1C1F26" />
            <span className="sch-title">{MONTH_NAMES[month]} {year}</span>
          </div>
          <div className="sch-nav-group">
            <button className="sch-nav-btn" onClick={goPrev} aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <button className="sch-today-btn" onClick={goToday}>Today</button>
            <button className="sch-nav-btn" onClick={goNext} aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="sch-weekday-row">
          {WEEKDAYS.map((w) => (
            <div key={w} className="sch-weekday-cell">{w}</div>
          ))}
        </div>

        <div className="sch-grid">
          {weeks.map((week, wi) => (
            <div className="sch-week-row" key={wi}>
              {week.map((day, di) => {
                const key = `${year}-${month}-${day.day}`;
                const events = day.inMonth ? EVENTS[key] || [] : [];
                return (
                  <div
                    key={di}
                    className={`sch-day-cell ${day.inMonth ? "" : "muted"} ${isSameDay(day) ? "today" : ""}`}
                  >
                    <div className="sch-day-number">{day.day}</div>
                    <div className="sch-day-events">
                      {events.slice(0, 3).map((ev, ei) => (
                        <div key={ei} className={`sch-event-pill ${ev.type}`}>
                          {ev.label}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="sch-legend-row">
        {LEGEND.map((l) => (
          <div key={l.type} className="sch-legend-item">
            <span className={`sch-legend-dot ${l.type}`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
