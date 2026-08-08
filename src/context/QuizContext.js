import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const QuizContext = createContext();

export const BUILT_IN_QUIZZES = [
  {
    id: 'math-101',
    title: 'Mastering Mathematics',
    category: 'Mathematics',
    difficulty: 'Medium',
    description: 'Test your geometry, arithmetic progression, and algebraic skills with math challenges.',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-600',
    shareSlug: 'math-101',
    questions: [
      {
        id: 'q-m1',
        question: 'Which of the following triangles have all three equal side lengths?',
        options: ['Scalene', 'Isosceles', 'Equilateral', 'Right angled'],
        correctIndex: 2
      },
      {
        id: 'q-m2',
        question: 'What is the area formula for an equilateral triangle with side length a?',
        options: ['√3/2 * a', '√3/2 * a²', '√3/4 * a²', '√3/4 * a'],
        correctIndex: 2
      },
      {
        id: 'q-m3',
        question: 'The diagonals of a rhombus are 16 cm and 12 cm. What is the length of its side?',
        options: ['10 cm', '8 cm', '20 cm', '9 cm'],
        correctIndex: 0
      },
      {
        id: 'q-m4',
        question: 'If the perimeter of a triangle is 100 cm and two sides are 30 cm and 40 cm, the third side is:',
        options: ['30 cm', '40 cm', '50 cm', '60 cm'],
        correctIndex: 0
      },
      {
        id: 'q-m5',
        question: 'How many parallel tangents can a single circle have at the same time?',
        options: ['1', '2', '3', 'Infinite'],
        correctIndex: 1
      },
      {
        id: 'q-m6',
        question: 'A line intersecting a circle at two distinct points is called a:',
        options: ['Secant', 'Chord', 'Diameter', 'Tangent'],
        correctIndex: 0
      },
      {
        id: 'q-m7',
        question: 'The sum of two numbers is 27 and their product is 182. What are the numbers?',
        options: ['12 and 13', '13 and 14', '12 and 15', '13 and 24'],
        correctIndex: 1
      },
      {
        id: 'q-m8',
        question: 'In an Arithmetic Progression, if a = 28, d = -4, n = 7, then the nth term is:',
        options: ['4', '5', '3', '7'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'react-101',
    title: 'React 18 & Modern Hooks Mastery',
    category: 'React.js',
    difficulty: 'Medium',
    description: 'Master Virtual DOM diffing, useEffect hooks, useCallback optimization, and React 18 state management.',
    icon: 'Code2',
    color: 'from-cyan-500 to-blue-600',
    shareSlug: 'react-101',
    questions: [
      {
        id: 'q-r1',
        question: 'Which mechanism does React use to maximize rendering performance before DOM updates?',
        options: ['Direct DOM Manipulation', 'Virtual DOM Tree Reconciliation', 'Shadow DOM encapsulation', 'Full Browser Reloads'],
        correctIndex: 1
      },
      {
        id: 'q-r2',
        question: 'What are the two primary ways to manage data inside functional React components?',
        options: ['State & Props', 'Services & Controllers', 'Context & Reducers only', 'Global Variables & Closures'],
        correctIndex: 0
      },
      {
        id: 'q-r3',
        question: 'What is the primary purpose of the `key` prop when rendering dynamic lists in React?',
        options: ['Applying CSS styles', 'Helping React identify which items have changed, added, or removed', 'Determining list item order', 'Enabling drag-and-drop animations'],
        correctIndex: 1
      },
      {
        id: 'q-r4',
        question: 'Which hook should be used to memoize a callback function instance between renders?',
        options: ['useMemo', 'useCallback', 'useEffect', 'useRef'],
        correctIndex: 1
      },
      {
        id: 'q-r5',
        question: 'How do you store a mutable value in React that persists across renders WITHOUT causing a re-render?',
        options: ['useState', 'useRef', 'useMemo', 'useReducer'],
        correctIndex: 1
      },
      {
        id: 'q-r6',
        question: 'What is the primary benefit of the React Context API?',
        options: ['Faster DOM calculation speed', 'Passing data through component tree without prop drilling', 'Replacing database storage', 'Automating CSS stylesheet imports'],
        correctIndex: 1
      },
      {
        id: 'q-r7',
        question: 'What does `React.memo` do when wrapping a functional component?',
        options: ['Prevents re-renders if incoming props have not changed', 'Memoizes state variables permanently', 'Enables server-side rendering automatically', 'Converts component to class component'],
        correctIndex: 0
      },
      {
        id: 'q-r8',
        question: 'Which hook was introduced in React 18 for marking non-urgent state updates to keep UI responsive?',
        options: ['useTransition', 'useDeferredValue', 'useId', 'useSyncExternalStore'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'js-101',
    title: 'JavaScript ES6+ & Async Deep Dive',
    category: 'JavaScript',
    difficulty: 'Medium',
    description: 'Test your understanding of JavaScript Event Loop, closures, Promises, arrow functions, and ES6+ features.',
    icon: 'FileCode2',
    color: 'from-amber-500 to-orange-600',
    shareSlug: 'js-101',
    questions: [
      {
        id: 'q-j1',
        question: 'Which keywords were introduced in ES6 for block-scoped variable declarations?',
        options: ['var and let', 'let and const', 'const and type', 'def and val'],
        correctIndex: 1
      },
      {
        id: 'q-j2',
        question: 'What is the evaluated output of `typeof NaN` in JavaScript?',
        options: ['number', 'nan', 'undefined', 'object'],
        correctIndex: 0
      },
      {
        id: 'q-j3',
        question: 'In the JavaScript Event Loop, which queue takes precedence for immediate execution?',
        options: ['Microtask Queue (Promises / queueMicrotask)', 'Macrotask Queue (setTimeout / setInterval)', 'DOM Events Queue', 'Render Animation Queue'],
        correctIndex: 0
      },
      {
        id: 'q-j4',
        question: 'How does the `this` keyword behave inside an Arrow Function?',
        options: ['Bound dynamically at call time', 'Lexically bound to surrounding enclosing scope', 'Always points to global window object', 'Undefined in strict mode'],
        correctIndex: 1
      },
      {
        id: 'q-j5',
        question: 'Which operator performs strict equality check (comparing both value and data type)?',
        options: ['==', '===', '=', '!='],
        correctIndex: 1
      },
      {
        id: 'q-j6',
        question: 'What is a Closure in JavaScript?',
        options: ['A function bundled together with references to its surrounding lexical scope', 'A method to close browser windows', 'A syntax error handler', 'A database connection wrapper'],
        correctIndex: 0
      },
      {
        id: 'q-j7',
        question: 'What does `Object.freeze(obj)` accomplish in JavaScript?',
        options: ['Prevents adding, deleting, or modifying existing properties of an object', 'Converts object keys to uppercase', 'Deletes all undefined properties', 'Makes object iterable'],
        correctIndex: 0
      },
      {
        id: 'q-j8',
        question: 'Which built-in JS method executes a reducer function on each array element to return a single output value?',
        options: ['map()', 'filter()', 'reduce()', 'find()'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'mysql-101',
    title: 'MySQL & Relational Database Design',
    category: 'MySQL',
    difficulty: 'Medium',
    description: 'Master SQL joins, indexes, ACID transactions, normalization, and InnoDB engine mechanics.',
    icon: 'Database',
    color: 'from-blue-500 to-cyan-600',
    shareSlug: 'mysql-101',
    questions: [
      {
        id: 'q-sql1',
        question: 'What is the main difference between the `WHERE` and `HAVING` clauses in SQL?',
        options: ['`WHERE` filters rows before grouping; `HAVING` filters aggregated groups after `GROUP BY`', '`HAVING` is faster than `WHERE`', '`WHERE` only works with numbers', 'They are completely identical'],
        correctIndex: 0
      },
      {
        id: 'q-sql2',
        question: 'Which SQL JOIN returns all records from the left table and matching records from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
        correctIndex: 1
      },
      {
        id: 'q-sql3',
        question: 'What does the `ACID` acronym stand for in database transaction management?',
        options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Index, Data', 'Array, Column, Index, Directory', 'Automated, Concurrent, Isolated, Distributed'],
        correctIndex: 0
      },
      {
        id: 'q-sql4',
        question: 'Which data structure is most commonly utilized by the MySQL InnoDB engine for primary key indexing?',
        options: ['B-Tree / B+Tree', 'HashTable', 'Binary Search Tree', 'Linked List'],
        correctIndex: 0
      },
      {
        id: 'q-sql5',
        question: 'What is the main objective of Database Normalization up to 3NF?',
        options: ['Increasing table storage size', 'Eliminating redundant data and preventing update anomalies', 'Compressing index files', 'Removing all foreign keys'],
        correctIndex: 1
      },
      {
        id: 'q-sql6',
        question: 'Which command deletes all rows from a table by dropping and re-creating the table structure quickly?',
        options: ['DELETE FROM table', 'TRUNCATE TABLE', 'DROP TABLE', 'REMOVE TABLE'],
        correctIndex: 1
      },
      {
        id: 'q-sql7',
        question: 'Which storage engine is the default transactional engine in modern MySQL versions?',
        options: ['MyISAM', 'InnoDB', 'Memory', 'CSV'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'python-101',
    title: 'Python 3 & Data Structures',
    category: 'Python',
    difficulty: 'Easy',
    description: 'Test your Python comprehension, list comprehensions, decorators, generators, and data types.',
    icon: 'Terminal',
    color: 'from-emerald-600 to-green-600',
    shareSlug: 'python-101',
    questions: [
      {
        id: 'q-py1',
        question: 'Which of the following built-in Python data types is immutable (cannot be modified after creation)?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctIndex: 3
      },
      {
        id: 'q-py2',
        question: 'Which keyword turns a Python function into a Generator that yields values lazily on demand?',
        options: ['return', 'yield', 'emit', 'generate'],
        correctIndex: 1
      },
      {
        id: 'q-py3',
        question: 'What is the role of `*args` and `**kwargs` in Python function definitions?',
        options: ['`*args` passes positional arguments as tuple; `**kwargs` passes keyword arguments as dictionary', 'They enable thread locking', 'They declare global variables', 'They format output strings'],
        correctIndex: 0
      },
      {
        id: 'q-py4',
        question: 'What is the Python Global Interpreter Lock (GIL)?',
        options: ['A mechanism preventing multiple native threads from executing Python bytecodes simultaneously in CPython', 'A file security system', 'A database lock algorithm', 'A compiler optimization flag'],
        correctIndex: 0
      },
      {
        id: 'q-py5',
        question: 'What is the evaluated result of `[x**2 for x in range(5) if x % 2 == 0]` in Python?',
        options: ['[0, 4, 16]', '[1, 9, 25]', '[0, 2, 4]', '[0, 1, 4, 9, 16]'],
        correctIndex: 0
      },
      {
        id: 'q-py6',
        question: 'What is the primary difference between `is` and `==` in Python?',
        options: ['`is` checks memory object identity; `==` checks value equality', '`is` compares strings only', '`==` checks memory addresses', 'They are completely identical'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'css-101',
    title: 'CSS3 & Modern Responsive Layouts',
    category: 'CSS',
    difficulty: 'Medium',
    description: 'Challenge your knowledge of CSS Flexbox, Grid, Box Model, specificity, and variables.',
    icon: 'Palette',
    color: 'from-pink-500 to-rose-600',
    shareSlug: 'css-101',
    questions: [
      {
        id: 'q-c1',
        question: 'Which `box-sizing` value includes padding and border inside the element\'s specified width and height?',
        options: ['content-box', 'border-box', 'padding-box', 'inherit'],
        correctIndex: 1
      },
      {
        id: 'q-c2',
        question: 'In CSS Flexbox, which property aligns items along the primary main axis?',
        options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
        correctIndex: 1
      },
      {
        id: 'q-c3',
        question: 'What is the correct CSS selector specificity order from HIGHEST to LOWEST priority?',
        options: ['Inline styles > ID selector > Class selector > Element selector', 'ID selector > Inline styles > Class selector > Element selector', 'Element selector > Class > ID > Inline', 'Class > ID > Inline > Element'],
        correctIndex: 0
      },
      {
        id: 'q-c4',
        question: 'Which CSS Grid property enables responsive column layout without hardcoded media queries?',
        options: ['grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))', 'flex-wrap: wrap', 'column-count: 3', 'display: inline-block'],
        correctIndex: 0
      },
      {
        id: 'q-c5',
        question: 'How do you access a CSS custom property (variable) named `--primary-color`?',
        options: ['color: var(--primary-color)', 'color: $primary-color', 'color: @primary-color', 'color: val(--primary-color)'],
        correctIndex: 0
      },
      {
        id: 'q-c6',
        question: 'What is the main difference between `display: none` and `visibility: hidden`?',
        options: ['`display: none` removes element from layout flow; `visibility: hidden` hides it while preserving layout space', '`visibility: hidden` removes element from DOM', '`display: none` works only in flexbox', 'They behave identically'],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'gk-101',
    title: 'World General Knowledge',
    category: 'General Knowledge',
    difficulty: 'Easy',
    description: 'Explore trivia about world geography, famous capitals, and historical world facts.',
    icon: 'Globe',
    color: 'from-emerald-500 to-teal-600',
    shareSlug: 'gk-101',
    questions: [
      {
        id: 'q-g1',
        question: 'Which is the largest ocean on Earth by surface area?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctIndex: 2
      },
      {
        id: 'q-g2',
        question: 'Which nation is poetically known as the "Land of the Rising Sun"?',
        options: ['China', 'Japan', 'South Korea', 'Thailand'],
        correctIndex: 1
      },
      {
        id: 'q-g3',
        question: 'What is the capital city of France?',
        options: ['Madrid', 'Berlin', 'Rome', 'Paris'],
        correctIndex: 3
      },
      {
        id: 'q-g4',
        question: 'Which river is widely recognized as the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'sci-101',
    title: 'Space & Science Odyssey',
    category: 'Science',
    difficulty: 'Hard',
    description: 'Dive deep into astronomy, physics constants, biology, and chemistry trivia.',
    icon: 'Sparkles',
    color: 'from-purple-600 to-pink-600',
    shareSlug: 'sci-101',
    questions: [
      {
        id: 'q-s1',
        question: 'What is the chemical symbol for Gold in the periodic table?',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        correctIndex: 0
      },
      {
        id: 'q-s2',
        question: 'Which planet in our solar system is famously known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctIndex: 1
      },
      {
        id: 'q-s3',
        question: 'What is the approximate speed of light in a vacuum?',
        options: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '30,000 km/s'],
        correctIndex: 0
      },
      {
        id: 'q-s4',
        question: 'Which organelle is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'hist-101',
    title: 'World History Milestones',
    category: 'History',
    difficulty: 'Medium',
    description: 'Test your understanding of major world conflicts, leaders, and ancient civilizations.',
    icon: 'BookOpen',
    color: 'from-rose-500 to-red-600',
    shareSlug: 'hist-101',
    questions: [
      {
        id: 'q-h1',
        question: 'In which year did World War II officially conclude?',
        options: ['1943', '1945', '1950', '1939'],
        correctIndex: 1
      },
      {
        id: 'q-h2',
        question: 'Who served as the first President of the United States of America?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
        correctIndex: 2
      },
      {
        id: 'q-h3',
        question: 'The ancient civilization of Mesopotamia was situated between which two rivers?',
        options: ['Nile and Amazon', 'Tigris and Euphrates', 'Ganges and Indus', 'Yellow and Yangtze'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'tech-101',
    title: 'System Architecture & Web Tech',
    category: 'Tech & Coding',
    difficulty: 'Hard',
    description: 'Advanced quiz covering HTTP status codes, data structures, algorithms, and web security.',
    icon: 'Terminal',
    color: 'from-violet-600 to-purple-800',
    shareSlug: 'tech-101',
    questions: [
      {
        id: 'q-t1',
        question: 'What does the HTTP status code 404 indicate?',
        options: ['Unauthorized Access', 'Internal Server Error', 'Not Found', 'Bad Request'],
        correctIndex: 2
      },
      {
        id: 'q-t2',
        question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        correctIndex: 1
      },
      {
        id: 'q-t3',
        question: 'What is the average search time complexity in a balanced Binary Search Tree?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctIndex: 2
      },
      {
        id: 'q-t4',
        question: 'Which standard protocol provides encrypted and authenticated communication over web networks?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'couples-101',
    title: 'Love & Couple Chemistry Quiz ❤️',
    category: 'Couples & Romance',
    difficulty: 'Easy',
    description: 'A special romantic quiz for partners to test how well they know each other and leave personal thoughts on every question!',
    icon: 'Heart',
    color: 'from-pink-500 to-rose-600',
    shareSlug: 'couples-101',
    questions: [
      {
        id: 'q-love1',
        question: 'Where did we go on our first official date together?',
        options: ['A cozy coffee shop ☕', 'A romantic dinner restaurant 🍷', 'A fun movie theater 🍿', 'A walk in the park 🌳'],
        correctIndex: 0
      },
      {
        id: 'q-love2',
        question: 'What is my ultimate go-to comfort food after a long day?',
        options: ['Pizza & Ice cream 🍕🍦', 'Hot Ramen or Soup 🍜', 'Burgers & Fries 🍔🍟', 'Chocolate & Dessert 🍫🍰'],
        correctIndex: 0
      },
      {
        id: 'q-love3',
        question: 'What is our dream vacation destination together?',
        options: ['Tropical beach resort in Bali / Maldives 🌴', 'Historic road trip across Europe 🏰', 'Cozy mountain cabin in Switzerland 🏔️', 'Exploring vibrant night markets in Japan 🗾'],
        correctIndex: 0
      },
      {
        id: 'q-love4',
        question: 'What is my primary Love Language?',
        options: ['Quality Time ⏳', 'Words of Affirmation 💬', 'Acts of Service 🤝', 'Physical Touch & Hugs 🤗'],
        correctIndex: 0
      },
      {
        id: 'q-love5',
        question: 'Who is most likely to fall asleep first during movie night?',
        options: ['Definitely Me! 😴', 'Definitely You! 😴', 'Both of us at the same time! 🌙', 'Neither — we watch till 3 AM! 🎬'],
        correctIndex: 1
      },
      {
        id: 'q-love6',
        question: 'What was my first impression / thought when we first met?',
        options: ['"Who is this gorgeous angel?" 😍', '"Wow, what an incredible smile!" ✨', '"I need to get to know them right now!" ❤️', '"I felt an instant spark of magic!" ⚡'],
        correctIndex: 0
      },
      {
        id: 'q-love7',
        question: 'What is our ultimate idea of a perfect date night?',
        options: ['Fancy candlelit dinner 🕯️', 'Cooking together while playing music 🍳🎶', 'Late night drive with coffee 🚘☕', 'Cuddling in blankets watching movies 🍿🛋️'],
        correctIndex: 3
      },
      {
        id: 'q-love8',
        question: 'Who made the first romantic move / confession in our story?',
        options: ['I did! With butterflies in my heart 💓', 'You did! And it made my world light up ✨', 'We both kind of knew at the exact same moment! 🥰', 'It was a sweet secret for a bit! 🤫❤️'],
        correctIndex: 0
      },
      {
        id: 'q-love9',
        question: 'What is my secret superpower in our relationship?',
        options: ['Always making you laugh when you are down 😂', 'Giving the warmest, safest hugs 🤗', 'Remembering tiny details & surprising you 🎁', 'Being your #1 biggest supporter always 🏆'],
        correctIndex: 3
      },
      {
        id: 'q-love10',
        question: 'How long will I continue to love and cherish you?',
        options: ['Forever & Always! ❤️', 'To infinity and beyond! ✨', 'In every parallel universe! 🌌', 'All of the above and more! 💖'],
        correctIndex: 3
      }
    ]
  }
];

export const QuizProvider = ({ children }) => {
  // Custom user-created quizzes state
  const [customQuizzes, setCustomQuizzes] = useState(() => {
    const saved = localStorage.getItem('quizzes_custom');
    return saved ? JSON.parse(saved) : [];
  });

  // User attempts state
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem('quizzes_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  // Global Leaderboard state
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('quizzes_leaderboard');
    return saved ? JSON.parse(saved) : [
      { id: '1', quizId: 'react-101', playerName: 'Alex SDE', score: 6, total: 6, percentage: 100, timeSec: 42, date: '2026-08-01' },
      { id: '2', quizId: 'math-101', playerName: 'Sarah MathGenius', score: 8, total: 8, percentage: 100, timeSec: 65, date: '2026-08-03' },
      { id: '3', quizId: 'js-101', playerName: 'DevJohn', score: 5, total: 6, percentage: 83, timeSec: 38, date: '2026-08-05' }
    ];
  });

  // Combined Quizzes (built-in + public custom)
  const allQuizzes = [...BUILT_IN_QUIZZES, ...customQuizzes];

  // Active Play Session State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(45); // 45s per question timer
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [lastCompletedResult, setLastCompletedResult] = useState(null);

  // Sync customQuizzes with localStorage
  useEffect(() => {
    localStorage.setItem('quizzes_custom', JSON.stringify(customQuizzes));
  }, [customQuizzes]);

  // Sync attempts with localStorage
  useEffect(() => {
    localStorage.setItem('quizzes_attempts', JSON.stringify(attempts));
  }, [attempts]);

  // Sync leaderboard with localStorage
  useEffect(() => {
    localStorage.setItem('quizzes_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const [quizSettings, setQuizSettings] = useState({
    timerEnabled: true,
    timePerQuestion: 45
  });

  // Timer countdown effect when playing active quiz
  useEffect(() => {
    let interval = null;
    if (activeQuiz && !isQuizCompleted && quizSettings.timerEnabled && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
        setTotalTimeTaken(prev => prev + 1);
      }, 1000);
    } else if (activeQuiz && !isQuizCompleted && quizSettings.timerEnabled && timeRemaining === 0) {
      // Time expired for current question -> auto advance or finish
      if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeRemaining(quizSettings.timePerQuestion);
      } else {
        finishQuiz();
      }
    } else if (activeQuiz && !isQuizCompleted && !quizSettings.timerEnabled) {
      // Untimed mode: count total time taken without question timeout
      interval = setInterval(() => {
        setTotalTimeTaken(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuiz, isQuizCompleted, timeRemaining, currentQuestionIndex, quizSettings]);

  // Start playing a quiz with custom timer settings
  const [questionRemarks, setQuestionRemarks] = useState({});

  const setQuestionRemark = (questionId, remarkText) => {
    setQuestionRemarks(prev => ({
      ...prev,
      [questionId]: remarkText
    }));
  };

  const startQuiz = (quiz, customSettings = null) => {
    const activeSettings = customSettings || quizSettings;
    setQuizSettings(activeSettings);
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuestionRemarks({});
    setTimeRemaining(activeSettings.timerEnabled ? activeSettings.timePerQuestion : null);
    setTotalTimeTaken(0);
    setIsQuizCompleted(false);
    setLastCompletedResult(null);
  };

  // Select option for current question
  const selectOption = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Next Question / Submit
  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(quizSettings.timerEnabled ? quizSettings.timePerQuestion : null);
    } else {
      finishQuiz();
    }
  };

  // Finish Quiz & calculate score
  const finishQuiz = (guestName = null) => {
    if (!activeQuiz) return;
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      if (userChoice === q.correctIndex) {
        score++;
      }
    });

    const total = activeQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const dateStr = new Date().toISOString().split('T')[0];
    const playerName = guestName || 'Quiz Player';

    const result = {
      id: nanoid(10),
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      quizCategory: activeQuiz.category,
      quizDifficulty: activeQuiz.difficulty,
      score,
      total,
      percentage,
      timeSec: totalTimeTaken,
      date: dateStr,
      playerName,
      questions: activeQuiz.questions,
      selectedAnswers: { ...selectedAnswers },
      questionRemarks: { ...questionRemarks },
      romanticRemark: ''
    };

    setLastCompletedResult(result);
    setIsQuizCompleted(true);

    // Save attempt to history
    setAttempts(prev => [result, ...prev]);

    // Save score to leaderboard
    setLeaderboard(prev => [
      {
        id: result.id,
        quizId: activeQuiz.id,
        playerName,
        score,
        total,
        percentage,
        timeSec: totalTimeTaken,
        date: dateStr,
        romanticRemark: ''
      },
      ...prev
    ]);
  };

  // Save romantic note / written remark for an attempt
  const saveAttemptRemark = (attemptId, remarkText) => {
    setLastCompletedResult(prev => (prev && prev.id === attemptId ? { ...prev, romanticRemark: remarkText } : prev));
    setAttempts(prev => prev.map(item => item.id === attemptId ? { ...item, romanticRemark: remarkText } : item));
    setLeaderboard(prev => prev.map(item => item.id === attemptId ? { ...item, romanticRemark: remarkText } : item));
  };

  // Import a shared response attempt sent by partner
  const importAttemptResponse = (parsedResponse) => {
    if (!parsedResponse || !parsedResponse.t) return;
    const importedResult = {
      id: `res-${nanoid(8)}`,
      quizId: 'imported-couples',
      quizTitle: parsedResponse.t,
      quizCategory: parsedResponse.c || 'Couples & Romance',
      quizDifficulty: 'Easy',
      score: parsedResponse.s || 0,
      total: parsedResponse.tot || (parsedResponse.q ? parsedResponse.q.length : 0),
      percentage: 100,
      timeSec: parsedResponse.time || 0,
      date: parsedResponse.d || new Date().toISOString().split('T')[0],
      playerName: parsedResponse.p || 'Partner',
      questions: parsedResponse.q ? parsedResponse.q.map((item, idx) => ({ id: item.id || `q-${idx}`, question: item.text, options: item.opts })) : [],
      selectedAnswers: parsedResponse.ans || {},
      questionRemarks: parsedResponse.rem || {},
      romanticRemark: parsedResponse.note || ''
    };

    setAttempts(prev => {
      if (prev.some(item => item.quizTitle === importedResult.quizTitle && item.romanticRemark === importedResult.romanticRemark && item.playerName === importedResult.playerName)) {
        return prev;
      }
      return [importedResult, ...prev];
    });
  };

  // Create a new user quiz
  const createQuiz = (newQuizData) => {
    const slug = nanoid(8);
    const newQuiz = {
      id: `custom-${nanoid(8)}`,
      title: newQuizData.title,
      category: newQuizData.category || 'General',
      difficulty: newQuizData.difficulty || 'Medium',
      description: newQuizData.description || 'User created custom quiz.',
      icon: 'PenTool',
      color: 'from-purple-600 to-indigo-600',
      isUserCreated: true,
      visibility: newQuizData.visibility || 'public',
      createdByName: newQuizData.authorName || 'Community Author',
      shareSlug: slug,
      questions: newQuizData.questions
    };

    setCustomQuizzes(prev => [newQuiz, ...prev]);
    return newQuiz;
  };

  // Delete a user-created quiz
  const deleteQuiz = (quizId) => {
    setCustomQuizzes(prev => prev.filter(q => q.id !== quizId && q.shareSlug !== quizId));
  };

  // Update an existing user-created quiz
  const updateQuiz = (quizId, updatedData) => {
    setCustomQuizzes(prev => prev.map(q => {
      if (q.id === quizId || q.shareSlug === quizId) {
        return {
          ...q,
          title: updatedData.title,
          category: updatedData.category || 'General',
          difficulty: updatedData.difficulty || 'Medium',
          description: updatedData.description || 'User created custom quiz.',
          createdByName: updatedData.authorName || q.createdByName,
          visibility: updatedData.visibility || q.visibility,
          questions: updatedData.questions
        };
      }
      return q;
    }));
  };

  // Import quiz from share URL payload if opening on a new browser/device
  const importQuiz = (importedQuiz) => {
    if (!importedQuiz || !importedQuiz.id) return;
    setCustomQuizzes(prev => {
      if (prev.some(q => q.id === importedQuiz.id || q.shareSlug === importedQuiz.shareSlug)) {
        return prev;
      }
      return [importedQuiz, ...prev];
    });
  };

  return (
    <QuizContext.Provider value={{
      allQuizzes,
      customQuizzes,
      BUILT_IN_QUIZZES,
      attempts,
      leaderboard,
      activeQuiz,
      quizSettings,
      setQuizSettings,
      currentQuestionIndex,
      selectedAnswers,
      questionRemarks,
      setQuestionRemark,
      timeRemaining,
      totalTimeTaken,
      isQuizCompleted,
      lastCompletedResult,
      startQuiz,
      selectOption,
      handleNextQuestion,
      finishQuiz,
      saveAttemptRemark,
      importAttemptResponse,
      createQuiz,
      deleteQuiz,
      updateQuiz,
      importQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
