import fastify from 'fastify';

import { getEntries, getEntry } from 'controllers/entries';

import { object, string, array } from 'json-schemas/primitives';

import { generateSchemaForError, errorsMap } from 'utils';

const tags = ['Entries'];

export const entriesRoutes = (app: fastify.FastifyInstance): void => {
  app.get(
    '/entries/:owner/:repo/:branch/:path',
    {
      schema: {
        summary: 'List files and folders',
        tags,
        params: object({
          required: ['owner', 'repo', 'branch', 'path'],
          properties: {
            owner: string(),
            repo: string(),
            branch: string({ default: 'master' }),
            path: string(),
          },
        }),
        response: {
          200: array({
            description: 'Successful response',
            items: object({
              required: ['name', 'type'],
              properties: {
                name: string(),
                type: string({ enum: ['blob', 'tree'] }),
              },
            }),
          }),
          404: generateSchemaForError(errorsMap[404], 'Not found'),
        },
      },
    },
    getEntries
  );

  app.get(
    '/entries/:owner/:repo/:branch/:path/:fileName',
    {
      schema: {
        summary: 'Request to get the contents of a specific file',
        tags,
        params: object({
          required: ['owner', 'repo', 'branch', 'path', 'fileName'],
          properties: {
            owner: string(),
            repo: string(),
            branch: string({ default: 'master' }),
            path: string(),
            fileName: string(),
          },
        }),
        response: {
          200: object({
            description: 'Successful response',
            required: ['content'],
            properties: {
              content: string(),
            },
          }),
          404: generateSchemaForError(errorsMap[404], 'Not found'),
        },
      },
    },
    getEntry
  );
};
