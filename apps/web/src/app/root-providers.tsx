'use client'

import { ThemeProvider } from '@questpie/ui/components/theme-provider'
import { GluestackUIProvider } from '@questpie/ui/components/ui/gluestack-ui-provider'
import { AuthProvider, type AuthData } from '@questpie/web/app/(auth)/use-auth'
import { RootStoreProvider } from '@questpie/web/app/_atoms/root-store'
import StyledJsxRegistry from '@questpie/web/app/styled-jsx-registry'
import { getQueryClient } from '@questpie/web/utils/query-client'
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
