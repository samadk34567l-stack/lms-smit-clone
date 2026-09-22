import React, { useState, useEffect } from "react";
import "./TrainerPortal.css";
import { memoryStore } from "../store";
import Logo from "./Logo";
import FormField from "./FormField";
import { Sun, Moon } from "lucide-react";

export default function TrainerPortal({ onSwitchToStudent, onSwitchToAdmin, onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const savedEmail = (() => {
    try {
      return localStorage.getItem("smit_trainer_email") || memoryStore.trainerEmail;
    } catch (err) {
      return memoryStore.trainerEmail;
    }
  })();

  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [cEmail, setCEmail] = useState("");
  const [dob, setDob] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createError, setCreateError] = useState("");

  const getSavedCredentials = () => {
    try {
      const raw = localStorage.getItem("smit_trainer_credentials");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setLoginError("Email and password are required.");
      return;
    }

    const record = getSavedCredentials();

    if (!record) {
      setLoginError("No account found. Please create a password first.");
      return;
    }

    if (email.trim().toLowerCase() !== record.email.trim().toLowerCase() || password !== record.password) {
      setLoginError("Incorrect email or password.");
      return;
    }

    memoryStore.trainerEmail = email;
    setLoginError("");
    onLoginSuccess();
  };

  const validateCreatePassword = () => {
    if (!cEmail.trim() || !dob.trim() || !newPassword.trim()) {
      return "Email, DOB and password are all required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail.trim())) {
      return "Please enter a valid email address.";
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

    const record = { email: cEmail, dob, password: newPassword, createdAt: new Date().toISOString() };

    try {
      localStorage.setItem("smit_trainer_email", cEmail);
      localStorage.setItem("smit_trainer_credentials", JSON.stringify(record));
    } catch (err) {
      setCreateError("Could not save data. Browser storage may be disabled.");
      return;
    }

    memoryStore.trainerEmail = cEmail;
    setCreateError("");
    setTab("login");
    setEmail(cEmail);
    alert("Password created and saved successfully. You can now log in.");
  };

  return (
    <div className="tp-wrapper">
      <button
        className="tp-theme-toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={16} color="#F3F4F6" /> : <Moon size={16} color="#1C1F26" />}
      </button>
      <Logo />
      <div className="tp-heading">
        Trainer Portal
      </div>

      <div className="tp-tabs-row">
        <button
          onClick={() => setTab("login")}
          className={`tp-tab-btn ${tab === "login" ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("create")}
          className={`tp-tab-btn ${tab === "create" ? "active" : ""}`}
        >
          Create Password
        </button>
      </div>

      <div className="tp-card">
        {tab === "login" ? (
          <>
            <div className="tp-card-title">Login</div>
            <div className="tp-card-sub">
              Kindly provide your email and password to access the trainer portal.
            </div>

            <FormField
              label="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setLoginError(""); }}
              filledStyle
            />
            <FormField
              label="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
              isPassword
              filledStyle
            />

            {loginError && <div className="tp-error-text">{loginError}</div>}

            <button onClick={handleLogin} className="tp-submit-btn">
              LOGIN
            </button>
          </>
        ) : (
          <>
            <div className="tp-card-title">Create a Password</div>
            <div className="tp-card-sub">
              Kindly provide your email and DOB used during SMIT trainer registration.
            </div>

            <FormField
              label="Email"
              value={cEmail}
              onChange={(e) => { setCEmail(e.target.value); setCreateError(""); }}
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

            {createError && <div className="tp-error-text">{createError}</div>}

            <button onClick={handleCreatePassword} className="tp-submit-btn">
              SUBMIT
            </button>
          </>
        )}
      </div>

      <button onClick={onSwitchToStudent} className="tp-switch-btn">
        Login as student
      </button>
      <button onClick={onSwitchToAdmin} className="tp-switch-btn">
        Login as admin
      </button>
    </div>
  );
}