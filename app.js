/**
 * app.js
 * 
 * Main JavaScript logic for the GK & PSC Quiz Preparation Platform.
 * 
 * Features included:
 * 1. Dynamic 1-minute-per-question countdown timer with auto-submit on timeout.
 * 2. Randomized question selection without repetitions.
 * 3. Randomized answer choices with reliable answer verification.
 * 4. LocalStorage quiz history persistence (date, difficulty, score, categories).
 * 5. Overall, difficulty-wise, and category-wise statistics calculation.
 * 6. Central student progress dashboard with practice streak tracking.
 * 7. Unified professional navigation system.
 */

// =============================================================================
// 1. CONFIGURATION SETTINGS
// =============================================================================
// Time allowed per question: 1 minute (60 seconds)
// The quiz calculates total time automatically: total = question count * SECONDS_PER_QUESTION
const SECONDS_PER_QUESTION = 60;

// Number of random questions to select in each quiz session
const QUESTIONS_PER_QUIZ = 10;

// LocalStorage key resolver functions for strict multi-account isolation.
// Each authenticated Firebase user is isolated by their unique UID.
function getActiveUserUid() {
    return window.activeAuthUserId || window.firebaseAuth?.currentUser?.uid || null;
}

function getQuizStorageKey(uidOverride) {
    const uid = uidOverride || getActiveUserUid();
    return uid ? `psc_quiz_history_${uid}` : "psc_quiz_history_guest";
}

function getStreakStorageKey(uidOverride) {
    const uid = uidOverride || getActiveUserUid();
    return uid ? `psc_quiz_firestore_streak_${uid}` : "psc_quiz_firestore_streak_guest";
}

// Fallback constant for legacy compatibility if referenced externally
const STORAGE_KEY = "psc_quiz_history";



// =============================================================================
// 2. STATE VARIABLES
// =============================================================================
let currentDifficulty = "easy";          // Selected level: "easy", "medium", or "hard"
let currentCategory = "All Categories";  // Selected subject: "Sports", "Kerala GK", etc., or "All Categories"
let selectedCategoryDifficulty = "easy"; // Difficulty chosen on category detail screen
let currentQuestions = [];               // Randomly selected questions for active quiz
let currentQuestionIndex = 0;            // Index of the current active question (0-based)
let currentShuffledOptions = [];         // Shuffled options for the active question
let score = 0;                           // Count of correct answers
let hasAnswered = false;                 // Lock flag to prevent answering multiple times
let sessionAnswers = [];                 // Tracks { id, category, isCorrect } for category statistics
let hasSavedResult = false;              // Prevents duplicate saving of the same quiz session
let lastCompletedResult = null;          // Caches the latest completed quiz for the Results tab

// Timer State
let totalQuizDuration = 0;               // Total quiz time in seconds, calculated per session
let timeRemaining = 0;                   // Remaining seconds in active countdown
let timerInterval = null;                // Stores the setInterval reference for the timer


// =============================================================================
// 3. DOM ELEMENT REFERENCES
// =============================================================================
// Theme Switcher Elements
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeToggleText = document.getElementById("theme-toggle-text");

// Screen Views
const dashboardScreen = document.getElementById("dashboard-screen");
const homeScreen = document.getElementById("home-screen"); // Practice Screen
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const pyqBankScreen = document.getElementById("pyq-bank-screen");
const mockTestsScreen = document.getElementById("mock-tests-screen") || pyqBankScreen;
const categoriesScreen = document.getElementById("categories-screen");
const categoryDetailScreen = document.getElementById("category-detail-screen");

// Navigation Elements
const navButtons = document.querySelectorAll(".nav-btn");
const navDashboard = document.getElementById("nav-dashboard");
const navPractice = document.getElementById("nav-practice");
const navPyqBank = document.getElementById("nav-pyq-bank");
const navMockTests = document.getElementById("nav-mock-tests") || navPyqBank;
const navCategories = document.getElementById("nav-categories");
const navResults = document.getElementById("nav-results");

// PYQ Bank Subviews & Elements
const pyqCategoriesView = document.getElementById("pyq-categories-view");
const pyqYearsView = document.getElementById("pyq-years-view");
const pyqPracticeView = document.getElementById("pyq-practice-view");
const pyqResultView = document.getElementById("pyq-result-view");

const pyqExamCards = document.querySelectorAll(".pyq-exam-card");
const pyqYearsBackBtn = document.getElementById("pyq-years-back-btn");
const pyqSelectedExamTitle = document.getElementById("pyq-selected-exam-title");
const pyqYearsGrid = document.getElementById("pyq-years-grid");

const pyqPracticeBackBtn = document.getElementById("pyq-practice-back-btn");
const pyqExamBadge = document.getElementById("pyq-exam-badge");
const pyqQuestionCounter = document.getElementById("pyq-question-counter");
const pyqAnsweredIndicator = document.getElementById("pyq-answered-indicator");
const pyqProgressBar = document.getElementById("pyq-progress-bar");
const pyqPaperCode = document.getElementById("pyq-paper-code");
const pyqQuestionText = document.getElementById("pyq-question-text");
const pyqOptionsContainer = document.getElementById("pyq-options-container");
const pyqPrevBtn = document.getElementById("pyq-prev-btn");
const pyqNextBtn = document.getElementById("pyq-next-btn");
const pyqSubmitBtn = document.getElementById("pyq-submit-btn");

const pyqFinalPercentage = document.getElementById("pyq-final-percentage");
const pyqResultExam = document.getElementById("pyq-result-exam");
const pyqResultTotal = document.getElementById("pyq-result-total");
const pyqResultCorrect = document.getElementById("pyq-result-correct");
const pyqFinalScore = document.getElementById("pyq-final-score");
const pyqResultMessage = document.getElementById("pyq-result-message");
const pyqResultTrophy = document.getElementById("pyq-result-trophy");
const pyqReviewContainer = document.getElementById("pyq-review-container");
const pyqRetakeBtn = document.getElementById("pyq-retake-btn");
const pyqOtherYearBtn = document.getElementById("pyq-other-year-btn");
const pyqAllExamsBtn = document.getElementById("pyq-all-exams-btn");

// Dashboard Elements
const dashStartPracticeBtn = document.getElementById("dash-start-practice-btn");
const kpiTotalQuestions = document.getElementById("kpi-total-questions");
const kpiAccuracy = document.getElementById("kpi-accuracy");
const kpiTotalQuizzes = document.getElementById("kpi-total-quizzes");
const kpiBestScore = document.getElementById("kpi-best-score");
const kpiStreak = document.getElementById("kpi-streak");

// Difficulty Performance Elements
const diffAccuracyEasy = document.getElementById("diff-accuracy-easy");
const diffBarEasy = document.getElementById("diff-bar-easy");
const diffCountEasy = document.getElementById("diff-count-easy");
const diffAccuracyMedium = document.getElementById("diff-accuracy-medium");
const diffBarMedium = document.getElementById("diff-bar-medium");
const diffCountMedium = document.getElementById("diff-count-medium");
const diffAccuracyHard = document.getElementById("diff-accuracy-hard");
const diffBarHard = document.getElementById("diff-bar-hard");
const diffCountHard = document.getElementById("diff-count-hard");

// Category & Recent Attempts Containers
const categoryStatsContainer = document.getElementById("category-stats-container");
const recentAttemptsContainer = document.getElementById("recent-attempts-container");
const clearHistoryBtn = document.getElementById("clear-history-btn");

// Practice Home Screen Elements
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

// Category Drill Screen Elements
const categoryCards = document.querySelectorAll(".category-select-card");
const catBackBtn = document.getElementById("cat-back-btn");
const catDetailIcon = document.getElementById("cat-detail-icon");
const catDetailTitle = document.getElementById("cat-detail-title");
const catDetailDesc = document.getElementById("cat-detail-desc");
const catDetailSubtitle = document.getElementById("cat-detail-subtitle");
const catDiffCards = document.querySelectorAll(".cat-diff-card");
const catEasyCount = document.getElementById("cat-easy-count");
const catMediumCount = document.getElementById("cat-medium-count");
const catHardCount = document.getElementById("cat-hard-count");
const catStartQuizBtn = document.getElementById("cat-start-quiz-btn");

// Quiz Top Bar Elements
const difficultyBadge = document.getElementById("difficulty-badge");
const timerBadge = document.getElementById("timer-badge");
const timerDisplay = document.getElementById("timer-display");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

// Quiz Question Area Elements
const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackBanner = document.getElementById("feedback-banner");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");

// Result Screen Elements
const resultTrophy = document.getElementById("result-trophy");
const timeoutBanner = document.getElementById("timeout-banner");
const resultMessage = document.getElementById("result-message");
const finalPercentage = document.getElementById("final-percentage");
const resultCategory = document.getElementById("result-category");
const resultDifficulty = document.getElementById("result-difficulty");
const correctCount = document.getElementById("correct-count");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
const resultCatBtn = document.getElementById("result-cat-btn");
const resultDashBtn = document.getElementById("result-dash-btn");
const homeBtn = document.getElementById("home-btn");

// Results Performance Hub Elements
const latestQuizCompletion = document.getElementById("latest-quiz-completion");
const resultsSummaryRow = document.getElementById("results-summary-row");
const resTotalQuizzes = document.getElementById("res-total-quizzes");
const resAccuracy = document.getElementById("res-accuracy");
const resTotalPoints = document.getElementById("res-total-points");
const resStreak = document.getElementById("res-streak");

const dailyStreakCard = document.getElementById("daily-streak-card");
const streakDisplayCount = document.getElementById("streak-display-count");
const streakQuoteText = document.getElementById("streak-quote-text");
const streakTodayStatus = document.getElementById("streak-today-status");
const streakWeekTracker = document.getElementById("streak-week-tracker");

const leaderboardTable = document.getElementById("leaderboard-table");
const leaderboardBody = document.getElementById("leaderboard-body");
const resultsRecentContainer = document.getElementById("results-recent-container");

// Preview Screen CTA Buttons
const mockGoPracticeBtn = document.getElementById("mock-go-practice-btn");
const catGoPracticeBtn = document.getElementById("cat-go-practice-btn");


// =============================================================================
// 4. HELPER UTILITIES
// =============================================================================

/**
 * Shuffles an array using the standard Fisher-Yates algorithm.
 * Returns a new shuffled copy of the input array without modifying the original.
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}

/**
 * Formats a given number of seconds into MM:SS format (e.g., 600 -> "10:00", 65 -> "01:05").
 * @param {number} totalSeconds
 * @returns {string} Formatted time string
 */
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMin = String(minutes).padStart(2, "0");
    const formattedSec = String(seconds).padStart(2, "0");
    return `${formattedMin}:${formattedSec}`;
}

