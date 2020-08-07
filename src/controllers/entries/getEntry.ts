import { RequestHandler } from 'fastify';

import { client, getEntryQuery } from 'lib/graphql';
import errorBuilder from 'lib/error-builder';
import { Entry } from '../../types/data';

export const getEntry: RequestHandler<
  unknown,
  unknown,
  { additionalAttributes: string },
  { owner: string; repo: string; branch?: string; path?: string; fileName: string },
  undefined,
  never
> = async ({ params: { owner, repo, branch, path, fileName }, query: { additionalAttributes } }) => {
  try {
    await client.cache.reset();

    const { data }: { data: Entry } = await client.query({
      query: getEntryQuery({
        owner,
        repo,
        branch,
        path,
        fileName,
        additionalAttributes,
      }),
    });

    if (!data?.repository?.object) throw errorBuilder(404, 'File not found or file in binary');

    return {
      content: data.repository.object?.text || null,
      ...data?.repository?.object,
    };
  } catch (error) {
    return error;
  }
};
