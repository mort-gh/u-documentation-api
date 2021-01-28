import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { GraphqlResponse } from '../types';
import { GraphqlService } from '../graphql';
import { Entries, Entry } from '../types/data';
import { getEntriesQuery, getEntryQuery } from '../graphql/queries';

@Injectable()
export class EntriesService {
  public constructor(private readonly graphql: GraphqlService) {}

  public async getEntries(owner: string, repo: string, branch: string, path: string) {
    try {
      const client = this.graphql.getClient();

      await client.cache.reset();

      const { data }: { data: GraphqlResponse<Entries> } = await client.query({
        query: getEntriesQuery({ owner, repo, branch, path }),
      });

      return (data.repository.object?.entries || []).map((entry) => ({ name: entry.name, type: entry.type }));
    } catch ({ message }) {
      return new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  public async getEntry(owner: string, repo: string, branch: string, path: string, fileName: string) {
    try {
      const client = this.graphql.getClient();

      await client.cache.reset();

      const { data }: { data: GraphqlResponse<Entry> } = await client.query({
        query: getEntryQuery({
          owner,
          repo,
          branch,
          path,
          fileName,
        }),
      });

      if (!data?.repository?.object) {
        return new HttpException('File not found or file in binary', 404);
      }

      return {
        content: data.repository.object?.text || null,
        ...data?.repository?.object,
      };
    } catch ({ message }) {
      return new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
