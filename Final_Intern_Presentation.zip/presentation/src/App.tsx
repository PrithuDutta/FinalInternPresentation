import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './components/Nav';
import { SlideTitle } from './slides/SlideTitle';
import { SlideTimeline } from './slides/SlideTimeline';
import { SlideProjects } from './slides/SlideProjects';
import { SlideMetrics } from './slides/SlideImpact';
import { SlideContributions } from './slides/SlideContributions';

const SLIDES = [
  { id: 'title',         Component: SlideTitle },
  { id: 'timeline',      Component: SlideTimeline },
  { id: 'projects',      Component: SlideProjects },
  { id: 'metrics',       Component: SlideMetrics },
  { id: 'contributions', Component: SlideContributions },
] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SLIDES.length) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const { Component } = SLIDES[current];

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0c10]">
      {/* Stage: 16:9 centred */}
      <div className="flex-1 flex items-center justify-center p-4 pb-16 overflow-hidden">
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
          style={{
            aspectRatio: '16 / 9',
            maxHeight: 'calc(100vh - 80px)',
            maxWidth: 'calc((100vh - 80px) * 16 / 9)',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={SLIDES[current].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Nav
        current={current}
        total={SLIDES.length}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
