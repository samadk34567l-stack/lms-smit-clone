import React, { useState, useEffect } from "react";
import {
  ChevronRight, Users, CalendarCheck, FileText,
  ClipboardCheck, TrendingUp, Search, Eye, Pencil, Plus, CheckCircle2, XCircle, Clock,
  Sun, Moon,
} from "lucide-react";
import "./TrainerCoursePage.css";
import ProgressPage from "./ProgressPage";

const COURSE_TITLE = "Modern Web Application Development";

const STUDENTS = Array.from({ length: 10 }, (_, i) => ({
  name: `Student ${i + 1}`,
  roll: 774738 + i,
  email: `student${i + 1}@example.com`,
  status: "ENROLLED",
}));

const ASSIGNMENTS = [
  { title: "Admin panel (E co...", desc: "Create the provided UI design in React or nextjs....", topics: ["NextJS", "ReactJS Introducti..."], extra: 5, due: "Sep 10, 2026" },
  { title: "QUICKSERVE WMA (B...", tag: "HACKATHON", desc: "Challenge: Build a modern service-booking web application that...", topics: [], due: "Aug 30, 2026" },
  { title: "E-Commerce Websi...", desc: "React.js frontend\nCreate all required e-commerce...", topics: ["ReactJS Introducti...", "Components , Props..."], extra: 2, due: "Aug 17, 2026" },
  { title: "Furniture E-Comme...", desc: "Follow the Figma design. (https://www.figma.com/design/X...", topics: ["JavaScript Book Co...", "Github"], extra: 3, due: "Aug 10, 2026" },
  { title: "MaintainIQ (Batch-2...", tag: "HACKATHON", desc: "MaintainIQ\n...", topics: [], due: "Jul 12, 2026" },
  { title: "JavaScript Assignm...", desc: "Complete all 25 JavaScript questions available at the link...", topics: ["JavaScript Introdu...", "JavaScript Chapter..."], extra: 6, due: "Jul 10, 2026" },
  { title: "Budgetting App", desc: "Develop a fully responsive and functional Budgeting Web...", topics: ["JavaScript Chapter...", "JavaScript Chapter..."], extra: 10, due: "Jun 1, 2026" },
  { title: "Amazon Clone", desc: "Create a fully responsive landing page inspired by the official...", topics: ["HTML Text", "HTML Images"], extra: 13, due: "May 24, 2026" },
  { title: "NASA Landing Page", desc: "Create a fully responsive landing page inspired by the official NASA...", topics: ["Media queries", "HTML Text"], extra: 7, due: "May 1, 2026" },
  { title: "Helplytics AI – Com...", tag: "HACKATHON", desc: "SMIT GRAND CODING NIGHT - April 2026...", topics: [], due: "Apr 19, 2026" },
];

const QUIZZES = [
  { name: "Javascript (Quiz-4)", courses: "Modern Web Application Development, Web and Mobile App Development", date: "Jun 24, 2026", expiry: "Jun 24, 2026" },
  { name: "Javascript (Quiz-3)", courses: "Modern Web Application Development, Web and Mobile App Development", date: "Jun 3, 2026", expiry: "Jun 3, 2026" },
  { name: "Javascript (Quiz-2)", courses: "Modern Web Application Development, Web and Mobile App Development", date: "May 18, 2026", expiry: "May 18, 2026" },
  { name: "Javascript (Quiz-1)", courses: "Modern Web Application Development, Web and Mobile App Development, JavaScript Crash Course, Full Stack Foundations for Teens", date: "Apr 17, 2026", expiry: "Apr 17, 2026" },
  { name: "CSS Quiz", courses: "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development", date: "Mar 27, 2026", expiry: "Mar 27, 2026" },
  { name: "HTML Quiz", courses: "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)", date: "Jan 7, 2026", expiry: "Jan 7, 2026" },
  { name: "HTML Quiz", courses: "Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)", date: "Jan 5, 2026", expiry: "Jan 5, 2026" },
];

