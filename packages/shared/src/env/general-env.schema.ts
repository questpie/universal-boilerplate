import { Type } from '@sinclair/typebox'

export const generalEnvSchema = {
  PUBLIC_APP_NAME: Type.String({ default: 'Questpie' }),
  PUBLIC_NODE_ENV: Type.Union(
    [Type.Literal('production'), Type.Literal('development'), Type.Literal('test')],
    {
      default: 'development',
    }
  ),
}
