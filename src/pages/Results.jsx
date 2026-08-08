import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

export const Results = () => {
  const { lastCompletedResult, activeQuiz, startQuiz } = useQuiz();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState('');
  const [guestSaved, setGuestSaved] = useState(false);

  useEffect(() => {
    if (lastCompletedResult && lastCompletedResult.percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [lastCompletedResult]);

  if (!lastCompletedResult) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>No Result Session Active</h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Explore Quizzes
        </button>
      </div>
    );
  }

  const { score, total, percentage, timeSec, quizId, questions, selectedAnswers } = lastCompletedResult;

  const getPerformanceGrade = (pct) => {
    if (pct === 100) return { title: 'Perfect Score! 🏆', desc: 'Flawless execution! You mastered every single question.' };
    if (pct >= 80) return { title: 'Outstanding Job! 🌟', desc: 'Excellent performance! You have deep mastery of this topic.' };
    if (pct >= 60) return { title: 'Great Effort! 👍', desc: 'Solid attempt! Review a few questions to reach perfection.' };
    return { title: 'Keep Practicing! 📚', desc: 'Good start! Retake the quiz to sharpen your skills.' };
  };

  const grade = getPerformanceGrade(percentage);

  const handleSaveGuestScore = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setGuestSaved(true);
  };

  const handleRetry = () => {
    if (activeQuiz) {
      startQuiz(activeQuiz);
      navigate(`/quiz/${activeQuiz.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '750px', textAlign: 'center' }}>
      
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#818cf8', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        <Sparkles size={16} />
        <span>Quiz Attempt Completed</span>
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
        {grade.title}
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
        {grade.desc}
      </p>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Score Ring Badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: '#0f172a', border: '4px solid rgba(99, 102, 241, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span className="gradient-heading" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{percentage}%</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>{score} / {total} Correct</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>Score</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>{score} / {total}</span>
          </div>
          <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>Accuracy</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#818cf8' }}>{percentage}%</span>
          </div>
          <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, display: 'block' }}>Time</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#06b6d4' }}>{timeSec}s</span>
          </div>
        </div>

        {!guestSaved && (
          <form onSubmit={handleSaveGuestScore} style={{ background: 'rgba(30, 27, 75, 0.4)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '1rem', borderRadius: '16px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc', marginBottom: '0.75rem' }}>
              <UserCheck size={16} color="#10b981" />
              <span>Enter your name to appear on the Leaderboard:</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Your Display Name (e.g. Alex Explorer)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="form-input"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', flex: 1, minWidth: '180px' }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                Save
              </button>
            </div>
          </form>
        )}

        {guestSaved && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>Score saved to Leaderboard!</span>
          </div>
        )}

        {/* Action Buttons - Clean Flex Wrapping Layout to prevent overlapping */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleRetry}
            className="btn-secondary"
            style={{ flex: '1 1 140px', justifyContent: 'center' }}
          >
            <RotateCcw size={16} />
            <span>Retry Quiz</span>
          </button>

          <button
            onClick={() => navigate(`/leaderboard/${quizId}`)}
            className="btn-secondary"
            style={{ flex: '1 1 140px', justifyContent: 'center', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#f59e0b' }}
          >
            <Trophy size={16} color="#f59e0b" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{ flex: '1 1 140px', justifyContent: 'center' }}
          >
            <span>Explore</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      {/* Detailed Response & Answer Review Section */}
      {questions && questions.length > 0 && (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Answer Breakdown & Review</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{score}/{total} Correct</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {questions.map((q, idx) => {
              const userChoiceIndex = selectedAnswers ? selectedAnswers[q.id] : undefined;
              const isCorrect = userChoiceIndex === q.correctIndex;
              const isAnswered = userChoiceIndex !== undefined;

              return (
                <div 
                  key={q.id || idx}
                  style={{ 
                    background: '#0f172a', 
                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                    borderRadius: '14px',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                      {idx + 1}. {q.question}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      padding: '0.25rem 0.6rem', 
                      borderRadius: '10px', 
                      whiteSpace: 'nowrap',
                      background: isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                      color: isCorrect ? '#10b981' : '#f43f5e',
                      border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`
                    }}>
                      {isCorrect ? '✔ Correct' : isAnswered ? '✖ Incorrect' : '⏱ Time Out'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                    {q.options.map((opt, oIdx) => {
                      const isUserSelection = userChoiceIndex === oIdx;
                      const isCorrectOption = q.correctIndex === oIdx;

                      let optBg = 'rgba(30, 41, 59, 0.5)';
                      let optBorder = 'transparent';
                      let optColor = '#94a3b8';

                      if (isCorrectOption) {
                        optBg = 'rgba(16, 185, 129, 0.15)';
                        optBorder = 'rgba(16, 185, 129, 0.4)';
                        optColor = '#10b981';
                      } else if (isUserSelection && !isCorrect) {
                        optBg = 'rgba(244, 63, 94, 0.15)';
                        optBorder = 'rgba(244, 63, 94, 0.4)';
                        optColor = '#f43f5e';
                      }

                      return (
                        <div 
                          key={oIdx}
                          style={{
                            padding: '0.5rem 0.8rem',
                            borderRadius: '8px',
                            background: optBg,
                            border: `1px solid ${optBorder}`,
                            color: optColor,
                            fontWeight: isCorrectOption || isUserSelection ? 700 : 400,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isUserSelection && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                              {isCorrect ? '(Your Answer)' : '(Your Selection)'}
                            </span>
                          )}
                          {!isUserSelection && isCorrectOption && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                              (Correct Answer)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
