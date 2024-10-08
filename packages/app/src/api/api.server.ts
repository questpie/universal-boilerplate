import type { ApiType } from '@questpie/api/index'
import { AUTH_COOKIE_NAME } from '@questpie/app/modules/auth/auth.constants'
import { buildAuthHeaders } from '@questpie/app/modules/auth/auth.utils'
import { buildOrganizationHeaders } from '@questpie/app/modules/organizations/_utils/organizations.utils'
import { ORGANIZATION_COOKIE_NAME } from '@questpie/app/modules/organizations/organizations.constants'
import { env } from '@questpie/app/env'
import { treaty } from '@elysiajs/eden'
import { cookies } from 'next/headers'

const apiServer = treaty<ApiType>(env.PUBLIC_API_URL, {
  headers() {
    return {
      ...buildAuthHeaders(cookies().get(AUTH_COOKIE_NAME)?.value),
      ...buildOrganizationHeaders(cookies().get(ORGANIZATION_COOKIE_NAME)?.value),
    }
  },
})

export { apiServer }
