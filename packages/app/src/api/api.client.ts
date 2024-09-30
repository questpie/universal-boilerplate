import type { ApiType } from '@questpie/api/index'
import { env } from '@questpie/app/env'
import { treaty } from '@elysiajs/eden'
import { buildAuthHeaders } from '@questpie/app/modules/auth/auth.utils'
import { getSessionId } from '@questpie/app/modules/auth/components/auth.provider'
import { getSelectedOrganizationId } from '@questpie/app/modules/organizations/_components/selected-organization-provider'
import { buildOrganizationHeaders } from '@questpie/app/modules/organizations/_utils/organizations.utils'

const apiClient = treaty<ApiType>(env.PUBLIC_API_URL, {
  headers() {
    return {
      ...buildAuthHeaders(getSessionId()),
      ...buildOrganizationHeaders(getSelectedOrganizationId()),
    }
  },
  fetch: {
    credentials: 'include',
  },
})

export { apiClient }

export type RouteOutput<T extends (...args: any[]) => Promise<any>> = NonNullable<
  Awaited<ReturnType<T>>['data']
>
