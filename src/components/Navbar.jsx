import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  PlusCircle, 
  Trophy, 
  History, 
  Compass
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isPlayingQuiz = location.pathname.startsWith('/quiz/');

  return (
    <>
      {/* Desktop & Main Header */}
      <header className="navbar">
        <div className="navbar-inner">
          
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon-box">
              <Sparkles size={22} color="#ffffff" />
            </div>
            <span>Quiz<span className="gradient-heading">Verse</span></span>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                  <Compass size={18} />
                  <span>Explore Quizzes</span>
                </Link>
              </li>

              <li>
                <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
                  <PlusCircle size={18} color="#10b981" />
                  <span>Quiz Builder</span>
                </Link>
              </li>

              <li>
                <Link 
                  to="/leaderboard/math-101" 
                  className={`nav-link ${location.pathname.startsWith('/leaderboard') ? 'active' : ''}`}
                >
                  <Trophy size={18} color="#f59e0b" />
                  <span>Leaderboard</span>
                </Link>
              </li>

              <li>
                <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
                  <History size={18} color="#8b5cf6" />
                  <span>My History</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Header Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/create" className="btn-primary navbar-cta-btn">
              <PlusCircle size={16} />
              <span>Create Quiz</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Visible only on Mobile screens < 768px, hidden during active quiz play) */}
      {!isPlayingQuiz && (
        <nav className="mobile-bottom-nav">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <Compass size={20} />
          <span>Explore</span>
        </Link>

        <Link to="/create" className={`mobile-nav-item ${isActive('/create') ? 'active' : ''}`}>
          <PlusCircle size={20} color="#10b981" />
          <span>Create</span>
        </Link>

        <Link 
          to="/leaderboard/math-101" 
          className={`mobile-nav-item ${location.pathname.startsWith('/leaderboard') ? 'active' : ''}`}
        >
          <Trophy size={20} color="#f59e0b" />
          <span>Ranks</span>
        </Link>

        <Link to="/history" className={`mobile-nav-item ${isActive('/history') ? 'active' : ''}`}>
          <History size={20} color="#8b5cf6" />
          <span>History</span>
        </Link>
      </nav>
      )}
    </>
  );
};
