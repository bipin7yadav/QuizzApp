import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { QuizBuilder } from './pages/QuizBuilder';
import { ShareScreen } from './pages/ShareScreen';
import { QuizPlay } from './pages/QuizPlay';
import { Results } from './pages/Results';
import { Leaderboard } from './pages/Leaderboard';
import { History } from './pages/History';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <QuizProvider>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<QuizBuilder />} />
            <Route path="/share/:slug" element={<ShareScreen />} />
            <Route path="/quiz/:id" element={<QuizPlay />} />
            <Route path="/quiz/shared/:slug" element={<QuizPlay />} />
            <Route path="/result" element={<Results />} />
            <Route path="/leaderboard/:quizId" element={<Leaderboard />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}

export default App;
