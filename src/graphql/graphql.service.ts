import { Injectable } from '@nestjs/common';

import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { githubApi } from '../config';

@Injectable()
export class GraphqlService {
  private readonly httpLink = new HttpLink({ uri: githubApi.uri, fetch });

  private readonly client: ApolloClient<unknown>;

  public constructor() {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${process.env.GIT_KEY}`,
        },
      };
    });

    const link = authLink.concat(this.httpLink);
    const cache = new InMemoryCache();

    this.client = new ApolloClient({ link, cache });
  }

  public getClient(): ApolloClient<unknown> {
    return this.client;
  }
}
