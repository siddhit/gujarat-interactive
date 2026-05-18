'use client';

import { useState, useEffect, useRef } from 'react';
import { submitReport } from '../lib/sanity';

export default function ReportPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [body,   setBody]   = useState('');
  const [source, setSource] = useState('');
  const [name,   setName]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 80);
  }, [isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    setStatus('loading');
    setErrMsg('');
    const result = await submitReport({ body: body.trim(), source: source.trim(), name: name.trim() });
    if (result.success) {
      setStatus('success');
      setBody(''); setSource(''); setName('');
    } else {
      setStatus('error');
      setErrMsg(result.error ?? 'Something went wrong.');
    }
  }

  const inputCls = `w-full px-3 py-2.5 text-sm border outline-none transition-colors
    bg-transparent placeholder-[var(--muted)] text-[var(--indigo)]
    border-[rgba(26,26,72,0.2)] focus:border-[rgba(26,26,72,0.5)]`;

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => { setIsOpen(true); setStatus('idle'); }}
        className="fixed bottom-[96px] right-4 sm:bottom-[112px] sm:left-4 sm:right-auto z-30 flex items-center gap-2 px-3 py-2
          text-[11px] tracking-widest uppercase border transition-all duration-200"
        style={{
          fontFamily: 'var(--font-eng)',
          background: 'rgba(26,26,72,0.9)',
          backdropFilter: 'blur(8px)',
          borderColor: 'rgba(255,255,255,0.08)',
          color: 'rgba(245,239,226,0.5)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,226,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        title="Report something missing or request an addition"
      >
        <span>⚑</span>
        <span className="hidden sm:inline">Report / Request</span>
      </button>

      {/* Overlay */}
      <div
        className={`report-overlay fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50`}
        style={{ backdropFilter: 'blur(4px)', ...(isOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }) }}
        onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div
          className="w-full max-w-md overflow-hidden"
          style={{ background: 'var(--cream)', border: '1px solid rgba(26,26,72,0.12)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(26,26,72,0.1)' }}
          >
            <div>
              <h2
                className="text-sm"
                style={{ fontFamily: 'var(--font-eng)', color: 'var(--indigo)' }}
              >
                Something missing?
              </h2>
              <p
                className="text-[11px] mt-0.5 tracking-wide"
                style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
              >
                Submissions go into an editorial review queue.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg leading-none p-1 transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--indigo)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Form / Success */}
          {status === 'success' ? (
            <div className="p-8 text-center space-y-3">
              <p
                className="text-lg"
                style={{ fontFamily: 'var(--font-eng)', color: 'var(--indigo)' }}
              >
                Thank you.
              </p>
              <p
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}
              >
                Your submission will be reviewed by our editors.
              </p>
              <button
                onClick={() => { setStatus('idle'); setIsOpen(false); }}
                className="mt-2 px-5 py-2 text-xs tracking-widest uppercase border transition-all"
                style={{
                  fontFamily: 'var(--font-eng)',
                  color: 'var(--indigo)',
                  borderColor: 'rgba(26,26,72,0.25)',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
                >
                  What's missing? <span style={{ color: 'var(--rust)' }}>*</span>
                </label>
                <textarea
                  ref={textareaRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe a person, place, or event that should be included…"
                  rows={4}
                  required
                  className={inputCls + ' resize-none'}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="block text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
                >
                  Source
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Book title / author / URL…"
                  className={inputCls}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="block text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
                >
                  Your name <span style={{ color: 'var(--muted)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous is fine"
                  className={inputCls}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
                />
              </div>

              {status === 'error' && (
                <p className="text-xs" style={{ color: 'var(--rust)' }}>{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !body.trim()}
                className="w-full py-3 text-xs tracking-[0.18em] uppercase transition-all duration-200
                  disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'var(--font-eng)',
                  background: status === 'loading' ? 'rgba(26,26,72,0.6)' : 'var(--indigo)',
                  color: 'var(--cream)',
                }}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit for Review'}
              </button>

              <p
                className="text-center text-[10px]"
                style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
              >
                No account required. All submissions are reviewed before publication.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