/**
 * Returns a local date string in YYYY-MM-DD format for timezone-safe date comparison.
 * @param {Date} dateObj
 * @returns {string} Date string in YYYY-MM-DD
 */
function getLocalDateString(dateObj) {
    const d = dateObj || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * Calculates the exact difference in calendar days between two YYYY-MM-DD date strings.
 * Uses UTC midnight comparison so daylight saving time or time of day does not skew the day difference.
 * @param {string} fromDateStr - Earlier date string in YYYY-MM-DD
 * @param {string} toDateStr - Later date string in YYYY-MM-DD
 * @returns {number|null} Difference in days (positive if toDateStr is in the future relative to fromDateStr)
 */
function getCalendarDayDifference(fromDateStr, toDateStr) {
    if (!fromDateStr || !toDateStr) return null;
    const [y1, m1, d1] = fromDateStr.split("-").map(Number);
    const [y2, m2, d2] = toDateStr.split("-").map(Number);
    const utc1 = Date.UTC(y1, m1 - 1, d1);
    const utc2 = Date.UTC(y2, m2 - 1, d2);
    const msPerDay = 86400000;
    return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Retrieves the cached Firestore streak from localStorage.
 * Used as immediate fallback on render before network responds.
 * @returns {Object|null}
 */
function getCachedFirestoreStreak() {
    try {
        const key = getStreakStorageKey();
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (_) {
        return null;
    }
}

/**
 * Computes active streak count based on calendar dates.
 * A streak remains active if user practiced today (diff === 0) or yesterday (diff === 1).
 * If user missed 2 or more calendar days, active streak is 0 until they practice today.
 * @param {Object} streakData - { currentStreak, lastPracticeDate }
 * @returns {number} Active streak count
 */
function getActiveStreak(streakData) {
    if (!streakData || !streakData.lastPracticeDate) return 0;
    const todayStr = getLocalDateString(new Date());
    const diff = getCalendarDayDifference(streakData.lastPracticeDate, todayStr);
    if (diff === 0 || diff === 1) {
        return Number(streakData.currentStreak) || 0;
    }
    return 0;
}


// =============================================================================
// 5. LOCALSTORAGE & PROGRESS DATA SYSTEM
// =============================================================================

/**
 * Loads all saved quiz attempts from localStorage for the active user.
 * @param {string} [uidOverride] - Optional user UID override
 * @returns {Array} Array of saved attempt objects, or empty array if none found
 */
function loadQuizHistory(uidOverride) {
    try {
        const key = getQuizStorageKey(uidOverride);
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error("Error reading quiz history from localStorage:", err);
        return [];
    }
}

/**
 * Saves a new completed quiz attempt to localStorage under the active user's key.
 * Keeps multiple attempts by prepending to the existing history array.
 * @param {Object} attemptData - Full record of the completed quiz
 */
function saveQuizAttempt(attemptData) {
    try {
        if (!attemptData.id) {
            attemptData.id = "att_" + Date.now();
        }
        const key = getQuizStorageKey();
        const history = loadQuizHistory();
        history.unshift(attemptData); // Add new attempt to the front
        localStorage.setItem(key, JSON.stringify(history));
        // Refresh the dashboard immediately with the latest statistics
        renderDashboard();

        // Compute cumulative stats from real attempts for leaderboard sync
        const cumulativeStats = typeof computeUserStatsFromHistory === "function" 
            ? computeUserStatsFromHistory(history) 
            : null;

        // Asynchronously save to Cloud Firestore if user is authenticated
        if (typeof window.saveQuizAttemptToFirestore === "function") {
            window.saveQuizAttemptToFirestore(attemptData, cumulativeStats).then(attemptId => {
                if (attemptId) {
                    console.log("☁️ Quiz attempt successfully recorded in Cloud Firestore:", attemptId);
                }
            }).catch(err => {
                console.error("❌ Cloud Firestore attempt sync error:", err);
            });
        }
    } catch (err) {
        console.error("Error saving quiz attempt to localStorage:", err);
    }
}

/**
 * Clears saved quiz history for the active user after user confirmation.
 */
function clearQuizHistory() {
    const confirmed = confirm("Are you sure you want to reset all your saved practice statistics and quiz history? This cannot be undone.");
    if (confirmed) {
        try {
            const key = getQuizStorageKey();
            localStorage.removeItem(key);
            lastCompletedResult = null;
            renderDashboard();
            renderResultsPage(false);
            alert("Your quiz practice history has been reset.");
        } catch (err) {
            console.error("Error clearing quiz history:", err);
        }
    }
}

/**
 * Calculates consecutive practice streak in days based on quiz dates.
 * A streak remains active if the student practiced today OR yesterday.
 * @param {Array} history - Array of quiz attempt objects
 * @returns {number} Streak count in days
 */
function calculatePracticeStreak(history) {
    if (!history || history.length === 0) return 0;

    // Collect unique practice dates
    const uniqueDates = new Set(history.map(a => a.dateString).filter(Boolean));
    if (uniqueDates.size === 0) return 0;

    const today = new Date();
    const todayStr = getLocalDateString(today);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    let checkDate = new Date();
    if (uniqueDates.has(todayStr)) {
        // Practiced today: streak starts from today
        checkDate = today;
    } else if (uniqueDates.has(yesterdayStr)) {
        // Practiced yesterday: streak is still alive!
        checkDate = yesterday;
    } else {
        // Streak is broken (no practice today or yesterday)
        return 0;
    }

    let streak = 0;
    while (true) {
        const checkStr = getLocalDateString(checkDate);
        if (uniqueDates.has(checkStr)) {
            streak++;
            // Move one day backward
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}


// =============================================================================
// 6. DASHBOARD STATISTICS ENGINE & RENDERING
// =============================================================================

/**
 * Aggregates all statistics from actual saved attempts and renders the Dashboard.
 * No fake statistics are used; all numbers are calculated live from localStorage.
 */
function renderDashboard() {
    const history = loadQuizHistory();

    // 1. Calculate Overall Statistics
    const totalQuizzes = history.length;
    let totalQuestionsAttempted = 0;
    let totalCorrectAnswers = 0;
    let bestPercentage = 0;

    history.forEach(attempt => {
        totalQuestionsAttempted += (attempt.totalQuestions || 0);
        totalCorrectAnswers += (attempt.correctAnswers || 0);
        if (typeof attempt.percentage === "number" && attempt.percentage > bestPercentage) {
            bestPercentage = attempt.percentage;
        }
    });

    const overallAccuracy = totalQuestionsAttempted > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100)
        : 0;

    // Daily Streak: Prioritize verified Firestore streak for logged-in user, fallback to local history
    const cachedStreak = window.currentUserStreak || getCachedFirestoreStreak();
    const practiceStreak = (cachedStreak && cachedStreak.lastPracticeDate)
        ? getActiveStreak(cachedStreak)
        : calculatePracticeStreak(history);

    // Update Overall KPI Cards
    if (kpiTotalQuestions) kpiTotalQuestions.textContent = totalQuestionsAttempted;
    if (kpiAccuracy) kpiAccuracy.textContent = `${overallAccuracy}%`;
    if (kpiTotalQuizzes) kpiTotalQuizzes.textContent = totalQuizzes;
    if (kpiBestScore) kpiBestScore.textContent = totalQuizzes > 0 ? `${bestPercentage}%` : "0%";
    if (kpiStreak) kpiStreak.textContent = `${practiceStreak} ${practiceStreak === 1 ? "Day" : "Days"}`;

    // 2. Calculate Performance by Difficulty
    const diffLevels = [
        { key: "easy", accEl: diffAccuracyEasy, barEl: diffBarEasy, countEl: diffCountEasy },
        { key: "medium", accEl: diffAccuracyMedium, barEl: diffBarMedium, countEl: diffCountMedium },
        { key: "hard", accEl: diffAccuracyHard, barEl: diffBarHard, countEl: diffCountHard }
    ];

    diffLevels.forEach(level => {
        const diffAttempts = history.filter(a => a.difficulty === level.key);
        const diffTotalQ = diffAttempts.reduce((sum, a) => sum + (a.totalQuestions || 0), 0);
        const diffCorrect = diffAttempts.reduce((sum, a) => sum + (a.correctAnswers || 0), 0);
        const diffAcc = diffTotalQ > 0 ? Math.round((diffCorrect / diffTotalQ) * 100) : 0;

        if (level.accEl) level.accEl.textContent = `${diffAcc}%`;
        if (level.barEl) level.barEl.style.width = `${diffAcc}%`;
        if (level.countEl) {
            level.countEl.textContent = `${diffCorrect} / ${diffTotalQ} correct (${diffAttempts.length} ${diffAttempts.length === 1 ? "quiz" : "quizzes"})`;
        }
    });

    // 3. Calculate Category-Wise Performance
    if (categoryStatsContainer) {
        categoryStatsContainer.innerHTML = "";
        
        // Subject icon mapping for clean visual presentation
        const categoryIcons = {
            "Kerala": "🌴",
            "Constitution": "📜",
            "Science": "🔬",
            "History": "⚔️",
            "Geography": "🌍",
            "Economics": "📈",
            "India": "🇮🇳",
            "World": "🌐",
            "Sports": "🏅",
            "Current Affairs": "📰"
        };

        const availableCategories = typeof getAvailableCategories === "function" 
            ? getAvailableCategories() 
            : Object.values(PSC_CATEGORIES);

        // Aggregate category attempts from all saved attempts
        const categoryAggregates = {};
        availableCategories.forEach(cat => {
            categoryAggregates[cat] = { attempted: 0, correct: 0 };
        });

        history.forEach(attempt => {
            if (attempt.categoryBreakdown) {
                Object.entries(attempt.categoryBreakdown).forEach(([cat, stats]) => {
                    if (!categoryAggregates[cat]) {
                        categoryAggregates[cat] = { attempted: 0, correct: 0 };
                    }
                    categoryAggregates[cat].attempted += (stats.attempted || 0);
                    categoryAggregates[cat].correct += (stats.correct || 0);
                });
            }
        });

        // Render each category card
        availableCategories.forEach(cat => {
            const stats = categoryAggregates[cat] || { attempted: 0, correct: 0 };
            const catAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            const icon = categoryIcons[cat] || "📌";

            const card = document.createElement("div");
            card.className = "category-stat-card";
            card.style.cursor = "pointer";
            card.title = `Click to practice ${cat} drills`;
            card.addEventListener("click", () => openCategoryDetail(cat));
            card.innerHTML = `
                <div class="cat-stat-top">
                    <span class="cat-stat-name">${icon} ${cat}</span>
                    <span class="cat-stat-acc">${stats.attempted > 0 ? catAcc + "%" : "—"}</span>
                </div>
                <div class="progress-track sm">
                    <div class="progress-fill" style="width: ${catAcc}%;"></div>
                </div>
                <div class="cat-stat-bottom">
                    <span>${stats.attempted > 0 ? stats.correct + " / " + stats.attempted + " correct" : "Not attempted yet"}</span>
                    <span>${stats.attempted} attempted</span>
                </div>
            `;
            categoryStatsContainer.appendChild(card);
        });
    }

    // 4. Render Recent Quiz Attempts (Latest 8)
    if (recentAttemptsContainer) {
        recentAttemptsContainer.innerHTML = "";

        if (history.length === 0) {
            recentAttemptsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎯</div>
                    <h4>No Practice Sessions Yet</h4>
                    <p>Complete your first quiz to start tracking your accuracy and exam readiness.</p>
                    <button class="action-btn primary-btn" onclick="switchScreen('practice')">
                        <span>🚀 Start First Quiz</span>
                    </button>
                </div>
            `;
        } else {
            // Show latest 8 attempts
            const recentSlice = history.slice(0, 8);
            recentSlice.forEach(attempt => {
                const diffCapitalized = attempt.difficulty 
                    ? attempt.difficulty.charAt(0).toUpperCase() + attempt.difficulty.slice(1) 
                    : "Easy";

                const catNote = (attempt.category && attempt.category !== "all" && attempt.category !== "All Categories")
                    ? ` • 📌 ${attempt.category}`
                    : "";

                let pillColor = "green";
                if (attempt.percentage < 40) {
                    pillColor = "red";
                } else if (attempt.percentage < 70) {
                    pillColor = "amber";
                }

                const row = document.createElement("div");
                row.className = "attempt-row";
                row.innerHTML = `
                    <div class="attempt-left">
                        <span class="diff-badge ${attempt.difficulty}">${diffCapitalized}</span>
                        <div class="attempt-meta">
                            <span class="attempt-date">${attempt.dateTime}</span>
                            <span class="attempt-time-note">${attempt.isTimeout ? "⚠️ Timed Out" : "✅ Completed"} • ${attempt.totalQuestions} Questions${catNote}</span>
                        </div>
                    </div>
                    <div class="attempt-right">
                        <span class="attempt-score-text">Score: <strong>${attempt.correctAnswers} / ${attempt.totalQuestions}</strong></span>
                        <span class="attempt-pill ${pillColor}">${attempt.percentage}%</span>
                    </div>
                `;
                recentAttemptsContainer.appendChild(row);
            });
        }
    }
}


// =============================================================================
// 6B. RESULTS PERFORMANCE HUB ENGINE (STREAK, LEADERBOARD, POINTS, RECENT)
// =============================================================================

/**
 * Feature 2: Real Cloud Leaderboard Statistics Engine
 * Computes cumulative user statistics (points, completed quizzes, accuracy)
 * directly from real quiz attempt records without mock or fake players.
 * @param {Array} history - Array of quiz attempt records
 * @returns {Object} { totalPoints, quizzesCompleted, totalQuestionsAttempted, totalCorrectAnswers, accuracy }
 */
function computeUserStatsFromHistory(history) {
    const list = Array.isArray(history) ? history : [];
    if (list.length === 0) {
        return {
            totalPoints: 0,
            quizzesCompleted: 0,
            totalQuestionsAttempted: 0,
            totalCorrectAnswers: 0,
            accuracy: 0
        };
    }

    let totalQuestionsAttempted = 0;
    let totalCorrectAnswers = 0;
    let totalPoints = 0;

    list.forEach(attempt => {
        totalQuestionsAttempted += (attempt.totalQuestions || 0);
        totalCorrectAnswers += (attempt.correctAnswers !== undefined ? attempt.correctAnswers : (attempt.score || 0));
        totalPoints += getPointsForAttempt(attempt);
    });

    const accuracy = totalQuestionsAttempted > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100)
        : 0;

    return {
        totalPoints,
        quizzesCompleted: list.length,
        totalQuestionsAttempted,
        totalCorrectAnswers,
        accuracy
    };
}

/**
 * Feature 3: Points System
 * Calculates points for a single quiz attempt:
 * - Easy Question: 10 points
 * - Medium Question: 20 points
 * - Hard Question: 30 points
 * - PYQ Question: 15 points
 * - Completed Quiz Bonus: +20 points
 * 
 * @param {string} difficulty - "easy", "medium", "hard", or "pyq"
 * @param {number} correctAnswers - Count of correctly answered questions
 * @param {boolean} isCompleted - Whether quiz was completed (+20 pts bonus)
 * @returns {number} Points earned for this attempt
 */
function calculateAttemptPoints(difficulty, correctAnswers, isCompleted = true) {
    const diff = (difficulty || "easy").toLowerCase();
    let ptsPerCorrect = 10;
    if (diff === "medium") {
        ptsPerCorrect = 20;
    } else if (diff === "hard") {
        ptsPerCorrect = 30;
    } else if (diff.includes("pyq")) {
        ptsPerCorrect = 15;
    }
    const basePts = (correctAnswers || 0) * ptsPerCorrect;
    const bonusPts = isCompleted ? 20 : 0;
    return basePts + bonusPts;
}

/**
 * Retrieves the point value for an attempt, supporting both newly saved attempts
 * and legacy history records.
 * @param {Object} attempt
 * @returns {number} Points earned
 */
function getPointsForAttempt(attempt) {
    if (!attempt) return 0;
    if (typeof attempt.points === "number") {
        return attempt.points;
    }
    const correct = attempt.correctAnswers !== undefined ? attempt.correctAnswers : (attempt.score || 0);
    return calculateAttemptPoints(attempt.difficulty, correct, true);
}

/**
 * Computes the total user points accumulated across all quiz attempts.
 * @param {Array} history
 * @returns {number} Total points
 */
function calculateTotalUserPoints(history) {
    if (!history || !Array.isArray(history) || history.length === 0) return 0;
    return history.reduce((sum, att) => sum + getPointsForAttempt(att), 0);
}

/**
 * Feature 1: Returns an array of 7 day objects for the current calendar week (Monday to Sunday).
 * @returns {Array} Array of { dayName, date, dateString, isToday, isPast }
 */
function getCurrentWeekDays() {
    const today = new Date();
    const todayStr = getLocalDateString(today);
    // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
    const currentDayOfWeek = today.getDay();
    const distanceToMonday = (currentDayOfWeek === 0) ? 6 : (currentDayOfWeek - 1);

    const monday = new Date(today);
    monday.setDate(today.getDate() - distanceToMonday);

    const weekDays = [];
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dStr = getLocalDateString(d);
        const isToday = (dStr === todayStr);
        const isPast = (dStr < todayStr);
        weekDays.push({
            dayName: dayLabels[i],
            date: d,
            dateString: dStr,
            isToday: isToday,
            isPast: isPast
        });
    }
    return weekDays;
}

/**
 * Renders the Daily Streak section including the 7-day weekly activity tracker.
 * Reflects real quiz activity and Firestore streak data.
 * @param {Array} history
 * @param {number} streak
 * @param {Object} [streakData] - Optional verified Firestore streak object
 */
function renderDailyStreakSection(history, streak, streakData = null) {
    if (!dailyStreakCard) return;

    const streakDataToUse = streakData || window.currentUserStreak || getCachedFirestoreStreak();

    let displayStreak = streak;
    if (streakDataToUse && streakDataToUse.lastPracticeDate) {
        displayStreak = getActiveStreak(streakDataToUse);
    }

    if (streakDisplayCount) {
        streakDisplayCount.textContent = displayStreak;
    }

    // Milestone motivational messages
    if (streakQuoteText) {
        if (displayStreak === 0) {
            streakQuoteText.textContent = "Start your streak today! Complete a quiz to begin.";
        } else if (displayStreak <= 2) {
            streakQuoteText.textContent = "Good start! Keep practicing every day.";
        } else if (displayStreak <= 6) {
            streakQuoteText.textContent = "Great momentum! Consistency leads to PSC success.";
        } else {
            streakQuoteText.textContent = "Legendary discipline! You're on fire! 🔥";
        }
    }

    // Unique dates where user practiced (from history and/or Firestore streak)
    const uniqueDates = new Set((history || []).map(a => a.dateString).filter(Boolean));
    if (streakDataToUse) {
        if (Array.isArray(streakDataToUse.recentPracticeDates)) {
            streakDataToUse.recentPracticeDates.forEach(d => uniqueDates.add(d));
        }
        if (streakDataToUse.lastPracticeDate) {
            uniqueDates.add(streakDataToUse.lastPracticeDate);
        }
    }

    const todayStr = getLocalDateString(new Date());
    const practicedToday = (streakDataToUse && streakDataToUse.lastPracticeDate === todayStr) || uniqueDates.has(todayStr);

    if (streakTodayStatus) {
        if (practicedToday) {
            streakTodayStatus.textContent = "Today: Practiced ✅";
            streakTodayStatus.classList.add("active-today");
        } else {
            streakTodayStatus.textContent = "Today: Not yet practiced";
            streakTodayStatus.classList.remove("active-today");
        }
    }

    // Render 7 Day Boxes (Mon - Sun)
    if (streakWeekTracker) {
        streakWeekTracker.innerHTML = "";
        const weekDays = getCurrentWeekDays();

        weekDays.forEach(day => {
            const hasPracticed = uniqueDates.has(day.dateString);
            const box = document.createElement("div");
            let boxClass = "streak-day-box";

            if (hasPracticed) {
                boxClass += " completed";
            } else if (day.isPast) {
                boxClass += " missed";
            } else if (!day.isToday) {
                boxClass += " pending";
            }

            if (day.isToday) {
                boxClass += " today";
                if (hasPracticed) {
                    boxClass += " completed";
                }
            }

            box.className = boxClass;

            let iconHtml = "⚪";
            let subText = "Pending";

            if (hasPracticed) {
                iconHtml = "🔥";
                subText = "Done";
            } else if (day.isToday) {
                iconHtml = "⏳";
                subText = "Today";
            } else if (day.isPast) {
                iconHtml = "—";
                subText = "Missed";
            } else {
                iconHtml = "○";
                subText = "";
            }

            box.innerHTML = `
                <span class="streak-day-name">${day.dayName}</span>
                <span class="streak-day-icon">${iconHtml}</span>
                <span class="streak-day-sub">${subText}</span>
            `;

            streakWeekTracker.appendChild(box);
        });
    }
}

/**
 * Feature 2: Renders the Leaderboard table using real Firestore user data.
 * Displays rank, player avatar, name, quizzes completed, accuracy, and points.
 * Zero demo/mock competitors are used.
 * @param {Array} history - Local quiz attempt history
 * @param {number} userPoints - Local user points
 * @param {number} totalQuizzes - Local user quiz count
 * @param {number} userAccuracy - Local user accuracy
 * @param {Array|null} [customPlayers] - Optional array of player records from Firestore
 */
function renderLeaderboardSection(history, userPoints, totalQuizzes, userAccuracy, customPlayers = null) {
    if (!leaderboardBody) return;
    leaderboardBody.innerHTML = "";

    // Determine current user display details
    const currentUid = window.firebaseAuth?.currentUser?.uid || window.activeAuthUserId || null;
    const currentUserName = (typeof window.getStoredUserName === "function" ? window.getStoredUserName(currentUid) : null)
        || (window.firebaseAuth?.currentUser?.displayName)
        || (window.firebaseAuth?.currentUser?.email ? window.firebaseAuth.currentUser.email.split("@")[0] : null)
        || "You (Aspirant)";
    const currentUserAvatar = (typeof window.getStoredUserAvatar === "function" ? window.getStoredUserAvatar(currentUid) : null)
        || "👤";


    let playersToRender = [];

    if (Array.isArray(customPlayers) && customPlayers.length > 0) {
        // Use verified Firestore players
        playersToRender = [...customPlayers];

        // Ensure current user is tagged with isUser = true and has up-to-date local stats
        const userIdx = playersToRender.findIndex(p => p.isUser || (currentUid && p.uid === currentUid));
        if (userIdx >= 0) {
            playersToRender[userIdx].isUser = true;
            if (userPoints > (playersToRender[userIdx].points || 0)) {
                playersToRender[userIdx].points = userPoints;
                playersToRender[userIdx].quizzes = Math.max(playersToRender[userIdx].quizzes || 0, totalQuizzes);
                playersToRender[userIdx].accuracy = userAccuracy;
            }
        } else if (currentUid || totalQuizzes > 0 || userPoints > 0) {
            // Current user not yet in collection query snapshot: add them
            playersToRender.push({
                uid: currentUid,
                name: currentUserName,
                quizzes: totalQuizzes,
                accuracy: userAccuracy,
                points: userPoints,
                isUser: true,
                avatar: currentUserAvatar
            });
        }
    } else if (Array.isArray(window.cachedLeaderboard) && window.cachedLeaderboard.length > 0) {
        playersToRender = [...window.cachedLeaderboard];
    } else if (currentUid || totalQuizzes > 0 || userPoints > 0) {
        // Only current user exists so far
        playersToRender = [{
            uid: currentUid,
            name: currentUserName,
            quizzes: totalQuizzes,
            accuracy: userAccuracy,
            points: userPoints,
            isUser: true,
            avatar: currentUserAvatar
        }];
    }

    // Sort descending by points, tie-break by accuracy, then quizzes
    playersToRender.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return b.quizzes - a.quizzes;
    });

    if (playersToRender.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.className = "leaderboard-empty-row";
        emptyRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 28px 16px; color: var(--text-muted); font-size: 0.92rem;">
                No quiz rankings yet. Complete a quiz to claim the #1 spot! 🏆
            </td>
        `;
        leaderboardBody.appendChild(emptyRow);
        return;
    }

    playersToRender.forEach((player, index) => {
        const rank = index + 1;
        const tr = document.createElement("tr");
        tr.className = "leaderboard-row" + (player.isUser ? " user-row" : "");

        let rankBadge = "";
        if (rank === 1) {
            rankBadge = `<span class="rank-badge-medal" title="Rank 1">🥇</span>`;
        } else if (rank === 2) {
            rankBadge = `<span class="rank-badge-medal" title="Rank 2">🥈</span>`;
        } else if (rank === 3) {
            rankBadge = `<span class="rank-badge-medal" title="Rank 3">🥉</span>`;
        } else {
            rankBadge = `<span class="rank-badge-number">#${rank}</span>`;
        }

        const youBadge = player.isUser ? `<span class="player-you-pill">YOU</span>` : "";

        tr.innerHTML = `
            <td class="td-rank">${rankBadge}</td>
            <td class="td-player">
                <div class="leaderboard-player-wrap">
                    <div class="player-avatar-icon">${player.avatar || "👤"}</div>
                    <span class="player-name-text">
                        ${player.name || "Aspirant"}
                        ${youBadge}
                    </span>
                </div>
            </td>
            <td class="td-quizzes">${player.quizzes || 0}</td>
            <td class="td-acc">${player.accuracy !== undefined ? player.accuracy : 0}%</td>
            <td class="td-points">
                <span class="leaderboard-pts-pill">${(player.points || 0).toLocaleString()} pts</span>
            </td>
        `;

        leaderboardBody.appendChild(tr);
    });
}

/**
 * Feature 5: Renders the recent practice activity feed on the Results page.
 * @param {Array} history
 */
function renderResultsRecentActivity(history) {
    if (!resultsRecentContainer) return;
    resultsRecentContainer.innerHTML = "";

    if (!history || history.length === 0) {
        resultsRecentContainer.innerHTML = `
            <div class="results-empty-card">
                <span class="results-empty-icon">📝</span>
                <h4 class="results-empty-title">No Quiz Attempts Yet</h4>
                <p class="results-empty-desc">
                    Complete your first practice quiz or Kerala PSC PYQ paper to see your detailed performance history, score breakdown, and points!
                </p>
                <button class="action-btn primary-btn" id="res-empty-start-btn" type="button">
                    <span>🚀 Start Practice Quiz</span>
                </button>
            </div>
        `;
        const startBtn = document.getElementById("res-empty-start-btn");
        if (startBtn) {
            startBtn.addEventListener("click", () => switchScreen("practice"));
        }
        return;
    }

    // Display the up to 8 most recent quiz attempts
    const recentAttempts = history.slice(0, 8);
    recentAttempts.forEach(att => {
        const card = document.createElement("div");
        card.className = "results-attempt-card";

        const diff = (att.difficulty || "easy").toLowerCase();
        let diffClass = "easy";
        let diffLabel = "Easy";
        if (diff === "medium") {
            diffClass = "medium";
            diffLabel = "Medium";
        } else if (diff === "hard") {
            diffClass = "hard";
            diffLabel = "Hard";
        } else if (diff.includes("pyq")) {
            diffClass = "easy";
            diffLabel = "PYQ";
        }

        const pts = getPointsForAttempt(att);
        const correct = att.correctAnswers !== undefined ? att.correctAnswers : (att.score || 0);
        const total = att.totalQuestions || 10;
        const pct = att.percentage !== undefined ? att.percentage : Math.round((correct / total) * 100);

        let pctColor = "var(--text-main)";
        if (pct >= 80) pctColor = "var(--easy-color)";
        else if (pct >= 50) pctColor = "var(--medium-color)";
        else pctColor = "var(--hard-color)";

        card.innerHTML = `
            <div class="results-attempt-left">
                <span class="diff-badge ${diffClass}">${diffLabel}</span>
                <div class="results-attempt-meta">
                    <span class="results-attempt-title">${att.category || "General Knowledge"}</span>
                    <span class="results-attempt-time">📅 ${att.dateTime || "Recent"}</span>
                </div>
            </div>
            <div class="results-attempt-right">
                <span class="results-attempt-score">${correct} / ${total} Correct</span>
                <span class="results-attempt-pct" style="color: ${pctColor}">${pct}%</span>
                <span class="results-attempt-pts-badge">+${pts} pts</span>
            </div>
        `;

        resultsRecentContainer.appendChild(card);
    });
}

/**
 * Main orchestrator for rendering the Results Performance Hub.
 * @param {boolean} isFreshQuizCompletion - True if invoked immediately after completing a quiz
 */
function renderResultsPage(isFreshQuizCompletion = false) {
    const history = loadQuizHistory();

    // 1. Manage Latest Quiz Completion Card visibility
    if (latestQuizCompletion) {
        if (isFreshQuizCompletion || lastCompletedResult) {
            latestQuizCompletion.classList.remove("hidden");
        } else {
            latestQuizCompletion.classList.add("hidden");
        }
    }

    // 2. Compute Aggregates
    const totalQuizzes = history.length;
    let totalQuestionsAttempted = 0;
    let totalCorrectAnswers = 0;

    history.forEach(attempt => {
        totalQuestionsAttempted += (attempt.totalQuestions || 0);
        totalCorrectAnswers += (attempt.correctAnswers !== undefined ? attempt.correctAnswers : (attempt.score || 0));
    });

    const userAccuracy = totalQuestionsAttempted > 0 
        ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100) 
        : 0;

    const userPoints = calculateTotalUserPoints(history);

    // Daily Streak: Prioritize verified Firestore streak for logged-in user, fallback to local history
    const firestoreStreakData = window.currentUserStreak || getCachedFirestoreStreak();
    let streak = 0;
    if (firestoreStreakData && firestoreStreakData.lastPracticeDate) {
        streak = getActiveStreak(firestoreStreakData);
    } else {
        streak = calculatePracticeStreak(history);
    }

    // 3. Update Feature 4: Results Summary Cards
    if (resTotalQuizzes) resTotalQuizzes.textContent = totalQuizzes;
    if (resAccuracy) resAccuracy.textContent = `${userAccuracy}%`;
    if (resTotalPoints) resTotalPoints.textContent = `${userPoints.toLocaleString()} pts`;
    if (resStreak) resStreak.textContent = `${streak} ${streak === 1 ? "Day" : "Days"}`;

    // 4. Render Feature 1: Daily Streak Section
    renderDailyStreakSection(history, streak, firestoreStreakData);

    // 5. Render Feature 2: Leaderboard Section
    renderLeaderboardSection(history, userPoints, totalQuizzes, userAccuracy, window.cachedLeaderboard || null);

    // Fetch live leaderboard from Firestore in background
    if (typeof window.fetchLeaderboardFromFirestore === "function") {
        window.fetchLeaderboardFromFirestore().then(players => {
            if (players && players.length > 0) {
                window.cachedLeaderboard = players;
                renderLeaderboardSection(history, userPoints, totalQuizzes, userAccuracy, players);
            }
        }).catch(err => {
            console.warn("Notice updating leaderboard in Results:", err);
        });
    }

    // 6. Render Feature 5: Recent Activity Feed
    renderResultsRecentActivity(history);

    // 7. Background sync from Cloud Firestore if available and not freshly completed
    if (!isFreshQuizCompletion && typeof window.fetchQuizHistoryFromFirestore === "function") {
        window.fetchQuizHistoryFromFirestore().then(cloudHistory => {
            if (Array.isArray(cloudHistory)) {
                const key = getQuizStorageKey();
                const currentLocal = loadQuizHistory();
                if (cloudHistory.length !== currentLocal.length || (cloudHistory[0]?.id && cloudHistory[0].id !== currentLocal[0]?.id)) {
                    localStorage.setItem(key, JSON.stringify(cloudHistory));
                    const refreshedTotal = cloudHistory.length;
                    let refreshedAttempted = 0;
                    let refreshedCorrect = 0;
                    cloudHistory.forEach(att => {
                        refreshedAttempted += (att.totalQuestions || 0);
                        refreshedCorrect += (att.correctAnswers !== undefined ? att.correctAnswers : (att.score || 0));
                    });
                    const refreshedAcc = refreshedAttempted > 0 ? Math.round((refreshedCorrect / refreshedAttempted) * 100) : 0;
                    const refreshedPts = calculateTotalUserPoints(cloudHistory);
                    const currentFirestoreStreak = window.currentUserStreak || getCachedFirestoreStreak();
                    const refreshedStreak = (currentFirestoreStreak && currentFirestoreStreak.lastPracticeDate)
                        ? getActiveStreak(currentFirestoreStreak)
                        : calculatePracticeStreak(cloudHistory);

                    if (resTotalQuizzes) resTotalQuizzes.textContent = refreshedTotal;
                    if (resAccuracy) resAccuracy.textContent = `${refreshedAcc}%`;
                    if (resTotalPoints) resTotalPoints.textContent = `${refreshedPts.toLocaleString()} pts`;
                    if (resStreak) resStreak.textContent = `${refreshedStreak} ${refreshedStreak === 1 ? "Day" : "Days"}`;

                    renderDailyStreakSection(cloudHistory, refreshedStreak, currentFirestoreStreak);
                    renderLeaderboardSection(cloudHistory, refreshedPts, refreshedTotal, refreshedAcc, window.cachedLeaderboard || null);
                    renderResultsRecentActivity(cloudHistory);
                }
            }
        }).catch(err => {
            console.warn("Notice reading Firestore history in Results:", err);
        });
    }
}


// =============================================================================
// 7. TIMER CONTROLS
// =============================================================================

/**
 * Starts or restarts the countdown timer for the calculated duration.
 * Automatically ticks every second, updates the display, applies warning/danger classes,
 * and auto-submits when reaching zero.
 * @param {number} durationSeconds - Total quiz duration in seconds
 */
function startTimer(durationSeconds) {
    stopTimer();

    totalQuizDuration = durationSeconds;
    timeRemaining = durationSeconds;
    
    timerBadge.className = "timer-badge";
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 60 && timeRemaining > 15) {
            timerBadge.classList.add("warning");
            timerBadge.classList.remove("danger");
        } else if (timeRemaining <= 15 && timeRemaining > 0) {
            timerBadge.classList.add("danger");
            timerBadge.classList.remove("warning");
        } else if (timeRemaining > 60) {
            timerBadge.classList.remove("warning", "danger");
        }

        if (timeRemaining <= 0) {
            stopTimer();
            handleTimeOut();
        }
    }, 1000);
}

/**
 * Stops/pauses the active countdown timer.
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
window.stopTimer = stopTimer;

/**
 * Updates the timer text and visual badge classes.
 */
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(Math.max(0, timeRemaining));
    
    if (timeRemaining > 60) {
        timerBadge.className = "timer-badge";
    }
}

