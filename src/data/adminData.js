// Deterministic mock data generators for the Admin dashboard.
// Produces 50 students and 50 trainers with realistic-looking details.

const FIRST_NAMES = [
  "Abdul", "Ayesha", "Bilal", "Sana", "Usman", "Fatima", "Hamza", "Zainab",
  "Ahmed", "Mariam", "Ali", "Hira", "Saad", "Nida", "Faisal", "Amna",
  "Zeeshan", "Sadia", "Kashif", "Rabia", "Omar", "Areeba", "Tariq", "Iqra",
  "Noman", "Sana", "Waqas", "Komal", "Adeel", "Maham", "Junaid", "Anum",
  "Asad", "Warda", "Shahzaib", "Laiba", "Rizwan", "Sidra", "Danish", "Mahnoor",
  "Salman", "Alishba", "Imran", "Nimra", "Farhan", "Aqsa", "Haris", "Sobia",
  "Yasir", "Rimsha",
];

const LAST_NAMES = [
  "Khan", "Ahmed", "Siddiqui", "Baig", "Raza", "Malik", "Qureshi", "Sheikh",
  "Farooq", "Iqbal", "Hussain", "Abbasi", "Chaudhry", "Butt", "Rehman",
  "Soomro", "Memon", "Ansari", "Javed", "Akhtar",
];

const CITIES = ["Karachi", "Lahore", "Islamabad", "Hyderabad", "Multan", "Faisalabad"];
const CAMPUSES = ["Zaitoon Ashraf IT Park", "Gulshan Campus", "North Nazimabad Campus", "Korangi Campus"];

const COURSES = [
  "Modern Web Application Development",
  "User Experience (UX) Design",
  "Digital Marketing",
  "Graphic Designing",
  "Mobile App Development (Flutter)",
  "Data Science & AI",
  "Cyber Security",
  "Video Editing",
  "Cloud Computing (AWS)",
  "E-Commerce & Amazon",
];

const TRAINER_EXPERTISE = [
  "Frontend Development (React)",
  "Backend Development (Node.js)",
  "UI/UX Design",
  "Digital Marketing & SEO",
  "Graphic Designing",
  "Flutter & Mobile Apps",
  "Data Science & Python",
  "Cyber Security",
  "Video Editing & Motion Graphics",
  "Cloud & DevOps",
];

const STUDENT_STATUSES = ["ACTIVE", "ACTIVE", "ACTIVE", "PENDING FEE", "ON LEAVE"];
const TRAINER_STATUSES = ["ACTIVE", "ACTIVE", "ACTIVE", "ON LEAVE"];

function pad(num, len = 6) {
  return String(num).padStart(len, "0");
}

export const STUDENTS = Array.from({ length: 50 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length];
  const last = LAST_NAMES[(i * 3 + 1) % LAST_NAMES.length];
  const course = COURSES[i % COURSES.length];
  const batch = 15 + (i % 10);
  const attendance = 70 + ((i * 7) % 30);
  const feeStatus = STUDENT_STATUSES[i % STUDENT_STATUSES.length];
  const city = CITIES[i % CITIES.length];
  const campus = CAMPUSES[i % CAMPUSES.length];
  const rollNo = 770000 + i * 13;
  const joinedDay = 1 + (i % 28);
  const joinedMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i % 8];

  return {
    id: i + 1,
    name: `${first} ${last}`,
    roll: rollNo,
    cnic: `42101-${pad(1000000 + i * 37, 7)}-${(i % 9) + 1}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@smitstudent.pk`,
    phone: `0300-${pad(1000000 + i * 91, 7)}`,
    course,
    batch: `Batch ${batch}`,
    campus,
    city,
    attendance,
    feeStatus,
    joined: `${joinedDay}-${joinedMonth}-2026`,
    grade: (7 + ((i * 3) % 3) + (i % 10) / 10).toFixed(2),
  };
});

export const TRAINERS = Array.from({ length: 50 }, (_, i) => {
  const first = FIRST_NAMES[(i + 5) % FIRST_NAMES.length];
  const last = LAST_NAMES[(i * 2 + 3) % LAST_NAMES.length];
  const expertise = TRAINER_EXPERTISE[i % TRAINER_EXPERTISE.length];
  const status = TRAINER_STATUSES[i % TRAINER_STATUSES.length];
  const campus = CAMPUSES[(i + 1) % CAMPUSES.length];
  const experience = 2 + (i % 9);
  const studentsCount = 40 + ((i * 11) % 120);
  const coursesTaught = 1 + (i % 3);
  const rating = (3.8 + ((i % 12) / 10)).toFixed(1);

  return {
    id: i + 1,
    name: `${first} ${last}`,
    empId: `TR-${pad(2026000 + i * 17, 6)}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@smit.edu.pk`,
    phone: `0333-${pad(2000000 + i * 73, 7)}`,
    expertise,
    campus,
    experience,
    studentsCount,
    coursesTaught,
    rating,
    status,
  };
});

