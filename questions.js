/**
 * questions.js
 * 
 * PSC & General Knowledge Quiz Question Bank
 * 
 * Standardized for Kerala PSC competitive exam preparation:
 * - 10 Core Syllabus Categories:
 *   1. Kerala GK
 *   2. Constitution
 *   3. Science & Tech
 *   4. Indian History
 *   5. Geography
 *   6. Indian Economics
 *   7. India Facts
 *   8. World GK
 *   9. Sports
 *   10. Current Affairs
 * - 3 Difficulty Levels: Easy, Medium, Hard
 * - Fully filtered by category + difficulty for targeted drill practice
 */

// Standard PSC Subject Categories (Official Display Names)
const PSC_CATEGORIES = Object.freeze({
    KERALA: "Kerala GK",
    CONSTITUTION: "Constitution",
    SCIENCE: "Science & Tech",
    HISTORY: "Indian History",
    GEOGRAPHY: "Geography",
    ECONOMICS: "Indian Economics",
    INDIA: "India Facts",
    WORLD: "World GK",
    SPORTS: "Sports",
    CURRENT_AFFAIRS: "Current Affairs"
});

// Category Metadata for UI rendering and drill practice selection
const CATEGORY_METADATA = Object.freeze({
    [PSC_CATEGORIES.KERALA]: {
        id: "kerala",
        name: "Kerala GK",
        icon: "🌴",
        description: "Practice questions on Kerala geography, rivers, social reformers, renaissance leaders, and historic milestones.",
        subtitle: "Essential Kerala-specific topics for all Kerala PSC exams."
    },
    [PSC_CATEGORIES.CONSTITUTION]: {
        id: "constitution",
        name: "Constitution",
        icon: "📜",
        description: "Practice questions on the Preamble, Fundamental Rights, Articles, Amendments, and constitutional bodies.",
        subtitle: "High-weightage Indian Constitution questions frequently asked in PSC exams."
    },
    [PSC_CATEGORIES.SCIENCE]: {
        id: "science",
        name: "Science & Tech",
        icon: "🔬",
        description: "Practice questions on physics, chemistry, human biology, diseases, environmental science, and space technology.",
        subtitle: "Everyday science principles and technological advancements."
    },
    [PSC_CATEGORIES.HISTORY]: {
        id: "history",
        name: "Indian History",
        icon: "⚔️",
        description: "Practice questions on ancient empires, medieval dynasties, modern history, and the Indian National Movement.",
        subtitle: "Key historical epochs, national leaders, and freedom struggle events."
    },
    [PSC_CATEGORIES.GEOGRAPHY]: {
        id: "geography",
        name: "Geography",
        icon: "🌍",
        description: "Practice questions on Indian rivers, physical divisions, world landforms, climate, and oceanography.",
        subtitle: "Physical, regional, and environmental geography."
    },
    [PSC_CATEGORIES.ECONOMICS]: {
        id: "economics",
        name: "Indian Economics",
        icon: "📈",
        description: "Practice questions on NITI Aayog, Five-Year Plans, RBI, banking reforms, national income, and public finance.",
        subtitle: "Key economic policies, institutions, and development indicators."
    },
    [PSC_CATEGORIES.INDIA]: {
        id: "india",
        name: "India Facts",
        icon: "🇮🇳",
        description: "Practice questions on national symbols, states and union territories, premier institutions, and national heritage.",
        subtitle: "Fundamental national facts and prominent Indian landmarks."
    },
    [PSC_CATEGORIES.WORLD]: {
        id: "world",
        name: "World GK",
        icon: "🌐",
        description: "Practice questions on world capitals, international bodies (UN, WHO), currencies, literature, and global wonders.",
        subtitle: "Global general knowledge and international affairs trivia."
    },
    [PSC_CATEGORIES.SPORTS]: {
        id: "sports",
        name: "Sports",
        icon: "🏆",
        description: "Practice questions related to sports, tournaments, Olympic games, Indian & Kerala sports icons, and trophies.",
        subtitle: "Athletic tournaments, sports trophies, and world records."
    },
    [PSC_CATEGORIES.CURRENT_AFFAIRS]: {
        id: "current-affairs",
        name: "Current Affairs",
        icon: "📰",
        description: "Practice verified questions on recent national events, ISRO space missions, major awards, and landmark summits.",
        subtitle: "Reliable, educational contemporary events for Kerala PSC."
    }
});

