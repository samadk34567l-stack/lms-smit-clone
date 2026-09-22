import React from "react";
import {
  LayoutGrid, CalendarDays,
  FileText, ListChecks, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import "./Sidebar.css";

const DEFAULT_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "assignment", label: "Assignment", icon: FileText },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "quiz", label: "Quiz", icon: ListChecks },
];

const LOGO_SRC = "https://lms.saylanimit.com/assets/logo.6lrMPvRL.png";

export default function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse,
  userName,
  mobileOpen = false,
  onCloseMobile = () => {},
  navItems = DEFAULT_NAV_ITEMS,
  brandLabel = "SMIT",
}) {
  const handleNavigate = (key) => {
    onNavigate(key);
    onCloseMobile();
  };

  return (
    <>
      {mobileOpen && <div className="sb-backdrop" onClick={onCloseMobile} />}
      <aside className={`sb-aside ${collapsed ? "collapsed" : "expanded"} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sb-top-row">
          {!collapsed && (
            <div className="sb-brand-wrap">
              <div className="sb-brand-row">
                <img src={LOGO_SRC} alt="SMIT Logo" className="sb-brand-logo" />
                <span className="sb-brand-text">{brandLabel}</span>
              </div>
              <div className="sb-brand-sub">SAYLANI MASS IT TRAINING</div>
            </div>
          )}
          {collapsed && (
            <img src={LOGO_SRC} alt="SMIT Logo" className="sb-brand-logo-collapsed" />
          )}
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="sb-toggle-btn sb-desktop-toggle"
          >
            {collapsed ? <ChevronRight size={14} color="#6B7280" /> : <ChevronLeft size={14} color="#6B7280" />}
          </button>
          <button
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="sb-toggle-btn sb-mobile-close"
          >
            <X size={16} color="#6B7280" />
          </button>
        </div>

        <nav className="sb-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                title={item.label}
                className={`sb-nav-btn ${isActive ? "active" : "sidebar-link"} ${collapsed ? "collapsed" : ""}`}
              >
                <Icon size={18} />
                {!collapsed && item.label}
              </button>
            );
          })}
        </nav>

        <div className="sb-user-row">
          <div className="sb-user-avatar">
            {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && <span className="sb-user-name">{userName}</span>}
        </div>
      </aside>
    </>
  );
}
