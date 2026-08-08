import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  Play, 
  Share2, 
  HelpCircle,
  Calculator,
  Code2,
  FileCode2,
  Globe,
  BookOpen,
  Terminal,
  Zap,
  Clock,
  Database,
  Palette,
  Heart,
  Dices,
  Edit,
  Trash2
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Couples & Romance': return Heart;
    case 'Mathematics': return Calculator;
    case 'React.js': return Code2;
    case 'JavaScript': return FileCode2;
    case 'MySQL': return Database;
    case 'Python': return Terminal;
    case 'CSS': return Palette;
    case 'General Knowledge': return Globe;
    case 'Science': return Sparkles;
    case 'History': return BookOpen;
    case 'Tech & Coding': return Terminal;
    default: return HelpCircle;
  }
};

export const Home = () => {
  const { allQuizzes, startQuiz, deleteQuiz } = useQuiz();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-Game Settings Modal State
  const [selectedQuizForConfig, setSelectedQuizForConfig] = useState(null);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timePerQuestion, setTimePerQuestion] = useState(45);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinRoulette = () => {
    if (allQuizzes.length === 0) return;
    setIsSpinning(true);
    soundFX.playPop();
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * allQuizzes.length);
      const chosenQuiz = allQuizzes[randomIdx];
      setIsSpinning(false);
      soundFX.playSparkle();
      startQuiz(chosenQuiz, { timerEnabled: true, timePerQuestion: 45 });
      navigate(`/quiz/${chosenQuiz.id}`);
    }, 700);
  };

  const baseCategories = ['All', 'Couples & Romance', 'Mathematics', 'React.js', 'JavaScript', 'MySQL', 'Python', 'CSS', 'General Knowledge', 'Science', 'History', 'Community'];
  const customCategoriesInUse = Array.from(new Set(allQuizzes.map(q => q.category))).filter(c => !baseCategories.includes(c));
  const categories = [...baseCategories, ...customCategoriesInUse];

  const filteredQuizzes = allQuizzes.filter(quiz => {
    const matchesCategory = 
      selectedCategory === 'All' ? true :
      selectedCategory === 'Community' ? quiz.isUserCreated :
      quiz.category === selectedCategory;

    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenConfigModal = (quiz, e) => {
    if (e) e.stopPropagation();
    setSelectedQuizForConfig(quiz);
  };

  const handleStartGameWithConfig = () => {
    if (!selectedQuizForConfig) return;
    startQuiz(selectedQuizForConfig, { timerEnabled, timePerQuestion });
    navigate(`/quiz/${selectedQuizForConfig.id}`);
  };

  const handleShareQuiz = (quiz, e) => {
    e.stopPropagation();
    navigate(`/share/${quiz.shareSlug || quiz.id}`);
  };

  return (
    <div className="main-content">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={16} color="#818cf8" />
          <span>Interactive Quizzes & Instant Leaderboards</span>
        </div>

        <h1 className="hero-title">
          Test Your Knowledge or <span className="gradient-heading">Create & Share Your Own Quiz</span>
        </h1>

        <p className="hero-subtitle">
          Challenge yourself with built-in quizzes across science, coding, and history, or build custom quizzes with instant shareable links & QR codes!
        </p>

        {/* CTA Banner Card */}
        <div className="cta-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Zap size={16} />
              <span>No Account Required to Share or Play</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Author Your Own Shareable Quiz</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Add custom questions, mark correct answers, and get a short shareable link + QR code instantly!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/create')}
              className="btn-primary"
              style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem', whiteSpace: 'nowrap' }}
            >
              <PlusCircle size={20} />
              <span>Create Custom Quiz</span>
            </button>

            <button
              onClick={handleSpinRoulette}
              disabled={isSpinning}
              className="btn-secondary"
              style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem', whiteSpace: 'nowrap', background: 'rgba(245, 158, 11, 0.2)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fef08a' }}
            >
              <Dices size={20} style={{ animation: isSpinning ? 'spin 0.5s linear infinite' : 'none' }} />
              <span>{isSpinning ? 'Spinning Roulette...' : '🎰 Quiz Roulette (Surprise Me!)'}</span>
            </button>
          </div>
        </div>

        {/* Featured Romantic & Proposal Templates Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                <Heart size={16} fill="#f43f5e" />
                <span>Couples & Loved Ones Special</span>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                Create Romantic Proposals & Couple Quizzes 💖
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                No right or wrong answers! Share personalized questions with your loved one, write romantic notes, and read their reactions.
              </p>
            </div>

            <button
              onClick={() => navigate('/create')}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Heart size={18} fill="#ffffff" />
              <span>Create Romantic Quiz</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <span style={{ fontSize: '0.8rem', color: '#fecdd3', fontWeight: 800, alignSelf: 'center' }}>One-Click Presets:</span>
            <button
              onClick={() => navigate('/create')}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', background: 'rgba(244, 63, 94, 0.2)', borderColor: 'rgba(244, 63, 94, 0.5)', color: '#fecdd3' }}
            >
              🌹 Will You Be My Valentine?
            </button>

            <button
              onClick={() => navigate('/create')}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', background: 'rgba(168, 85, 247, 0.2)', borderColor: 'rgba(168, 85, 247, 0.5)', color: '#e9d5ff' }}
            >
              💑 Couple Chemistry
            </button>

            <button
              onClick={() => navigate('/create')}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', background: 'rgba(6, 182, 212, 0.2)', borderColor: 'rgba(6, 182, 212, 0.5)', color: '#a5f3fc' }}
            >
              💌 "Will You Go Out With Me?"
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="filter-container">
          <div className="search-input-wrapper">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search quizzes by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Library Grid */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Quiz Library ({filteredQuizzes.length})</h3>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <HelpCircle size={48} color="#64748b" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>No Quizzes Found</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              No quiz matching "{searchQuery}" in category "{selectedCategory}". Try tweaking your filter!
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="quiz-grid">
            {filteredQuizzes.map((quiz) => {
              const IconComponent = getCategoryIcon(quiz.category);
              const difficultyClass = 
                quiz.difficulty === 'Easy' ? 'difficulty-easy' :
                quiz.difficulty === 'Hard' ? 'difficulty-hard' :
                'difficulty-medium';

              return (
                <div
                  key={quiz.id}
                  onClick={(e) => handleOpenConfigModal(quiz, e)}
                  className="quiz-card"
                >
                  <div>
                    <div className="quiz-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="category-icon-box" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                          <IconComponent size={22} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', display: 'block' }}>{quiz.category}</span>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>
                            {quiz.isUserCreated ? `By ${quiz.createdByName || 'Community'}` : 'Official Quiz'}
                          </span>
                        </div>
                      </div>

                      <span className={`difficulty-badge ${difficultyClass}`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <h4 className="quiz-card-title">{quiz.title}</h4>
                    <p className="quiz-card-desc">{quiz.description}</p>
                  </div>

                  <div className="quiz-card-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <HelpCircle size={14} color="#818cf8" />
                        <span>{quiz.questions.length} Qs</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} color="#06b6d4" />
                        <span>KBC Rules</span>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {quiz.isUserCreated && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit/${quiz.shareSlug || quiz.id}`);
                            }}
                            className="btn-secondary"
                            style={{ padding: '0.4rem 0.6rem', color: '#a5b4fc', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                            title="Edit Quiz"
                          >
                            <Edit size={15} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete quiz "${quiz.title}"?`)) {
                                deleteQuiz(quiz.id);
                              }
                            }}
                            className="btn-secondary"
                            style={{ padding: '0.4rem 0.6rem', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.4)' }}
                            title="Delete Quiz"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={(e) => handleShareQuiz(quiz, e)}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.6rem' }}
                        title="Share Quiz Link & QR"
                      >
                        <Share2 size={16} />
                      </button>

                      <button
                        onClick={(e) => handleOpenConfigModal(quiz, e)}
                        className="btn-primary"
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                      >
                        <Play size={14} fill="#ffffff" />
                        <span>Play</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Pre-Game Configuration & Lifelines Modal */}
      {selectedQuizForConfig && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '1.75rem', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase' }}>Game Rules & Timer Settings</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{selectedQuizForConfig.title}</h3>
              </div>
              <button
                onClick={() => setSelectedQuizForConfig(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            {/* Timer Toggle */}
            <div style={{ marginBottom: '1.25rem', background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: timerEnabled ? '1rem' : 0 }}>
                <div>
                  <span style={{ fontWeight: 800, color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>⏱ Enable Countdown Timer</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Turn OFF for untimed relaxed practice</span>
                </div>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: '#6366f1', cursor: 'pointer' }}
                />
              </label>

              {/* Custom Timer Selector */}
              {timerEnabled && (
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Time Per Question</span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {[15, 30, 45, 60, 90].map((seconds) => (
                      <button
                        key={seconds}
                        onClick={() => setTimePerQuestion(seconds)}
                        style={{
                          flex: 1,
                          padding: '0.45rem 0.5rem',
                          borderRadius: '8px',
                          border: timePerQuestion === seconds ? '1px solid #818cf8' : '1px solid var(--border-color)',
                          background: timePerQuestion === seconds ? 'rgba(99, 102, 241, 0.3)' : '#0f172a',
                          color: timePerQuestion === seconds ? '#ffffff' : '#94a3b8',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {seconds}s
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* KBC Lifelines Included Notice */}
            <div style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem 1rem', borderRadius: '14px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                🎮 KBC Lifelines Active In-Game
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>
                <span>🎯 50:50</span> • <span>👥 Audience Poll</span> • <span>🔄 Skip Q</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedQuizForConfig(null)}
                className="btn-secondary"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Cancel
              </button>
              <button
                onClick={handleStartGameWithConfig}
                className="btn-primary"
                style={{ flex: 2, padding: '0.75rem', fontSize: '0.9rem' }}
              >
                <Play size={16} fill="#ffffff" />
                <span>Start Game</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
