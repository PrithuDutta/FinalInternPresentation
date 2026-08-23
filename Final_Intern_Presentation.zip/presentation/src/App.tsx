import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { HeaderBar } from './components/HeaderBar';
import { Nav } from './components/Nav';
import { PresenterDrawer } from './components/PresenterDrawer';
import { InteractiveTelemetry } from './components/InteractiveTelemetry';
import { SlideOverviewModal } from './components/SlideOverviewModal';

import { Slide01_Title } from './slides/Slide01_Title';
import { Slide02_ExecutiveSummary } from './slides/Slide02_ExecutiveSummary';
import { Slide03_ArchitectureChallenge } from './slides/Slide03_ArchitectureChallenge';
import { Slide04_RoadmapTimeline } from './slides/Slide04_RoadmapTimeline';
import { Slide05_TWASDeployment } from './slides/Slide05_TWASDeployment';
import { Slide06_LibertyRootCause } from './slides/Slide06_LibertyRootCause';
import { Slide07_BenchmarkMethodology } from './slides/Slide07_BenchmarkMethodology';
import { Slide08_BenchmarkResults } from './slides/Slide08_BenchmarkResults';
import { Slide09_MCPServerTooling } from './slides/Slide09_MCPServerTooling';
import { Slide10_MultiAgentPipeline } from './slides/Slide10_MultiAgentPipeline';
import { Slide11_ContributionsImpact } from './slides/Slide11_ContributionsImpact';
import { Slide12_RetrospectiveQnA } from './slides/Slide12_RetrospectiveQnA';

import { SLIDE_NOTES } from './data';
import type { SlideDefinition } from './types';

