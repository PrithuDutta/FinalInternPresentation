import { useState, useEffect } from 'react';
import type { SpeakerNotes } from '../types';

interface PresenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slideNum: number;
  totalSlides: number;
  slideTitle: string;
  notes: SpeakerNotes;
  elapsedSeconds: number;
  onResetTimer: () => void;
}

export function PresenterDrawer({
  isOpen,
  onClose,
  slideNum,
  totalSlides,
  slideTitle,
  notes,
  elapsedSeconds,
  onResetTimer,
}: PresenterDrawerProps) {
  const [slideElapsed, setSlideElapsed] = useState(0);

  // Reset per-slide timer on slide change
  useEffect(() => {
    setSlideElapsed(0);
  }, [slideNum]);

  // Tick per-slide timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSlideElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, slideNum]);

  if (!isOpen) return null;

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isSlideOvertime = slideElapsed > notes.targetSeconds;

  return (
    <aside className="fixed top-11 right-0 bottom-12 w-96 max-w-[90vw] bg-white border-l border-[#e0e0e0] shadow-lg z-40 flex flex-col select-text">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#e0e0e0] bg-[#f4f4f4] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-mono font-bold uppercase tracking-wider text-[#0f62fe]">
              SPEAKER PROMPTER
            </span>
            <span className="text-[#8d8d8d] text-[0.65rem] font-mono">
              SLIDE {slideNum} OF {totalSlides}
            </span>
          </div>
          <h3 className="text-[0.85rem] font-bold text-[#161616] truncate max-w-[220px]">
            {slideTitle}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#525252] hover:text-[#161616] hover:bg-[#e0e0e0] text-xs font-mono"
        >
          ✕ [Esc]
        </button>
      </div>

      {/* Timer & Pacing Telemetry Panel */}
      <div className="px-4 py-3 bg-white border-b border-[#e0e0e0] grid grid-cols-2 gap-3 text-center font-mono">
        <div className="p-2 bg-[#f4f4f4] border border-[#e0e0e0]">
          <div className="text-[0.6rem] text-[#525252] uppercase font-semibold">Slide Time</div>
          <div
            className={`text-base font-bold ${
              isSlideOvertime ? 'text-[#da1e28]' : 'text-[#198038]'
            }`}
          >
            {formatMinSec(slideElapsed)}
          </div>
          <div className="text-[0.58rem] text-[#8d8d8d]">Target: {notes.timingTarget}</div>
        </div>

        <div className="p-2 bg-[#f4f4f4] border border-[#e0e0e0]">
          <div className="text-[0.6rem] text-[#525252] uppercase font-semibold">Deck Total Time</div>
          <div className="text-base font-bold text-[#161616]">
            {formatMinSec(elapsedSeconds)}
          </div>
          <div className="text-[0.58rem] text-[#8d8d8d]">Goal: 15–20 min</div>
        </div>
      </div>

      {/* Scrollable Speaker Track & Notes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm leading-relaxed bg-[#ffffff]">
        {/* Core Takeaway */}
        <div className="p-3 bg-[#edf5ff] border border-[#a6c8ff]">
          <div className="text-[0.62rem] font-mono font-bold text-[#0f62fe] uppercase mb-1">
            KEY TAKEAWAY
          </div>
          <p className="text-[0.75rem] text-[#161616] font-medium">{notes.keyTakeaway}</p>
        </div>

        {/* Talking Points */}
        <div>
          <div className="text-[0.65rem] font-mono font-bold text-[#525252] uppercase tracking-wider mb-2">
            TALKING SCRIPT & POINTS
          </div>
          <ul className="space-y-2.5">
            {notes.talkingPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[0.75rem] text-[#161616]">
                <span className="text-[#0f62fe] font-bold shrink-0 mt-0.5 font-mono">
                  {idx + 1}.
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transition Cue */}
        <div className="p-3 bg-[#fdf4d6] border border-[#f1c21b]">
          <div className="text-[0.62rem] font-mono font-bold text-[#8c6c00] uppercase mb-1">
            TRANSITION CUE
          </div>
          <p className="text-[0.72rem] text-[#161616] italic">"{notes.transitionCue}"</p>
        </div>

        {/* Anticipated Q&A */}
        {notes.anticipatedQuestions.length > 0 && (
          <div>
            <div className="text-[0.65rem] font-mono font-bold text-[#525252] uppercase tracking-wider mb-2">
              ANTICIPATED AUDIENCE Q&A
            </div>
            <div className="space-y-2">
              {notes.anticipatedQuestions.map((qa, i) => (
                <div key={i} className="p-2.5 bg-[#f4f4f4] border border-[#e0e0e0] text-[0.72rem]">
                  <div className="font-bold text-[#0f62fe] mb-1">Q: {qa.q}</div>
                  <div className="text-[#525252]">A: {qa.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Controls */}
      <div className="p-3 border-t border-[#e0e0e0] bg-[#f4f4f4] flex items-center justify-between">
        <button
          onClick={onResetTimer}
          className="px-2.5 py-1 bg-white hover:bg-[#e0e0e0] border border-[#c6c6c6] text-[#161616] text-[0.65rem] font-mono"
        >
          Reset Master Clock
        </button>
        <span className="text-[0.6rem] font-mono text-[#8d8d8d]">Toggle with [P] key</span>
      </div>
    </aside>
  );
}

