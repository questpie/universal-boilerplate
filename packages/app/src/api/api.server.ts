import { treaty } from '@elysiajs/eden'
import type { ApiType } from '@questpie/api/index'
import { env } from '@questpie/app/env'
import { AUTH_COOKIE_NAME } from '@questpie/app/modules/auth/auth.constants'
import { buildAuthHeaders } from '@questpie/app/modules/auth/auth.utils'
import { cookies } from 'next/headers'

const apiRsc = treaty<ApiType>(env.PUBLIC_API_URL, {
  headers: {
    ...buildAuthHeaders(cookies().get(AUTH_COOKIE_NAME)?.value),
  },
})

export { apiRsc }
