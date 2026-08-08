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
  Clock
} from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Mathematics': return Calculator;
    case 'React.js': return Code2;
    case 'JavaScript': return FileCode2;
    case 'General Knowledge': return Globe;
    case 'Science': return Sparkles;
    case 'History': return BookOpen;
    case 'Tech & Coding': return Terminal;
    default: return HelpCircle;
  }
};

export const Home = () => {
  const { allQuizzes, startQuiz } = useQuiz();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const baseCategories = ['All', 'Mathematics', 'React.js', 'JavaScript', 'General Knowledge', 'Science', 'History', 'Tech & Coding', 'Community'];
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

  const handlePlayQuiz = (quiz) => {
    startQuiz(quiz);
    navigate(`/quiz/${quiz.id}`);
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

          <button
            onClick={() => navigate('/create')}
            className="btn-primary"
            style={{ padding: '0.875rem 1.75rem', fontSize: '0.95rem', whiteSpace: 'nowrap' }}
          >
            <PlusCircle size={20} />
            <span>Create Custom Quiz</span>
          </button>
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
                  onClick={() => handlePlayQuiz(quiz)}
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
                        <span>~{quiz.questions.length * 20}s</span>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => handleShareQuiz(quiz, e)}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.6rem' }}
                        title="Share Quiz Link & QR"
                      >
                        <Share2 size={16} />
                      </button>

                      <button
                        onClick={() => handlePlayQuiz(quiz)}
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

    </div>
  );
};
