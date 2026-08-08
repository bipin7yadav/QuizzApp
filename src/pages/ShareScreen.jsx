import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Copy, 
  Check, 
  Play, 
  ArrowLeft, 
  QrCode, 
  Globe, 
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export const ShareScreen = () => {
  const { slug } = useParams();
  const { allQuizzes, startQuiz } = useQuiz();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [customHost, setCustomHost] = useState(window.location.origin);

  const quiz = allQuizzes.find(q => q.shareSlug === slug || q.id === slug) || allQuizzes[0];

  // Compact payload minifier for custom user-created quizzes
  const getCompactPayload = (q) => {
    if (!q || !q.isUserCreated) return '';
    try {
      const mini = {
        t: q.title,
        c: q.category,
        d: q.difficulty,
        q: q.questions.map(item => [item.question, item.options, item.correctIndex])
      };
      return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(mini)))));
    } catch (e) {
      console.error('Payload compression error', e);
      return '';
    }
  };

  const payloadStr = quiz ? getCompactPayload(quiz) : '';
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  const targetOrigin = isLocalhost ? customHost : window.location.origin;
  const baseUrl = `${targetOrigin}/quiz/shared/${quiz.shareSlug || quiz.id}`;
  const shareUrl = payloadStr ? `${baseUrl}?payload=${payloadStr}` : baseUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlayNow = () => {
    startQuiz(quiz);
    navigate(`/quiz/${quiz.id}`);
  };

  const handleShareWhatsApp = () => {
    const text = `❤️ Hey! I created a special romantic quiz for you: "${quiz.title}"! Open the link to play and share your thoughts: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="main-content" style={{ maxWidth: '700px', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/')}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Library</span>
        </button>
      </div>

      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
          <CheckCircle2 size={16} />
          <span>Quiz Published & Ready to Share!</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
          Share <span className="gradient-heading">"{quiz.title}"</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Anyone with this link or QR code can play this quiz without creating an account.
        </p>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Link Box */}
          <div style={{ textAlign: 'left' }}>
            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Shareable Web Link</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.5rem', flexWrap: 'wrap' }}>
              <Globe size={18} color="#818cf8" style={{ marginLeft: '0.5rem' }} />
              <input
                type="text"
                readOnly
                value={shareUrl}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f8fafc', fontSize: '0.85rem', flex: 1, minWidth: '180px', fontFamily: 'monospace' }}
              />
              <button
                onClick={handleCopyLink}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <span>📱 Share via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Localhost Mobile Testing Notice */}
          {isLocalhost && (
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '1rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <Smartphone size={16} />
                <span>Testing Mobile QR Scan on Local Wi-Fi?</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                Mobile phones cannot open <code>localhost</code> directly. To scan and test on your mobile phone over Wi-Fi, enter your local PC IP address below:
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Host URL:</span>
                <input
                  type="text"
                  placeholder="e.g. http://192.168.1.15:3000"
                  value={customHost}
                  onChange={(e) => setCustomHost(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', width: '240px' }}
                />
              </div>
            </div>
          )}

          {/* High-Contrast Crisp QR Code Container */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase' }}>
              <QrCode size={18} color="#c084fc" />
              <span>Scan QR Code to Play on Mobile</span>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', display: 'inline-block', boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}>
              <QRCodeSVG
                value={shareUrl}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Scan with any smartphone camera</p>
          </div>

          {/* CTA */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={handlePlayNow}
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              <Play size={18} fill="#ffffff" />
              <span>Play Quiz Now</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
