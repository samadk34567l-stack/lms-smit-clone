import React, { useState, useEffect } from "react";
import "./StudentPortal.css";
import { memoryStore } from "../store";
import Logo from "./Logo";
import FormField from "./FormField";
import { Sun, Moon } from "lucide-react";

export default function StudentPortal({ onSwitchToTeacher, onSwitchToAdmin, onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const savedCnic = (() => {
    try {
      return localStorage.getItem("smit_student_cnic") || memoryStore.studentCnic;
    } catch (err) {
      return memoryStore.studentCnic;
    }
  })();

  const [cnic, setCnic] = useState(savedCnic);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [cCnic, setCCnic] = useState("");
  const [dob, setDob] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createError, setCreateError] = useState("");

  const getSavedCredentials = () => {
    try {
      const raw = localStorage.getItem("smit_student_credentials");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  };

  const handleLogin = () => {
    if (!cnic.trim() || !password.trim()) {
      setLoginError("CNIC and password are required.");
      return;
    }

    const record = getSavedCredentials();

    if (!record) {
      setLoginError("No account found. Please create a password first.");
      return;
    }

    const enteredCnicDigits = cnic.replace(/\D/g, "");
    const savedCnicDigits = (record.cnic || "").replace(/\D/g, "");

    if (enteredCnicDigits !== savedCnicDigits || password !== record.password) {
      setLoginError("Incorrect CNIC or password.");
      return;
    }

    memoryStore.studentCnic = cnic;
    setLoginError("");
    onLoginSuccess();
  };

  const validateCreatePassword = () => {
    const cnicDigits = cCnic.replace(/\D/g, "");

    if (!cCnic.trim() || !dob.trim() || !newPassword.trim()) {
      return "CNIC, DOB and password are all required.";
    }
    if (cnicDigits.length !== 13) {
      return "CNIC must be 13 digits (dashes are optional).";
    }
    const dobDate = new Date(dob);
    const today = new Date();
    if (isNaN(dobDate.getTime())) {
      return "Please enter a valid date of birth.";
    }
    if (dobDate > today) {
      return "Date of birth cannot be in the future.";
    }
    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return "Password must contain both letters and numbers.";
    }
    return "";
  };

  const handleCreatePassword = () => {
    const validationError = validateCreatePassword();
    if (validationError) {
      setCreateError(validationError);
      return;
    }

    const record = { cnic: cCnic, dob, password: newPassword, createdAt: new Date().toISOString() };

    try {
      localStorage.setItem("smit_student_cnic", cCnic);
      localStorage.setItem("smit_student_credentials", JSON.stringify(record));
    } catch (err) {
      setCreateError("Could not save data. Browser storage may be disabled.");
      return;
    }

    memoryStore.studentCnic = cCnic;
    setCreateError("");
    setTab("login");
    setCnic(cCnic);
    alert("Password created and saved successfully. You can now log in.");
  };

  return (
    <div className="sp-wrapper">
      <button
        className="sp-theme-toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={16} color="#F3F4F6" /> : <Moon size={16} color="#1C1F26" />}
      </button>
      <Logo />
      <div className="sp-heading">
        Student Portal
      </div>

      <div className="sp-tabs-row">
        <button
          onClick={() => setTab("login")}
          className={`sp-tab-btn ${tab === "login" ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("create")}
          className={`sp-tab-btn ${tab === "create" ? "active" : ""}`}
        >
          Create Password
        </button>
      </div>

      <div className="sp-card">
        {tab === "login" ? (
          <>
            <div className="sp-card-title">Login</div>
            <div className="sp-card-sub">
              Kindly provide the CNIC number and password used during SMIT course registration.
            </div>

            <FormField
              label="CNIC"
              value={cnic}
              onChange={(e) => { setCnic(e.target.value); setLoginError(""); }}
              filledStyle
            />
            <FormField
              label="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
              isPassword
              strongBorder
            />

            {loginError && <div className="sp-error-text">{loginError}</div>}

            <button onClick={handleLogin} className="sp-submit-btn">
              LOGIN
            </button>
          </>
        ) : (
          <>
            <div className="sp-card-title">Create a Password</div>
            <div className="sp-card-sub">
              Kindly provide the CNIC number and DOB used during SMIT course registration.
            </div>

            <FormField
              label="CNIC"
              value={cCnic}
              onChange={(e) => { setCCnic(e.target.value); setCreateError(""); }}
              filledStyle
            />
            <FormField
              label="DOB"
              type="date"
              value={dob}
              onChange={(e) => { setDob(e.target.value); setCreateError(""); }}
            />
            <FormField
              label="Password"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setCreateError(""); }}
              isPassword
              filledStyle
            />

            {createError && <div className="sp-error-text">{createError}</div>}

            <button onClick={handleCreatePassword} className="sp-submit-btn">
              SUBMIT
            </button>
          </>
        )}
      </div>

      {tab === "login" && (
        <>
          <button onClick={onSwitchToTeacher} className="sp-switch-btn">
            Login as teacher
          </button>
          <button onClick={onSwitchToAdmin} className="sp-switch-btn">
            Login as admin
          </button>
        </>
      )}
    </div>
  );
}