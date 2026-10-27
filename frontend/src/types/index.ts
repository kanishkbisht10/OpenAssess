export interface ServiceStatus {
  status: 'healthy' | 'degraded' | 'unreachable';
  latency_ms?: number;
  error?: string | null;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  app: string;
  version: string;
  environment: string;
  database: ServiceStatus;
  redis: ServiceStatus;
  timestamp: string;
}

export interface PhaseInfo {
  id: number;
  title: string;
  tasksCount: number;
  expectedDays: number;
  status: 'completed' | 'in_progress' | 'planned';
  description: string;
}
