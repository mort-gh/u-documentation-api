import fastify from 'fastify';

import { getEntries, getEntry } from 'controllers/entries';

import { object, string, array, mixed } from 'json-schemas/primitives';

import { generateSchemaForError, errorsMap } from 'utils';

const tags = ['Entries'];
const querystring = object({
  properties: {
    branch: string({ default: 'master' }),
    path: string({ default: '' }),
  },
});

export const entriesRoutes = (app: fastify.FastifyInstance): void => {
  app.get(
    '/entries/:owner/:repo',
    {
      schema: {
        summary: 'List files and folders from path',
        tags,
        params: object({
          required: ['owner', 'repo'],
          properties: {
            owner: string(),
            repo: string(),
          },
        }),
        querystring,
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
    '/entries/:owner/:repo/:fileName',
    {
      schema: {
        summary: 'Request to get the contents of a specific file',
        tags,
        params: object({
          required: ['owner', 'repo'],
          properties: {
            owner: string(),
            repo: string(),
            fileName: string(),
          },
        }),
        querystring: object({
          properties: {
            branch: string({ default: 'master' }),
            path: string({ default: '' }),
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
