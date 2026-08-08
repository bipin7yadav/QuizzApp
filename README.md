# 🚀 QuizVerse — Modern Interactive Quiz Platform

A high-performance, responsive web application built with **React (Vite/CRA)** and a custom **Vanilla CSS Glassmorphism Design System**. QuizVerse allows users to explore built-in quizzes, construct custom quizzes with custom categories, play timed quiz games, review detailed answer breakdowns, track leaderboards, and share custom quizzes cross-device via QR codes and minified URL payloads — **all without requiring user registration or backend servers.**

---

## 📸 Key Features & Capabilities

- 🎨 **Vanilla CSS Glassmorphism**: Tailored dark theme with smooth gradients, responsive grids, and micro-animations.
- ⚡ **Zero-Auth Architecture**: Instant guest access with complete persistence stored in browser `localStorage`.
- ⏱ **45-Second Timer**: Per-question live countdown timer with auto-advance and time-low warning pulses.
- 📱 **Mobile-First Responsiveness**: 
  - **2x2 Options Grid** on mobile viewports for 100% visible gameplay fitting inside screen height.
  - **Mobile Bottom Navigation Bar** with glassmorphic blur and auto-hiding during active gameplay.
- 🛠 **Custom Quiz Builder**: Add unlimited questions, specify difficulty, and create custom user categories dynamically discovered by library filters.
- 📊 **Post-Quiz Answer Review**: Detailed side-by-side comparison of selected answers vs. correct answers after completing a quiz.
- 🔗 **Zero-Backend QR & Link Sharing**: Share user-created quizzes across devices using compressed Base64 URL payloads and live QR codes.

---

## 🛠 Tech Stack

- **Frontend Core**: React.js, React Router v6
- **State Management**: React Context API (`QuizContext.js`) + `localStorage`
- **Styling**: Pure Vanilla CSS (`src/index.css`) — Zero Tailwind dependence
- **Utilities & Libraries**:
  - `lucide-react`: Modern SVG iconography
  - `qrcode.react`: High-density QR code generation
  - `canvas-confetti`: Celebratory animations on quiz completion
  - `nanoid`: Unique ID generation

---

## ⚙️ How Things Work Internally

### 1. State Management & Persistence (`QuizContext.js`)
`QuizContext` acts as the single source of truth for the entire platform. It manages:
- **`allQuizzes`**: Merges built-in default quizzes with user-created quizzes.
- **`attempts`**: Tracks complete historical attempt logs (`score`, `percentage`, `timeSec`, `date`).
- **`leaderboard`**: Maintains global high score rankings per quiz.

All three state domains automatically sync to browser `localStorage`:
```javascript
localStorage.setItem('quizverse_custom_quizzes', JSON.stringify(customQuizzes));
localStorage.setItem('quizverse_attempts', JSON.stringify(attempts));
localStorage.setItem('quizverse_leaderboard', JSON.stringify(leaderboard));
```

---

### 2. Quiz Creation & Dynamic Category Discovery (`QuizBuilder.jsx` & `Home.jsx`)
When a user creates a new quiz:
1. They select an existing category or choose `"Add New Category..."`.
2. Entering a custom category string registers it upon saving.
3. `QuizContext` updates `customQuizzes`.
4. `Home.jsx` uses dynamic category extraction to generate filter pills:
   ```javascript
   const categories = ['All', ...new Set(allQuizzes.map(q => q.category))];
   ```
   *Any custom category added by a user automatically appears in the Quiz Library filter list!*

---

### 3. Gameplay Mechanics & Timer Logic (`QuizPlay.jsx`)
- **45-Second Countdown**: Controlled via `useEffect` timer interval decrementing `timeRemaining` every 1,000ms.
- **Timer Expiry & Auto-Advance**:
  ```javascript
  if (timeRemaining === 0) {
    handleNextQuestion(); // Automatically locks answer & moves to next question
  }
  ```
- **Mobile 2x2 Option Grid**: On screens `<768px`, options switch from a vertical stack to a 2x2 grid (`repeat(2, 1fr)`). This cuts option vertical height by 50%, ensuring question text, options, and action buttons fit 100% on mobile screens without vertical scrollbars.
- **Mobile Navigation Auto-Hiding**: The bottom mobile navigation bar automatically hides on `/quiz/...` routes to maximize viewport real estate.

---

### 4. Post-Quiz Response Review (`Results.jsx`)
When a quiz finishes, `finishQuiz()` passes the full array of questions alongside `selectedAnswers` to `Results.jsx`:
- Users click **"Review Answers"** to toggle an interactive breakdown.
- Each question displays a visual indicator:
  - 🟢 **Correct Answer**: Highlighted in green with a checkmark badge.
  - 🔴 **Incorrect Selection**: Highlighted in red with an 'X' badge if picked incorrectly.

---

### 5. URL Payload Minification & Sharing (`ShareScreen.jsx` & `QuizPlay.jsx`)

#### The Challenge:
User-created quizzes exist in local storage on the creator's device. Standard URLs cannot access another user's local storage without a centralized backend server.

#### The Solution (Client-Side Compression Payload):
QuizVerse compresses the entire quiz object directly into the shared web link!

1. **Payload Minification (`ShareScreen.jsx`)**:
   Key names and structure are compressed into tuples (`t` for title, `c` for category, `d` for difficulty, `q` for questions tuple `[questionText, optionsArray, correctIndex]`):
   ```javascript
   const getCompactPayload = (q) => {
     const mini = {
       t: q.title,
       c: q.category,
       d: q.difficulty,
       q: q.questions.map(item => [item.question, item.options, item.correctIndex])
     };
     // JSON -> Base64 -> URL Safe Component
     return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(mini)))));
   };
   ```
   *Result*: Reduces JSON payload size by **70%+**, creating short, shareable links:
   `http://domain.com/quiz/shared/custom-123?payload=eJwz...`

2. **Payload Unpacking & Import (`QuizPlay.jsx`)**:
   When a recipient opens the link on their mobile device or PC, `QuizPlay.jsx` reads `?payload=...`:
   ```javascript
   const unpackPayload = (payloadStr) => {
     const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(payloadStr))));
     const mini = JSON.parse(jsonStr);
     return {
       id: `imported-${Date.now()}`,
       title: mini.t,
       category: mini.c,
       difficulty: mini.d,
       questions: mini.q.map(([q, options, correctIndex], idx) => ({
         id: `q-${idx}`, question: q, options, correctIndex
       }))
     };
   };
   ```
   The unpacked quiz is dynamically registered into `QuizContext` so the recipient can play immediately!

---

### 6. QR Code Generation & Local Wi-Fi Testing (`ShareScreen.jsx`)

- **High-Density QR Code**: Rendered via `<QRCodeCanvas />` at `level="M"` density (200px canvas size) for rapid mobile camera scanning.
- **Local Wi-Fi Host Switcher**:
  - Scanning `localhost:3000` on a mobile phone fails because `localhost` points to the mobile device itself.
  - `ShareScreen.jsx` detects `localhost` and provides an interactive host input (e.g. `http://192.168.1.15:3000`).
  - Entering your local PC IP updates the QR code in real-time, allowing instant scanning and testing over local Wi-Fi!

---

## 🏃 Local Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bipin7yadav/QuizzApp.git
   cd QuizzApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open source and available under the **MIT License**.