/**
 * Triggered when the timer runs out. Automatically locks options and shows final results.
 */
function handleTimeOut() {
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => btn.disabled = true);
    showResults(true);
}


// =============================================================================
// 7.5 LIGHT / DARK THEME ENGINE
// =============================================================================
const THEME_STORAGE_KEY = "psc_quiz_theme_preference";

/**
 * Initializes the theme based on localStorage preference or system color scheme.
 */
function initTheme() {
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!savedTheme) {
        savedTheme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "dark"
            : "light";
    }
    applyTheme(savedTheme);
}

/**
 * Applies the given theme to document root and updates button state.
 * @param {string} theme - "light" or "dark"
 */
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const authIcon = document.getElementById("auth-theme-toggle-icon");
    const authText = document.getElementById("auth-theme-toggle-text");
    const authBtn = document.getElementById("auth-theme-toggle-btn");

    if (theme === "dark") {
        if (themeToggleIcon) themeToggleIcon.textContent = "☀️";
        if (themeToggleText) themeToggleText.textContent = "Light Mode";
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute("title", "Switch to Light Mode");
            themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
        }
        if (authIcon) authIcon.textContent = "☀️";
        if (authText) authText.textContent = "Light Mode";
        if (authBtn) {
            authBtn.setAttribute("title", "Switch to Light Mode");
            authBtn.setAttribute("aria-label", "Switch to Light Mode");
        }
    } else {
        if (themeToggleIcon) themeToggleIcon.textContent = "🌙";
        if (themeToggleText) themeToggleText.textContent = "Dark Mode";
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
            themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
        }
        if (authIcon) authIcon.textContent = "🌙";
        if (authText) authText.textContent = "Dark Mode";
        if (authBtn) {
            authBtn.setAttribute("title", "Switch to Dark Mode");
            authBtn.setAttribute("aria-label", "Switch to Dark Mode");
        }
    }
}