const COURSE_CATEGORIES = {
  "Modern Web Application Development": "Web Development",
  "User Experience (UX) Design": "Design",
  "Digital Marketing": "Marketing",
  "Graphic Designing": "Design",
  "Mobile App Development (Flutter)": "App Development",
  "Data Science & AI": "Data Science",
  "Cyber Security": "Security",
  "Video Editing": "Media",
  "Cloud Computing (AWS)": "Cloud",
  "E-Commerce & Amazon": "E-Commerce",
};

const COURSE_TIMINGS = [
  "Mon, Wed, Fri · 10:00 AM - 12:00 PM",
  "Mon, Wed, Fri · 01:00 PM - 03:00 PM",
  "Tue, Thu, Sat · 03:00 PM - 05:00 PM",
  "Tue, Thu, Sat · 05:00 PM - 07:00 PM",
  "Mon - Fri · 07:00 PM - 08:30 PM (Evening)",
];

const COURSE_STATUSES = ["ONGOING", "ONGOING", "ONGOING", "UPCOMING", "COMPLETED"];

const COURSE_FEES = {
  "Modern Web Application Development": 15000,
  "User Experience (UX) Design": 12000,
  "Digital Marketing": 9000,
  "Graphic Designing": 10000,
  "Mobile App Development (Flutter)": 14000,
  "Data Science & AI": 18000,
  "Cyber Security": 16000,
  "Video Editing": 8000,
  "Cloud Computing (AWS)": 17000,
  "E-Commerce & Amazon": 9500,
};

export const COURSES_LIST = Array.from({ length: 50 }, (_, i) => {
  const title = COURSES[i % COURSES.length];
  const batchNo = 10 + i;
  const trainer = TRAINERS[(i * 3 + 2) % TRAINERS.length];
  const duration = 8 + (i % 5) * 2;
  const timing = COURSE_TIMINGS[i % COURSE_TIMINGS.length];
  const status = COURSE_STATUSES[i % COURSE_STATUSES.length];
  const capacity = 25 + (i % 4) * 5;
  const enrolled = status === "UPCOMING" ? Math.floor(capacity * 0.3) : Math.min(capacity, 10 + ((i * 7) % capacity));
  const campus = CAMPUSES[i % CAMPUSES.length];
  const startDay = 1 + (i % 28);
  const startMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][i % 9];

  return {
    id: i + 1,
    title,
    category: COURSE_CATEGORIES[title],
    batch: `Batch ${batchNo}`,
    trainer: trainer.name,
    duration: `${duration} weeks`,
    timing,
    status,
    capacity,
    enrolled,
    campus,
    fee: COURSE_FEES[title],
    startDate: `${startDay}-${startMonth}-2026`,
  };
});

const FEE_MONTHS = ["May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026"];
const FEE_STATUSES = ["PAID", "PAID", "PAID", "PENDING", "OVERDUE"];
const PAYMENT_METHODS = ["Bank Transfer", "JazzCash", "Easypaisa", "Cash", "Bank Transfer"];

export const FEE_RECORDS = Array.from({ length: 50 }, (_, i) => {
  const student = STUDENTS[i % STUDENTS.length];
  const month = FEE_MONTHS[i % FEE_MONTHS.length];
  const status = FEE_STATUSES[i % FEE_STATUSES.length];
  const method = PAYMENT_METHODS[i % PAYMENT_METHODS.length];
  const amount = COURSE_FEES[student.course] || 12000;
  const dueDay = 5 + (i % 20);
  const monthShort = month.split(" ")[0];

  return {
    id: i + 1,
    studentName: student.name,
    roll: student.roll,
    course: student.course,
    voucherId: `2026${pad(student.roll, 6)}${pad(i, 2)}`,
    amount,
    month,
    dueDate: `${dueDay}-${monthShort}-2026`,
    paidDate: status === "PAID" ? `${dueDay - 1}-${monthShort}-2026` : "—",
    method: status === "PAID" ? method : "—",
    status,
  };
});
