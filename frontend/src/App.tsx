import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SystemHealthBadge } from './components/SystemHealthBadge';
import { PhaseTracker } from './components/PhaseTracker';
import { Check, ShieldCheck, GitBranch, Terminal } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-800/40 to-slate-900/40 border border-indigo-500/20 p-8 sm:p-12 mb-10 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4" />
              Phase 1: Foundation Successfully Assembled
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Open-Source Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Assessment Platform</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              OpenAssess delivers enterprise-grade coding tests, multiple-choice evaluations, and sandboxed code execution with modern FastAPI, SQLAlchemy 2.0, PostgreSQL, Redis, and React.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="http://localhost:8000/api/v1/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition"
              >
                <Terminal className="h-4 w-4" />
                Swagger API Docs
              </a>
              <a
                href="#phases"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-medium transition"
              >
                <GitBranch className="h-4 w-4 text-indigo-400" />
                View Phase Roadmap
              </a>
            </div>
          </div>

          {/* Foundation Highlights Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Git & LICENSE</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Docker Compose</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>FastAPI Skeleton</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>SQLAlchemy & Alembic</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>GitHub CI Actions</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>React & Tailwind</span>
            </div>
          </div>
        </div>

        {/* Live System Diagnostics */}
        <SystemHealthBadge />

        {/* PERT Phases Section */}
        <div id="phases">
          <PhaseTracker />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
