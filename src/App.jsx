import React, { useState, useEffect } from "react";
import "./App.css";
import StudentPortal from "./components/StudentPortal";
import TrainerPortal from "./components/TrainerPortal";
import AdminPortal from "./components/AdminPortal";
import StudentDashboard from "./components/StudentDashboard";
import TrainerCoursePage from "./components/TrainerCoursePage";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [portal, setPortal] = useState("student");
  const [loggedIn, setLoggedIn] = useState(false);
  const [trainerLoggedIn, setTrainerLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark-theme");
  }, []);

  if (loggedIn) {
    return <StudentDashboard onLogout={() => setLoggedIn(false)} />;
  }

  if (trainerLoggedIn) {
    return <TrainerCoursePage onLogout={() => setTrainerLoggedIn(false)} />;
  }

  if (adminLoggedIn) {
    return <AdminDashboard onLogout={() => setAdminLoggedIn(false)} />;
  }

  return (
    <div className="app-shell">
      {portal === "student" ? (
        <StudentPortal
          onSwitchToTeacher={() => setPortal("trainer")}
          onSwitchToAdmin={() => setPortal("admin")}
          onLoginSuccess={() => setLoggedIn(true)}
        />
      ) : portal === "trainer" ? (
        <TrainerPortal
          onSwitchToStudent={() => setPortal("student")}
          onSwitchToAdmin={() => setPortal("admin")}
          onLoginSuccess={() => setTrainerLoggedIn(true)}
        />
      ) : (
        <AdminPortal
          onSwitchToStudent={() => setPortal("student")}
          onSwitchToTeacher={() => setPortal("trainer")}
          onLoginSuccess={() => setAdminLoggedIn(true)}
        />
      )}
    </div>
  );
}