const SLIDES: SlideDefinition[] = [
  {
    id: 'title',
    slideNum: 1,
    section: 'Overview',
    title: 'Modernization & AI Tooling Dossier',
    subtitle: 'Replatforming Java EE to Liberty',
    Component: Slide01_Title,
    notes: SLIDE_NOTES.title,
  },
  {
    id: 'summary',
    slideNum: 2,
    section: 'Overview',
    title: 'Executive Summary & Project Scope',
    subtitle: 'Four core workstreams and deliverables',
    Component: Slide02_ExecutiveSummary,
    notes: SLIDE_NOTES.summary,
  },
  {
    id: 'architecture',
    slideNum: 3,
    section: 'Baseline',
    title: 'DayTrader 7 Architecture & Modernization Gap',
    subtitle: 'EJB, CDI, SIBus JMS, and DB2 complexity',
    Component: Slide03_ArchitectureChallenge,
    notes: SLIDE_NOTES.architecture,
  },
  {
    id: 'roadmap',
    slideNum: 4,
    section: 'Baseline',
    title: '12-Week Execution Roadmap',
    subtitle: 'Milestones from onboarding to production sign-off',
    Component: Slide04_RoadmapTimeline,
    notes: SLIDE_NOTES.roadmap,
  },
  {
    id: 'twas',
    slideNum: 5,
    section: 'Modernization',
    title: 'Workstream 01: tWAS Reference Deployment',
    subtitle: 'Podman DB2, J2C Auth, and SIBus JMS broker',
    Component: Slide05_TWASDeployment,
    notes: SLIDE_NOTES.twas,
  },
  {
    id: 'liberty',
    slideNum: 6,
    section: 'Modernization',
    title: 'Workstream 02: Liberty Container Forensics',
    subtitle: 'EJB container lifecycle & missing messagingClient-3.0',
    Component: Slide06_LibertyRootCause,
    notes: SLIDE_NOTES.liberty,
  },
  {
    id: 'benchmarkMethod',
    slideNum: 7,
    section: 'Benchmark',
    title: 'Workstream 03: 3-Way Benchmark Methodology',
    subtitle: 'Plain Bob Blind vs. Bob PP + AMA vs. Plain Bob Informed',
    Component: Slide07_BenchmarkMethodology,
    notes: SLIDE_NOTES.benchmarkMethod,
  },
  {
    id: 'benchmarkResults',
    slideNum: 8,
    section: 'Benchmark',
    title: 'Workstream 03: Empirical Results & Unit Economics',
    subtitle: '80% token savings, speedup, and PM report',
    Component: Slide08_BenchmarkResults,
    notes: SLIDE_NOTES.benchmarkResults,
  },
  {
    id: 'mcpTooling',
    slideNum: 9,
    section: 'Tooling',
    title: 'Workstream 04: CWWK Diagnostic MCP Server',
    subtitle: 'Grounding WatsonX in verified Liberty error codes',
    Component: Slide09_MCPServerTooling,
    notes: SLIDE_NOTES.mcpTooling,
  },
  {
    id: 'multiAgent',
    slideNum: 10,
    section: 'Tooling',
    title: 'Workstream 05: Multi-Agent Modernization Pipeline',
    subtitle: 'LangChain & LiteLLM autonomous orchestration loop',
    Component: Slide10_MultiAgentPipeline,
    notes: SLIDE_NOTES.multiAgent,
  },
  {
    id: 'impact',
    slideNum: 11,
    section: 'Impact',
    title: 'Key Contributions & Tangible Deliverables',
    subtitle: '10+ AMA GitHub defects, PM report, and approved deployment',
    Component: Slide11_ContributionsImpact,
    notes: SLIDE_NOTES.impact,
  },
  {
    id: 'retrospective',
    slideNum: 12,
    section: 'Impact',
    title: 'Engineering Retrospective & Q&A',
    subtitle: 'Lessons learned, acknowledgments, and discussion',
    Component: Slide12_RetrospectiveQnA,
    notes: SLIDE_NOTES.retrospective,
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-30%' : '30%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Mode toggles
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  // Master Clock Timer (Ticks once per second)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetMasterClock = useCallback(() => {
    setElapsedSeconds(0);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= SLIDES.length) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPresenterOpen(prev => !prev);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setIsTelemetryOpen(prev => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        setIsOverviewOpen(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        resetMasterClock();
      } else if (e.key === 'Escape') {
        setIsPresenterOpen(false);
        setIsTelemetryOpen(false);
        setIsOverviewOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, toggleFullscreen, resetMasterClock]);

  const currentSlideObj = SLIDES[current];
  const { Component } = currentSlideObj;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#e8e8e8] text-[#161616] overflow-hidden select-none font-sans">
      {/* Top IBM Corporate Header */}
      <HeaderBar
        currentSlide={current}
        totalSlides={SLIDES.length}
        section={currentSlideObj.section}
        slideTitle={currentSlideObj.title}
        elapsedSeconds={elapsedSeconds}
        targetSeconds={currentSlideObj.notes.targetSeconds}
        isPresenterOpen={isPresenterOpen}
        isTelemetryOpen={isTelemetryOpen}
        onTogglePresenter={() => setIsPresenterOpen(prev => !prev)}
        onToggleTelemetry={() => setIsTelemetryOpen(prev => !prev)}
        onToggleOverview={() => setIsOverviewOpen(prev => !prev)}
      />

      {/* Main Presentation Stage */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-5 overflow-hidden relative">
        <div className="w-full h-full max-w-7xl slide-canvas relative overflow-hidden bg-white border border-[#c6c6c6] shadow-sm">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlideObj.id}
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
      </main>

      {/* Bottom IBM Control Bar */}
      <Nav
        current={current}
        total={SLIDES.length}
        slideTitles={SLIDES.map(s => s.title)}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Presenter Notes Prompter Drawer */}
      <PresenterDrawer
        isOpen={isPresenterOpen}
        onClose={() => setIsPresenterOpen(false)}
        slideNum={current + 1}
        totalSlides={SLIDES.length}
        slideTitle={currentSlideObj.title}
        notes={currentSlideObj.notes}
        elapsedSeconds={elapsedSeconds}
        onResetTimer={resetMasterClock}
      />

      {/* Interactive Diagnostics & Telemetry Modal */}
      <InteractiveTelemetry
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      {/* Slide Overview Grid Modal */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlide={current}
        slides={SLIDES}
        onSelectSlide={goTo}
      />
    </div>
  );
}

