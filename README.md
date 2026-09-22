# SMIT LMS Portal

Component-based React project (Student Portal + Trainer Portal).

## Structure
```
smit-lms-portal/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── theme.js
    ├── store.js
    └── components/
        ├── Logo.jsx
        ├── FormField.jsx
        ├── StudentPortal.jsx
        └── TrainerPortal.jsx
```

## Run locally
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Notes
- `store.js` currently uses an in-memory object as a stand-in for
  localStorage. Swap it for real `localStorage`/`sessionStorage` calls
  if you deploy this outside of a sandboxed environment.
- The SMIT logo here is a text-based placeholder (graduation cap icon +
  "SMIT" text) — replace with your official logo image.
- "Login as teacher" / "Login as student" buttons in `App.jsx` switch
  between the two portals for now; wire them to real routing
  (e.g. React Router) when you add a backend.
