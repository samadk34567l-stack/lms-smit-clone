// Simple in-memory store standing in for localStorage.
// (Real browser storage APIs are blocked inside the Claude artifact sandbox —
// in your own environment you can swap this for localStorage/sessionStorage.)
export const memoryStore = {
  studentCnic: "",
  trainerEmail: "",
  trainerPassword: "",
};
