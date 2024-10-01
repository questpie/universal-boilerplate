import { envSchema } from '@questpie/app/env/env.schema'
import { createEnv } from '@questpie/shared/env/create-env'

/**
 * This are env that are both accessible inside server and client environments
 */
export const env = createEnv({
  client: envSchema,
  runtimeEnv: {
    PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    PUBLIC_WEB_URL: process.env.EXPO_PUBLIC_WEB_URL,
    PUBLIC_NATIVE_SCHEMA: process.env.EXPO_PUBLIC_NATIVE_SCHEMA,
    PUBLIC_PUSHER_APP_KEY: process.env.EXPO_PUBLIC_PUSHER_APP_KEY,
    PUBLIC_PUSHER_APP_CLUSTER: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER,
    PUBLIC_PUSHER_HOST: process.env.EXPO_PUBLIC_PUSHER_HOST,
    PUBLIC_PUSHER_PORT: process.env.EXPO_PUBLIC_PUSHER_PORT,
    PUBLIC_PUSHER_USE_TLS: process.env.EXPO_PUBLIC_PUSHER_USE_TLS,
    PUBLIC_NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV,
  },
})
