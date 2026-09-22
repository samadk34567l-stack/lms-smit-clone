import React, { useState, useEffect } from "react";
import {
  ChevronRight, Menu, Users, GraduationCap, BookOpen,
  LayoutGrid, Wallet, LogOut,
} from "lucide-react";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import PlaceholderPage from "./PlaceholderPage";
import StudentsPage from "./StudentsPage";
import TrainersPage from "./TrainersPage";
import CoursesPage from "./CoursesPage";
import FeesPage from "./FeesPage";
import { STUDENTS, TRAINERS, COURSES_LIST } from "../data/adminData";

const ADMIN_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "students", label: "Students", icon: GraduationCap },
  { key: "trainers", label: "Trainers", icon: Users },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "fees", label: "Fee Records", icon: Wallet },
];

const PAGE_TITLES = {
  dashboard: "Dashboard",
  students: "Students",
  trainers: "Trainers",
  courses: "Courses",
  fees: "Fee Records",
};

export default function AdminDashboard({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    document.body.classList.add("dark-theme");
  }, []);

  const totalStudents = STUDENTS.length;
  const totalTrainers = TRAINERS.length;
  const activeCourses = COURSES_LIST.filter((c) => c.status === "ONGOING").length;
  const feeCollected = "Rs 482,000";

  const recentStudents = STUDENTS.slice(0, 5);

  return (
    <div className="sd-shell">
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        userName="Admin"
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        navItems={ADMIN_NAV_ITEMS}
        brandLabel="SMIT Admin"
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
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="sd-breadcrumb-current">{PAGE_TITLES[activePage]}</span>
          </div>

          <button className="adm-logout-btn" onClick={onLogout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>

        {activePage === "dashboard" ? (
          <div>
            <div className="responsive-summary-row adm-stats-row">
              <div className="stat-card-clickable" onClick={() => setActivePage("students")}>
                <StatCard label="Total Students" value={totalStudents} icon={GraduationCap} iconBg="rgba(37,99,235,0.10)" iconColor="#2563EB" />
              </div>
              <div className="stat-card-clickable" onClick={() => setActivePage("trainers")}>
                <StatCard label="Total Trainers" value={totalTrainers} icon={Users} iconBg="rgba(147,51,234,0.12)" iconColor="#9333EA" />
              </div>
              <div className="stat-card-clickable" onClick={() => setActivePage("courses")}>
                <StatCard label="Active Courses" value={activeCourses} icon={BookOpen} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" />
              </div>
              <div className="stat-card-clickable" onClick={() => setActivePage("fees")}>
                <StatCard label="Fee Collected (Sep)" value={feeCollected} icon={Wallet} iconBg="rgba(234,179,8,0.15)" iconColor="#B45309" />
              </div>
            </div>

            <div className="responsive-table-scroll adm-table-card">
              <div className="adm-table-title">Recent Registrations</div>
              <div className="responsive-table-grid">
                <div className="adm-table-header">
                  <div>Name</div>
                  <div>Course</div>
                  <div>Batch</div>
                  <div>Joined</div>
                  <div>Status</div>
                </div>
                {recentStudents.map((s, i) => (
                  <div
                    key={s.id}
                    className={`table-row-hover adm-table-row ${i === recentStudents.length - 1 ? "last" : ""}`}
                    onClick={() => setActivePage("students")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="adm-name-cell">{s.name}</div>
                    <div className="adm-course-cell">{s.course}</div>
                    <div>{s.batch}</div>
                    <div>{s.joined}</div>
                    <div>
                      <span className={`adm-status-badge ${s.feeStatus === "ACTIVE" ? "active" : "pending"}`}>
                        {s.feeStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activePage === "students" ? (
          <StudentsPage />
        ) : activePage === "trainers" ? (
          <TrainersPage />
        ) : activePage === "courses" ? (
          <CoursesPage />
        ) : activePage === "fees" ? (
          <FeesPage />
        ) : (
          <PlaceholderPage title={PAGE_TITLES[activePage]} />
        )}
      </main>
    </div>
  );
}