/**
 * Toggles between Light and Dark mode, saving the new preference to localStorage.
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
}

// Expose globally
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;


// =============================================================================
// 8. SCREEN & NAVIGATION CONTROLS
// =============================================================================

/**
 * Switches the active screen view and synchronizes the navigation bar.
 * If a quiz is actively running, prompts the user before abandoning the session.
 * @param {string} screenName - "dashboard", "practice", "quiz", "result", "mock-tests", "categories", or "category-detail"
 */
function switchScreen(screenName) {
    // If a timed quiz is in progress and user tries to navigate away, confirm first
    if (timerInterval !== null && screenName !== "quiz") {
        const leave = confirm("A practice quiz is currently in progress. Leaving now will end the quiz session. Are you sure you want to leave?");
        if (!leave) {
            return;
        }
        stopTimer();
        timerBadge.className = "timer-badge";
    }

    // Hide all screens
    const allScreens = [dashboardScreen, homeScreen, quizScreen, resultScreen, pyqBankScreen, mockTestsScreen, categoriesScreen, categoryDetailScreen];
    allScreens.forEach(screen => {
        if (screen) {
            screen.classList.add("hidden");
            screen.classList.remove("active");
        }
    });

    // Update navigation button active state
    navButtons.forEach(btn => {
        const target = btn.getAttribute("data-target");
        const isMatch = (target === screenName) ||
                        (target === "results" && screenName === "result") ||
                        (target === "result" && screenName === "results") ||
                        (target === "practice" && screenName === "home") ||
                        (target === "categories" && screenName === "category-detail") ||
                        ((target === "pyq-bank" || target === "mock-tests") && (screenName === "pyq-bank" || screenName === "mock-tests"));
        if (isMatch) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Display selected screen
    if (screenName === "dashboard") {
        dashboardScreen.classList.remove("hidden");
        dashboardScreen.classList.add("active");
        renderDashboard();
    } else if (screenName === "practice" || screenName === "home") {
        homeScreen.classList.remove("hidden");
        homeScreen.classList.add("active");
    } else if (screenName === "quiz") {
        quizScreen.classList.remove("hidden");
        quizScreen.classList.add("active");
    } else if (screenName === "result" || screenName === "results") {
        resultScreen.classList.remove("hidden");
        resultScreen.classList.add("active");
        renderResultsPage(false);
    } else if (screenName === "pyq-bank" || screenName === "mock-tests") {
        if (pyqBankScreen) {
            pyqBankScreen.classList.remove("hidden");
            pyqBankScreen.classList.add("active");
            // If all subviews are hidden, default to category selection
            if (pyqCategoriesView && pyqYearsView && pyqPracticeView && pyqResultView) {
                if (pyqCategoriesView.classList.contains("hidden") &&
                    pyqYearsView.classList.contains("hidden") &&
                    pyqPracticeView.classList.contains("hidden") &&
                    pyqResultView.classList.contains("hidden")) {
                    showPYQSubView("categories");
                }
            }
        }
    } else if (screenName === "categories") {
        categoriesScreen.classList.remove("hidden");
        categoriesScreen.classList.add("active");
        updateCategoryCardsCounts();
    } else if (screenName === "category-detail") {
        if (categoryDetailScreen) {
            categoryDetailScreen.classList.remove("hidden");
            categoryDetailScreen.classList.add("active");
        }
    }
}


// =============================================================================
// 8.5 CATEGORY DRILL SELECTION LOGIC
// =============================================================================

/**
 * Updates the question count chips on all category cards in the Categories overview screen.
 */
function updateCategoryCardsCounts() {
    categoryCards.forEach(card => {
        const catName = card.getAttribute("data-category");
        if (!catName) return;
        const count = typeof getQuestionsByFilter === "function"
            ? getQuestionsByFilter({ category: catName, difficulty: "all" }).length
            : 0;
        const countEl = card.querySelector(`[data-cat-count="${catName}"]`);
        if (countEl) {
            countEl.textContent = `${count} Questions • 3 Levels`;
        }
    });
}

/**
 * Opens the dedicated Category Detail screen for a selected subject.
 * Populates subject metadata, calculates difficulty counts, and sets default difficulty.
 * @param {string} categoryName - e.g. "Sports", "Kerala GK"
 */
function openCategoryDetail(categoryName) {
    currentCategory = categoryName;
    const meta = typeof getCategoryMetadata === "function" 
        ? getCategoryMetadata(categoryName) 
        : { icon: "📌", name: categoryName, description: `Practice ${categoryName} questions.`, subtitle: "Kerala PSC Syllabus Drill" };

    if (catDetailIcon) catDetailIcon.textContent = meta.icon || "📌";
    if (catDetailTitle) catDetailTitle.textContent = meta.name || categoryName;
    if (catDetailDesc) catDetailDesc.textContent = meta.description || `Targeted practice questions on ${categoryName}.`;
    if (catDetailSubtitle) catDetailSubtitle.textContent = meta.subtitle || "Kerala PSC Syllabus Subject Drill";

    // Count available questions for each difficulty in this category
    const easyCount = typeof getQuestionsByFilter === "function"
        ? getQuestionsByFilter({ category: categoryName, difficulty: "easy" }).length
        : 0;
    const mediumCount = typeof getQuestionsByFilter === "function"
        ? getQuestionsByFilter({ category: categoryName, difficulty: "medium" }).length
        : 0;
    const hardCount = typeof getQuestionsByFilter === "function"
        ? getQuestionsByFilter({ category: categoryName, difficulty: "hard" }).length
        : 0;

    if (catEasyCount) catEasyCount.textContent = `${easyCount} ${easyCount === 1 ? "Question" : "Questions"} • Beginner`;
    if (catMediumCount) catMediumCount.textContent = `${mediumCount} ${mediumCount === 1 ? "Question" : "Questions"} • Intermediate`;
    if (catHardCount) catHardCount.textContent = `${hardCount} ${hardCount === 1 ? "Question" : "Questions"} • Advanced`;

    // Default to Easy difficulty
    selectCategoryDifficulty("easy");

    switchScreen("category-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Updates the selected difficulty level on the Category Detail screen.
 * @param {string} difficulty - "easy", "medium", or "hard"
 */
function selectCategoryDifficulty(difficulty) {
    selectedCategoryDifficulty = difficulty;
    catDiffCards.forEach(card => {
        const cardDiff = card.getAttribute("data-difficulty");
        if (cardDiff === difficulty) {
            card.classList.add("active");
            card.setAttribute("aria-pressed", "true");
        } else {
            card.classList.remove("active");
            card.setAttribute("aria-pressed", "false");
        }
    });
}


// =============================================================================
// 8.8 KERALA PSC PREVIOUS YEAR QUESTION BANK CONTROLLER
// =============================================================================

// PYQ Active State
let currentPYQExamId = "ldc";
let currentPYQYear = "2024";
let currentPYQPaper = null;
let currentPYQQuestions = [];
let currentPYQIndex = 0;
let userPYQAnswers = {}; // Mapping: { [questionIndex]: selectedOptionIndex }

/**
 * Toggles visibility among the PYQ Bank subviews (categories, years, practice, result).
 * @param {string} subviewName - "categories", "years", "practice", or "result"
 */
function showPYQSubView(subviewName) {
    const subviews = [pyqCategoriesView, pyqYearsView, pyqPracticeView, pyqResultView];
    subviews.forEach(view => {
        if (view) {
            view.classList.add("hidden");
            view.classList.remove("active");
        }
    });

    if (subviewName === "categories" && pyqCategoriesView) {
        pyqCategoriesView.classList.remove("hidden");
        pyqCategoriesView.classList.add("active");
    } else if (subviewName === "years" && pyqYearsView) {
        pyqYearsView.classList.remove("hidden");
        pyqYearsView.classList.add("active");
    } else if (subviewName === "practice" && pyqPracticeView) {
        pyqPracticeView.classList.remove("hidden");
        pyqPracticeView.classList.add("active");
    } else if (subviewName === "result" && pyqResultView) {
        pyqResultView.classList.remove("hidden");
        pyqResultView.classList.add("active");
    }
}

/**
 * Opens the main PYQ Bank category selection view.
 */
function openPYQBank() {
    showPYQSubView("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Opens the Year Selection screen for a specified exam category.
 * Renders all years (2025 to 2018) with accurate availability tags.
 * @param {string} examId - e.g. "ldc", "degree", "tenth", "plustwo", "lpup", "other"
 */
function openPYQExamYears(examId) {
    currentPYQExamId = examId;
    const exam = typeof getPYQExamData === "function" ? getPYQExamData(examId) : null;
    if (!exam) return;

    if (pyqSelectedExamTitle) {
        pyqSelectedExamTitle.textContent = `${exam.title} Previous Year Questions`;
    }

    if (pyqYearsGrid) {
        pyqYearsGrid.innerHTML = "";
        const allYears = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
        
        allYears.forEach(yr => {
            const paper = exam.years ? exam.years[yr] : null;
            const isAvailable = Boolean(paper && paper.available && paper.questions && paper.questions.length > 0);
            
            const card = document.createElement("div");
            card.className = `pyq-year-card ${isAvailable ? "" : "disabled"}`;
            card.setAttribute("tabindex", isAvailable ? "0" : "-1");
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `${exam.title} ${yr} Examination Paper`);

            card.innerHTML = `
                <span class="pyq-year-num">${yr}</span>
                <span class="pyq-year-code">${paper ? paper.title : `${exam.title} ${yr} Paper`}</span>
                <span class="pyq-year-status ${isAvailable ? "status-available" : "status-soon"}">
                    ${isAvailable ? "📝 Available (Sample PYQ)" : "⏳ Coming Soon"}
                </span>
            `;

            if (isAvailable) {
                card.addEventListener("click", () => startPYQPractice(examId, yr));
                card.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        startPYQPractice(examId, yr);
                    }
                });
            } else {
                card.addEventListener("click", () => {
                    alert(`Official verified Kerala PSC paper for ${exam.title} (${yr}) is currently being curated. Please practice available years (2024, 2023, 2022).`);
                });
            }

            pyqYearsGrid.appendChild(card);
        });
    }

    showPYQSubView("years");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Starts a PYQ practice session with previous/next navigation and answer review.
 * @param {string} examId - Exam identifier
 * @param {string} year - Examination year
 */
function startPYQPractice(examId, year) {
    currentPYQExamId = examId;
    currentPYQYear = year;
    const paper = typeof getPYQPaper === "function" ? getPYQPaper(examId, year) : null;
    
    if (!paper || !paper.questions || paper.questions.length === 0) {
        alert("No verified questions available for this year yet.");
        return;
    }

    currentPYQPaper = paper;
    currentPYQQuestions = [...paper.questions];
    currentPYQIndex = 0;
    userPYQAnswers = {}; // Reset user answers

    const exam = typeof getPYQExamData === "function" ? getPYQExamData(examId) : { title: examId.toUpperCase() };

    if (pyqExamBadge) pyqExamBadge.textContent = `${exam.title} ${year}`;
    if (pyqPaperCode) pyqPaperCode.textContent = paper.paperCode || `${exam.title} Paper`;

    showPYQSubView("practice");
    renderPYQQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Renders the active question in the PYQ Practice view.
 */
function renderPYQQuestion() {
    if (!currentPYQQuestions || currentPYQQuestions.length === 0) return;
    const q = currentPYQQuestions[currentPYQIndex];
    const total = currentPYQQuestions.length;

    // Update Question Counter
    if (pyqQuestionCounter) {
        pyqQuestionCounter.textContent = `Question ${currentPYQIndex + 1} of ${total}`;
    }

    // Update Answered Indicator
    const answeredCount = Object.keys(userPYQAnswers).length;
    if (pyqAnsweredIndicator) {
        pyqAnsweredIndicator.innerHTML = `Answered: <strong>${answeredCount} / ${total}</strong>`;
    }

    // Update Progress Bar
    if (pyqProgressBar) {
        const progressPercent = ((currentPYQIndex + 1) / total) * 100;
        pyqProgressBar.style.width = `${progressPercent}%`;
    }

    // Update Question Text
    if (pyqQuestionText) {
        pyqQuestionText.textContent = q.question;
    }

    // Render Options
    if (pyqOptionsContainer) {
        pyqOptionsContainer.innerHTML = "";
        const prefixes = ["A", "B", "C", "D"];
        const selectedOpt = userPYQAnswers[currentPYQIndex];

        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `option-btn pyq-option-btn ${selectedOpt === optIdx ? "selected" : ""}`;
            btn.innerHTML = `
                <span class="option-prefix">${prefixes[optIdx]}</span>
                <span class="option-label">${optText}</span>
            `;

            btn.addEventListener("click", () => selectPYQAnswer(optIdx));
            pyqOptionsContainer.appendChild(btn);
        });
    }

    // Previous & Next Button States
    if (pyqPrevBtn) {
        pyqPrevBtn.disabled = (currentPYQIndex === 0);
    }
    if (pyqNextBtn) {
        pyqNextBtn.disabled = (currentPYQIndex === total - 1);
    }
}

/**
 * Records the user's answer for the active PYQ question without premature locking.
 * Allows the user to navigate back and change answers before submission.
 * @param {number} optionIndex - Chosen option index (0 to 3)
 */
function selectPYQAnswer(optionIndex) {
    userPYQAnswers[currentPYQIndex] = optionIndex;
    renderPYQQuestion();
}

/**
 * Navigates to previous PYQ question.
 */
function prevPYQQuestion() {
    if (currentPYQIndex > 0) {
        currentPYQIndex--;
        renderPYQQuestion();
    }
}

/**
 * Navigates to next PYQ question.
 */
function nextPYQQuestion() {
    if (currentPYQIndex < currentPYQQuestions.length - 1) {
        currentPYQIndex++;
        renderPYQQuestion();
    }
}

/**
 * Submits the PYQ paper, computes the final score, and renders the detailed explanation review.
 */
function submitPYQPractice() {
    const total = currentPYQQuestions.length;
    const answeredCount = Object.keys(userPYQAnswers).length;

    if (answeredCount < total) {
        const proceed = confirm(`You have answered ${answeredCount} of ${total} questions. Do you want to submit the paper now?`);
        if (!proceed) return;
    }

    let correct = 0;
    currentPYQQuestions.forEach((q, idx) => {
        if (userPYQAnswers[idx] === q.correctAnswer) {
            correct++;
        }
    });

    const percentage = Math.round((correct / total) * 100);
    const exam = typeof getPYQExamData === "function" ? getPYQExamData(currentPYQExamId) : null;
    const examTitle = exam ? exam.title : currentPYQExamId.toUpperCase();

    const pyqEarnedPoints = calculateAttemptPoints("pyq", correct, true);

    // Populate Results
    if (pyqFinalPercentage) pyqFinalPercentage.textContent = `${percentage}%`;
    if (pyqResultExam) pyqResultExam.textContent = `${examTitle} ${currentPYQYear}`;
    if (pyqResultTotal) pyqResultTotal.textContent = total;
    if (pyqResultCorrect) pyqResultCorrect.textContent = `${correct} / ${total}`;
    if (pyqFinalScore) pyqFinalScore.textContent = `${pyqEarnedPoints} pts`;

    // Persist PYQ attempt to history for streaks, points, leaderboard, and recent activity
    const now = new Date();
    const dateStr = getLocalDateString(now);
    const dateTimeStr = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }) + ", " + now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const pyqAttemptRecord = {
        id: "att_pyq_" + Date.now(),
        timestamp: now.getTime(),
        dateTime: dateTimeStr,
        dateString: dateStr,
        difficulty: "pyq",
        category: `PYQ: ${examTitle} ${currentPYQYear}`,
        examId: currentPYQExamId,
        examTitle: examTitle,
        year: currentPYQYear,
        totalQuestions: total,
        questionsAnswered: answeredCount,
        correctAnswers: correct,
        score: correct,
        points: pyqEarnedPoints,
        percentage: percentage,
        isTimeout: false,
        categoryBreakdown: {
            "Kerala PSC PYQ": { attempted: answeredCount, correct: correct }
        }
    };
    saveQuizAttempt(pyqAttemptRecord);
    lastCompletedResult = pyqAttemptRecord;

    if (pyqResultTrophy && pyqResultMessage) {
        if (percentage === 100) {
            pyqResultTrophy.textContent = "👑";
            pyqResultMessage.textContent = "Flawless 100%! Outstanding mastery of previous year PSC questions!";
        } else if (percentage >= 80) {
            pyqResultTrophy.textContent = "🏆";
            pyqResultMessage.textContent = "Excellent score! High readiness for Kerala PSC exams!";
        } else if (percentage >= 50) {
            pyqResultTrophy.textContent = "🌟";
            pyqResultMessage.textContent = "Good attempt! Review the detailed solutions below to master every question.";
        } else {
            pyqResultTrophy.textContent = "💡";
            pyqResultMessage.textContent = "Keep practicing! Study the explanations below to strengthen your fundamentals.";
        }
    }

    // Render Question-by-Question Review with Explanations
    if (pyqReviewContainer) {
        pyqReviewContainer.innerHTML = "";
        const prefixes = ["A", "B", "C", "D"];

        currentPYQQuestions.forEach((q, idx) => {
            const userChoice = userPYQAnswers[idx];
            const isCorrect = userChoice === q.correctAnswer;
            const isSkipped = typeof userChoice === "undefined";

            const card = document.createElement("div");
            card.className = "pyq-review-card";

            let statusBadgeHtml = "";
            if (isCorrect) {
                statusBadgeHtml = `<span class="pyq-review-badge correct">✅ Correct (+10)</span>`;
            } else if (isSkipped) {
                statusBadgeHtml = `<span class="pyq-review-badge skipped">⚠️ Skipped</span>`;
            } else {
                statusBadgeHtml = `<span class="pyq-review-badge incorrect">❌ Incorrect</span>`;
            }

            let optionsHtml = "";
            q.options.forEach((optText, optIdx) => {
                let optClass = "pyq-review-opt";
                let mark = "";
                if (optIdx === q.correctAnswer) {
                    optClass += " is-correct";
                    mark = "<span>(Correct Answer ✅)</span>";
                } else if (optIdx === userChoice && !isCorrect) {
                    optClass += " user-wrong";
                    mark = "<span>(Your Choice ❌)</span>";
                }

                optionsHtml += `
                    <div class="${optClass}">
                        <span><strong>${prefixes[optIdx]}.</strong> ${optText}</span>
                        ${mark}
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="pyq-review-top">
                    <span class="pyq-review-qnum">Question ${idx + 1}</span>
                    ${statusBadgeHtml}
                </div>
                <h4 class="pyq-review-question">${q.question}</h4>
                <div class="pyq-review-options-list">
                    ${optionsHtml}
                </div>
                <div class="pyq-explanation-box">
                    <strong>💡 Explanation:</strong>
                    ${q.explanation || "Official Kerala PSC answer key explanation."}
                </div>
            `;

            pyqReviewContainer.appendChild(card);
        });
    }

    showPYQSubView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Restarts the active PYQ practice session with the same paper.
 */
function restartPYQPractice() {
    startPYQPractice(currentPYQExamId, currentPYQYear);
}

/**
 * Navigates back to the Year Selection screen from PYQ Results.
 */
function backToPYQYears() {
    openPYQExamYears(currentPYQExamId);
}

/**
 * Navigates back to the Exam Category Selection screen from PYQ Results.
 */
function backToPYQCategories() {
    openPYQBank();
}


// =============================================================================
// 9. CORE QUIZ LOGIC
// =============================================================================

/**
 * Starts a new quiz session with the selected difficulty and optional subject category filter.
 * @param {string} difficulty - "easy", "medium", or "hard"
 * @param {string} [category="all"] - Subject category (e.g. "Sports", "Kerala GK", or "all")
 */
function startQuiz(difficulty, category = "all") {
    currentDifficulty = difficulty;
    currentCategory = (!category || category === "all" || category === "All Categories") ? "All Categories" : category;
    
    // Retrieve questions matching category and difficulty
    let questionPool = [];
    if (typeof getQuestionsByFilter === "function") {
        questionPool = getQuestionsByFilter({ category: currentCategory, difficulty: currentDifficulty });
    } else {
        questionPool = quizData[difficulty] || [];
    }

    if (!questionPool || questionPool.length === 0) {
        alert(`No questions found for ${currentCategory === "All Categories" ? "" : currentCategory + " - "}${difficulty.toUpperCase()}!`);
        return;
    }

    // FEATURE 2: Randomly select questions from the pool without repetition
    const shuffledPool = shuffleArray(questionPool);
    currentQuestions = shuffledPool.slice(0, Math.min(QUESTIONS_PER_QUIZ, shuffledPool.length));

    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    sessionAnswers = [];    // Reset category tracker for this session
    hasSavedResult = false; // Fresh session ready to be saved upon completion

    // Update Difficulty Badge
    difficultyBadge.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    difficultyBadge.className = `badge ${difficulty}`;

    // Switch view to Quiz Screen
    switchScreen("quiz");

    // FEATURE 1: Dynamic 1-minute-per-question timer
    // Total time = number of questions * 60 seconds
    const totalQuizTime = currentQuestions.length * SECONDS_PER_QUESTION;
    startTimer(totalQuizTime);

    // Load first question
    loadQuestion();
}

/**
 * Loads and displays the current question, category, and shuffled options.
 */
function loadQuestion() {
    hasAnswered = false;
    const currentQ = currentQuestions[currentQuestionIndex];
    const totalQuestions = currentQuestions.length;

    // Update Top Bar Counters
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    scoreDisplay.innerHTML = `Score: <strong>${score}</strong>`;

    // Update Progress Bar
    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Display Category Tag
    questionCategory.textContent = currentQ.category ? `📌 ${currentQ.category}` : "📌 General Knowledge";

    // Display Question Text
    questionText.textContent = currentQ.question;

    // Clear Previous Options & Reset Feedback
    optionsContainer.innerHTML = "";
    feedbackBanner.className = "feedback-banner hidden";
    nextBtn.classList.add("hidden");
    nextBtn.disabled = true;

    // FEATURE 3: Randomize answer choices while tracking correct answer
    const optionItems = currentQ.options.map((optText, index) => ({
        text: optText,
        isCorrect: index === currentQ.correctAnswer
    }));
    
    currentShuffledOptions = shuffleArray(optionItems);

    const optionPrefixes = ["A", "B", "C", "D"];

    // Render option buttons
    currentShuffledOptions.forEach((optionObj, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.type = "button";

        button.innerHTML = `
            <span class="option-prefix">${optionPrefixes[index]}</span>
            <span class="option-label">${optionObj.text}</span>
        `;

        button.addEventListener("click", () => handleOptionSelect(index));
        optionsContainer.appendChild(button);
    });
}

/**
 * Handles answer selection by the user.
 * @param {number} selectedIndex - The index in the shuffled options array chosen by the user
 */
function handleOptionSelect(selectedIndex) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQ = currentQuestions[currentQuestionIndex];
    const selectedOption = currentShuffledOptions[selectedIndex];
    const isCorrect = selectedOption.isCorrect;
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Track attempt for subject-wise category statistics
    sessionAnswers.push({
        id: currentQ.id,
        category: currentQ.category || PSC_CATEGORIES.WORLD,
        isCorrect: isCorrect
    });

    // Disable all option buttons immediately to lock choices
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Highlight correct answer button in green
    currentShuffledOptions.forEach((opt, idx) => {
        if (opt.isCorrect) {
            optionButtons[idx].classList.add("correct");
        }
    });

    // Process user choice
    if (isCorrect) {
        score++;
        scoreDisplay.innerHTML = `Score: <strong>${score}</strong>`;
        
        feedbackBanner.className = "feedback-banner feedback-correct";
        feedbackIcon.textContent = "🎉";
        feedbackText.textContent = "Correct! Well done!";
    } else {
        optionButtons[selectedIndex].classList.add("incorrect");

        const correctOptObj = currentShuffledOptions.find(opt => opt.isCorrect);
        const correctText = correctOptObj ? correctOptObj.text : "";

        feedbackBanner.className = "feedback-banner feedback-incorrect";
        feedbackIcon.textContent = "❌";
        feedbackText.textContent = `Incorrect! Correct answer: ${correctText}`;
    }

    // Set Next button text
    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.innerHTML = `<span>See Final Results</span> <span class="arrow-icon">🏆</span>`;
    } else {
        nextBtn.innerHTML = `<span>Next Question</span> <span class="arrow-icon">➔</span>`;
    }

    nextBtn.disabled = false;
    nextBtn.classList.remove("hidden");
}

/**
 * Advances to the next question or finishes the quiz.
 */
function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        stopTimer();
        progressBar.style.width = "100%";
        showResults(false);
    }
}

