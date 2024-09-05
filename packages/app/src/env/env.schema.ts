import { StringBoolean, StringInt } from '@questpie/shared/schemas/misc'
import { Type } from '@sinclair/typebox'

export const envSchema = {
  PUBLIC_NODE_ENV: Type.Union(
    [Type.Literal('production'), Type.Literal('development'), Type.Literal('test')],
    {
      default: 'development',
    }
  ),

  // server
  PUBLIC_API_URL: Type.String(),

  PUBLIC_APP_URL: Type.String(),

  // pusher
  PUBLIC_PUSHER_APP_KEY: Type.String(),
  PUBLIC_PUSHER_APP_CLUSTER: Type.String({ default: '' }), // if you are using soketi the cluster is just for pusher-js satisfaction
  PUBLIC_PUSHER_HOST: Type.Optional(Type.String()), // if you are using soketi
  PUBLIC_PUSHER_PORT: Type.Optional(StringInt()), // if you are using soketi
  PUBLIC_PUSHER_USE_TLS: Type.Optional(StringBoolean({ default: false })),
}
