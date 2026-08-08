import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  PlusCircle, 
  Trash2, 
  ArrowLeft, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const QuizBuilder = () => {
  const { id } = useParams();
  const { allQuizzes, createQuiz, updateQuiz } = useQuiz();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('General');
  const [customCategory, setCustomCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');

  const [questions, setQuestions] = useState([
    {
      id: 'q-1',
      questionText: '',
      options: ['', '', '', ''],
      correctIndex: 0
    }
  ]);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const existing = allQuizzes.find(q => q.id === id || q.shareSlug === id);
      if (existing) {
        setTitle(existing.title || '');
        setAuthorName(existing.createdByName || '');
        setCategory(existing.category || 'General');
        setDifficulty(existing.difficulty || 'Medium');
        setDescription(existing.description || '');
        setVisibility(existing.visibility || 'public');
        if (existing.questions && existing.questions.length > 0) {
          setQuestions(existing.questions.map((q, idx) => ({
            id: q.id || `q-${idx}`,
            questionText: q.question || '',
            options: q.options || ['', '', '', ''],
            correctIndex: q.correctIndex || 0
          })));
        }
      }
    }
  }, [id, isEditMode, allQuizzes]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q-${questions.length + 1}`,
        questionText: '',
        options: ['', '', '', ''],
        correctIndex: 0
      }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length === 1) {
      setErrorMsg('A quiz must have at least 1 question.');
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index, text) => {
    const updated = [...questions];
    updated[index].questionText = text;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  const handleCorrectIndexChange = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctIndex = oIndex;
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a Quiz Title.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setErrorMsg(`Question #${i + 1} text is empty.`);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!q.options[j].trim()) {
          setErrorMsg(`Question #${i + 1}, Option ${String.fromCharCode(65 + j)} is empty.`);
          return;
        }
      }
    }

    const formattedQuestions = questions.map((q, idx) => ({
      id: `custom-q-${idx}-${Date.now()}`,
      question: q.questionText.trim(),
      options: q.options.map(o => o.trim()),
      correctIndex: q.correctIndex
    }));

    const finalCategory = category === 'CUSTOM' ? (customCategory.trim() || 'Custom') : category.trim();

    if (isEditMode) {
      updateQuiz(id, {
        title: title.trim(),
        authorName: authorName.trim() || 'Community Author',
        category: finalCategory,
        difficulty,
        description: description.trim() || 'User created custom quiz.',
        visibility,
        questions: formattedQuestions
      });
      navigate(`/share/${id}`);
    } else {
      const newQuiz = createQuiz({
        title: title.trim(),
        authorName: authorName.trim() || 'Community Author',
        category: finalCategory,
        difficulty,
        description: description.trim() || 'User created custom quiz.',
        visibility,
        questions: formattedQuestions
      });
      navigate(`/share/${newQuiz.shareSlug}`);
    }
  };

  const loadRomanticTemplate = (templateType) => {
    if (templateType === 'proposal') {
      setTitle('Will You Be My Valentine? 🌹');
      setCategory('Couples & Romance');
      setDifficulty('Easy');
      setDescription('A sweet romantic proposal quiz! Answer the questions, leave your thoughts on each memory, and write your final love note.');
      setQuestions([
        {
          id: 'q-p1',
          questionText: 'How much do I adore your smile?',
          options: ['To infinity and beyond! ✨', 'More than words can express ❤️', '1000% forever! 💖', 'All of the above! 🌹'],
          correctIndex: 3
        },
        {
          id: 'q-p2',
          questionText: 'What is my absolute favorite thing about us?',
          options: ['How we laugh together endlessly 😂', 'How safe and loved I feel with you 🤗', 'Our late night deep talks 🌙', 'Literally EVERYTHING about us! ❤️'],
          correctIndex: 3
        },
        {
          id: 'q-p3',
          questionText: 'Will you officially be my Valentine / Forever Love?',
          options: ['YES! A thousand times yes! 💖', 'YES! Absolutely! 🌹', 'YES! You are my world! 🥰', 'YES! Forever & Always! ❤️'],
          correctIndex: 0
        }
      ]);
    } else if (templateType === 'get-to-know') {
      setTitle('Couple Chemistry & Get-to-Know Quiz 💑');
      setCategory('Couples & Romance');
      setDifficulty('Easy');
      setDescription('Test how well we know each other\'s favorite memories, secret habits, and romantic dreams!');
      setQuestions([
        {
          id: 'q-g1',
          questionText: 'Where is my favorite place in the world to be with you?',
          options: ['Cozy at home cuddling on the couch 🛋️', 'On a beach watching the sunset 🌅', 'Exploring a new city together 🗺️', 'Anywhere as long as you are with me ❤️'],
          correctIndex: 3
        },
        {
          id: 'q-g2',
          questionText: 'What is my favorite nickname or thing you call me?',
          options: ['Sweetheart / Babe 💕', 'My Love / Honey 🍯', 'My Favorite Person 🌟', 'All of them make me smile! 😊'],
          correctIndex: 3
        },
        {
          id: 'q-g3',
          questionText: 'What is our ultimate dream weekend plan together?',
          options: ['Order takeaway & binge a movie series 🍿', 'Go on a romantic weekend getaway 🧳', 'Cook a gourmet meal together 🍝', 'Late night stargazing & deep talks ✨'],
          correctIndex: 0
        }
      ]);
    } else if (templateType === 'ask-out') {
      setTitle('Will You Go Out On A Date With Me? 💌☕');
      setCategory('Couples & Romance');
      setDifficulty('Easy');
      setDescription('A cute, playful date request quiz! Answer the questions and let me know if you will go out with me this weekend!');
      setQuestions([
        {
          id: 'q-a1',
          questionText: 'What is your absolute dream date vibe?',
          options: ['Cozy coffee shop & long walk ☕', 'Candlelit dinner & romantic music 🍷', 'Fun arcade / bowling & ice cream 🍦', 'Late night drive & stargazing 🌌'],
          correctIndex: 0
        },
        {
          id: 'q-a2',
          questionText: 'If I picked you up for a date this weekend, what treat would make you smile most?',
          options: ['Your favorite boba / coffee 🧋', 'A bouquet of pretty flowers 💐', 'Delicious chocolates / dessert 🍫', 'All of the above! 💖'],
          correctIndex: 3
        },
        {
          id: 'q-a3',
          questionText: 'What is your favorite time of day for a date?',
          options: ['Sunny afternoon lunch ☀️', 'Sunset & early evening 🌅', 'Late night drinks & dessert 🌙', 'Anytime as long as we are together ❤️'],
          correctIndex: 3
        },
        {
          id: 'q-a4',
          questionText: 'So... will you give me the honor of taking you out on a date this weekend?',
          options: ['YES! I would love to! 💖', 'YES! Name the time & place! ☕', 'YES! 1000% yes! 🌹', 'YES! Absolutely! 🥰'],
          correctIndex: 0
        }
      ]);
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
        <div className="logo-icon-box" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}>
          <PlusCircle size={26} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>Quiz Builder</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Author custom quizzes, romantic proposals, or couples get-to-know questions and generate a shareable link instantly.
          </p>
        </div>
      </div>

      {/* Romantic Template Loader Presets */}
      <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(244, 63, 94, 0.35)', padding: '1.25rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <Share2 size={18} color="#f43f5e" />
          <span>✨ One-Click Romantic & Proposal Quiz Templates</span>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '1rem' }}>
          Want to ask someone you love out, propose for Valentine's, or test your couple chemistry? Pick a pre-built template to start:
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => loadRomanticTemplate('proposal')}
            className="btn-secondary"
            style={{ background: 'rgba(244, 63, 94, 0.2)', borderColor: 'rgba(244, 63, 94, 0.5)', color: '#fecdd3', fontSize: '0.8rem' }}
          >
            <span>🌹 Will You Be My Valentine? (Proposal)</span>
          </button>

          <button
            type="button"
            onClick={() => loadRomanticTemplate('get-to-know')}
            className="btn-secondary"
            style={{ background: 'rgba(168, 85, 247, 0.2)', borderColor: 'rgba(168, 85, 247, 0.5)', color: '#e9d5ff', fontSize: '0.8rem' }}
          >
            <span>💑 Couple Chemistry & Get-To-Know</span>
          </button>

          <button
            type="button"
            onClick={() => loadRomanticTemplate('ask-out')}
            className="btn-secondary"
            style={{ background: 'rgba(6, 182, 212, 0.2)', borderColor: 'rgba(6, 182, 212, 0.5)', color: '#a5f3fc', fontSize: '0.8rem' }}
          >
            <span>💌 "Will You Go Out With Me?" (Ask Out)</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#f43f5e', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
          <AlertCircle size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Basic Details */}
        <div className="form-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            Quiz Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Quiz Title *</label>
              <input
                type="text"
                placeholder="e.g. Ultimate Python & Data Structures Quiz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                placeholder="Your Name / Handle"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="Couples & Romance">❤️ Couples & Romance (Loved Ones Mode)</option>
                <option value="General">General</option>
                <option value="Mathematics">Mathematics</option>
                <option value="React.js">React.js</option>
                <option value="JavaScript">JavaScript</option>
                <option value="MySQL">MySQL</option>
                <option value="Python">Python</option>
                <option value="CSS">CSS</option>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Tech & Coding">Tech & Coding</option>
                <option value="CUSTOM">+ Add New Custom Category...</option>
              </select>

              {category === 'CUSTOM' && (
                <input
                  type="text"
                  placeholder="Enter your new category (e.g. Web3, Anime, Sports)"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="form-input"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="form-select"
              >
                <option value="public">Public Library</option>
                <option value="unlisted">Unlisted (Share Link Only)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={2}
              placeholder="Give players a quick overview..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Dynamic Questions Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>Questions ({questions.length})</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Select the correct option radio button per question</span>
          </div>

          {questions.map((q, qIndex) => (
            <div key={q.id} className="form-card">
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.75rem' }}>
                  Question #{qIndex + 1}
                </span>

                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e' }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Question Statement *</label>
                <input
                  type="text"
                  placeholder={`Enter question #${qIndex + 1}...`}
                  value={q.questionText}
                  onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Options & Correct Answer Choice *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {q.options.map((opt, oIndex) => {
                    const label = String.fromCharCode(65 + oIndex);
                    const isCorrect = q.correctIndex === oIndex;

                    return (
                      <div
                        key={oIndex}
                        style={{
                          background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : '#0f172a',
                          border: `1px solid ${isCorrect ? '#10b981' : 'var(--border-color)'}`,
                          padding: '0.6rem 0.75rem',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleCorrectIndexChange(qIndex, oIndex)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isCorrect ? '#10b981' : '#334155',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {label}
                        </button>

                        <input
                          type="text"
                          placeholder={`Option ${label}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', width: '100%', fontSize: '0.85rem' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '16px',
              border: '2px dashed var(--border-color)',
              background: 'rgba(30, 41, 59, 0.4)',
              color: '#f8fafc',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <PlusCircle size={20} color="#818cf8" />
            <span>Add Another Question</span>
          </button>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.875rem 2rem' }}
          >
            <Share2 size={18} />
            <span>Publish & Share Quiz</span>
          </button>
        </div>

      </form>
    </div>
  );
};
