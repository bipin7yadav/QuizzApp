import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  History as HistoryIcon, 
  RotateCcw, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Award
} from 'lucide-react';

export const History = () => {
  const { attempts, allQuizzes, startQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleRetry = (quizId) => {
    const quiz = allQuizzes.find(q => q.id === quizId);
    if (quiz) {
      startQuiz(quiz);
      navigate(`/quiz/${quiz.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '850px' }}>
      
      <button
        onClick={() => navigate('/')}
        className="btn-secondary"
        style={{ marginBottom: '1.5rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
      >
        <ArrowLeft size={16} />
        <span>Back to Quiz Library</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div className="logo-icon-box" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
          <HistoryIcon size={26} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>My Quiz History</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            View your past attempt performance across built-in and community quizzes.
          </p>
        </div>
      </div>

      {attempts.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '450px', margin: '0 auto' }}>
          <Award size={48} color="#64748b" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>No Attempt History Yet</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Complete any quiz in the library to track your scores and time here!</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Explore Quizzes
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {attempts.map((attempt, idx) => (
            <div
              key={attempt.id || idx}
              className="glass-card"
              style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8' }}>{attempt.quizCategory || 'General'}</span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    <span>{attempt.date}</span>
                  </span>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>{attempt.quizTitle}</h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} color="#06b6d4" />
                    <span>{attempt.timeSec} seconds</span>
                  </span>
                  <span>Player: <strong style={{ color: '#f8fafc' }}>{attempt.playerName}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.5rem 1rem', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#818cf8', display: 'block', leading: 1 }}>{attempt.percentage}%</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>{attempt.score}/{attempt.total} Qs</span>
                </div>

                <button
                  onClick={() => handleRetry(attempt.quizId)}
                  className="btn-secondary"
                  style={{ padding: '0.5rem', borderRadius: '12px' }}
                  title="Retry Quiz"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
