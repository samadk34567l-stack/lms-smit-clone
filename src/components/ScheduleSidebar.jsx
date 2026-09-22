import React, { useState } from "react";
import { Calendar } from "lucide-react";
import "./ScheduleSidebar.css";

const WEEK = [
  { day: "Sun", date: "06", active: false },
  { day: "Mon", date: "07", active: true },
  { day: "Tue", date: "08", active: false },
  { day: "Wed", date: "09", active: true },
  { day: "Thu", date: "10", active: false },
  { day: "Fri", date: "11", active: true },
  { day: "Sat", date: "12", active: false },
];

const TABS = ["Assignments", "Quizzes", "Events"];

const EMPTY_MESSAGES = {
  Assignments: "No upcoming assignments",
  Quizzes: "No upcoming quizzes",
  Events: "No upcoming events",
};

export default function ScheduleSidebar() {
  const [activeTab, setActiveTab] = useState("Quizzes");

  return (
    <div className="ss-wrapper">
      <div className="ss-calendar-card">
        <div className="ss-calendar-header">
          <Calendar size={16} color="#1C1F26" />
          <span className="ss-calendar-title">Class Schedule</span>
        </div>
        <div className="ss-week-row">
          {WEEK.map((d) => (
            <div key={d.day} className={`ss-day-cell ${d.active ? "active" : ""}`}>
              <div className="ss-day-name">{d.day}</div>
              <div className="ss-day-date">{d.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ss-tabs-card">
        <div className="ss-tabs-row">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`ss-tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="ss-empty-message">
          {EMPTY_MESSAGES[activeTab]}
        </div>
      </div>
    </div>
  );
}