/**
 * Displays the final results screen and saves the attempt to localStorage.
 * @param {boolean} isTimeout - Whether the quiz ended due to timer running out
 */
function showResults(isTimeout = false) {
    stopTimer();

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    // FEATURE 1: Save quiz history to localStorage (once per completed quiz)
    if (!hasSavedResult) {
        const now = new Date();
        const dateStr = getLocalDateString(now);
        const dateTimeStr = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }) + ", " + now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

        // Compile category breakdown for this quiz
        const categoryBreakdown = {};
        sessionAnswers.forEach(ans => {
            const cat = ans.category;
            if (!categoryBreakdown[cat]) {
                categoryBreakdown[cat] = { attempted: 0, correct: 0 };
            }
            categoryBreakdown[cat].attempted++;
            if (ans.isCorrect) {
                categoryBreakdown[cat].correct++;
            }
        });

        const attemptPoints = calculateAttemptPoints(currentDifficulty, score, true);

        const attemptRecord = {
            id: "att_" + Date.now(),
            timestamp: now.getTime(),
            dateTime: dateTimeStr,
            dateString: dateStr,
            difficulty: currentDifficulty,
            category: currentCategory,
            totalQuestions: total,
            questionsAnswered: sessionAnswers.length,
            correctAnswers: score,
            score: score,
            points: attemptPoints,
            percentage: percentage,
            isTimeout: isTimeout,
            categoryBreakdown: categoryBreakdown
        };

        saveQuizAttempt(attemptRecord);
        lastCompletedResult = attemptRecord;
        hasSavedResult = true;
    }

    // Show/hide timeout banner
    if (isTimeout) {
        timeoutBanner.classList.remove("hidden");
    } else {
        timeoutBanner.classList.add("hidden");
    }

    const earnedPoints = calculateAttemptPoints(currentDifficulty, score, true);

    // Update Result Score Card
    finalPercentage.textContent = `${percentage}%`;
    resultDifficulty.textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
    if (resultCategory) {
        resultCategory.textContent = (currentCategory && currentCategory !== "all" && currentCategory !== "All Categories") 
            ? currentCategory 
            : "General Knowledge";
    }
    correctCount.textContent = `${score} / ${total}`;
    finalScore.textContent = `${earnedPoints} pts`;

    // Personalized feedback messages and trophies
    if (percentage === 100) {
        resultTrophy.textContent = "👑";
        resultMessage.textContent = "Outstanding! Perfect 100% score - Top rank material!";
    } else if (percentage >= 80) {
        resultTrophy.textContent = "🏆";
        resultMessage.textContent = "Excellent performance! Strong PSC exam readiness!";
    } else if (percentage >= 50) {
        resultTrophy.textContent = "🌟";
        resultMessage.textContent = "Good attempt! Regular practice will improve your speed and score.";
    } else {
        resultTrophy.textContent = "💡";
        resultMessage.textContent = "Keep practicing! Review Kerala, Constitution, and GK topics regularly.";
    }

    // Render the Results Performance Hub and switch screen
    renderResultsPage(true);
    switchScreen("result");
}

