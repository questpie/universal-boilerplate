import { createEnv } from '@questpie/shared/env/create-env'
import { generalEnvSchema } from '@questpie/shared/env/general-env.schema'
import { Type } from '@sinclair/typebox'

/**
 * Shared environment variables that are used in both the client and the server.
 */
export const generalEnv = createEnv({
  client: generalEnvSchema,
  runtimeEnv: {
    PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
    PUBLIC_NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV,
  },
})
