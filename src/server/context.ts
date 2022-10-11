import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import type { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@db';

type CreateContextOptions = {
  req: NextApiRequest;
  res: NextApiResponse
  db: PrismaClient
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return _opts;
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  const { req, res } = opts;
  return await createContextInner({ req, res, db  });
}
