import gql from 'graphql-tag';

export const getEntriesQuery = ({
  owner,
  repo,
  branch = 'master',
  path = '',
}: {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
}) => gql`
{  
  repository(owner: "${owner}", name: "${repo}") {
    object(expression: "${branch}:${path}") {
    ... on Tree {
      entries {
            name
            type
        }
      }
    }
  }
}
`;
