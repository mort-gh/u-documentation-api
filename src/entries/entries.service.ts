import { Injectable } from '@nestjs/common';

import { GraphqlService } from '../graphql';
import { Entries, Entry } from '../types/data';
import { errorBuilder } from '../lib/error-builder';
import { getEntriesQuery, getEntryQuery } from '../graphql/queries';

@Injectable()
export class EntriesService {
  constructor(private readonly graphql: GraphqlService) {}

  public async getEntries(owner: string, repo: string, branch: string, path: string) {
    try {
      const client = this.graphql.getClient();

      await client.cache.reset();

      const { data }: { data: Entries } = await client.query({ query: getEntriesQuery({ owner, repo, branch, path }) });

      return (data.repository.object?.entries || []).map(entry => ({ name: entry.name, type: entry.type }));
    } catch (error) {
      return errorBuilder(404, error.message);
    }
  }

  public async getEntry(owner: string, repo: string, branch: string, path: string, fileName: string) {
    try {
      const client = this.graphql.getClient();

      await client.cache.reset();

      const { data }: { data: Entry } = await client.query({
        query: getEntryQuery({
          owner,
          repo,
          branch,
          path,
          fileName,
        }),
      });

      if (!data?.repository?.object) {
        return errorBuilder(404, 'File not found or file in binary');
      }

      return {
        content: data.repository.object?.text || null,
        ...data?.repository?.object,
      };
    } catch (error) {
      return errorBuilder(404, error.message);
    }
  }
}
