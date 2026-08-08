import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  ArrowLeft, 
  Clock, 
  UserCheck 
} from 'lucide-react';

export const ResponseView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { importAttemptResponse } = useQuiz();
  const [responseObj, setResponseObj] = useState(null);
  const [error, setError] = useState(false);

  const rawData = searchParams.get('data');

  useEffect(() => {
    if (!rawData) {
      setError(true);
      return;
    }
    try {
      const decodedJson = decodeURIComponent(escape(atob(decodeURIComponent(rawData))));
      const parsed = JSON.parse(decodedJson);
      setResponseObj(parsed);

      // Import into local history if helper exists
      if (importAttemptResponse) {
        importAttemptResponse(parsed);
      }

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.error('Failed to parse response data payload', e);
      setError(true);
    }
  }, [rawData, importAttemptResponse]);

  if (error || !responseObj) {
    return (
      <div className="main-content" style={{ maxWidth: '600px', textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#f43f5e', marginBottom: '1rem' }}>Invalid or Expired Response Link</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          We could not load the response payload. Make sure your partner copied the full response link.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go to Quiz Library
        </button>
      </div>
    );
  }

  const { t: title, c: category, p: playerName, time, ans, rem, note, q: questions } = responseObj;

  return (
    <div className="main-content" style={{ maxWidth: '750px', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/history')}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} />
          <span>View All in My History</span>
        </button>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#f43f5e', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
        <Heart size={16} fill="#f43f5e" />
        <span>Loved One's Response Received! ❤️</span>
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
        {playerName || 'Your Partner'}'s Answers for "{title}"
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
        Here are the exact choices, question reactions, and love note sent back to you!
      </p>

      {/* Main Glass Card */}
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase' }}>{category || 'Couples & Romance'}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>{title}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <UserCheck size={16} color="#10b981" />
              <strong style={{ color: '#f8fafc' }}>{playerName || 'Partner'}</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={16} color="#06b6d4" />
              <span>{time || 0}s</span>
            </span>
          </div>
        </div>

        {/* Final Romantic Remark Note */}
        {note && (
          <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(244, 63, 94, 0.4)', padding: '1.25rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <Heart size={18} fill="#f43f5e" />
              <span>Final Love Note / Remark from {playerName || 'Partner'}:</span>
            </div>
            <p style={{ color: '#fecdd3', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.5' }}>
              "{note}"
            </p>
          </div>
        )}

        {/* Question-by-Question Choices & Reaction Notes */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Question Choices & Reactions:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions && questions.map((q, idx) => {
              const selectedIdx = ans ? ans[q.id] : undefined;
              const qRemark = rem ? rem[q.id] : '';

              return (
                <div key={q.id || idx} style={{ background: '#0f172a', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '14px', padding: '1rem 1.25rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.65rem' }}>
                    {idx + 1}. {q.text}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: qRemark ? '0.75rem' : '0' }}>
                    {q.opts && q.opts.map((optText, oIdx) => {
                      const isPicked = selectedIdx === oIdx;
                      return (
                        <div
                          key={oIdx}
                          style={{
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            background: isPicked ? 'rgba(244, 63, 94, 0.2)' : 'rgba(30, 41, 59, 0.4)',
                            border: `1px solid ${isPicked ? 'rgba(244, 63, 94, 0.5)' : 'transparent'}`,
                            color: isPicked ? '#f43f5e' : '#94a3b8',
                            fontWeight: isPicked ? 800 : 400,
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {optText}</span>
                          {isPicked && <span style={{ fontWeight: 800 }}>(Chosen Choice 💕)</span>}
                        </div>
                      );
                    })}
                  </div>

                  {qRemark && (
                    <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#fecdd3' }}>
                      <span style={{ fontWeight: 800, color: '#f43f5e', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.4rem' }}>
                        💭 Reaction Note:
                      </span>
                      <em>"{qRemark}"</em>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => navigate('/history')} className="btn-primary">
          Save & View History
        </button>
      </div>

    </div>
  );
};
