import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCw4Vx2RVrUM8JxwycjyRzOEerDOSb7LnE",
    authDomain: "academy-exams.firebaseapp.com",
    projectId: "academy-exams",
    storageBucket: "academy-exams.firebasestorage.app",
    messagingSenderId: "713843455021",
    appId: "1:713843455021:web:af094b4d5822187dc1b4a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EXAM_ID = "ai-fundamentals";
const DURATION_MINUTES = 60;

window.startExam = async function () {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();

  if (!name || !roll) {
    alert("Enter name and roll number");
    return;
  }

  const attemptId = `${EXAM_ID}_${roll}`;
  const ref = doc(db, "attempts", attemptId);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    alert("Resuming existing attempt");
    console.log(snap.data());
    return;
  }

  await setDoc(ref, {
    examId: EXAM_ID,
    rollNumber: roll,
    name: name,
    status: "IN_PROGRESS",
    startTime: serverTimestamp(),
    submitTime: null,
    durationMinutes: DURATION_MINUTES,
    score: null,
    violations: 0,
    createdAt: serverTimestamp()
  });

  alert("Attempt created. Exam started.");
};
