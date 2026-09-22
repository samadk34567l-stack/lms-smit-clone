import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./FormField.css";

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  isPassword = false,
  filledStyle = false,
  strongBorder = false,
}) {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  const inputClass = [
    "ff-input",
    isPassword ? "ff-password" : "",
    strongBorder ? "ff-strong-border" : "",
    filledStyle && value ? "ff-filled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className="ff-wrapper">
      <label className="ff-label">
        {label} *
      </label>
      <div className="ff-input-wrap">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="ff-toggle-btn"
          >
            {show ? <EyeOff size={18} color="#6B7280" /> : <Eye size={18} color="#6B7280" />}
          </button>
        )}
      </div>
    </div>
  );
}