/**
 * Restarts the quiz with the same difficulty level and category.
 */
function restartQuiz() {
    startQuiz(currentDifficulty, currentCategory);
}

/**
 * Returns to the practice selection screen and cleans up any active timer.
 */
function backToHome() {
    stopTimer();
    timerBadge.className = "timer-badge";
    switchScreen("practice");
}


// =============================================================================
// 10. EVENT LISTENERS
// =============================================================================

// Theme Switcher Toggle Button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}

// Navigation Bar buttons click listeners
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        switchScreen(target);
    });
});

// Dashboard CTA: Start Practice Quiz
if (dashStartPracticeBtn) {
    dashStartPracticeBtn.addEventListener("click", () => {
        switchScreen("practice");
    });
}

// Clear History Button
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearQuizHistory);
}

// Category Cards on Categories Overview screen
categoryCards.forEach(card => {
    const catName = card.getAttribute("data-category");
    if (!catName) return;
    card.addEventListener("click", () => openCategoryDetail(catName));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCategoryDetail(catName);
        }
    });
});

// Back to Categories button on Category Detail screen
if (catBackBtn) {
    catBackBtn.addEventListener("click", () => switchScreen("categories"));
}

// Difficulty Selector Cards on Category Detail screen
catDiffCards.forEach(card => {
    const diff = card.getAttribute("data-difficulty");
    if (!diff) return;
    card.addEventListener("click", () => selectCategoryDifficulty(diff));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectCategoryDifficulty(diff);
        }
    });
});

