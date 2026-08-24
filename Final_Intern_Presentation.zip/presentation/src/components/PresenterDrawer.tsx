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
    <aside className="fixed top-16 right-0 bottom-7 w-96 max-w-[90vw] bg-[#f7f9fa] border-l border-[#c4cbd4] shadow-2xl z-50 flex flex-col select-text font-sans">
      {/* Drawer Header (2010s Blue Gloss Panel Heading) */}
      <div className="panel-2010-heading-blue flex items-center justify-between py-2 px-3">
        <div>
          <div className="text-[10px] font-mono tracking-wider uppercase opacity-90">
            SPEAKER PROMPTER &amp; SCRIPT // SLIDE {slideNum} OF {totalSlides}
          </div>
          <h3 className="text-[13px] font-bold text-white truncate max-w-[240px] drop-shadow-sm">
            {slideTitle}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="btn-2010-default px-2 py-0.5 text-[11px] font-bold text-[#111111]"
        >
          ✕ Close
        </button>
      </div>

      {/* Timer & Pacing Telemetry Panel */}
      <div className="px-3 py-2 bg-[#ffffff] border-b border-[#d8dde4] grid grid-cols-2 gap-2 text-center font-mono">
        <div className="p-1.5 bg-[#f4f7fa] border border-[#d0d7e2] rounded-[3px]">
          <div className="text-[9.5px] text-[#4b5563] uppercase font-bold">Slide Time</div>
          <div
            className={`text-sm font-bold ${
              isSlideOvertime ? 'text-[#c62828]' : 'text-[#2e7d32]'
            }`}
          >
            {formatMinSec(slideElapsed)}
          </div>
          <div className="text-[9px] text-[#6b7280]">Target: {notes.timingTarget}</div>
        </div>

        <div className="p-1.5 bg-[#f4f7fa] border border-[#d0d7e2] rounded-[3px]">
          <div className="text-[9.5px] text-[#4b5563] uppercase font-bold">Deck Total Time</div>
          <div className="text-sm font-bold text-[#1e293b]">
            {formatMinSec(elapsedSeconds)}
          </div>
          <div className="text-[9px] text-[#6b7280]">Goal: 15–20 min</div>
        </div>
      </div>

      {/* Scrollable Speaker Track & Notes */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-[12px] leading-relaxed bg-[#fbfcfd]">
        {/* Core Takeaway Alert */}
        <div className="callout-2010-info">
          <div className="text-[10px] font-bold text-[#3a87ad] uppercase mb-0.5">
            KEY TAKEAWAY
          </div>
          <p className="text-[11.5px] text-[#1e293b] font-medium leading-normal">{notes.keyTakeaway}</p>
        </div>

        {/* Talking Points List */}
        <div className="panel-2010">
          <div className="panel-2010-heading">
            SPEAKER TALKING SCRIPT
          </div>
          <div className="panel-2010-body space-y-2">
            {notes.talkingPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#222222]">
                <span className="font-bold text-[#0066cc] font-mono shrink-0 mt-0.5">
                  {idx + 1}.
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Cue */}
        <div className="callout-2010-success text-[11px]">
          <span className="font-bold">Transition Cue: </span>
          <span className="italic">"{notes.transitionCue}"</span>
        </div>

        {/* Anticipated Q&A */}
        {notes.anticipatedQuestions && notes.anticipatedQuestions.length > 0 && (
          <div className="panel-2010">
            <div className="panel-2010-heading">
              ANTICIPATED AUDIENCE Q&amp;A
            </div>
            <div className="panel-2010-body space-y-2 text-[11px]">
              {notes.anticipatedQuestions.map((qa, idx) => (
                <div key={idx} className="p-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[2px] space-y-1">
                  <div className="font-bold text-[#004480]">
                    Q: {qa.q}
                  </div>
                  <div className="text-[#334155]">
                    <span className="font-semibold text-[#2e7d32]">A:</span> {qa.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Controls */}
      <div className="p-2 bg-[#edf1f5] border-t border-[#d0d7e2] flex items-center justify-between text-[11px]">
        <button
          onClick={onResetTimer}
          className="btn-2010-default px-2 py-0.5 text-[10.5px]"
        >
          Reset Master Clock
        </button>
        <span className="text-[10px] text-[#6b7280]">
          Keyboard: [P] Toggle Prompter
        </span>
      </div>
    </aside>
  );
}
