import { UnauthorizedError } from '@lib/errors';
import { authMiddleware } from '@middlewares';
import { t } from '@trpc-server';
import { z } from 'zod';

export const ipsRouter = t.router({
  list: t.procedure.use(authMiddleware).input(z.object({
    page: z.number().default(1),
  })).query(async ({ ctx: { db }, input: { page } }) => {
    const users = await db.ips.findMany({
      select: { address: true },
      orderBy: { checkedAt: 'desc' },
      skip: (page - 1) * 20,
      take: 20,
    });
    const count = await db.ips.count();
    return { users, count };
  }),
});