// Start Quiz button on Category Detail screen
if (catStartQuizBtn) {
    catStartQuizBtn.addEventListener("click", () => {
        startQuiz(selectedCategoryDifficulty, currentCategory);
    });
}

// Difficulty selection buttons on Practice Screen (General Practice)
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        const difficulty = button.getAttribute("data-difficulty");
        startQuiz(difficulty, "all");
    });
});

// Next Question button in standard quiz
nextBtn.addEventListener("click", handleNextQuestion);

// Result Screen action buttons
restartBtn.addEventListener("click", restartQuiz);
if (resultCatBtn) {
    resultCatBtn.addEventListener("click", () => switchScreen("categories"));
}
if (resultDashBtn) {
    resultDashBtn.addEventListener("click", () => switchScreen("dashboard"));
}
homeBtn.addEventListener("click", backToHome);

// Preview Screen CTA buttons
if (mockGoPracticeBtn) {
    mockGoPracticeBtn.addEventListener("click", () => switchScreen("practice"));
}
if (catGoPracticeBtn) {
    catGoPracticeBtn.addEventListener("click", () => switchScreen("practice"));
}

// -----------------------------------------------------------------------------
// PYQ Bank Event Listeners
// -----------------------------------------------------------------------------
// Exam Category Cards on PYQ screen
pyqExamCards.forEach(card => {
    const examId = card.getAttribute("data-exam-id");
    if (!examId) return;
    card.addEventListener("click", () => openPYQExamYears(examId));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPYQExamYears(examId);
        }
    });
});

