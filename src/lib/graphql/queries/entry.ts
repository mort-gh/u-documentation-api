import gql from 'graphql-tag';

export const getEntryQuery = ({
  owner,
  repo,
  branch = 'master',
  path = '',
  fileName,
}: {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
  fileName: string;
}) => gql`
  {
    repository(owner: "${owner}", name: "${repo}") {
      object(expression: "${branch}:${path}${path ? `/${fileName}` : fileName}") {
        ... on Blob{
          text
        }
      }
    }
  }
`;
