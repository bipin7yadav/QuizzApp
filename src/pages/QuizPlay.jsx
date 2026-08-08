import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft
} from 'lucide-react';

export const QuizPlay = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { 
    allQuizzes, 
    activeQuiz, 
    startQuiz, 
    importQuiz,
    currentQuestionIndex, 
    selectedAnswers, 
    selectOption, 
    handleNextQuestion, 
    timeRemaining, 
    isQuizCompleted 
  } = useQuiz();

  useEffect(() => {
    window.scrollTo(0, 0);
    const targetIdentifier = id || slug;
    const searchParams = new URLSearchParams(window.location.search);
    const rawPayload = searchParams.get('payload');

    if (rawPayload) {
      try {
        const rawObj = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(rawPayload)))));
        let decodedQuiz;

        if (rawObj && rawObj.q) {
          // Compact minified payload schema
          decodedQuiz = {
            id: targetIdentifier || `custom-${Date.now()}`,
            title: rawObj.t || 'Shared Quiz',
            category: rawObj.c || 'General',
            difficulty: rawObj.d || 'Medium',
            description: 'Shared custom quiz payload.',
            questions: rawObj.q.map(([question, options, correctIndex], idx) => ({
              id: `q-min-${idx}`,
              question,
              options,
              correctIndex
            }))
          };
        } else {
          decodedQuiz = rawObj;
        }

        if (!decodedQuiz.id) {
          decodedQuiz.id = targetIdentifier || `custom-${Date.now()}`;
        }
        importQuiz(decodedQuiz);
        if (!activeQuiz || activeQuiz.id !== decodedQuiz.id) {
          startQuiz(decodedQuiz);
        }
        return;
      } catch (e) {
        console.error('Failed to unpack quiz payload from URL', e);
      }
    }

    if (!activeQuiz || (targetIdentifier && activeQuiz.id !== targetIdentifier && activeQuiz.shareSlug !== targetIdentifier)) {
      const found = allQuizzes.find(q => q.id === targetIdentifier || q.shareSlug === targetIdentifier);
      if (found) {
        startQuiz(found);
      } else if (allQuizzes.length > 0) {
        startQuiz(allQuizzes[0]);
      }
    }
  }, [id, slug, activeQuiz, allQuizzes]);

  useEffect(() => {
    if (isQuizCompleted) {
      navigate('/result');
    }
  }, [isQuizCompleted, navigate]);

  if (!activeQuiz) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: '#94a3b8' }}>Loading Quiz Experience...</p>
      </div>
    );
  }

  const currentQ = activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;
  const questionsRemaining = totalQuestions - (currentQuestionIndex + 1);
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const selectedOptionIndex = selectedAnswers[currentQ.id];
  const isTimerLow = timeRemaining <= 5;

  return (
    <div className="main-content game-play-container" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
      
      {/* Top Bar Navigation & Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/')}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} />
          <span>Exit Quiz</span>
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
            {activeQuiz.category}
          </span>
          <span className="difficulty-badge difficulty-medium">
            {activeQuiz.difficulty}
          </span>
        </div>
      </div>

      {/* Unified Stats Header Box */}
      <div className="stats-grid-header" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div className="stats-cards-row">
          
          {/* Current Question Box */}
          <div className="stat-box" style={{ padding: '0.6rem 0.85rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', width: '32px', height: '32px' }}>
              Q
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Question</span>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>
                <span style={{ color: '#818cf8' }}>{currentQuestionIndex + 1}</span> of {totalQuestions}
              </span>
            </div>
          </div>

          {/* Questions Remaining Box */}
          <div className="stat-box" style={{ padding: '0.6rem 0.85rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)', width: '32px', height: '32px' }}>
              <HelpCircle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Remaining</span>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#c084fc' }}>
                {questionsRemaining === 0 ? 'Last Question!' : `${questionsRemaining} Left`}
              </span>
            </div>
          </div>

          {/* Live Countdown Timer Box */}
          <div className={`stat-box timer-box ${isTimerLow ? 'timer-low' : ''}`} style={{ padding: '0.6rem 0.85rem' }}>
            <div className="stat-icon" style={{ background: isTimerLow ? '#f43f5e' : '#06b6d4', color: '#ffffff', width: '32px', height: '32px' }}>
              <Clock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Time Remaining</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, fontFamily: 'monospace' }}>
                {timeRemaining}s
              </span>
            </div>
          </div>

        </div>

        {/* Animated Progress bar */}
        <div style={{ marginTop: '0.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.3rem' }}>
            <span>Progress</span>
            <span style={{ color: '#818cf8' }}>{progressPercent}%</span>
          </div>
          <div className="progress-track" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

      </div>

      {/* Main Question Card */}
      <div className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
        
        <h2 className="question-title" style={{ fontSize: '1.25rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
          {currentQ.question}
        </h2>

        {/* 4 Option Buttons */}
        <div className="options-container" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
          {currentQ.options.map((optionText, oIdx) => {
            const isSelected = selectedOptionIndex === oIdx;
            const letter = String.fromCharCode(65 + oIdx);

            return (
              <button
                key={oIdx}
                onClick={() => selectOption(currentQ.id, oIdx)}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                style={{ padding: '0.9rem 1.1rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div className="option-letter" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>{letter}</div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{optionText}</span>
                </div>

                {isSelected && <CheckCircle2 size={18} color="#818cf8" />}
              </button>
            );
          })}
        </div>

        {/* Footer Actions - Clean Non-Overlapping Layout */}
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(51, 65, 85, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: selectedOptionIndex === undefined ? '#94a3b8' : '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {selectedOptionIndex === undefined ? (
              <span>Select an option to proceed</span>
            ) : (
              <>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Option selected! Click next to advance.</span>
              </>
            )}
          </span>

          <button
            onClick={handleNextQuestion}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finish & Submit' : 'Next Question'}</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

    </div>
  );
};
