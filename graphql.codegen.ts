import { CodegenConfig } from '@graphql-codegen/cli';
import assert from 'node:assert/strict';
import 'dotenv/config';

const getEnvOrThrow = (envKey: string): string => {
  const value = process.env[envKey];

  assert.ok(
    value,
    `process.env["${envKey}"] is not provided or empty, got: ${value}`
  );
  return value;
};

/**
 * @see {@link https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-graphql-request}
 */
const config: CodegenConfig = {
  generates: {
    'src/api/meetup/events.graphql.generated.ts': {
      schema: getEnvOrThrow('MEETUP_GRAPHQL_ENDPOINT'),
      documents: ['src/api/meetup/events.graphql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: false,
        useTypeImports: true,
      },
    },
  },
};

export default config;
