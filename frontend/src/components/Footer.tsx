import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 OpenAssess Project. Released under the MIT License.</p>
        <div className="flex gap-6 text-slate-400">
          <span>FastAPI</span>
          <span>•</span>
          <span>SQLAlchemy 2.0</span>
          <span>•</span>
          <span>React 18</span>
          <span>•</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
