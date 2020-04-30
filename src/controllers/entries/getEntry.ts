import { RequestHandler } from 'fastify';

import { client, getEntryQuery } from 'lib/graphql';
import errorBuilder from 'lib/error-builder';
import { Entry } from '../../types/data';

export const getEntry: RequestHandler<
  unknown,
  unknown,
  unknown,
  { owner: string; repo: string; branch?: string; path?: string; fileName: string },
  undefined,
  never
> = async ({ params: { owner, repo, branch, path, fileName } }) => {
  try {
    const { data }: { data: Entry } = await client.query({
      query: getEntryQuery({
        owner,
        repo,
        branch,
        path,
        fileName,
      }),
    });

    if (!data.repository.object) throw new Error('File not found or file in binary');

    return {
      content: data.repository.object?.text || null,
    };
  } catch (error) {
    return errorBuilder(404, error.message);
  }
};
