'use client'

import { RootStoreProvider } from '@questpie/app/atoms/root-store'
import { AuthProvider } from '@questpie/app/modules/auth/auth.provider'
import { getQueryClient } from '@questpie/app/utils/query-client'
import { ThemeProvider } from '@questpie/ui/components/theme-provider'
import { GluestackUIProvider } from '@questpie/ui/components/ui/gluestack-ui-provider'
import StyledJsxRegistry from '@questpie/web/app/styled-jsx-registry'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function RootProviders(props: { children: React.ReactNode; authData: AuthData }) {
  return (
    <StyledJsxRegistry>
      <GluestackUIProvider>
        <RootStoreProvider>
          <AuthProvider authData={props.authData}>
            <QueryClientProvider client={getQueryClient()}>
              <ReactQueryStreamedHydration>
                <ThemeProvider>{props.children}</ThemeProvider>
              </ReactQueryStreamedHydration>
            </QueryClientProvider>
          </AuthProvider>
        </RootStoreProvider>
      </GluestackUIProvider>
    </StyledJsxRegistry>
  )
}
