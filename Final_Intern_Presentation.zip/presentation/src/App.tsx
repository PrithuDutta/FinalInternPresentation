import { useState, useCallback, useEffect, useRef } from 'react';
import Reveal from 'reveal.js';

import { HeaderBar } from './components/HeaderBar';
import { Nav } from './components/Nav';
import { PresenterDrawer } from './components/PresenterDrawer';
import { InteractiveTelemetry } from './components/InteractiveTelemetry';
import { SlideOverviewModal } from './components/SlideOverviewModal';

import { Slide00_Title } from './slides/Slide00_Title';
import { Slide01_ExecutiveSummary } from './slides/Slide01_ExecutiveSummary';
import { Slide02_LegacyInfrastructure } from './slides/Slide02_LegacyInfrastructure';
import { Slide03_ContainerForensics } from './slides/Slide03_ContainerForensics';
import { Slide04_CloudDeployment } from './slides/Slide04_CloudDeployment';
import { Slide05_AIEvaluation } from './slides/Slide05_AIEvaluation';
import { Slide06_WatsonxMCP } from './slides/Slide06_WatsonxMCP';
import { Slide07_MultiAgentEngine } from './slides/Slide07_MultiAgentEngine';
import { Slide08_ImpactRetrospective } from './slides/Slide08_ImpactRetrospective';

import { SLIDE_NOTES } from './data';
import type { SlideDefinition } from './types';

const SLIDES: SlideDefinition[] = [
  {
    id: 'title',
    slideNum: 1,
    section: 'Overview',
    title: 'Modernization & AI Tooling Dossier',
    subtitle: 'Replatforming Java EE 7 to Liberty (Jakarta EE 11)',
    Component: Slide00_Title,
    notes: SLIDE_NOTES.title,
  },
  {
    id: 'summary',
    slideNum: 2,
    section: 'Landscape',
    title: 'Slide 1: Executive Summary & Project Landscape',
    subtitle: '33% Token Savings, 1,300+ Error Codes & 6 PM Reviews',
    Component: Slide01_ExecutiveSummary,
    notes: SLIDE_NOTES.summary,
  },
  {
    id: 'infrastructure',
    slideNum: 3,
    section: 'Baseline',
    title: 'Slide 2: Legacy Infrastructure & Monolith Modernization',
    subtitle: 'tWAS Baseline, Podman DB2 (svtdb:50000) & SIBus Messaging',
    Component: Slide02_LegacyInfrastructure,
    notes: SLIDE_NOTES.twasBaseline,
  },
  {
    id: 'debugging',
    slideNum: 4,
    section: 'Forensics',
    title: 'Slide 3: Deep Systems Debugging: EJB Lifecycle & CDI Faults',
    subtitle: '3-Tier Flow, Missing messagingClient-3.0 & Port 7276 Collisions',
    Component: Slide03_ContainerForensics,
    notes: SLIDE_NOTES.containerForensics,
  },
  {
    id: 'packaging',
    slideNum: 5,
    section: 'Cloud Native',
    title: 'Slide 4: Remote Cloud-Native Deployment & AST Sanitization',
    subtitle: 'Config as Code, CNTR0154E Fix & DB2 Driver Injection',
    Component: Slide04_CloudDeployment,
    notes: SLIDE_NOTES.cloudDeployment,
  },
  {
    id: 'evaluation',
    slideNum: 6,
    section: 'AI Evaluation',
    title: 'Slide 5: Enterprise AI Evaluation: Plain Bob vs. Bob PP',
    subtitle: '40+ Hours Telemetry, 27 vs 18 Coins (33% Gain) & PM ROI Analysis',
    Component: Slide05_AIEvaluation,
    notes: SLIDE_NOTES.aiEvaluation,
  },
  {
    id: 'watsonx',
    slideNum: 7,
    section: 'AI Data',
    title: 'Slide 6: WatsonX Challenge: AI Data Infrastructure & MCP',
    subtitle: 'Data Pod Lead, 1,300+ CWWK* Codes, SQLite Schema & MCP Server',
    Component: Slide06_WatsonxMCP,
    notes: SLIDE_NOTES.watsonxMcp,
  },
  {
    id: 'systemDesign',
    slideNum: 8,
    section: 'Engine Design',
    title: 'Slide 7: Autonomous Multi-Agent Modernization Engine',
    subtitle: 'LiteLLM Gateway, LangChain, 3 Sandboxes & Postgres Telemetry',
    Component: Slide07_MultiAgentEngine,
    notes: SLIDE_NOTES.multiAgentEngine,
  },
  {
    id: 'retrospective',
    slideNum: 9,
    section: 'Impact',
    title: 'Slide 8: Cross-Functional Impact, Lessons & Q&A',
    subtitle: '6 PM Presentations, 5+ Fixes, Engineering Learnings & Discussion',
    Component: Slide08_ImpactRetrospective,
    notes: SLIDE_NOTES.impactRetrospective,
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Mode toggles
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const revealContainerRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<any>(null);

  // Initialize Reveal.js deck
  useEffect(() => {
    if (revealContainerRef.current && !deckRef.current) {
      const deck = new Reveal(revealContainerRef.current, {
        width: 1200,
        height: 680,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        transition: 'slide',
        slideNumber: 'c/t',
        hash: true,
        controls: true,
        progress: true,
        center: true,
        keyboard: true,
        overview: true,
        respondToHashChanges: true,
      });

      deck.initialize().then(() => {
        deckRef.current = deck;
        deck.on('slidechanged', (event: any) => {
          if (typeof event.indexh === 'number') {
            setCurrent(event.indexh);
          }
        });
      });
    }

    return () => {
      try {
        if (deckRef.current?.isReady()) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch {}
    };
  }, []);

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

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SLIDES.length) return;
    setCurrent(index);
    if (deckRef.current) {
      deckRef.current.slide(index);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation & Shortcuts for Custom Tools
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'p' || e.key === 'P') {
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
  }, [toggleFullscreen, resetMasterClock]);

  const currentSlideObj = SLIDES[current] || SLIDES[0];

  return (
    <div className="w-screen h-screen flex flex-col bg-[#232a35] text-[#222222] overflow-hidden select-none font-sans">
      {/* Top 2010s Corporate Header */}
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
        onToggleOverview={() => {
          if (deckRef.current) {
            deckRef.current.toggleOverview();
          } else {
            setIsOverviewOpen(prev => !prev);
          }
        }}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Reveal.js Presentation Stage */}
      <main className="flex-1 w-full relative overflow-hidden bg-[#232a35]">
        <div className="reveal w-full h-full" ref={revealContainerRef}>
          <div className="slides">
            {SLIDES.map((s, idx) => {
              const SlideComponent = s.Component;
              return (
                <section key={s.id} data-slide-index={idx}>
                  <SlideComponent />
                </section>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom 2010s Enterprise Status & Control Bar */}
      <Nav
        current={current}
        total={SLIDES.length}
        slideTitles={SLIDES.map(s => s.title)}
        onPrev={() => {
          if (deckRef.current) {
            deckRef.current.prev();
          } else {
            goTo(current - 1);
          }
        }}
        onNext={() => {
          if (deckRef.current) {
            deckRef.current.next();
          } else {
            goTo(current + 1);
          }
        }}
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
