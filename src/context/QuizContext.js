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
    title: 'React Fundamentals & Core Concepts',
    category: 'React.js',
    difficulty: 'Medium',
    description: 'Challenge your knowledge of Virtual DOM, hooks, state management, and props in React.',
    icon: 'Code2',
    color: 'from-cyan-500 to-blue-600',
    shareSlug: 'react-101',
    questions: [
      {
        id: 'q-r1',
        question: 'Which mechanism does React use to maximize rendering performance?',
        options: ['Direct DOM Manipulation', 'Virtual DOM', 'Shadow DOM only', 'Browser Reloads'],
        correctIndex: 1
      },
      {
        id: 'q-r2',
        question: 'What are the two primary ways to handle data inside React components?',
        options: ['State & Props', 'Services & Controllers', 'Context & Reducers only', 'Variables & Functions'],
        correctIndex: 0
      },
      {
        id: 'q-r3',
        question: 'What is the primary purpose of the `key` prop when rendering lists in React?',
        options: ['Styling list items', 'Helping React identify which items have changed or been removed', 'Determining list order', 'Enabling drag and drop'],
        correctIndex: 1
      },
      {
        id: 'q-r4',
        question: 'Which hook is used to perform side effects in functional React components?',
        options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
        correctIndex: 2
      },
      {
        id: 'q-r5',
        question: 'Does React create a Virtual DOM tree in memory before patching the actual browser DOM?',
        options: ['True', 'False', 'Only in class components', 'Only in production builds'],
        correctIndex: 0
      },
      {
        id: 'q-r6',
        question: 'What is the main benefit of the React Context API?',
        options: ['Faster rendering speed', 'Passing data through component tree without prop drilling', 'Replacing database storage', 'Managing CSS stylesheets'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'js-101',
    title: 'JavaScript Essentials & ES6+',
    category: 'JavaScript',
    difficulty: 'Easy',
    description: 'Master JavaScript scope, ES6 syntax, closures, and essential array manipulation methods.',
    icon: 'FileCode2',
    color: 'from-amber-500 to-orange-600',
    shareSlug: 'js-101',
    questions: [
      {
        id: 'q-j1',
        question: 'Which keywords were introduced in ES6 for block-scoped variable declaration?',
        options: ['var and let', 'let and const', 'const and type', 'def and val'],
        correctIndex: 1
      },
      {
        id: 'q-j2',
        question: 'What is the output evaluation of `typeof NaN` in JavaScript?',
        options: ['number', 'nan', 'undefined', 'object'],
        correctIndex: 0
      },
      {
        id: 'q-j3',
        question: 'Which array method creates a new array with all elements that pass a given test condition?',
        options: ['map()', 'filter()', 'reduce()', 'forEach()'],
        correctIndex: 1
      },
      {
        id: 'q-j4',
        question: 'What does ES6 stand for?',
        options: ['ECMAScript 6', 'ECMA 6', 'ECMAJavaScript 6', 'Extended Scripting 6'],
        correctIndex: 0
      },
      {
        id: 'q-j5',
        question: 'Which operator is used for strict equality check (compares value and type)?',
        options: ['==', '===', '=', '!='],
        correctIndex: 1
      },
      {
        id: 'q-j6',
        question: 'What is a Closure in JavaScript?',
        options: ['A function bundled together with references to its outer scope lexical environment', 'A method to close browser windows', 'A syntax error handler', 'A database connection wrapper'],
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

  // Timer countdown effect when playing active quiz
  useEffect(() => {
    let interval = null;
    if (activeQuiz && !isQuizCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
        setTotalTimeTaken(prev => prev + 1);
      }, 1000);
    } else if (activeQuiz && !isQuizCompleted && timeRemaining === 0) {
      // Time expired for current question -> auto advance or finish
      if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeRemaining(45);
      } else {
        finishQuiz();
      }
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuiz, isQuizCompleted, timeRemaining, currentQuestionIndex]);

  // Start playing a quiz
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(45); // 45s default per question
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
      setTimeRemaining(45); // reset question timer
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
      selectedAnswers: { ...selectedAnswers }
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
        date: dateStr
      },
      ...prev
    ]);
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
      currentQuestionIndex,
      selectedAnswers,
      timeRemaining,
      totalTimeTaken,
      isQuizCompleted,
      lastCompletedResult,
      startQuiz,
      selectOption,
      handleNextQuestion,
      finishQuiz,
      createQuiz,
      importQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
