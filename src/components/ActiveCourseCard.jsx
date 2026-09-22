import React from "react";
import { Hash, User, MapPin, Navigation } from "lucide-react";
import "./ActiveCourseCard.css";

export default function ActiveCourseCard({ course }) {
  return (
    <div>
      <div className="acc-title">Active Course</div>
      <div className="acc-card">
        <div className="acc-header">
          <div className="acc-course-title">{course.title}</div>
          <span className="acc-enrolled-badge">ENROLLED</span>
        </div>

        <div className="acc-timings">
          {course.timings.map((t, i) => (
            <span key={i} className="acc-timing-chip">
              {t}
            </span>
          ))}
        </div>

        <div className="acc-progress-row">
          <span className="acc-progress-label">Progress</span>
          <span className="acc-progress-value">{course.progress}% Completed</span>
        </div>
        <div className="acc-progress-track">
          <div className="acc-progress-fill" style={{ width: `${course.progress}%` }} />
        </div>

        <div className="acc-meta-grid">
          <div className="acc-meta-item">
            <Hash size={14} color="#6B7280" />
            <span className="acc-meta-label">Batch:</span>
            <span className="acc-meta-value">{course.batch}</span>
          </div>
          <div className="acc-meta-item">
            <User size={14} color="#6B7280" />
            <span className="acc-meta-label">Roll:</span>
            <span className="acc-meta-value">{course.roll}</span>
          </div>
          <div className="acc-meta-item">
            <MapPin size={14} color="#6B7280" />
            <span className="acc-meta-label">Campus:</span>
            <span className="acc-meta-value">{course.campus}</span>
          </div>
          <div className="acc-meta-item">
            <Navigation size={14} color="#6B7280" />
            <span className="acc-meta-label">City:</span>
            <span className="acc-meta-value">{course.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
