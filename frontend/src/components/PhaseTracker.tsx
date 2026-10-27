import React from 'react';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import { PhaseInfo } from '../types';

export const phasesData: PhaseInfo[] = [
  {
    id: 1,
    title: 'Phase 1: Foundation',
    tasksCount: 6,
    expectedDays: 11.6,
    status: 'completed',
    description: 'Repo setup, Docker Compose, FastAPI skeleton, SQLAlchemy & Alembic, CI pipeline, React/TS scaffold.',
  },
  {
    id: 2,
    title: 'Phase 2: Authentication',
    tasksCount: 6,
    expectedDays: 14.6,
    status: 'planned',
    description: 'User model, password hashing, JWT registration/login, RBAC (admin, creator, candidate), route guards.',
  },
  {
    id: 3,
    title: 'Phase 3: Assessments',
    tasksCount: 7,
    expectedDays: 27.3,
    status: 'planned',
    description: 'Assessment CRUD, MCQ & coding question models, creator UI with Monaco editor, test-case management.',
  },
  {
    id: 4,
    title: 'Phase 4: Candidate Workflow',
    tasksCount: 7,
    expectedDays: 28.0,
    status: 'planned',
    description: 'Attempt timers, auto-submit, test-taking screen, live code runner, answer persistence.',
  },
  {
    id: 5,
    title: 'Phase 5: Evaluation',
    tasksCount: 7,
    expectedDays: 26.0,
    status: 'planned',
    description: 'MCQ scoring engine, Judge0 code sandbox integration, asynchronous Celery evaluation.',
  },
  {
    id: 6,
    title: 'Phase 6: Results',
    tasksCount: 5,
    expectedDays: 15.7,
    status: 'planned',
    description: 'Score aggregation, candidate score report UI, creator analytics, and CSV exports.',
  },
  {
    id: 7,
    title: 'Phase 7: Quality & Hardening',
    tasksCount: 6,
    expectedDays: 15.8,
    status: 'planned',
    description: 'Security audit, rate limiting, audit logging, load tests, and OpenAPI documentation.',
  },
  {
    id: 8,
    title: 'Phase 8: Open-Source Release',
    tasksCount: 5,
    expectedDays: 9.8,
    status: 'planned',
    description: 'Community guidelines, seed demo data, production deployment compose, v0.1 release tag.',
  },
];

export const PhaseTracker: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">PERT Project Roadmap</h2>
          <p className="text-sm text-slate-400 mt-1">
            Tracking 49 core tasks across 8 development phases based on PERT effort estimation.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            Phase 1 Complete
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600"></span>
            Upcoming
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phasesData.map((phase) => {
          const isComplete = phase.status === 'completed';
          return (
            <div
              key={phase.id}
              className={`relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isComplete
                  ? 'bg-slate-800/80 border-emerald-500/40 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                  : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isComplete
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                        : 'bg-slate-700/60 text-slate-400'
                    }`}
                  >
                    Phase {phase.id}
                  </span>
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-slate-500" />
                  )}
                </div>

                <h3 className="font-semibold text-white text-base leading-snug">{phase.title.split(': ')[1]}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">{phase.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-300">{phase.tasksCount} Tasks</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  ~{phase.expectedDays} days
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
