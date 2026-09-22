import React from "react";
import { AlertTriangle } from "lucide-react";
import "./QuizPage.css";

const QUIZZES = [
  { title: "Javascript (Quiz-4)", module: "Modern Front-End Development", questions: 40, attempts: "1/3", attemptsFail: false, percentage: "88%", status: "PASSED" },
  { title: "Javascript (Quiz-3)", module: "Modern Front-End Development", questions: 40, attempts: "1/3", attemptsFail: false, percentage: "90%", status: "PASSED" },
  { title: "Javascript (Quiz-2)", module: "Modern Front-End Development", questions: 40, attempts: "1/3", attemptsFail: false, percentage: "98%", status: "PASSED" },
  { title: "Javascript (Quiz-1)", module: "Modern Front-End Development", questions: 40, attempts: "1/3", attemptsFail: false, percentage: "93%", status: "PASSED" },
  { title: "CSS Quiz", module: "Front-End Development", questions: 40, attempts: "1/3", attemptsFail: false, percentage: "33%", status: "FAILED" },
  { title: "HTML Quiz", module: "Web Designing", questions: 40, attempts: "2/3", attemptsFail: true, percentage: "68%", status: "FAILED" },
];

const STATUS_CLASS = {
  PASSED: "passed",
  FAILED: "failed",
};

export default function QuizPage() {
  return (
    <div>
      {/* Important information box */}
      <div className="qz-info-card">
        <div className="qz-info-header">
          <AlertTriangle size={16} color="#1C1F26" />
          <span className="qz-info-title">Important Information</span>
        </div>
        <ul className="qz-info-list">
          <li>Once started, quizzes must be completed in one session</li>
          <li>Switching tabs or leaving the window will be recorded</li>
          <li>Ensure you have a stable internet connection</li>
          <li>The quiz will open in fullscreen mode</li>
        </ul>
      </div>

      {/* Quiz table */}
      <div className="responsive-table-scroll qz-table-card">
        <div className="responsive-table-grid">
          <div className="qz-table-header">
            <div>Title</div>
            <div>Module</div>
            <div>Questions</div>
            <div>Attempts</div>
            <div>Percentage</div>
            <div>Status</div>
            <div>Note</div>
            <div>Action</div>
          </div>
          {QUIZZES.map((q, i) => {
            const statusClass = STATUS_CLASS[q.status] || STATUS_CLASS.PASSED;
            return (
              <div
                key={i}
                className={`table-row-hover qz-table-row ${i === QUIZZES.length - 1 ? "last" : ""}`}
              >
                <div className="qz-title-cell">{q.title}</div>
                <div className="qz-module-cell">{q.module}</div>
                <div>
                  <span className="qz-questions-chip">{q.questions}</span>
                </div>
                <div>
                  <span className={`qz-attempts-chip ${q.attemptsFail ? "fail" : ""}`}>
                    {q.attempts}
                  </span>
                </div>
                <div>{q.percentage}</div>
                <div>
                  <span className={`qz-status-badge ${statusClass}`}>{q.status}</span>
                </div>
                <div className="qz-note-cell">—</div>
                <div>
                  <button className="pill-btn qz-completed-btn">
                    Completed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="qz-footer-note">
        Contact your instructor if you have any issues accessing your quizzes.
      </div>
    </div>
  );
}
