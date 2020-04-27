import { RequestHandler } from 'fastify';

import { client, getEntriesQuery } from 'lib/graphql';
import errorBuilder from 'lib/error-builder';

import { Entries } from 'types/data';

export const getEntries: RequestHandler<
  unknown,
  unknown,
  { branch?: string; path?: string },
  { owner: string; repo: string },
  undefined,
  never
> = async ({ params: { owner, repo }, query: { branch, path } }) => {
  try {
    const { data }: { data: Entries } = await client.query({ query: getEntriesQuery({ owner, repo, branch, path }) });

    return (data.repository.object?.entries || []).map(entry => ({ name: entry.name, type: entry.type }));
  } catch (error) {
    return errorBuilder(404, error.message);
  }
};
