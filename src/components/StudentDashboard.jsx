import React, { useState, useEffect } from "react";
import {
  ChevronRight, Clock, GraduationCap as CapIcon, Menu,
  LayoutGrid, FileText, TrendingUp, ListChecks, CalendarDays,
} from "lucide-react";
import "./StudentDashboard.css";
import Sidebar from "./Sidebar";
import ScheduleSidebar from "./ScheduleSidebar";
import StatCard from "./StatCard";
import ActiveCourseCard from "./ActiveCourseCard";
import FeeTable from "./FeeTable";
import PlaceholderPage from "./PlaceholderPage";
import AttendancePage from "./AttendancePage";
import AssignmentPage from "./AssignmentPage";
import QuizPage from "./QuizPage";
import ProgressPage from "./ProgressPage";
import SchedulePage from "./SchedulePage";

const STUDENT_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "attendance", label: "Attendance", icon: Clock },
  { key: "assignment", label: "Assignment", icon: FileText },
  { key: "progress", label: "Progress", icon: TrendingUp },
  { key: "quiz", label: "Quiz", icon: ListChecks },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
];

const STUDENT = {
  name: "Abdul Samad",
};

const COURSE = {
  title: "Modern Web Application Development",
  timings: ["Mon 01:00 PM - 03:00 PM", "Wed 01:00 PM - 03:00 PM", "Fri 01:00 PM - 03:00 PM"],
  progress: 73,
  batch: 20,
  roll: 774738,
  campus: "Zaitoon Ashraf IT Park",
  city: "Karachi",
};

const FEE_ROWS = [
  { month: "Sep 2026", amount: "Rs: 1000 /-", type: "Monthly", dueDate: "08-Sep-2026", voucherId: "202609774738", status: "PAID" },
];

export default function StudentDashboard({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    document.body.classList.add("dark-theme");
  }, []);

  const pageTitles = {
    dashboard: "Dashboard",
    attendance: "Attendance",
    assignment: "Assignment",
    progress: "Progress",
    quiz: "Quiz",
    schedule: "Schedule",
  };

  return (
    <div className="sd-shell">
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        userName={STUDENT.name}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        navItems={STUDENT_NAV_ITEMS}
      />

      <main className="sd-main">
        <div className="sd-topbar">
          <div className="sd-breadcrumb">
            <button
              className="sd-hamburger-btn"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
            <span>Home</span>
            <ChevronRight size={14} />
            {activePage === "dashboard" ? (
              <span className="sd-breadcrumb-current">{COURSE.title}</span>
            ) : (
              <>
                <span>{COURSE.title}</span>
                <ChevronRight size={14} />
                <span className="sd-breadcrumb-current">{pageTitles[activePage]}</span>
              </>
            )}
          </div>
        </div>

        {activePage === "dashboard" ? (
          <div className="responsive-main-flex sd-dashboard-flex">
            <div className="sd-dashboard-left">
              <div className="responsive-summary-row sd-stats-row">
                <div className="stat-card-clickable sd-stat-clickable" onClick={() => setActivePage("attendance")}>
                  <StatCard label="Attendance" value="100/109" icon={Clock} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" />
                </div>
                <div className="stat-card-clickable sd-stat-clickable" onClick={() => setActivePage("assignment")}>
                  <StatCard label="Assignment" value="7/13" icon={CapIcon} iconBg="rgba(147,51,234,0.12)" iconColor="#9333EA" />
                </div>
              </div>

              <ActiveCourseCard course={COURSE} />
              <FeeTable rows={FEE_ROWS} />
            </div>

            <ScheduleSidebar />
          </div>
        ) : activePage === "attendance" ? (
          <AttendancePage />
        ) : activePage === "assignment" ? (
          <AssignmentPage />
        ) : activePage === "progress" ? (
          <ProgressPage />
        ) : activePage === "quiz" ? (
          <QuizPage />
        ) : activePage === "schedule" ? (
          <SchedulePage />
        ) : (
          <PlaceholderPage title={pageTitles[activePage]} />
        )}
      </main>
    </div>
  );
}
