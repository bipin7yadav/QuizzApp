import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  Users,
  Target,
  SkipForward
} from 'lucide-react';

export const QuizPlay = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { 
    allQuizzes, 
    activeQuiz, 
    quizSettings,
    startQuiz, 
    importQuiz,
    currentQuestionIndex, 
    selectedAnswers, 
    selectOption, 
    handleNextQuestion, 
    timeRemaining, 
    isQuizCompleted 
  } = useQuiz();

  // KBC Lifelines State
  const [used5050, setUsed5050] = useState(false);
  const [usedAudiencePoll, setUsedAudiencePoll] = useState(false);
  const [usedSkip, setUsedSkip] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState({});
  const [audiencePolls, setAudiencePolls] = useState({});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const isTimerLow = quizSettings?.timerEnabled && timeRemaining <= 5;

  // Lifeline Handler: 50:50
  const handle5050 = () => {
    if (used5050 || !currentQ) return;
    const wrongIndices = currentQ.options
      .map((_, idx) => idx)
      .filter(idx => idx !== currentQ.correctIndex);

    // Pick 2 random wrong options to eliminate
    const shuffledWrong = wrongIndices.sort(() => 0.5 - Math.random());
    const eliminated = shuffledWrong.slice(0, 2);

    setHiddenOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: eliminated
    }));
    setUsed5050(true);
  };

  // Lifeline Handler: Audience Poll
  const handleAudiencePoll = () => {
    if (usedAudiencePoll || !currentQ) return;
    const correctIdx = currentQ.correctIndex;
    const correctPct = Math.floor(Math.random() * 25) + 55; // 55% - 80% for correct option
    let remainingPct = 100 - correctPct;

    const poll = {};
    const wrongIndices = currentQ.options
      .map((_, idx) => idx)
      .filter(idx => idx !== correctIdx);

    wrongIndices.forEach((idx, i) => {
      if (i === wrongIndices.length - 1) {
        poll[idx] = remainingPct;
      } else {
        const share = Math.floor(Math.random() * (remainingPct - 5));
        poll[idx] = Math.max(2, share);
        remainingPct -= poll[idx];
      }
    });
    poll[correctIdx] = correctPct;

    setAudiencePolls(prev => ({
      ...prev,
      [currentQuestionIndex]: poll
    }));
    setUsedAudiencePoll(true);
  };

  // Lifeline Handler: Skip Question
  const handleSkipQuestion = () => {
    if (usedSkip) return;
    setUsedSkip(true);
    handleNextQuestion();
  };

  const currentHiddenOptions = hiddenOptions[currentQuestionIndex] || [];
  const currentAudiencePoll = audiencePolls[currentQuestionIndex] || null;

  return (
    <div className="main-content game-play-container" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
      
      {/* Top Bar Navigation & Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
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
      <div className="stats-grid-header" style={{ marginBottom: '1rem', padding: '0.85rem 1rem' }}>
        <div className="stats-cards-row">
          
          {/* Current Question Box */}
          <div className="stat-box" style={{ padding: '0.5rem 0.75rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', width: '30px', height: '30px' }}>
              Q
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Question</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#ffffff' }}>
                <span style={{ color: '#818cf8' }}>{currentQuestionIndex + 1}</span> of {totalQuestions}
              </span>
            </div>
          </div>

          {/* Questions Remaining Box */}
          <div className="stat-box" style={{ padding: '0.5rem 0.75rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', border: '1px solid rgba(139, 92, 246, 0.3)', width: '30px', height: '30px' }}>
              <HelpCircle size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Remaining</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#c084fc' }}>
                {questionsRemaining === 0 ? 'Last Q!' : `${questionsRemaining} Left`}
              </span>
            </div>
          </div>

          {/* Live Countdown Timer Box */}
          <div className={`stat-box timer-box ${isTimerLow ? 'timer-low' : ''}`} style={{ padding: '0.5rem 0.75rem' }}>
            <div className="stat-icon" style={{ background: isTimerLow ? '#f43f5e' : quizSettings?.timerEnabled ? '#06b6d4' : '#64748b', color: '#ffffff', width: '30px', height: '30px' }}>
              <Clock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                {quizSettings?.timerEnabled ? 'Time Left' : 'Mode'}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, fontFamily: 'monospace' }}>
                {quizSettings?.timerEnabled ? `${timeRemaining}s` : 'Untimed'}
              </span>
            </div>
          </div>

        </div>

        {/* Animated Progress bar */}
        <div style={{ marginTop: '0.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.2rem' }}>
            <span>Progress</span>
            <span style={{ color: '#818cf8' }}>{progressPercent}%</span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

      </div>

      {/* KBC Lifelines Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={handle5050}
          disabled={used5050}
          className="btn-secondary"
          style={{
            padding: '0.4rem 0.85rem',
            fontSize: '0.78rem',
            opacity: used5050 ? 0.4 : 1,
            background: used5050 ? 'rgba(30, 41, 59, 0.4)' : 'rgba(99, 102, 241, 0.2)',
            borderColor: used5050 ? 'var(--border-color)' : 'rgba(99, 102, 241, 0.5)',
            color: used5050 ? '#64748b' : '#a5b4fc',
            cursor: used5050 ? 'not-allowed' : 'pointer'
          }}
        >
          <Target size={14} color={used5050 ? '#64748b' : '#818cf8'} />
          <span>🎯 50:50 {used5050 ? '(Used)' : ''}</span>
        </button>

        <button
          onClick={handleAudiencePoll}
          disabled={usedAudiencePoll}
          className="btn-secondary"
          style={{
            padding: '0.4rem 0.85rem',
            fontSize: '0.78rem',
            opacity: usedAudiencePoll ? 0.4 : 1,
            background: usedAudiencePoll ? 'rgba(30, 41, 59, 0.4)' : 'rgba(16, 185, 129, 0.2)',
            borderColor: usedAudiencePoll ? 'var(--border-color)' : 'rgba(16, 185, 129, 0.5)',
            color: usedAudiencePoll ? '#64748b' : '#6ee7b7',
            cursor: usedAudiencePoll ? 'not-allowed' : 'pointer'
          }}
        >
          <Users size={14} color={usedAudiencePoll ? '#64748b' : '#10b981'} />
          <span>👥 Audience Poll {usedAudiencePoll ? '(Used)' : ''}</span>
        </button>

        <button
          onClick={handleSkipQuestion}
          disabled={usedSkip}
          className="btn-secondary"
          style={{
            padding: '0.4rem 0.85rem',
            fontSize: '0.78rem',
            opacity: usedSkip ? 0.4 : 1,
            background: usedSkip ? 'rgba(30, 41, 59, 0.4)' : 'rgba(245, 158, 11, 0.2)',
            borderColor: usedSkip ? 'var(--border-color)' : 'rgba(245, 158, 11, 0.5)',
            color: usedSkip ? '#64748b' : '#fcd34d',
            cursor: usedSkip ? 'not-allowed' : 'pointer'
          }}
        >
          <SkipForward size={14} color={usedSkip ? '#64748b' : '#f59e0b'} />
          <span>🔄 Skip Q {usedSkip ? '(Used)' : ''}</span>
        </button>
      </div>

      {/* Main Question Card */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
        
        <h2 className="question-title" style={{ fontSize: '1.15rem', marginBottom: '1rem', lineHeight: '1.4' }}>
          {currentQ.question}
        </h2>

        {/* 4 Option Buttons */}
        <div className="options-container" style={{ gap: '0.65rem', marginBottom: '1.25rem' }}>
          {currentQ.options.map((optionText, oIdx) => {
            const isSelected = selectedOptionIndex === oIdx;
            const isEliminated = currentHiddenOptions.includes(oIdx);
            const pollPct = currentAudiencePoll ? currentAudiencePoll[oIdx] : null;
            const letter = String.fromCharCode(65 + oIdx);

            return (
              <button
                key={oIdx}
                disabled={isEliminated}
                onClick={() => selectOption(currentQ.id, oIdx)}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                style={{
                  padding: '0.75rem 1rem',
                  opacity: isEliminated ? 0.3 : 1,
                  background: isEliminated ? 'rgba(15, 23, 42, 0.5)' : undefined,
                  borderColor: isEliminated ? 'rgba(51, 65, 85, 0.4)' : undefined,
                  cursor: isEliminated ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Audience Poll Background Bar Fill */}
                {pollPct !== null && !isEliminated && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${pollPct}%`,
                      background: 'rgba(16, 185, 129, 0.15)',
                      borderRight: '2px solid rgba(16, 185, 129, 0.5)',
                      transition: 'width 0.6s ease',
                      zIndex: 0
                    }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1, width: '100%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="option-letter" style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}>{letter}</div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', textDecoration: isEliminated ? 'line-through' : 'none' }}>
                      {isEliminated ? `${optionText} (Eliminated ❌)` : optionText}
                    </span>
                  </div>

                  {pollPct !== null && !isEliminated && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981', background: 'rgba(16, 185, 129, 0.2)', padding: '0.15rem 0.5rem', borderRadius: '8px' }}>
                      👥 {pollPct}%
                    </span>
                  )}

                  {isSelected && !isEliminated && <CheckCircle2 size={18} color="#818cf8" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(51, 65, 85, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: selectedOptionIndex === undefined ? '#94a3b8' : '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {selectedOptionIndex === undefined ? (
              <span>Select an option or use a KBC lifeline</span>
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
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finish & Submit' : 'Next Question'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
