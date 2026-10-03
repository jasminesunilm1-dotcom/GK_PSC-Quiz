/**
 * firebase-config.js
 * 
 * Firebase Configuration and Initialization for GK & PSC Quiz Platform.
 * Exports the initialized Firebase app, analytics instance, auth instance, and auth helpers.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  getDocs,
  query,
  orderBy,
  limit 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAPArly6o8LvKKIU6wlT0O2lmMmvYKvREE",
  authDomain: "psc-quiz-9206d.firebaseapp.com",
  projectId: "psc-quiz-9206d",
  storageBucket: "psc-quiz-9206d.firebasestorage.app",
  messagingSenderId: "203788771244",
  appId: "1:203788771244:web:6c1fed207de05fe44f2409",
  measurementId: "G-8WRZRJLQZK"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore on existing app
export const db = getFirestore(app);

// Initialize Firebase Analytics (if supported by the browser environment)
export let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
    window.firebaseAnalytics = analytics;
  }
}).catch(err => {
  console.warn("Firebase Analytics is not supported in this environment:", err);
});

// Authentication Helper Functions
export const signUpUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logoutUser = () => signOut(auth);
export const resetUserPassword = (email) => sendPasswordResetEmail(auth, email);
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// Firestore Profile Helper Functions
export const saveUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  return await setDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

// Calendar Date and Streak Helpers
export const getCalendarDayDifference = (fromDateStr, toDateStr) => {
  if (!fromDateStr || !toDateStr) return null;
  const [y1, m1, d1] = fromDateStr.split("-").map(Number);
  const [y2, m2, d2] = toDateStr.split("-").map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  const msPerDay = 86400000;
  return Math.round((utc2 - utc1) / msPerDay);
};

export const getUserDailyStreak = async (uid) => {
  if (!uid || !db) return null;
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      currentStreak: typeof data.currentStreak === "number" ? data.currentStreak : 0,
      longestStreak: typeof data.longestStreak === "number" ? data.longestStreak : 0,
      lastPracticeDate: data.lastPracticeDate || null,
      recentPracticeDates: Array.isArray(data.recentPracticeDates) ? data.recentPracticeDates : []
    };
  } catch (err) {
    console.warn("Notice reading user streak from Firestore:", err.message || err);
    return null;
  }
};

export const updateUserDailyStreak = async (uid, practiceDateString) => {
  if (!uid || !db) return null;
  try {
    const now = new Date();
    const todayStr = practiceDateString || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    const userData = snap.exists() ? snap.data() : {};

    const currentStreak = typeof userData.currentStreak === "number" ? userData.currentStreak : 0;
    const longestStreak = typeof userData.longestStreak === "number" ? userData.longestStreak : 0;
    const lastPracticeDate = userData.lastPracticeDate || null;
    const recentPracticeDates = Array.isArray(userData.recentPracticeDates) ? userData.recentPracticeDates : [];

    let newStreak = 1;
    let newLongestStreak = Math.max(longestStreak, 1);
    let isSameDay = false;

    if (!lastPracticeDate) {
      // First practice ever
      newStreak = 1;
      newLongestStreak = Math.max(longestStreak, 1);
    } else {
      const diff = getCalendarDayDifference(lastPracticeDate, todayStr);
      if (diff === 0) {
        // Same calendar day: do not increment streak again
        isSameDay = true;
        newStreak = currentStreak > 0 ? currentStreak : 1;
        newLongestStreak = Math.max(longestStreak, newStreak);
      } else if (diff === 1) {
        // Consecutive calendar day: increment streak
        newStreak = (currentStreak > 0 ? currentStreak : 0) + 1;
        newLongestStreak = Math.max(longestStreak, newStreak);
      } else if (diff > 1) {
        // Missed one or more calendar days: reset streak to 1
        newStreak = 1;
        newLongestStreak = Math.max(longestStreak, 1);
      } else {
        // Diff < 0 (attempt from past date): preserve current streak
        newStreak = currentStreak > 0 ? currentStreak : 1;
        newLongestStreak = Math.max(longestStreak, newStreak);
      }
    }

    const updatedPracticeDates = Array.from(new Set([...recentPracticeDates, todayStr])).sort().slice(-30);

    const streakPayload = {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastPracticeDate: todayStr,
      recentPracticeDates: updatedPracticeDates,
      lastPracticeAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      streakUpdatedAt: serverTimestamp()
    };

    await setDoc(userRef, streakPayload, { merge: true });

    return {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastPracticeDate: todayStr,
      recentPracticeDates: updatedPracticeDates,
      isSameDay
    };
  } catch (err) {
    console.warn("Notice updating streak in Firestore:", err.message || err);
    return null;
  }
};

// Firestore Quiz Attempt Helper Functions
export const saveUserQuizAttempt = async (uid, attemptData) => {
  if (!uid || !db) return null;
  const attemptId = attemptData.id || ("att_" + Date.now());
  const docRef = doc(db, "users", uid, "quizAttempts", attemptId);

  let quizType = "practice";
  if (attemptData.difficulty === "pyq" || (attemptData.category && attemptData.category.includes("PYQ"))) {
    quizType = "pyq";
  } else if (attemptData.category && attemptData.category !== "All Categories" && attemptData.category !== "General Knowledge") {
    quizType = "category-drill";
  }

  const payload = {
    userId: uid,
    quizType: quizType,
    category: attemptData.category || "General Knowledge",
    quizName: attemptData.category || "General Knowledge",
    difficulty: attemptData.difficulty || "standard",
    score: Number(attemptData.score !== undefined ? attemptData.score : (attemptData.correctAnswers || 0)),
    correctAnswers: Number(attemptData.correctAnswers !== undefined ? attemptData.correctAnswers : (attemptData.score || 0)),
    totalQuestions: Number(attemptData.totalQuestions || 10),
    questionsAnswered: Number(attemptData.questionsAnswered !== undefined ? attemptData.questionsAnswered : (attemptData.totalQuestions || 10)),
    percentage: Number(attemptData.percentage !== undefined ? attemptData.percentage : 0),
    points: Number(attemptData.points || 0),
    dateTime: attemptData.dateTime || "",
    dateString: attemptData.dateString || "",
    isTimeout: Boolean(attemptData.isTimeout),
    categoryBreakdown: attemptData.categoryBreakdown || {},
    completedAt: serverTimestamp()
  };

  // Attach PYQ exam details if available
  if (attemptData.examId) payload.examId = attemptData.examId;
  if (attemptData.examTitle) payload.examTitle = attemptData.examTitle;
  if (attemptData.year) payload.year = attemptData.year;

  await setDoc(docRef, payload, { merge: true });

  // Update daily streak in users/{uid}
  try {
    await updateUserDailyStreak(uid, attemptData.dateString);
  } catch (streakErr) {
    console.warn("Notice updating streak after attempt save:", streakErr);
  }

  return attemptId;
};

export const getUserQuizHistory = async (uid, maxLimit = 50) => {
  if (!uid || !db) return [];
  try {
    const attemptsRef = collection(db, "users", uid, "quizAttempts");
    let snap;
    try {
      const q = query(attemptsRef, orderBy("completedAt", "desc"), limit(maxLimit));
      snap = await getDocs(q);
    } catch (orderErr) {
      snap = await getDocs(attemptsRef);
    }

    const results = [];
    snap.forEach(d => {
      const data = d.data();
      const ts = data.completedAt?.toMillis ? data.completedAt.toMillis() : (data.timestamp || Date.now());
      results.push({
        id: d.id,
        ...data,
        timestamp: ts
      });
    });

    results.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return results.slice(0, maxLimit);
  } catch (err) {
    console.warn("Notice loading quiz history from Firestore:", err.message || err);
    return [];
  }
};

export const updateUserLeaderboardStats = async (uid, stats) => {
  if (!uid || !db || !stats) return null;
  try {
    const userRef = doc(db, "users", uid);
    const payload = {
      totalPoints: Number(stats.totalPoints || 0),
      quizzesCompleted: Number(stats.quizzesCompleted || 0),
      totalQuestionsAttempted: Number(stats.totalQuestionsAttempted || 0),
      totalCorrectAnswers: Number(stats.totalCorrectAnswers || 0),
      accuracy: Number(stats.accuracy || 0),
      leaderboardUpdatedAt: serverTimestamp(),
      lastActive: serverTimestamp()
    };
    await setDoc(userRef, payload, { merge: true });
    return payload;
  } catch (err) {
    console.warn("Notice updating leaderboard stats in Firestore:", err.message || err);
    return null;
  }
};

export const getLeaderboard = async (limitCount = 50) => {
  if (!db) return [];
  try {
    const usersRef = collection(db, "users");
    let snap;
    try {
      const q = query(usersRef, orderBy("totalPoints", "desc"), limit(limitCount));
      snap = await getDocs(q);
    } catch (_) {
      snap = await getDocs(usersRef);
    }

    const players = [];
    const currentUid = auth?.currentUser?.uid;

    snap.forEach(docSnap => {
      const data = docSnap.data();
      const uid = docSnap.id;
      const isCurrentUser = Boolean(currentUid && currentUid === uid);
      const points = typeof data.totalPoints === "number" ? data.totalPoints : 0;
      const quizzes = typeof data.quizzesCompleted === "number" ? data.quizzesCompleted : 0;
      const accuracy = typeof data.accuracy === "number" ? data.accuracy : 0;

      if (quizzes > 0 || points > 0 || isCurrentUser) {
        players.push({
          uid,
          name: data.displayName || (data.email ? data.email.split("@")[0] : "Aspirant"),
          avatar: data.avatar || "👤",
          points,
          quizzes,
          accuracy,
          isUser: isCurrentUser
        });
      }
    });

    players.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      return b.quizzes - a.quizzes;
    });

    return players;
  } catch (err) {
    console.warn("Notice loading leaderboard from Firestore:", err.message || err);
    return [];
  }
};

// Expose to window object for global script access & console testing
window.firebaseApp = app;
window.firebaseConfig = firebaseConfig;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.quizAuth = {
  auth,
  db,
  signUpUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  onAuthChange,
  saveUserProfile,
  getUserProfile,
  getUserDailyStreak,
  updateUserDailyStreak,
  getCalendarDayDifference,
  updateUserLeaderboardStats,
  getLeaderboard,
  saveUserQuizAttempt,
  getUserQuizHistory
};

console.log("🔥 Firebase & Auth initialized successfully!");
console.log("Connected to project:", firebaseConfig.projectId);
