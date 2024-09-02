import { treaty } from '@elysiajs/eden'
import type { ApiType } from '@questpie/api/index'
import { buildAuthHeaders } from '@questpie/web/app/(auth)/auth.utils'
import { getSessionId } from '@questpie/web/app/(auth)/use-auth'
import { env } from '@questpie/web/env'

const apiClient = treaty<ApiType>(env.PUBLIC_API_URL, {
  headers() {
    return { ...buildAuthHeaders(getSessionId()) }
  },
})

export { apiClient }
