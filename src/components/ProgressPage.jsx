import React, { useState } from "react";
import { Check, Clock as ClockIcon, BookOpen, GraduationCap, ChevronDown } from "lucide-react";
import "./ProgressPage.css";

const MODULES = [
  {
    name: "Web Designing",
    completed: 20,
    total: 20,
    pct: 100,
    done: true,
    topics: [
      { name: "HTML Text", date: "Completed: Dec 15, 2025", used: ["Furniture E-Commerce Website", "Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "HTML Images", date: "Completed: May 6, 2026", used: ["Furniture E-Commerce Website", "Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "HTML Table", date: "Completed: May 6, 2026", used: ["Budgetting App"] },
      { name: "HTML Forms", date: "Completed: May 6, 2026", used: ["Budgetting App", "Landing Page Assignment"] },
      { name: "HTML Audio/Video Tags", date: "Completed: May 6, 2026", used: ["NASA Landing Page"] },
      { name: "HTML Links", date: "Completed: May 6, 2026", used: ["Amazon Clone"] },
    ],
  },
  {
    name: "Front-End Development",
    completed: 26,
    total: 31,
    pct: 84,
    done: false,
    topics: [
      { name: "Grid system", date: "Completed: Feb 12, 2026", used: ["Amazon Clone", "Landing Page Assignment", "Grid Assignment no 2", "Grid Assignment no 1"] },
      { name: "Font Awesome", date: "Completed: Feb 14, 2026", used: ["Budgetting App", "Amazon Clone", "Landing Page Assignment"] },
      { name: "Bootstrap", date: "Completed: Feb 16, 2026", used: ["Amazon Clone"] },
      { name: "Css3", date: "Completed: Dec 15, 2025", used: ["Furniture E-Commerce Website", "Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "Google Fonts", date: "Completed: Feb 12, 2026", used: ["Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "CSS Variables", date: "Completed: Feb 12, 2026", used: [] },
      { name: "Netlify Hosting", date: "Completed: Feb 11, 2026", used: [] },
      { name: "Github", date: "Completed: Feb 11, 2026", used: ["Furniture E-Commerce Website", "Budgetting App", "Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "Github Hosting", date: "Completed: Feb 11, 2026", used: ["Budgetting App", "Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "CSS Animations", date: "Completed: Feb 14, 2026", used: ["Amazon Clone"] },
      { name: "Media queries", date: "Completed: Feb 16, 2026", used: ["Amazon Clone", "NASA Landing Page", "Landing Page Assignment"] },
      { name: "Surge hosting", date: "Completed: Feb 11, 2026", used: ["Amazon Clone"] },
      { name: "Domain & Hosing Subscription (Deployment)", date: "Completed: Feb 18, 2026", used: [] },
      { name: "Flex box", date: "Completed: Feb 6, 2026", used: [] },
      { name: "JavaScript Introduction", date: "Completed: Feb 22, 2026", used: ["JavaScript Assignment – 25 Questions"] },
      { name: "JavaScript Chapter 1 - 10", date: "Completed: Mar 3, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App"] },
      { name: "JavaScript Chapter 11 - 20", date: "Completed: Apr 6, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App"] },
      { name: "JavaScript Quiz 1", date: "Completed: Apr 20, 2026", used: [] },
      { name: "JavaScript Chapter 21 - 30", date: "Completed: May 3, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App"] },
      { name: "JavaScript Chapter 31 - 40", date: "Completed: May 4, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App"] },
      { name: "JavaScript Quiz 2", date: "Completed: May 18, 2026", used: [] },
      { name: "JavaScript Chapter 41 - 50", date: "Completed: May 11, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App", "Amazon Clone"] },
      { name: "JavaScript Chapter 51 - 60", date: "Completed: May 20, 2026", used: ["JavaScript Assignment – 25 Questions", "Budgetting App"] },
      { name: "JavaScript Quiz 3", date: "Completed: Jun 3, 2026", used: [] },
      { name: "JavaScript Book Completed", date: "Completed: Jun 12, 2026", used: ["Furniture E-Commerce Website", "JavaScript Assignment – 25 Questions"] },
      { name: "JavaScript Quiz 4", date: "Completed: Jun 28, 2026", used: [] },
      { name: "Var vs Let vs Const", date: "Completed: Jun 12, 2026", used: [] },
      { name: "Template Literals", date: "Completed: Jun 20, 2026", used: [] },
      { name: "Arrow Functions", date: "Completed: Jun 15, 2026", used: [] },
      { name: "Iterators & For..of", date: "Completed: Jul 20, 2026", used: [] },
      { name: "Array Advance Methods", date: "Completed: Jul 20, 2026", used: [] },
      { name: "JavaScript Behind the Scenes", date: "Completed: Aug 11, 2026", used: [] },
      { name: "Destructuring, Rest & Spread Operators", date: "Completed: Jun 17, 2026", used: [] },
      { name: "SET, MAP", date: "Completed: Jul 12, 2026", used: [] },
      { name: "Default Parameters", date: "Completed: Jun 17, 2026", used: [] },
      { name: "First-Class and Higher-Order Functions", date: "Completed: 5 days ago", used: [] },
      { name: "CallBack Functions", date: "Completed: Jul 4, 2026", used: [] },
      { name: "Call, Apply, Bind", date: null, used: [] },
      { name: "Closures", date: "Completed: Jul 12, 2026", used: [] },
      { name: "OOP with JavaScript", date: "Completed: Jul 6, 2026", used: [] },
      { name: "Asynchronous JavaScript", date: null, used: [] },
      { name: "TypeScript", date: "Completed: Jul 28, 2026", used: [] },
      { name: "Advance Github", date: null, used: [] },
      { name: "GSAP Animations", date: null, used: [] },
      { name: "Supabase or Firebase", date: null, used: [] },
    ],
  },
  {
    name: "Modern Front-End Development",
    completed: 10,
    total: 14,
    pct: 71,
    done: false,
    topics: [
      { name: "ReactJS Introduction & How to Create React Project", date: "Completed: Aug 7, 2026", used: ["Admin panel (E commerce Dashbod)", "E-Commerce Website (React js)"] },
      { name: "Components , Props and JSX", date: "Completed: Aug 7, 2026", used: ["Admin panel (E commerce Dashbod)", "E-Commerce Website (React js)"] },
      { name: "State, Events, Forms", date: "Completed: Aug 23, 2026", used: ["Admin panel (E commerce Dashbod)"] },
      { name: "React in Depth and Behind the Scenes (Components , Composition, Re-useability)", date: "Completed: Aug 17, 2026", used: [] },
      { name: "Effects and Data Fetching in React", date: "Completed: Aug 11, 2026", used: ["E-Commerce Website (React js)"] },
      { name: "Custom Hooks, Ref, useReducer etc", date: null, used: [] },
      { name: "Class-based React (Optional - not necessary)", date: "Completed: 5 days ago", used: [] },
      { name: "Single Page Application (SPA) - React Router DOM", date: "Completed: Aug 11, 2026", used: ["Admin panel (E commerce Dashbod)"] },
      { name: "State Management - Context Api", date: "Completed: 5 days ago", used: ["Admin panel (E commerce Dashbod)"] },
      { name: "Performance Optimization", date: null, used: [] },
      { name: "Redux & Redux ToolKit with Thunk", date: "Completed: 2 days ago", used: [] },
      { name: "Tailwind, Material UI, Styled Components OverView", date: null, used: ["Admin panel (E commerce Dashbod)"] },
      { name: "FrontEnd Deployment through Vercel", date: "Completed: Aug 23, 2026", used: ["E-Commerce Website (React js)"] },
      { name: "NextJS", date: null, used: [] },
    ],
  },
  {
    name: "Back-End Development",
    completed: 0,
    total: 16,
    pct: 0,
    done: false,
    topics: [
      { name: "NodeJS", date: null, used: [] },
      { name: "ExpressJS", date: null, used: [] },
      { name: "MongoDB", date: null, used: [] },
      { name: "Security and Authentication", date: null, used: [] },
      { name: "Multer - Media Uploading", date: null, used: [] },
      { name: "Sockets", date: null, used: [] },
      { name: "GraphQL", date: null, used: [] },
      { name: "PostGresSQL", date: null, used: [] },
      { name: "Sequelize", date: null, used: [] },
      { name: "Payment Integration", date: null, used: [] },
      { name: "Scalable System - Caching", date: null, used: [] },
      { name: "Scalable System - Messaging Queues", date: null, used: [] },
    ],
  },
];

