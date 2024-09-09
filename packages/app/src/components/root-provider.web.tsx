'use client'

import { RootStoreProvider } from '@questpie/app/atoms/root-store'
import StyledJsxRegistry from '@questpie/app/components/styled-jsx-registry'
import { AuthProvider, type AuthData } from '@questpie/app/modules/auth/components/auth.provider'
import { getQueryClient } from '@questpie/app/utils/query-client'
import { ThemeProvider } from '@questpie/ui/components/theme-provider'
import { GluestackUIProvider } from '@questpie/ui/components/ui/gluestack-ui-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function RootProviders(props: { children: React.ReactNode; initialAuthData: AuthData }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <StyledJsxRegistry>
        <GluestackUIProvider>
          <RootStoreProvider>
            <AuthProvider authData={props.initialAuthData}>
              <ReactQueryStreamedHydration>
                <ThemeProvider>{props.children}</ThemeProvider>
              </ReactQueryStreamedHydration>
            </AuthProvider>
          </RootStoreProvider>
        </GluestackUIProvider>
      </StyledJsxRegistry>
    </QueryClientProvider>
  )
}
