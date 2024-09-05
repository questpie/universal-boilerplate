import { treaty } from '@elysiajs/eden'
import type { ApiType } from '@questpie/api/index'
import { getSessionId } from '@questpie/app/modules/auth/components/auth.provider'
import { buildAuthHeaders } from '@questpie/app/modules/auth/auth.utils'
import { env } from '@questpie/app/env'

const apiClient = treaty<ApiType>(env.PUBLIC_API_URL, {
  headers() {
    return { ...buildAuthHeaders(getSessionId()) }
  },
})

export { apiClient }
