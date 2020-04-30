import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-fetch';

import { githubApi } from 'config';

const httpLink = new HttpLink({ uri: githubApi.uri, fetch });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GIT_KEY}`,
    },
  };
});

const link = authLink.concat(httpLink);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache,
});
