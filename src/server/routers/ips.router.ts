import { t } from '@trpc-server';
import { z } from 'zod';

export const ipsRouter = t.router({
  list: t.procedure.input(z.object({
    page: z.number().default(1),
  })).query(async ({ ctx: { db }, input: { page } }) => {
    const ips = await db.ips.findMany({
      select: { address: true, checkedAt: true },
      where: { status: 'ok', statusCode: 200 },
      orderBy: { checkedAt: 'desc' },
      skip: (page - 1) * 20,
      take: 20,
    });
    const count = await db.ips.count({ where: { statusCode: 200 } });
    const pagesCount = Math.ceil(count / 20);
    return { ips, pagesCount };
  }),
  countAll: t.procedure.query(async ({ ctx: { db } }) => {
    const count = await db.ips.count();
    return { count };
  }),
  countLive: t.procedure.query(async ({ ctx: { db } }) => {
    const count = await db.ips.count({ where: { statusCode: 200 } });
    return { count };
  }),
});
