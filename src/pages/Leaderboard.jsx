import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  Trophy, 
  Award, 
  Clock, 
  ArrowLeft
} from 'lucide-react';

export const Leaderboard = () => {
  const { quizId } = useParams();
  const { leaderboard, allQuizzes } = useQuiz();
  const navigate = useNavigate();

  const [selectedQuizId, setSelectedQuizId] = useState(quizId || (allQuizzes[0] ? allQuizzes[0].id : 'math-101'));

  const activeQuizInfo = allQuizzes.find(q => q.id === selectedQuizId || q.shareSlug === selectedQuizId) || allQuizzes[0];

  const quizScores = leaderboard
    .filter(entry => entry.quizId === selectedQuizId || entry.quizId === activeQuizInfo.id)
    .sort((a, b) => b.score - a.score || a.timeSec - b.timeSec);

  const top3 = quizScores.slice(0, 3);
  const remaining = quizScores.slice(3);

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

      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="logo-icon-box" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <Trophy size={26} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#ffffff' }}>Quiz Leaderboard</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Rankings and top scores for {activeQuizInfo ? activeQuizInfo.title : 'Selected Quiz'}
            </p>
          </div>
        </div>

        <select
          value={selectedQuizId}
          onChange={(e) => setSelectedQuizId(e.target.value)}
          className="form-select"
          style={{ width: 'auto', minWidth: '220px' }}
        >
          {allQuizzes.map((q) => (
            <option key={q.id} value={q.id}>
              {q.title} ({q.category})
            </option>
          ))}
        </select>
      </div>

      {quizScores.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '450px', margin: '0 auto' }}>
          <Award size={48} color="#64748b" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>No Scores Recorded Yet</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Be the very first player to take this quiz and claim 1st place!</p>
          <button
            onClick={() => navigate(`/quiz/${activeQuizInfo.id}`)}
            className="btn-primary"
          >
            Play Quiz Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Podium Grid */}
          <div className="podium-grid">
            {top3.map((player, idx) => {
              const podiumClass = 
                idx === 0 ? 'podium-card-gold' :
                idx === 1 ? 'podium-card-silver' :
                'podium-card-bronze';

              const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';

              return (
                <div key={player.id || idx} className={`podium-card ${podiumClass}`}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{medalEmoji}</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
                    {player.playerName}
                  </h4>
                  <div className="gradient-heading" style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    {player.percentage}%
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span>{player.score}/{player.total} Qs</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} color="#06b6d4" />
                      <span>{player.timeSec}s</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining Table */}
          {remaining.length > 0 && (
            <div className="table-responsive">
              <div className="form-card" style={{ padding: 0, overflow: 'hidden', minWidth: '480px' }}>
                <div style={{ padding: '0.875rem 1.25rem', background: '#0f172a', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.5rem' }}>
                  <span style={{ gridColumn: 'span 2' }}>Rank</span>
                  <span style={{ gridColumn: 'span 5' }}>Player Name</span>
                  <span style={{ gridColumn: 'span 3', textAlign: 'center' }}>Score</span>
                  <span style={{ gridColumn: 'span 2', textAlign: 'right' }}>Time</span>
                </div>

                <div>
                  {remaining.map((entry, idx) => (
                    <div key={entry.id || idx} style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
                      <span style={{ gridColumn: 'span 2', fontWeight: 800, color: '#64748b' }}>#{idx + 4}</span>
                      <span style={{ gridColumn: 'span 5', fontWeight: 700, color: '#ffffff' }}>{entry.playerName}</span>
                      <span style={{ gridColumn: 'span 3', textAlign: 'center', fontWeight: 800, color: '#818cf8' }}>{entry.score}/{entry.total} ({entry.percentage}%)</span>
                      <span style={{ gridColumn: 'span 2', textAlign: 'right', fontFamily: 'monospace', color: '#06b6d4' }}>{entry.timeSec}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
