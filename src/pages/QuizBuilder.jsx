import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  PlusCircle, 
  Trash2, 
  ArrowLeft, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const QuizBuilder = () => {
  const { createQuiz } = useQuiz();
  const navigate = useNavigate();

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
        <div className="logo-icon-box" style={{ width: '48px', height: '48px' }}>
          <PlusCircle size={26} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>Quiz Builder</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Author your custom quiz questions and generate a shareable link instantly.
          </p>
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
                <option value="General">General</option>
                <option value="Mathematics">Mathematics</option>
                <option value="React.js">React.js</option>
                <option value="JavaScript">JavaScript</option>
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
