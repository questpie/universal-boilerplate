'use client'

import { RootStoreProvider } from '@questpie/app/atoms/root-store'
import { AuthProvider, type AuthData } from '@questpie/app/modules/auth/components/auth.provider'
import { getQueryClient } from '@questpie/app/utils/query-client'
import { ThemeProvider } from '@questpie/ui/components/theme-provider'
import { GluestackUIProvider } from '@questpie/ui/components/ui/gluestack-ui-provider'
import { QueryClientProvider } from '@tanstack/react-query'

export function RootProviders(props: { children: React.ReactNode; initialAuthData: AuthData }) {
  return (
    <GluestackUIProvider>
      <RootStoreProvider>
        <AuthProvider authData={props.initialAuthData}>
          <QueryClientProvider client={getQueryClient()}>
            <ThemeProvider>{props.children}</ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </RootStoreProvider>
    </GluestackUIProvider>
  )
}