// Back to Exam Categories button on PYQ Year Selection view
if (pyqYearsBackBtn) {
    pyqYearsBackBtn.addEventListener("click", openPYQBank);
}

// Back to Year Selection button on PYQ Practice view
if (pyqPracticeBackBtn) {
    pyqPracticeBackBtn.addEventListener("click", () => {
        const answeredCount = Object.keys(userPYQAnswers).length;
        if (answeredCount > 0) {
            const leave = confirm("Leaving now will end your current session on this paper. Return to year selection?");
            if (!leave) return;
        }
        openPYQExamYears(currentPYQExamId);
    });
}

// PYQ Practice Previous / Next / Submit button listeners
if (pyqPrevBtn) {
    pyqPrevBtn.addEventListener("click", prevPYQQuestion);
}
if (pyqNextBtn) {
    pyqNextBtn.addEventListener("click", nextPYQQuestion);
}
if (pyqSubmitBtn) {
    pyqSubmitBtn.addEventListener("click", submitPYQPractice);
}

// PYQ Results Actions
if (pyqRetakeBtn) {
    pyqRetakeBtn.addEventListener("click", restartPYQPractice);
}
if (pyqOtherYearBtn) {
    pyqOtherYearBtn.addEventListener("click", backToPYQYears);
}
if (pyqAllExamsBtn) {
    pyqAllExamsBtn.addEventListener("click", backToPYQCategories);
}


// =============================================================================
// 11. INITIALIZATION
// =============================================================================

// Initialize theme preference (Light / Dark mode)
initTheme();

// Initialize and render the Dashboard on load
renderDashboard();

// Pre-render Results Performance Hub on load
renderResultsPage(false);

// Populate question counts on Category Overview cards
updateCategoryCardsCounts();

// Expose core interface helpers to window for Firebase Auth Gatekeeper & Cloud Firestore synchronization
window.renderDashboard = renderDashboard;
window.renderResultsPage = renderResultsPage;
window.renderDailyStreakSection = renderDailyStreakSection;
window.renderLeaderboardSection = renderLeaderboardSection;
window.computeUserStatsFromHistory = computeUserStatsFromHistory;
window.saveQuizAttempt = saveQuizAttempt;
window.loadQuizHistory = loadQuizHistory;
window.getLocalDateString = getLocalDateString;
window.getCalendarDayDifference = getCalendarDayDifference;
window.getActiveStreak = getActiveStreak;
window.getCachedFirestoreStreak = getCachedFirestoreStreak;
window.calculatePracticeStreak = calculatePracticeStreak;

/**
 * Resets all user-specific in-memory and UI state for clean account isolation.
 * Called on logout, user change, or session teardown.
 * @param {Object} [options]
 * @param {boolean} [options.keepActiveUser=false] - Whether to keep the current active user ID
 */
function resetUserAppState(options = {}) {
    const keepActiveUser = Boolean(options && options.keepActiveUser);

    if (!keepActiveUser) {
        window.activeAuthUserId = null;
    }

    lastCompletedResult = null;
    hasSavedResult = false;
    window.currentUserStreak = null;
    window.cachedLeaderboard = null;

    // Reset quiz active runtime state if any
    if (typeof stopTimer === "function") {
        stopTimer();
    }
    currentQuestions = [];
    currentQuestionIndex = 0;
    currentShuffledOptions = [];
    score = 0;
    hasAnswered = false;
    sessionAnswers = [];

    // Hide Latest Completed Quiz card on Results screen
    if (latestQuizCompletion) {
        latestQuizCompletion.classList.add("hidden");
    }

    // Reset Results screen recent activity to clean empty state
    if (typeof renderResultsRecentActivity === "function") {
        renderResultsRecentActivity([]);
    }

    // Reset Results summary KPI counters
    if (resTotalQuizzes) resTotalQuizzes.textContent = "0";
    if (resAccuracy) resAccuracy.textContent = "0%";
    if (resTotalPoints) resTotalPoints.textContent = "0 pts";
    if (resStreak) resStreak.textContent = "0 Days";

    // Reset Streak Section in Results
    if (typeof renderDailyStreakSection === "function") {
        renderDailyStreakSection([], 0, null);
    }

    // Reset Leaderboard in Results
    if (typeof renderLeaderboardSection === "function") {
        renderLeaderboardSection([], 0, 0, 0, []);
    }

    // Reset PYQ view back to categories if open
    if (typeof backToPYQCategories === "function") {
        try {
            backToPYQCategories();
        } catch (_) {}
    }

    // Reset Dashboard to clean state
    if (typeof renderDashboard === "function") {
        renderDashboard();
    }
}

window.resetUserAppState = resetUserAppState;
window.getQuizStorageKey = getQuizStorageKey;
window.getStreakStorageKey = getStreakStorageKey;
window.getActiveUserUid = getActiveUserUid;

/**
 * Updates streak display elements across Results screen and Dashboard using verified streak data.
 * @param {Object} streakData - { currentStreak, longestStreak, lastPracticeDate, recentPracticeDates }
 */
window.applyStreakToUI = function(streakData) {
    if (!streakData) return;
    window.currentUserStreak = streakData;
    const history = typeof loadQuizHistory === "function" ? loadQuizHistory() : [];
    const activeStreak = getActiveStreak(streakData);

    if (resStreak) {
        resStreak.textContent = `${activeStreak} ${activeStreak === 1 ? "Day" : "Days"}`;
    }
    if (kpiStreak) {
        kpiStreak.textContent = `${activeStreak} ${activeStreak === 1 ? "Day" : "Days"}`;
    }
    if (typeof renderDailyStreakSection === "function") {
        renderDailyStreakSection(history, activeStreak, streakData);
    }
};