// Normalized Question Bank across Easy, Medium, and Hard
const pscQuestionBank = [
    // =========================================================================
    // 1. SPORTS QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "sp_e01",
        question: "How many players are on the field in a standard cricket team?",
        options: ["9 Players", "10 Players", "11 Players", "12 Players"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_e02",
        question: "Which sport uses the scoring term 'Love' to represent zero?",
        options: ["Cricket", "Football", "Tennis", "Badminton"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_e03",
        question: "The prestigious Santosh Trophy in India is associated with which sport?",
        options: ["Cricket", "Football", "Hockey", "Kabaddi"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_e04",
        question: "Who is popularly revered as the 'Master Blaster' of Indian cricket?",
        options: ["Sunil Gavaskar", "Kapil Dev", "Sachin Tendulkar", "Virat Kohli"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.SPORTS
    },
    // Medium
    {
        id: "m09",
        question: "In which country were the first modern Olympic Games held in 1896?",
        options: ["France", "United Kingdom", "Greece", "Italy"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_m01",
        question: "Which celebrated Indian track and field athlete is known by the nickname 'Payyoli Express'?",
        options: ["K.M. Beenamol", "P.T. Usha", "Anju Bobby George", "Shiny Wilson"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_m02",
        question: "Which city hosted the XXXIII Summer Olympic Games in the year 2024?",
        options: ["Tokyo", "Paris", "London", "Los Angeles"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_m03",
        question: "The Thomas Cup is the world men's championship trophy in which sport?",
        options: ["Badminton", "Table Tennis", "Golf", "Polo"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.SPORTS
    },
    // Hard
    {
        id: "sp_h01",
        question: "Who was the first individual Olympic medal winner from independent India?",
        options: ["K.D. Jadhav", "Milkha Singh", "Karnam Malleswari", "Norman Pritchard"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_h02",
        question: "Who became the first Indian athlete to win a medal at the World Athletics Championships (Paris 2003)?",
        options: ["P.T. Usha", "Anju Bobby George", "T.C. Yohannan", "M.D. Valsamma"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_h03",
        question: "The world-famous 'Nehru Trophy Boat Race' in Kerala is conducted on which lake?",
        options: ["Vembanad Lake", "Punnamada Lake", "Ashtamudi Lake", "Sasthamkotta Lake"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.SPORTS
    },
    {
        id: "sp_h04",
        question: "In which year did India win its first Olympic Gold Medal in Men's Field Hockey?",
        options: ["1924 Paris", "1928 Amsterdam", "1932 Los Angeles", "1936 Berlin"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.SPORTS
    },

    // =========================================================================
    // 2. KERALA GK QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e11",
        question: "Which is the longest river in the state of Kerala?",
        options: ["Bharathappuzha", "Pamba", "Periyar", "Chaliyar"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_e01",
        question: "What is the official state animal of Kerala?",
        options: ["Royal Bengal Tiger", "Indian Elephant", "Lion-tailed Macaque", "Spotted Deer"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_e02",
        question: "What is the official state bird of Kerala?",
        options: ["House Sparrow", "Great Indian Hornbill", "Peacock", "Woodpecker"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_e03",
        question: "Which district in Kerala has the highest literacy rate according to Census 2011?",
        options: ["Ernakulam", "Kottayam", "Pathanamthitta", "Alappuzha"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.KERALA
    },
    // Medium
    {
        id: "m12",
        question: "Silent Valley National Park is situated in which district of Kerala?",
        options: ["Idukki", "Wayanad", "Palakkad", "Kozhikode"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "m15",
        question: "Who led the historic Payyanur Salt Satyagraha in Kerala in 1930?",
        options: ["K. Kelappan", "A.K. Gopalan", "C. Kesavan", "P. Krishna Pillai"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_m01",
        question: "Who founded the 'Sadhujana Paripalana Sangham' in Kerala in the year 1907?",
        options: ["Sree Narayana Guru", "Ayyankali", "Sahodaran Ayyappan", "Chattampi Swamikal"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_m02",
        question: "In which year did the famous Vaikom Satyagraha for temple entry begin in Kerala?",
        options: ["1921", "1924", "1930", "1936"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.KERALA
    },
    // Hard
    {
        id: "h12",
        question: "Who founded the socio-reform organization 'Araya Samajam' in Kerala in 1901?",
        options: ["Pandit Karuppan", "Vaikunda Swamikal", "Ayyankali", "Sahodaran Ayyappan"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "h13",
        question: "Who was the ruler of Travancore when the historic Temple Entry Proclamation was issued in 1936?",
        options: ["Swathi Thirunal", "Sri Chithira Thirunal Balarama Varma", "Moolam Thirunal", "Marthanda Varma"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_h01",
        question: "Who served as the first President of the Cochin State Praja Mandalam formed in 1941?",
        options: ["V.R. Krishnan Ezhuthachan", "S. Neelakanta Iyer", "E. Ikkanda Warrier", "Panampilly Govinda Menon"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.KERALA
    },
    {
        id: "kl_h02",
        question: "Which British Resident was targeted during the revolt led by Velu Thampi Dalawa at Kollam in 1809?",
        options: ["Col. Colin Macaulay", "Col. John Munro", "Col. James Welsh", "Capt. Blacker"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.KERALA
    },

    // =========================================================================
    // 3. CONSTITUTION QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "cs_e01",
        question: "On which date is National Constitution Day (Samvidhan Divas) celebrated in India?",
        options: ["15th August", "26th January", "26th November", "2nd October"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_e02",
        question: "How many Fundamental Rights were originally provided by the Constitution of India in 1950?",
        options: ["6 Rights", "7 Rights", "8 Rights", "10 Rights"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_e03",
        question: "Who is the Constitutional Head of State and supreme commander of the Armed Forces in India?",
        options: ["Prime Minister", "President of India", "Chief Justice of India", "Speaker of Lok Sabha"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    // Medium
    {
        id: "m11",
        question: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
        options: ["Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "B.N. Rau"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_m01",
        question: "Which Constitutional Amendment lowered the voting age in India from 21 years to 18 years?",
        options: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_m02",
        question: "Which Part of the Indian Constitution contains the Directive Principles of State Policy (DPSP)?",
        options: ["Part II", "Part III", "Part IV", "Part IVA"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_m03",
        question: "By which Constitutional Amendment was Article 21A (Right to Education) inserted into the Constitution?",
        options: ["86th Amendment 2002", "91st Amendment 2003", "44th Amendment 1978", "73rd Amendment 1992"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    // Hard
    {
        id: "h11",
        question: "Which Article of the Indian Constitution was termed as the 'Heart and Soul of the Constitution' by Dr. Ambedkar?",
        options: ["Article 14", "Article 21", "Article 32", "Article 368"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "h14",
        question: "What is the minimum age required to be eligible for election as the President of India?",
        options: ["25 Years", "30 Years", "35 Years", "40 Years"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_h01",
        question: "The power of 'Judicial Review' in the Indian Constitution was inspired by the constitution of which country?",
        options: ["United Kingdom", "United States of America", "Ireland", "Canada"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.CONSTITUTION
    },
    {
        id: "cs_h02",
        question: "Which Constitutional Amendment introduced the nationwide Goods and Services Tax (GST) in India?",
        options: ["100th Amendment", "101st Amendment", "102nd Amendment", "103rd Amendment"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.CONSTITUTION
    },

    // =========================================================================
    // 4. CURRENT AFFAIRS QUESTIONS (Verified, Authentic Facts)
    // =========================================================================
    // Easy
    {
        id: "ca_e01",
        question: "What name was designated by India for the lunar landing spot of ISRO's Chandrayaan-3 lander?",
        options: ["Tiranga Point", "Shiv Shakti Point", "Jawahar Point", "Atal Point"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_e02",
        question: "Which country successfully hosted the prestigious G20 Leaders' Summit in September 2023?",
        options: ["Indonesia", "India", "Brazil", "South Africa"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_e03",
        question: "Who served as the 50th Chief Justice of India?",
        options: ["Justice N.V. Ramana", "Justice U.U. Lalit", "Justice D.Y. Chandrachud", "Justice Sanjiv Khanna"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    // Medium
    {
        id: "ca_m01",
        question: "Which specialized ISRO solar mission was launched in September 2023 to study the Sun?",
        options: ["Aditya-L1", "Surya-1", "Helios-A", "Solar-X"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_m02",
        question: "Which organization was awarded the Nobel Peace Prize in October 2024 for its efforts against nuclear weapons?",
        options: ["Narges Mohammadi Foundation", "Nihon Hidankyo", "International Red Cross", "Amnesty International"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_m03",
        question: "Which pioneering agricultural scientist from Kerala was posthumously conferred the Bharat Ratna in 2024?",
        options: ["Dr. Verghese Kurien", "Dr. M.S. Swaminathan", "Dr. E.C.G. Sudarshan", "Dr. G. Madhavan Nair"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_m04",
        question: "Which Malayalam film directed by Anand Ekarshi won the Best Feature Film award at the 70th National Film Awards (2024)?",
        options: ["Aattam", "Kantara", "Brahmastra", "2018: Everyone is a Hero"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    // Hard
    {
        id: "ca_h01",
        question: "Around which specific gravitational equilibrium point is ISRO's Aditya-L1 observatory stationed?",
        options: ["Lagrange Point L1", "Lagrange Point L2", "Lagrange Point L3", "Lagrange Point L4"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_h02",
        question: "Who became the youngest chess player in history to win the FIDE Candidates Tournament in April 2024?",
        options: ["R. Praggnanandhaa", "D. Gukesh", "Arjun Erigaisi", "Nodirbek Abdusattorov"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },
    {
        id: "ca_h03",
        question: "Which international space agency launched the flagship Europa Clipper mission in October 2024 to explore Jupiter's icy moon?",
        options: ["ISRO", "ESA", "NASA", "JAXA"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.CURRENT_AFFAIRS
    },

    // =========================================================================
    // 5. INDIAN HISTORY QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e13",
        question: "Who is revered as the 'Father of the Indian Nation'?",
        options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Sardar Patel"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.HISTORY
    },
    {
        id: "hs_e01",
        question: "In which year did India attain its national independence from British colonial rule?",
        options: ["1945", "1947", "1950", "1952"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.HISTORY
    },
    {
        id: "hs_e02",
        question: "Who proclaimed the historic battle call 'Do or Die' during the 1942 Quit India Movement?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.HISTORY
    },
    // Medium
    {
        id: "hs_m01",
        question: "In which year did the tragic Jallianwala Bagh massacre take place in Amritsar under General Dyer?",
        options: ["1919", "1920", "1922", "1914"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.HISTORY
    },
    {
        id: "hs_m02",
        question: "Who was the legendary founder of the ancient Maurya Dynasty in India with the guidance of Chanakya?",
        options: ["Ashoka the Great", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.HISTORY
    },
    // Hard
    {
        id: "h04",
        question: "In which century was the historic Magna Carta signed (1215)?",
        options: ["11th Century", "12th Century", "13th Century", "14th Century"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.HISTORY
    },
    {
        id: "hs_h01",
        question: "Who was the British Viceroy of India when the controversial Partition of Bengal occurred in 1905?",
        options: ["Lord Curzon", "Lord Ripon", "Lord Minto", "Lord Dalhousie"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.HISTORY
    },
    {
        id: "hs_h02",
        question: "The historic Poona Pact of September 1932 was concluded between Mahatma Gandhi and which prominent leader?",
        options: ["Dr. B.R. Ambedkar", "Muhammad Ali Jinnah", "Sardar Patel", "Jawaharlal Nehru"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.HISTORY
    },

    // =========================================================================
    // 6. GEOGRAPHY QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e02",
        question: "Which is the largest and deepest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        difficulty: "easy",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "e07",
        question: "How many continents are there on planet Earth?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "geo_e01",
        question: "Which is the highest mountain peak above sea level in the world?",
        options: ["K2", "Mount Everest", "Kanchenjunga", "Lhotse"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    // Medium
    {
        id: "m04",
        question: "What is widely considered the longest river in the world?",
        options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "m13",
        question: "Which Indian maritime state possesses the longest coastline?",
        options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "geo_m01",
        question: "Which prominent latitude line passes almost centrally through the Indian mainland?",
        options: ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Arctic Circle"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    // Hard
    {
        id: "h05",
        question: "What is the official capital city of Australia?",
        options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
        correctAnswer: 3,
        difficulty: "hard",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "h08",
        question: "What is the deepest known location in the world's oceans?",
        options: ["Java Trench", "Puerto Rico Trench", "Mariana Trench", "Tonga Trench"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.GEOGRAPHY
    },
    {
        id: "geo_h01",
        question: "Which is the highest peak in South India and the Western Ghats (located in Idukki, Kerala)?",
        options: ["Agasthyarkoodam", "Anamudi", "Doddabetta", "Meesapulimala"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.GEOGRAPHY
    },

    // =========================================================================
    // 7. SCIENCE & TECH QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e03",
        question: "How many days are there in a standard leap year?",
        options: ["365", "366", "364", "367"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e04",
        question: "Which animal is commonly known as the 'King of the Jungle'?",
        options: ["Tiger", "Elephant", "Lion", "Bear"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e05",
        question: "What color is an emerald gemstone?",
        options: ["Blue", "Red", "Yellow", "Green"],
        correctAnswer: 3,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e06",
        question: "Which planet is closest to the Sun?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        correctAnswer: 0,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e08",
        question: "What sweet substance do honeybees produce?",
        options: ["Sugar", "Honey", "Maple syrup", "Nectar"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e09",
        question: "Which vital gas do humans inhale to survive?",
        options: ["Carbon Dioxide", "Hydrogen", "Nitrogen", "Oxygen"],
        correctAnswer: 3,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "e14",
        question: "Which planet in the solar system is commonly called the 'Red Planet'?",
        options: ["Jupiter", "Mars", "Saturn", "Venus"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.SCIENCE
    },
    // Medium
    {
        id: "m01",
        question: "Which chemical element has the chemical symbol 'Fe'?",
        options: ["Gold", "Silver", "Iron", "Lead"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "m06",
        question: "What is the hardest naturally occurring mineral on Earth?",
        options: ["Diamond", "Quartz", "Topaz", "Ruby"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "m08",
        question: "How many bones make up an adult human skeleton?",
        options: ["198", "206", "214", "250"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.SCIENCE
    },
    // Hard
    {
        id: "h01",
        question: "What is the rarest human ABO blood type in the world?",
        options: ["O Negative", "B Negative", "AB Negative", "A Negative"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "h02",
        question: "Which atmospheric layer is closest to the surface of the Earth?",
        options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "h03",
        question: "Which astronomer formulated the three laws of planetary motion?",
        options: ["Galileo Galilei", "Nicolaus Copernicus", "Johannes Kepler", "Isaac Newton"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "h06",
        question: "Which subatomic particle carries a positive electrical charge?",
        options: ["Proton", "Neutron", "Electron", "Photon"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "h09",
        question: "Who was the first woman to win a Nobel Prize (Physics in 1903)?",
        options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Lise Meitner"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },
    {
        id: "h10",
        question: "Which is the only mammal truly capable of powered, sustained flight?",
        options: ["Flying Squirrel", "Bat", "Sugar Glider", "Colugo"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.SCIENCE
    },

    // =========================================================================
    // 8. INDIAN ECONOMICS QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "ec_e01",
        question: "What is the official currency of the Republic of India?",
        options: ["US Dollar", "Indian Rupee", "Euro", "Yen"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.ECONOMICS
    },
    {
        id: "ec_e02",
        question: "Which supreme financial institution acts as the central bank of India?",
        options: ["State Bank of India", "Reserve Bank of India", "NITI Aayog", "SEBI"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.ECONOMICS
    },
    // Medium
    {
        id: "m14",
        question: "In which year was the Reserve Bank of India (RBI) established based on the Hilton Young Commission?",
        options: ["1935", "1947", "1950", "1928"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.ECONOMICS
    },
    {
        id: "ec_m01",
        question: "Which premier policy think tank replaced the Planning Commission of India in January 2015?",
        options: ["Finance Commission", "NITI Aayog", "National Development Council", "Economic Advisory Council"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.ECONOMICS
    },
    // Hard
    {
        id: "h15",
        question: "Which Five-Year Plan of India was based on the heavy-industry Mahalanobis growth model?",
        options: ["First Plan", "Second Plan", "Third Plan", "Fourth Plan"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.ECONOMICS
    },
    {
        id: "ec_h01",
        question: "In which year were 14 major commercial banks nationalized in India under Prime Minister Indira Gandhi?",
        options: ["1969", "1975", "1980", "1991"],
        correctAnswer: 0,
        difficulty: "hard",
        category: PSC_CATEGORIES.ECONOMICS
    },

    // =========================================================================
    // 9. INDIA FACTS QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e12",
        question: "What is the national bird of India?",
        options: ["Indian Peacock", "House Sparrow", "Great Indian Bustard", "Kingfisher"],
        correctAnswer: 0,
        difficulty: "easy",
        category: PSC_CATEGORIES.INDIA
    },
    {
        id: "e15",
        question: "What is the national flower of India?",
        options: ["Rose", "Lotus", "Jasmine", "Sunflower"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.INDIA
    },
    {
        id: "ind_e01",
        question: "What is the national aquatic animal of India?",
        options: ["Ganges River Dolphin", "Blue Whale", "Gharial", "Sea Turtle"],
        correctAnswer: 0,
        difficulty: "easy",
        category: PSC_CATEGORIES.INDIA
    },
    // Medium
    {
        id: "ind_m01",
        question: "How many spokes are present in the Ashoka Chakra situated on the Indian National Flag?",
        options: ["20", "22", "24", "28"],
        correctAnswer: 2,
        difficulty: "medium",
        category: PSC_CATEGORIES.INDIA
    },
    {
        id: "ind_m02",
        question: "Which historic city serves as the official capital of the northeastern state of Assam?",
        options: ["Guwahati", "Dispur", "Silchar", "Tezpur"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.INDIA
    },
    // Hard
    {
        id: "ind_h01",
        question: "On which historic date did the Constituent Assembly officially adopt 'Jana Gana Mana' as the National Anthem of India?",
        options: ["15th August 1947", "26th November 1949", "24th January 1950", "26th January 1950"],
        correctAnswer: 2,
        difficulty: "hard",
        category: PSC_CATEGORIES.INDIA
    },
    {
        id: "ind_h02",
        question: "Which is the smallest state in the Republic of India by total geographic land area?",
        options: ["Sikkim", "Goa", "Tripura", "Mizoram"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.INDIA
    },

    // =========================================================================
    // 10. WORLD GK QUESTIONS
    // =========================================================================
    // Easy
    {
        id: "e01",
        question: "What is the capital city of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2,
        difficulty: "easy",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "e10",
        question: "What is the official primary language of Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "wld_e01",
        question: "Which premier international organization was established in 1945 to maintain world peace and security?",
        options: ["League of Nations", "United Nations (UN)", "NATO", "World Bank"],
        correctAnswer: 1,
        difficulty: "easy",
        category: PSC_CATEGORIES.WORLD
    },
    // Medium
    {
        id: "m02",
        question: "In which year did the British passenger liner Titanic sink in the North Atlantic?",
        options: ["1912", "1905", "1920", "1898"],
        correctAnswer: 0,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "m03",
        question: "Who painted the world-famous masterpiece 'The Starry Night'?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "m05",
        question: "Which country is internationally nicknamed the 'Land of the Rising Sun'?",
        options: ["China", "South Korea", "Thailand", "Japan"],
        correctAnswer: 3,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "m07",
        question: "Who authored the world-renowned romantic tragedy 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "m10",
        question: "What is the official currency of the United Kingdom?",
        options: ["Euro", "Pound Sterling", "Dollar", "Franc"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "wld_m01",
        question: "Where is the global headquarters of the United Nations (UN) situated?",
        options: ["Geneva, Switzerland", "New York City, USA", "Paris, France", "Vienna, Austria"],
        correctAnswer: 1,
        difficulty: "medium",
        category: PSC_CATEGORIES.WORLD
    },
    // Hard
    {
        id: "h07",
        question: "What was the historical name of Tokyo before it was renamed in 1868?",
        options: ["Kyoto", "Edo", "Osaka", "Nara"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.WORLD
    },
    {
        id: "wld_h01",
        question: "Which sovereign nation holds the distinction of possessing the longest written constitution in the world?",
        options: ["United States", "India", "United Kingdom", "France"],
        correctAnswer: 1,
        difficulty: "hard",
        category: PSC_CATEGORIES.WORLD
    }
];

// =============================================================================
// Helper Functions & Query Methods for Filtering & Expansion
// =============================================================================

/**
 * Normalizes any category string or legacy alias to the standardized PSC category name.
 * @param {string} cat - Raw or legacy category name
 * @returns {string} Standardized category name
 */
function normalizeCategory(cat) {
    if (!cat) return "";
    const c = String(cat).toLowerCase().trim();
    if (c.includes("kerala")) return PSC_CATEGORIES.KERALA;
    if (c.includes("constitut")) return PSC_CATEGORIES.CONSTITUTION;
    if (c.includes("science")) return PSC_CATEGORIES.SCIENCE;
    if (c.includes("histor")) return PSC_CATEGORIES.HISTORY;
    if (c.includes("geograph")) return PSC_CATEGORIES.GEOGRAPHY;
    if (c.includes("econom")) return PSC_CATEGORIES.ECONOMICS;
    if (c.includes("india facts") || c === "india") return PSC_CATEGORIES.INDIA;
    if (c.includes("world")) return PSC_CATEGORIES.WORLD;
    if (c.includes("sport")) return PSC_CATEGORIES.SPORTS;
    if (c.includes("current")) return PSC_CATEGORIES.CURRENT_AFFAIRS;
    return cat;
}

/**
 * Returns all questions in the bank.
 * @returns {Array} List of all question objects
 */
function getAllQuestions() {
    return [...pscQuestionBank];
}

/**
 * Filters questions by BOTH category and difficulty.
 * If category is "all" or omitted, questions from all categories are returned.
 * If difficulty is "all" or omitted, questions from all difficulties are returned.
 * @param {Object} options - { category, difficulty }
 * @returns {Array} Filtered list of questions
 */
function getQuestionsByFilter({ category, difficulty } = {}) {
    let pool = getAllQuestions();

    if (category && category !== "all" && category !== "All Categories") {
        const normTarget = normalizeCategory(category);
        pool = pool.filter(q => normalizeCategory(q.category) === normTarget);
    }

    if (difficulty && difficulty !== "all") {
        const diffTarget = difficulty.toLowerCase().trim();
        pool = pool.filter(q => q.difficulty.toLowerCase() === diffTarget);
    }

    return pool;
}

/**
 * Backward compatibility helper for general practice mode.
 * Returns questions for a specific difficulty across all subjects.
 */
const quizData = {
    easy: pscQuestionBank.filter(q => q.difficulty === "easy"),
    medium: pscQuestionBank.filter(q => q.difficulty === "medium"),
    hard: pscQuestionBank.filter(q => q.difficulty === "hard")
};

/**
 * Returns questions filtered by subject category.
 * @param {string} category - Category name
 * @returns {Array} Matching questions
 */
function getQuestionsByCategory(category) {
    return getQuestionsByFilter({ category, difficulty: "all" });
}

/**
 * Returns list of all 10 available PSC categories.
 * @returns {Array} List of category names
 */
function getAvailableCategories() {
    return Object.values(PSC_CATEGORIES);
}

/**
 * Returns metadata (icon, description, subtitle) for a given category.
 * @param {string} category - Category name
 * @returns {Object} Metadata object
 */
function getCategoryMetadata(category) {
    const norm = normalizeCategory(category);
    return CATEGORY_METADATA[norm] || {
        id: "general",
        name: norm || "General Knowledge",
        icon: "📌",
        description: "General Knowledge practice questions.",
        subtitle: "Practice questions for competitive examinations."
    };
}


// =============================================================================
// KERALA PSC PREVIOUS YEAR QUESTION BANK (PYQ DATA)
// =============================================================================
/**
 * Structured registry for Kerala PSC Previous Year Questions.
 * Architecture: Exam Category -> Year -> Paper Metadata -> Questions
 * 
 * Note on Data Integrity:
 * - Years with sample datasets are explicitly marked with `isSample: true`.
 * - Years without verified questions are marked `available: false` ("Paper Coming Soon")
 *   to avoid claiming an official paper exists when data is not present.
 */
const PYQ_DATA = {
    ldc: {
        id: "ldc",
        title: "LDC",
        fullName: "Lower Division Clerk (LDC)",
        icon: "📝",
        badge: "10th Level Qualification",
        description: "Previous question papers of Kerala PSC Lower Division Clerk examinations across districts.",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "LDC 2024 Model Paper",
                paperCode: "Cat No. 248/2023 - Exam 2024",
                questionsCount: 10,
                questions: [
                    {
                        id: "ldc_2024_1",
                        question: "Who among the following was the founder of the 'Sadhujana Paripalana Sangham' in 1907?",
                        options: ["Ayyankali", "Sree Narayana Guru", "Vaikunda Swamikal", "Dr. Palpu"],
                        correctAnswer: 0,
                        explanation: "Mahatma Ayyankali founded the Sadhujana Paripalana Sangham (SPS) in 1907 to advocate for the education and civil rights of marginalized communities in Travancore."
                    },
                    {
                        id: "ldc_2024_2",
                        question: "Which article of the Indian Constitution declares Untouchability to be abolished and its practice in any form forbidden?",
                        options: ["Article 14", "Article 17", "Article 19", "Article 21"],
                        correctAnswer: 1,
                        explanation: "Article 17 of the Constitution of India formally abolishes untouchability and makes its practice punishable in accordance with the Protection of Civil Rights Act."
                    },
                    {
                        id: "ldc_2024_3",
                        question: "The longest river entirely flowing within the state of Kerala is:",
                        options: ["Periyar", "Bharathapuzha", "Pamba", "Chaliyar"],
                        correctAnswer: 0,
                        explanation: "Periyar is the longest river flowing in Kerala with a length of 244 km, often referred to as the 'Lifeline of Kerala'."
                    },
                    {
                        id: "ldc_2024_4",
                        question: "Which gas is primarily responsible for the greenhouse effect on Earth?",
                        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                        correctAnswer: 1,
                        explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities, absorbing and emitting thermal infrared radiation."
                    },
                    {
                        id: "ldc_2024_5",
                        question: "In which year was the historic Battle of Colachel fought between the Kingdom of Travancore and the Dutch East India Company?",
                        options: ["1741", "1757", "1761", "1792"],
                        correctAnswer: 0,
                        explanation: "Marhthanda Varma of Travancore defeated the Dutch naval forces under Eustachius De Lannoy at the Battle of Colachel on August 10, 1741."
                    },
                    {
                        id: "ldc_2024_6",
                        question: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
                        options: ["Dr. B. R. Ambedkar", "Dr. Rajendra Prasad", "Jawaharlal Nehru", "B. N. Rau"],
                        correctAnswer: 0,
                        explanation: "Dr. B. R. Ambedkar was the Chairman of the seven-member Drafting Committee appointed on August 29, 1947, known as the chief architect of the Indian Constitution."
                    },
                    {
                        id: "ldc_2024_7",
                        question: "Which district in Kerala has the highest literacy rate as per the 2011 Census?",
                        options: ["Kottayam", "Pathanamthitta", "Alappuzha", "Ernakulam"],
                        correctAnswer: 0,
                        explanation: "Kottayam recorded the highest literacy rate in Kerala and India during the 2011 Census with 97.21% literacy."
                    },
                    {
                        id: "ldc_2024_8",
                        question: "Which vitamin is synthesized in the human skin upon exposure to sunlight?",
                        options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
                        correctAnswer: 3,
                        explanation: "Vitamin D3 (cholecalciferol) is synthesized photosynthetically in the skin upon irradiation by ultraviolet-B (UV-B) rays."
                    },
                    {
                        id: "ldc_2024_9",
                        question: "Who authored the famous anti-colonial Malayalam novel 'Agnisakshi'?",
                        options: ["Lalithambika Antharjanam", "Madhavikutty", "Thakazhi Sivasankara Pillai", "M. T. Vasudevan Nair"],
                        correctAnswer: 0,
                        explanation: "Lalithambika Antharjanam wrote 'Agnisakshi' (1976), which won the Kendra Sahitya Akademi Award and Kerala Sahitya Akademi Award."
                    },
                    {
                        id: "ldc_2024_10",
                        question: "The Right to Information (RTI) Act was enacted by the Indian Parliament in which year?",
                        options: ["2002", "2005", "2008", "2010"],
                        correctAnswer: 1,
                        explanation: "The Right to Information Act was enacted on 15 June 2005 and came into full force on 12 October 2005 to promote transparency and accountability."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "LDC 2023 Model Paper",
                paperCode: "Cat No. 104/2022 - Exam 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "ldc_2023_1",
                        question: "Who led the historic 'Villuvandi Samaram' (Bullock Cart Protest) in Travancore in 1893?",
                        options: ["Ayyankali", "Sahodaran Ayyappan", "V. T. Bhattathiripad", "Poykayil Yohannan"],
                        correctAnswer: 0,
                        explanation: "Ayyankali rode a bullock cart along the public roads of Venganoor in 1893, defying restrictions imposed upon Dalits."
                    },
                    {
                        id: "ldc_2023_2",
                        question: "The Comptroller and Auditor General (CAG) of India is appointed under which article?",
                        options: ["Article 148", "Article 280", "Article 324", "Article 352"],
                        correctAnswer: 0,
                        explanation: "Article 148 provides for the appointment of the Comptroller and Auditor General of India by the President."
                    },
                    {
                        id: "ldc_2023_3",
                        question: "Which waterfall is known as the 'Niagara of India' in Kerala?",
                        options: ["Athirappilly", "Vazhachal", "Palaruvi", "Soochipara"],
                        correctAnswer: 0,
                        explanation: "Athirappilly Falls on the Chalakudy River in Thrissur district is famously nicknamed the 'Niagara of India'."
                    },
                    {
                        id: "ldc_2023_4",
                        question: "What is the chemical formula of common table salt?",
                        options: ["NaCl", "KCl", "NaOH", "CaCO3"],
                        correctAnswer: 0,
                        explanation: "Sodium Chloride (NaCl) is common table salt, formed by ionic bonding of sodium and chlorine atoms."
                    },
                    {
                        id: "ldc_2023_5",
                        question: "Who was the first Chief Minister of unified Kerala state in 1957?",
                        options: ["E. M. S. Namboodiripad", "Pattom Thanu Pillai", "R. Sankar", "C. Achutha Menon"],
                        correctAnswer: 0,
                        explanation: "E. M. S. Namboodiripad led the first democratically elected Communist ministry in Kerala, sworn in on April 5, 1957."
                    }
                ]
            },
            "2022": {
                available: true,
                isSample: true,
                title: "LDC 2022 Model Paper",
                paperCode: "Cat No. 518/2021 - Exam 2022",
                questionsCount: 5,
                questions: [
                    {
                        id: "ldc_2022_1",
                        question: "Which social reformer is famous for the motto 'One Caste, One Religion, One God for Man'?",
                        options: ["Sree Narayana Guru", "Chattampi Swamikal", "Ayyankali", "Vakkom Moulavi"],
                        correctAnswer: 0,
                        explanation: "Sree Narayana Guru propounded 'Oru Jathi, Oru Matham, Oru Daivam Manushyanu' during the Aruvippuram installation."
                    },
                    {
                        id: "ldc_2022_2",
                        question: "The fundamental duty to safeguard public property is included under which article?",
                        options: ["Article 51A(i)", "Article 51A(a)", "Article 51A(e)", "Article 51A(k)"],
                        correctAnswer: 0,
                        explanation: "Article 51A(i) states it shall be the duty of every citizen of India to safeguard public property and to abjure violence."
                    },
                    {
                        id: "ldc_2022_3",
                        question: "Silent Valley National Park is situated in which district of Kerala?",
                        options: ["Palakkad", "Idukki", "Wayanad", "Kozhikode"],
                        correctAnswer: 0,
                        explanation: "Silent Valley National Park is located in the Kundali Hills of Palakkad district, famous for lion-tailed macaques."
                    },
                    {
                        id: "ldc_2022_4",
                        question: "Which organ produces insulin in the human body?",
                        options: ["Pancreas", "Liver", "Kidney", "Gallbladder"],
                        correctAnswer: 0,
                        explanation: "Beta cells in the Islets of Langerhans of the pancreas secrete insulin to regulate blood glucose levels."
                    },
                    {
                        id: "ldc_2022_5",
                        question: "When is National Panchayati Raj Day celebrated across India?",
                        options: ["April 24", "January 26", "October 2", "November 1"],
                        correctAnswer: 0,
                        explanation: "National Panchayati Raj Day is observed every year on April 24, commemorating the 73rd Constitutional Amendment Act 1992."
                    }
                ]
            },
            "2025": { available: false, title: "LDC 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2021": { available: false, title: "LDC 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "LDC 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "LDC 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "LDC 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    },

    degree: {
        id: "degree",
        title: "Degree Level",
        fullName: "Degree Level Preliminary & Mains",
        icon: "🏛️",
        badge: "Graduate Level",
        description: "Question papers for Secretariat Assistant, Sub Inspector, University Assistant, and Company Board Officer.",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "Degree Level 2024 Model Paper",
                paperCode: "Degree Level Common Prelims - 2024",
                questionsCount: 5,
                questions: [
                    {
                        id: "deg_2024_1",
                        question: "The power of judicial review in the Indian Constitution is explicitly derived from which article?",
                        options: ["Article 13", "Article 32", "Article 226", "Article 142"],
                        correctAnswer: 0,
                        explanation: "Article 13 declares that laws inconsistent with or in derogation of Fundamental Rights shall be void, giving the judiciary explicit power of judicial review."
                    },
                    {
                        id: "deg_2024_2",
                        question: "Who was the founder of the 'Travancore Muslim Mahajana Sabha'?",
                        options: ["Vakkom Abdul Khader Moulavi", "Sanaulla Makti Thangal", "Chalilakath Kunahamed Haji", "K. M. Seethi Sahib"],
                        correctAnswer: 0,
                        explanation: "Vakkom Moulavi founded the Travancore Muslim Mahajana Sabha and was the founder of the courageous newspaper 'Swadeshabhimani'."
                    },
                    {
                        id: "deg_2024_3",
                        question: "Which Five-Year Plan in India was terminated one year before its scheduled completion by the Janata Government?",
                        options: ["Fifth Five-Year Plan", "Third Five-Year Plan", "Fourth Five-Year Plan", "Sixth Five-Year Plan"],
                        correctAnswer: 0,
                        explanation: "The Fifth Five-Year Plan (1974–1979) was terminated in 1978 by the Janata Party government, which introduced the Rolling Plan."
                    },
                    {
                        id: "deg_2024_4",
                        question: "What is the SI unit of electric capacitance?",
                        options: ["Farad", "Henry", "Siemens", "Ohm"],
                        correctAnswer: 0,
                        explanation: "The Farad (symbol: F) is the SI unit of electrical capacitance, named after the English physicist Michael Faraday."
                    },
                    {
                        id: "deg_2024_5",
                        question: "Which Indian state has the largest coastline among peninsular states?",
                        options: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Maharashtra"],
                        correctAnswer: 0,
                        explanation: "Gujarat has the longest coastline in India, extending over approximately 1,600 km along the Arabian Sea."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "Degree Level 2023 Model Paper",
                paperCode: "Degree Level Mains - 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "deg_2023_1",
                        question: "Who presided over the Belgaum Session of the Indian National Congress in 1924?",
                        options: ["Mahatma Gandhi", "Subhas Chandra Bose", "Jawaharlal Nehru", "Sarojini Naidu"],
                        correctAnswer: 0,
                        explanation: "The 39th session of the INC at Belgaum (Karnataka) in 1924 was the only session ever presided over by Mahatma Gandhi."
                    },
                    {
                        id: "deg_2023_2",
                        question: "Under which Article can the President of India seek advisory opinion from the Supreme Court?",
                        options: ["Article 143", "Article 136", "Article 124", "Article 131"],
                        correctAnswer: 0,
                        explanation: "Article 143 confers advisory jurisdiction upon the Supreme Court, allowing the President to refer questions of law or fact."
                    },
                    {
                        id: "deg_2023_3",
                        question: "In Kerala, which wildlife sanctuary is renowned for hornbill conservation and the Thumboormuzhy weir?",
                        options: ["Chimmony Wildlife Sanctuary", "Thattekad Bird Sanctuary", "Peechi-Vazhani", "Chinnar"],
                        correctAnswer: 0,
                        explanation: "Chimmony Wildlife Sanctuary in Mukundapuram taluk of Thrissur is contiguous with Peechi and Parambikulam, harboring rich bird biodiversity."
                    },
                    {
                        id: "deg_2023_4",
                        question: "Which alloy consists primarily of copper and tin?",
                        options: ["Bronze", "Brass", "Solder", "Invar"],
                        correctAnswer: 0,
                        explanation: "Bronze is traditionally composed of copper combined with tin (usually ~12% tin), whereas brass is copper and zinc."
                    },
                    {
                        id: "deg_2023_5",
                        question: "Who was the Viceroy of India during the launch of the Quit India Movement in August 1942?",
                        options: ["Lord Linlithgow", "Lord Wavell", "Lord Mountbatten", "Lord Willingdon"],
                        correctAnswer: 0,
                        explanation: "Lord Linlithgow served as Viceroy of India from 1936 to 1943 during the Quit India resolution and World War II."
                    }
                ]
            },
            "2025": { available: false, title: "Degree Level 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2022": { available: false, title: "Degree Level 2022 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2021": { available: false, title: "Degree Level 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "Degree Level 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "Degree Level 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "Degree Level 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    },

    tenth: {
        id: "tenth",
        title: "10th Level",
        fullName: "Common Preliminary Exam (10th Level)",
        icon: "🎓",
        badge: "SSLC / 10th Standard",
        description: "Standard question papers for Kerala PSC 10th Level Common Preliminary Examinations (Stages 1–4).",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "10th Level Prelims 2024 Model Paper",
                paperCode: "10th Level Prelims Stage 1 - 2024",
                questionsCount: 5,
                questions: [
                    {
                        id: "tenth_2024_1",
                        question: "In which year did the legendary Vaikom Satyagraha begin?",
                        options: ["1924", "1921", "1931", "1936"],
                        correctAnswer: 0,
                        explanation: "The Vaikom Satyagraha began on March 30, 1924, demanding the opening of temple-adjacent public roads to all castes."
                    },
                    {
                        id: "tenth_2024_2",
                        question: "Who is known as the father of Indian Renaissance?",
                        options: ["Raja Ram Mohan Roy", "Swami Vivekananda", "Ishwar Chandra Vidyasagar", "Dayananda Saraswati"],
                        correctAnswer: 0,
                        explanation: "Raja Ram Mohan Roy founded Brahmo Samaj and campaigned for the abolition of Sati (1829)."
                    },
                    {
                        id: "tenth_2024_3",
                        question: "Which planet in the Solar System has the greatest number of confirmed natural satellites (moons)?",
                        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
                        correctAnswer: 0,
                        explanation: "Saturn currently leads the solar system with over 140 confirmed natural satellites, surpassing Jupiter."
                    },
                    {
                        id: "tenth_2024_4",
                        question: "Which constitutional amendment introduced the Goods and Services Tax (GST) in India?",
                        options: ["101st Amendment Act", "100th Amendment Act", "102nd Amendment Act", "103rd Amendment Act"],
                        correctAnswer: 0,
                        explanation: "The 101st Constitutional Amendment Act, 2016 paved the way for the nationwide rollout of GST on 1 July 2017."
                    },
                    {
                        id: "tenth_2024_5",
                        question: "What is the normal body temperature of a healthy human being in Celsius?",
                        options: ["37°C", "35°C", "39°C", "42°C"],
                        correctAnswer: 0,
                        explanation: "Normal human body temperature is approximately 37°C (98.6°F)."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "10th Level Prelims 2023 Model Paper",
                paperCode: "10th Level Prelims Stage 2 - 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "tenth_2023_1",
                        question: "Which is the smallest district in Kerala by geographical area?",
                        options: ["Alappuzha", "Kasaragod", "Wayanad", "Pathanamthitta"],
                        correctAnswer: 0,
                        explanation: "Alappuzha is the smallest district in Kerala with an area of 1,414 sq. km."
                    },
                    {
                        id: "tenth_2023_2",
                        question: "The Temple Entry Proclamation in Travancore was issued in which year?",
                        options: ["1936", "1931", "1924", "1947"],
                        correctAnswer: 0,
                        explanation: "Sri Chithira Thirunal Balarama Varma issued the historic Temple Entry Proclamation on November 12, 1936."
                    },
                    {
                        id: "tenth_2023_3",
                        question: "Which blood group is known as the Universal Recipient?",
                        options: ["AB Positive", "O Negative", "A Positive", "B Negative"],
                        correctAnswer: 0,
                        explanation: "AB Positive individuals have both A and B antigens and Rh factor, meaning they can receive red blood cells from any blood group."
                    },
                    {
                        id: "tenth_2023_4",
                        question: "The headquarters of the Reserve Bank of India (RBI) is located in:",
                        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
                        correctAnswer: 0,
                        explanation: "The Reserve Bank of India was established in 1935 in Kolkata and permanently moved to Mumbai in 1937."
                    },
                    {
                        id: "tenth_2023_5",
                        question: "Who wrote India's national anthem 'Jana Gana Mana'?",
                        options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Sri Aurobindo"],
                        correctAnswer: 0,
                        explanation: "Rabindranath Tagore composed 'Jana Gana Mana' in Bengali, officially adopted as the National Anthem on January 24, 1950."
                    }
                ]
            },
            "2025": { available: false, title: "10th Level 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2022": { available: false, title: "10th Level 2022 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2021": { available: false, title: "10th Level 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "10th Level 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "10th Level 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "10th Level 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    },

    plustwo: {
        id: "plustwo",
        title: "Plus Two Level",
        fullName: "Plus Two Level Preliminary & Mains",
        icon: "🏢",
        badge: "Higher Secondary (+2)",
        description: "Question papers for Civil Police Officer (CPO), Fireman, Typist, and Beat Forest Officer exams.",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "Plus Two Level 2024 Model Paper",
                paperCode: "Plus Two Common Prelims - 2024",
                questionsCount: 5,
                questions: [
                    {
                        id: "p2_2024_1",
                        question: "Who founded the 'Atmavidya Sangham' in 1917?",
                        options: ["Vagbhatananda", "Brahmananda Sivayogi", "Chattampi Swamikal", "Ayyathan Gopalan"],
                        correctAnswer: 0,
                        explanation: "Vagbhatananda Guru founded the Atmavidya Sangham in 1917 to fight caste discrimination, idolatry, and superstition."
                    },
                    {
                        id: "p2_2024_2",
                        question: "Which layer of the Earth's atmosphere contains the protective ozone layer?",
                        options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"],
                        correctAnswer: 0,
                        explanation: "The ozone layer is mainly situated in the lower portion of the stratosphere from approximately 15 to 35 kilometers above Earth."
                    },
                    {
                        id: "p2_2024_3",
                        question: "Under the Indian Constitution, the executive head of a State is the:",
                        options: ["Governor", "Chief Minister", "Chief Justice of High Court", "Advocate General"],
                        correctAnswer: 0,
                        explanation: "Article 154 provides that the executive power of the State shall be vested in the Governor and exercised either directly or through subordinate officers."
                    },
                    {
                        id: "p2_2024_4",
                        question: "Which chemical element has the highest thermal conductivity of all metals?",
                        options: ["Silver", "Copper", "Gold", "Aluminium"],
                        correctAnswer: 0,
                        explanation: "Silver possesses the highest electrical and thermal conductivity of all known metals."
                    },
                    {
                        id: "p2_2024_5",
                        question: "The headquarters of ISRO (Indian Space Research Organisation) is located in:",
                        options: ["Bengaluru", "Thiruvananthapuram", "Sriharikota", "Hyderabad"],
                        correctAnswer: 0,
                        explanation: "The Indian Space Research Organisation (ISRO) is headquartered in Antariksh Bhavan, Bengaluru, Karnataka."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "Plus Two Level 2023 Model Paper",
                paperCode: "CPO / Fireman - 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "p2_2023_1",
                        question: "Which pass connects Kerala with Tamil Nadu across the Western Ghats between Palakkad and Coimbatore?",
                        options: ["Palakkad Gap", "Aryankavu Pass", "Thamarassery Pass", "Perambadi Pass"],
                        correctAnswer: 0,
                        explanation: "The Palakkad Gap is a low mountain pass in the Western Ghats with an average width of 30 km connecting Kerala to Tamil Nadu."
                    },
                    {
                        id: "p2_2023_2",
                        question: "Who was the first woman judge of the Supreme Court of India?",
                        options: ["Justice M. Fathima Beevi", "Justice Sujata Manohar", "Justice Ruma Pal", "Justice Gyan Sudha Misra"],
                        correctAnswer: 0,
                        explanation: "Justice M. Fathima Beevi from Kerala was appointed as the first female judge of the Supreme Court of India in 1989."
                    },
                    {
                        id: "p2_2023_3",
                        question: "Which instrument is used to measure atmospheric pressure?",
                        options: ["Barometer", "Hygrometer", "Anemometer", "Altimeter"],
                        correctAnswer: 0,
                        explanation: "A barometer is a scientific instrument used to measure atmospheric pressure, invented by Evangelista Torricelli in 1643."
                    },
                    {
                        id: "p2_2023_4",
                        question: "Which Article of the Indian Constitution empowers the President to impose Financial Emergency?",
                        options: ["Article 360", "Article 352", "Article 356", "Article 365"],
                        correctAnswer: 0,
                        explanation: "Article 360 authorizes the President to declare a Financial Emergency if financial stability or credit of India is threatened."
                    },
                    {
                        id: "p2_2023_5",
                        question: "In which year did Vasco da Gama arrive at Kappad near Kozhikode?",
                        options: ["1498", "1492", "1502", "1510"],
                        correctAnswer: 0,
                        explanation: "Portuguese explorer Vasco da Gama reached Kappad near Kozhikode on May 20, 1498, opening the sea route from Europe to India."
                    }
                ]
            },
            "2025": { available: false, title: "Plus Two Level 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2022": { available: false, title: "Plus Two Level 2022 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2021": { available: false, title: "Plus Two Level 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "Plus Two Level 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "Plus Two Level 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "Plus Two Level 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    },

    lpup: {
        id: "lpup",
        title: "LP/UP Assistant",
        fullName: "LP / UP School Assistant",
        icon: "👩‍💼",
        badge: "Education Department",
        description: "Previous exam papers for Lower Primary (LPSA) and Upper Primary (UPSA) school teacher recruitment.",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "LP/UP Assistant 2024 Model Paper",
                paperCode: "LP/UP Teacher Recruitment - 2024",
                questionsCount: 5,
                questions: [
                    {
                        id: "lpup_2024_1",
                        question: "The Right to Free and Compulsory Education (RTE) Act in India came into effect on:",
                        options: ["April 1, 2010", "August 15, 2009", "January 26, 2010", "October 2, 2011"],
                        correctAnswer: 0,
                        explanation: "The 86th Constitutional Amendment introduced Article 21A, and the RTE Act came into legal effect on April 1, 2010."
                    },
                    {
                        id: "lpup_2024_2",
                        question: "Who was the author of the social satire drama 'Adukkalayil Ninnu Arangathekk' (1929)?",
                        options: ["V. T. Bhattathiripad", "M. P. Bhattathiripad", "Premji", "K. Damodaran"],
                        correctAnswer: 0,
                        explanation: "V. T. Bhattathiripad wrote 'Adukkalayil Ninnu Arangathekk' to advocate for women's education and social liberation among Namboothiris."
                    },
                    {
                        id: "lpup_2024_3",
                        question: "Which psychologist propounded the Theory of Multiple Intelligences?",
                        options: ["Howard Gardner", "Jean Piaget", "Lev Vygotsky", "B. F. Skinner"],
                        correctAnswer: 0,
                        explanation: "Howard Gardner proposed the theory of multiple intelligences in his 1983 book 'Frames of Mind'."
                    },
                    {
                        id: "lpup_2024_4",
                        question: "Which river in Kerala is known as the 'Dakshina Bhagirathi'?",
                        options: ["Pamba", "Periyar", "Bharathapuzha", "Achankovil"],
                        correctAnswer: 0,
                        explanation: "River Pamba is venerated as Dakshina Bhagirathi and is associated with the Sabarimala pilgrimage."
                    },
                    {
                        id: "lpup_2024_5",
                        question: "The concept of 'Learning by Doing' in educational philosophy is associated with:",
                        options: ["John Dewey", "Rousseau", "Froebel", "Maria Montessori"],
                        correctAnswer: 0,
                        explanation: "American philosopher John Dewey championed progressive education centered around 'learning by doing' and experiential learning."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "LP/UP Assistant 2023 Model Paper",
                paperCode: "LPSA / UPSA Exam - 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "lpup_2023_1",
                        question: "Who started the primary school journal 'Vidyasangraham' in Travancore?",
                        options: ["C.M.S. Missionaries", "Rev. George Mathen", "Arnos Pathiri", "Hermann Gundert"],
                        correctAnswer: 0,
                        explanation: "The Church Missionary Society (CMS) published 'Vidyasangraham' (Cottayam College Magazine) beginning in 1864."
                    },
                    {
                        id: "lpup_2023_2",
                        question: "Which article of the Indian Constitution specifies Hindi in Devanagari script as the official language of the Union?",
                        options: ["Article 343", "Article 351", "Article 345", "Article 350A"],
                        correctAnswer: 0,
                        explanation: "Article 343(1) states that the official language of the Union shall be Hindi in Devanagari script."
                    },
                    {
                        id: "lpup_2023_3",
                        question: "The pioneer of the Kindergarten method of early childhood education was:",
                        options: ["Friedrich Froebel", "Maria Montessori", "Johann Pestalozzi", "Herbert Spencer"],
                        correctAnswer: 0,
                        explanation: "German pedagogue Friedrich Froebel developed the concept of Kindergarten ('children's garden') in 1837."
                    },
                    {
                        id: "lpup_2023_4",
                        question: "Who was known as 'Kerala Panini' for his monumental work in Malayalam grammar?",
                        options: ["A. R. Raja Raja Varma", "Kerala Varma Valiya Koil Thampuran", "Kovunni Nedungadi", "Ulloor S. Parameswara Iyer"],
                        correctAnswer: 0,
                        explanation: "A. R. Raja Raja Varma earned the title 'Kerala Panini' for authoring the foundational Malayalam grammar text 'Kerala Panineeyam'."
                    },
                    {
                        id: "lpup_2023_5",
                        question: "Which sanctuary in Kerala is famous as the abode of the endangered Nilgiri Tahr?",
                        options: ["Eravikulam National Park", "Periyar Tiger Reserve", "Parambikulam", "Wayanad Sanctuary"],
                        correctAnswer: 0,
                        explanation: "Eravikulam National Park in Munnar holds the largest surviving wild population of the Nilgiri Tahr (mountain goat)."
                    }
                ]
            },
            "2025": { available: false, title: "LP/UP Assistant 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2022": { available: false, title: "LP/UP Assistant 2022 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2021": { available: false, title: "LP/UP Assistant 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "LP/UP Assistant 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "LP/UP Assistant 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "LP/UP Assistant 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    },

    other: {
        id: "other",
        title: "Other PSC Exams",
        fullName: "Other Kerala PSC Examinations",
        icon: "📚",
        badge: "Special Recruitment",
        description: "Question papers for KAS, Village Field Assistant, Driver, Lab Assistant, and Departmental tests.",
        years: {
            "2024": {
                available: true,
                isSample: true,
                title: "Other PSC Exams 2024 Model Paper",
                paperCode: "Special Recruitment / VFA - 2024",
                questionsCount: 5,
                questions: [
                    {
                        id: "oth_2024_1",
                        question: "The Kerala Administrative Service (KAS) was formally inaugurated in which year?",
                        options: ["2020", "2018", "2016", "2022"],
                        correctAnswer: 0,
                        explanation: "The first preliminary examination for the Kerala Administrative Service (KAS) was conducted in February 2020."
                    },
                    {
                        id: "oth_2024_2",
                        question: "Who among the following founded the 'Ananda Maha Sabha' in 1918?",
                        options: ["Brahmananda Sivayogi", "Vagbhatananda", "Sree Narayana Guru", "Chattampi Swamikal"],
                        correctAnswer: 0,
                        explanation: "Brahmananda Sivayogi established the Ananda Maha Sabha at Alathur in Palakkad in 1918 to propagate Ananda Darsanam."
                    },
                    {
                        id: "oth_2024_3",
                        question: "The Wildlife Protection Act was passed by the Parliament of India in:",
                        options: ["1972", "1980", "1986", "1992"],
                        correctAnswer: 0,
                        explanation: "The Government of India enacted the Wildlife (Protection) Act in 1972 to protect animal and plant species."
                    },
                    {
                        id: "oth_2024_4",
                        question: "Which schedule of the Indian Constitution contains the list of recognized languages?",
                        options: ["Eighth Schedule", "Seventh Schedule", "Ninth Schedule", "Eleventh Schedule"],
                        correctAnswer: 0,
                        explanation: "The Eighth Schedule of the Constitution of India lists the 22 officially recognized languages."
                    },
                    {
                        id: "oth_2024_5",
                        question: "Which place in Kerala is known as the 'Land of Letters, Lakes and Latex'?",
                        options: ["Kottayam", "Kollam", "Alappuzha", "Pathanamthitta"],
                        correctAnswer: 0,
                        explanation: "Kottayam is famed as the 'Land of Letters, Lakes and Latex' due to its publishing houses, backwaters, and rubber estates."
                    }
                ]
            },
            "2023": {
                available: true,
                isSample: true,
                title: "Other PSC Exams 2023 Model Paper",
                paperCode: "Departmental & Special Exam - 2023",
                questionsCount: 5,
                questions: [
                    {
                        id: "oth_2023_1",
                        question: "Who was known as 'Lincoln of Kerala' for his lifelong campaign against social inequality?",
                        options: ["Pandit Karuppan", "Ayyankali", "Sahodaran Ayyappan", "Dr. Palpu"],
                        correctAnswer: 0,
                        explanation: "Pandit K. P. Karuppan was hailed as the 'Lincoln of Kerala' for fighting social ostracism and uplifting the Dheevara community."
                    },
                    {
                        id: "oth_2023_2",
                        question: "Which Indian state was the first to establish a Panchayati Raj institution?",
                        options: ["Rajasthan", "Andhra Pradesh", "Kerala", "Gujarat"],
                        correctAnswer: 0,
                        explanation: "Panchayati Raj was first inaugurated in Nagaur district of Rajasthan on October 2, 1959 by Prime Minister Jawaharlal Nehru."
                    },
                    {
                        id: "oth_2023_3",
                        question: "What is the primary source of energy for all living ecosystems on Earth?",
                        options: ["Solar Radiation", "Geothermal Energy", "Nuclear Fusion", "Tidal Energy"],
                        correctAnswer: 0,
                        explanation: "Solar energy from sunlight is the primary source of energy, captured by green plants via photosynthesis."
                    },
                    {
                        id: "oth_2023_4",
                        question: "Who was the first Governor of Kerala state after reorganization in 1956?",
                        options: ["Burgula Ramakrishna Rao", "V. V. Giri", "Ajit Prasad Jain", "Bhagwan Sahay"],
                        correctAnswer: 0,
                        explanation: "Dr. Burgula Ramakrishna Rao was appointed the first Governor of the newly formed state of Kerala on November 22, 1956."
                    },
                    {
                        id: "oth_2023_5",
                        question: "The Kudumbashree poverty eradication and women empowerment mission was launched in Kerala in:",
                        options: ["1998", "1995", "2001", "2005"],
                        correctAnswer: 0,
                        explanation: "Kudumbashree was launched on May 17, 1998, by Prime Minister Atal Bihari Vajpayee in Malappuram."
                    }
                ]
            },
            "2025": { available: false, title: "Other PSC Exams 2025 Paper", paperCode: "Exam notification scheduled", questions: [] },
            "2022": { available: false, title: "Other PSC Exams 2022 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2021": { available: false, title: "Other PSC Exams 2021 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2020": { available: false, title: "Other PSC Exams 2020 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2019": { available: false, title: "Other PSC Exams 2019 Paper", paperCode: "Official paper archive pending verification", questions: [] },
            "2018": { available: false, title: "Other PSC Exams 2018 Paper", paperCode: "Official paper archive pending verification", questions: [] }
        }
    }
};

// =============================================================================
// PYQ HELPER FUNCTIONS
// =============================================================================

/**
 * Returns an array of all exam categories in the PYQ Bank.
 * @returns {Array} List of exam metadata objects
 */
function getPYQExams() {
    return Object.values(PYQ_DATA);
}

/**
 * Returns exam data for a specific exam ID.
 * @param {string} examId - e.g. "ldc", "degree", "tenth", "plustwo", "lpup", "other"
 * @returns {Object|null}
 */
function getPYQExamData(examId) {
    if (!examId) return null;
    return PYQ_DATA[examId.toLowerCase()] || null;
}

/**
 * Returns paper data for a given exam and year.
 * @param {string} examId - e.g. "ldc"
 * @param {string} year - e.g. "2024"
 * @returns {Object|null}
 */
function getPYQPaper(examId, year) {
    const exam = getPYQExamData(examId);
    if (!exam || !exam.years || !exam.years[year]) return null;
    return exam.years[year];
}


