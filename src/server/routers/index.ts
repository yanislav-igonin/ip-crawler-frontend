import { t } from '../trpc';
import { ipsRouter } from './ips.router';

// Main router.
export const appRouter = t.router({
  ips: ipsRouter,
});

export type AppRouter = typeof appRouter;