function ProgressRing({ pct }) {
  if (pct === 0) {
    return <span className="pg-ring-zero">0</span>;
  }
  const r = 15;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="pg-ring-wrap">
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r={r} fill="none" stroke="#E5E7EB" strokeWidth="3" />
        <circle
          cx="19" cy="19" r={r} fill="none" stroke="#2563EB" strokeWidth="3"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 19 19)"
        />
      </svg>
      <div className="pg-ring-label">
        {pct}%
      </div>
    </div>
  );
}

function TopicRow({ topic }) {
  const inProgress = !topic.date;
  return (
    <div className="topic-row pg-topic-row">
      <div className="pg-topic-header">
        {inProgress ? <ClockIcon size={16} color="#CA8A04" /> : <Check size={16} color="#16A34A" />}
        <span className="pg-topic-name">{topic.name}</span>
      </div>
      {topic.date && (
        <div className={`pg-topic-date ${topic.used.length ? "has-used" : ""}`}>{topic.date}</div>
      )}
      {topic.used.length > 0 && (
        <div className="pg-topic-used-box">
          {topic.used.map((u, i) => (
            <div key={i} className="pg-topic-used-item">
              <span className="pg-topic-used-dot" />
              {u}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleRow({ mod, expanded, onToggle }) {
  return (
    <div className="module-row pg-module-row">
      <div className="pg-module-header" onClick={onToggle}>
        <div className="pg-module-left">
          <div className={`pg-module-icon-circle ${mod.done ? "done" : "pending"}`}>
            {mod.done ? <Check size={14} color="#16A34A" /> : <ClockIcon size={14} color="#CA8A04" />}
          </div>
          <div>
            <div className="pg-module-name">{mod.name}</div>
            <div className="pg-module-sub">Topics: {mod.completed}/{mod.total}</div>
          </div>
        </div>
        <div className="pg-module-right">
          <ProgressRing pct={mod.pct} />
          <ChevronDown
            size={16} color="#6B7280"
            className={`pg-chevron ${expanded ? "expanded" : ""}`}
          />
        </div>
      </div>
      {expanded && (
        <div className="pg-module-body">
          {mod.topics.length === 0 ? (
            <div className="pg-module-empty">
              Is module ke topics abhi available nahi hain.
            </div>
          ) : (
            <>
              <div className="pg-topics-heading">
                Topics in {mod.name}:
              </div>
              {mod.topics.map((t, i) => (
                <TopicRow key={i} topic={t} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryBox({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="summary-box pg-summary-box">
      <div>
        <div className="pg-summary-value">{value}</div>
        <div className="pg-summary-label">{label}</div>
      </div>
      <div className="icon-circle pg-summary-icon-circle" style={{ background: iconBg }}>
        <Icon size={18} color={iconColor} />
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [expandedIdx, setExpandedIdx] = useState(-1);

  const totalTopics = MODULES.reduce((s, m) => s + m.total, 0);
  const completedTopics = MODULES.reduce((s, m) => s + m.completed, 0);
  const pendingTopics = totalTopics - completedTopics;

  return (
    <div>
      <div className="responsive-summary-row pg-summary-row">
        <SummaryBox icon={BookOpen} iconBg="rgba(34,197,94,0.12)" iconColor="#16A34A" value={totalTopics} label="Total Topics" />
        <SummaryBox icon={GraduationCap} iconBg="rgba(147,51,234,0.12)" iconColor="#9333EA" value={completedTopics} label="Completed Topics" />
        <SummaryBox icon={ClockIcon} iconBg="rgba(239,68,68,0.12)" iconColor="#DC2626" value={pendingTopics} label="Pending Topics" />
      </div>

      {MODULES.map((mod, i) => (
        <ModuleRow
          key={mod.name}
          mod={mod}
          expanded={expandedIdx === i}
          onToggle={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
