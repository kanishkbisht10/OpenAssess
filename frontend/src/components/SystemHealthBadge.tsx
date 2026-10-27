import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, RefreshCw, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { HealthCheckResponse } from '../types';

export const SystemHealthBadge: React.FC = () => {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/health');
      if (!res.ok) {
        throw new Error(`Health check returned status ${res.status}`);
      }
      const data: HealthCheckResponse = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="bg-slate-800/60 backdrop-blur border border-slate-700/80 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          <h3 className="font-semibold text-lg text-white">System Service Diagnostics</h3>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="p-1.5 rounded-lg border border-slate-600 hover:bg-slate-700/50 text-slate-300 transition disabled:opacity-50"
          title="Refresh health status"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && !health && (
        <div className="flex items-center justify-center py-6 text-slate-400 gap-2">
          <RefreshCw className="h-5 w-5 animate-spin text-indigo-400" />
          <span>Probing backend and services...</span>
        </div>
      )}

      {error && (
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 text-amber-300 text-sm flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Backend Offline or Proxy Not Active</p>
            <p className="text-xs text-amber-400/80 mt-1">
              {error}. Ensure the FastAPI server is running at <code className="bg-amber-900/50 px-1 py-0.5 rounded">http://localhost:8000</code>.
            </p>
          </div>
        </div>
      )}

      {health && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* API Server */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">FastAPI Core</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Online
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Server className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-200">{health.app} v{health.version}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 capitalize">Env: {health.environment}</p>
          </div>

          {/* Database */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Database</span>
              {health.database.status === 'healthy' ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded-full border border-rose-800/40">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Unreachable
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Database className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-200">PostgreSQL / SQLite</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Latency: {health.database.latency_ms ?? '--'} ms</span>
            </div>
          </div>

          {/* Redis */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Redis Broker</span>
              {health.redis.status === 'healthy' ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/40">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Degraded / Standby
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-200">Cache & Queue</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Latency: {health.redis.latency_ms ?? '--'} ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
