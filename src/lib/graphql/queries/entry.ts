import gql from 'graphql-tag';

export const getEntryQuery = ({
  owner,
  repo,
  branch = 'master',
  path = '',
  fileName,
  additionalAttributes,
}: {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
  fileName: string;
  additionalAttributes?: string;
}) => {
  const parseAttributes = () => {
    const parsedAttributes = additionalAttributes && JSON.parse(additionalAttributes);

    if (!Array.isArray(parsedAttributes)) return [];

    return parsedAttributes;
  };

  return gql`
  {
    repository(owner: "${owner}", name: "${repo}") {
      object(expression: "${branch}:${path}${path ? `/${fileName}` : fileName}") {
        ... on Blob{
          text,
          ${[...parseAttributes()]}
        }
      }
    }
  }
`;
};
