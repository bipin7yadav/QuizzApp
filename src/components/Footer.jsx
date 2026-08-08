import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="logo-icon-box" style={{ width: '28px', height: '28px' }}>
            <Sparkles size={16} color="#ffffff" />
          </div>
          <span style={{ fontWeight: 800, color: '#f8fafc' }}>QuizVerse</span>
          <span>| Full-Stack Interactive Quiz Platform</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span>Crafted with</span>
          <Heart size={14} color="#f43f5e" fill="#f43f5e" />
          <span>using React & Vanilla CSS</span>
        </div>

        <div>
          © {new Date().getFullYear()} QuizVerse. Shareable Quizzes & Live Leaderboards.
        </div>

      </div>
    </footer>
  );
};