const TABS = [
  { key: "students", label: "Students", icon: Users },
  { key: "attendance", label: "Attendance", icon: CalendarCheck },
  { key: "assignments", label: "Assignments", icon: FileText },
  { key: "quizzes", label: "Quizzes", icon: ClipboardCheck },
  { key: "progress", label: "Course Progress", icon: TrendingUp },
];

function StudentsTab() {
  return (
    <div>
      <div className="tcp-toolbar">
        <div className="tcp-search-box">
          <Search size={14} color="#6B7280" />
          <input type="text" placeholder="Search by name, email or roll no..." />
        </div>
        <select className="tcp-filter-select">
          <option>All</option>
          <option>Enrolled</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="tcp-table-wrap">
        <table className="tcp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, i) => (
              <tr key={i} className="table-row-hover">
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.email}</td>
                <td><span className="tcp-status-pill">{s.status}</span></td>
                <td><Eye size={16} color="#6B7280" style={{ cursor: "pointer" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tcp-pagination">
        <span>Showing 1-10 of 201 records</span>
        <div className="tcp-page-controls">
          <button className="pill-btn tcp-page-btn" disabled>Previous</button>
          <button className="page-num-btn tcp-page-num active">1</button>
          <button className="page-num-btn tcp-page-num">2</button>
          <span>...</span>
          <button className="page-num-btn tcp-page-num">21</button>
          <button className="pill-btn tcp-page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

function AttendanceTab() {
  const [selectedDate, setSelectedDate] = useState("2026-09-15");
  const [statuses, setStatuses] = useState({});

  const rows = STUDENTS.map((s, i) => ({
    roll: s.roll,
    name: s.name,
    status: statuses[i] || "NOT MARKED",
  }));

  const present = rows.filter((r) => r.status === "PRESENT").length;
  const absent = rows.filter((r) => r.status === "ABSENT").length;
  const leave = rows.filter((r) => r.status === "LEAVE").length;

  const setStatus = (i, val) => setStatuses((prev) => ({ ...prev, [i]: val }));

  return (
    <div>
      <div className="tcp-date-row">
        <span>Select a Date</span>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      <div className="responsive-summary-row tcp-summary-row">
        <div className="summary-box tcp-summary-box">
          <div className="tcp-summary-value">{STUDENTS.length}</div>
          <div className="tcp-summary-label">Total Students</div>
        </div>
        <div className="summary-box tcp-summary-box">
          <div className="tcp-summary-value">{present}</div>
          <div className="tcp-summary-label">Present</div>
          <CheckCircle2 size={18} color="#16A34A" className="tcp-summary-icon" />
        </div>
        <div className="summary-box tcp-summary-box">
          <div className="tcp-summary-value">{absent}</div>
          <div className="tcp-summary-label">Absent</div>
          <XCircle size={18} color="#DC2626" className="tcp-summary-icon" />
        </div>
        <div className="summary-box tcp-summary-box">
          <div className="tcp-summary-value">{leave}</div>
          <div className="tcp-summary-label">Leave</div>
          <Clock size={18} color="#CA8A04" className="tcp-summary-icon" />
        </div>
      </div>

      <div className="tcp-table-wrap">
        <table className="tcp-table">
          <thead>
            <tr>
              <th>Roll #</th>
              <th>Full Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="table-row-hover">
                <td>{r.roll}</td>
                <td>{r.name}</td>
                <td>
                  <div className="tcp-attendance-btns">
                    <button
                      className={`tcp-mark-btn present ${r.status === "PRESENT" ? "active" : ""}`}
                      onClick={() => setStatus(i, "PRESENT")}
                    >
                      Present
                    </button>
                    <button
                      className={`tcp-mark-btn absent ${r.status === "ABSENT" ? "active" : ""}`}
                      onClick={() => setStatus(i, "ABSENT")}
                    >
                      Absent
                    </button>
                    <button
                      className={`tcp-mark-btn leave ${r.status === "LEAVE" ? "active" : ""}`}
                      onClick={() => setStatus(i, "LEAVE")}
                    >
                      Leave
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssignmentsTab() {
  return (
    <div>
      <div className="tcp-assignments-header">
        <button className="tcp-new-assignment-btn">
          <Plus size={14} />
          New Assignment
        </button>
      </div>

      <div className="tcp-table-wrap">
        <table className="tcp-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Topics</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ASSIGNMENTS.map((a, i) => (
              <tr key={i} className="table-row-hover">
                <td>
                  {a.title}
                  {a.tag && <div className="tcp-tag-pill">{a.tag}</div>}
                </td>
                <td className="tcp-desc-cell">{a.desc}</td>
                <td>
                  {a.topics.length === 0 ? (
                    <span className="tcp-no-topics">No topics</span>
                  ) : (
                    <>
                      {a.topics.map((t, j) => (
                        <span key={j} className="tcp-topic-pill">{t}</span>
                      ))}
                      {a.extra ? <span className="tcp-topic-more">+{a.extra}</span> : null}
                    </>
                  )}
                </td>
                <td>{a.due}</td>
                <td className="tcp-actions-cell">
                  <Eye size={16} color="#6B7280" style={{ cursor: "pointer" }} />
                  <Pencil size={16} color="#2563EB" style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tcp-pagination">
        <span>Showing 1-10 of 13 records</span>
        <div className="tcp-page-controls">
          <button className="pill-btn tcp-page-btn" disabled>Previous</button>
          <button className="page-num-btn tcp-page-num active">1</button>
          <button className="page-num-btn tcp-page-num">2</button>
          <button className="pill-btn tcp-page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

function QuizzesTab() {
  return (
    <div className="tcp-table-wrap">
      <table className="tcp-table">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Course(s)</th>
            <th>Date</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {QUIZZES.map((q, i) => (
            <tr key={i} className="table-row-hover">
              <td>{q.name}</td>
              <td className="tcp-desc-cell">{q.courses}</td>
              <td>{q.date}</td>
              <td>{q.expiry}</td>
              <td><span className="tcp-active-pill">ACTIVE</span></td>
              <td className="tcp-actions-cell">
                <Eye size={16} color="#16A34A" style={{ cursor: "pointer" }} />
                <ClipboardCheck size={16} color="#6B7280" style={{ cursor: "pointer" }} />
                <Eye size={16} color="#6B7280" style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseProgressTab() {
  return (
    <div>
      <div className="tcp-compare-box">
        <div className="tcp-compare-label">COMPARE PROGRESS</div>
        <div className="tcp-compare-title">Course Progress Overview</div>
        <button className="tcp-compare-select">Only My Progress</button>
      </div>
      <ProgressPage />
    </div>
  );
}

export default function TrainerCoursePage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("students");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const activeLabel = TABS.find((t) => t.key === activeTab)?.label;

  return (
    <div className="tcp-shell">
      <main className="tcp-main">
        <div className="tcp-topbar">
          <div className="sd-breadcrumb">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="sd-breadcrumb-current">{COURSE_TITLE}</span>
          </div>
          <button
            className="tcp-theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} color="#F3F4F6" /> : <Moon size={16} color="#1C1F26" />}
          </button>
        </div>

        <h2 className="tcp-course-heading">{COURSE_TITLE}</h2>

        <div className="tcp-tabs-row">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tcp-page-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="tcp-tab-content">
          {activeTab === "students" && <StudentsTab />}
          {activeTab === "attendance" && <AttendanceTab />}
          {activeTab === "assignments" && <AssignmentsTab />}
          {activeTab === "quizzes" && <QuizzesTab />}
          {activeTab === "progress" && <CourseProgressTab />}
        </div>

        <button className="sp-switch-btn tcp-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </main>
    </div>
  );
}
