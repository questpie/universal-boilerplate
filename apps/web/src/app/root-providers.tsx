'use client'
import { AuthProvider, type AuthData } from '@questpie/web/app/(auth)/use-auth'
import { RootStoreProvider } from '@questpie/web/app/_atoms/root-store'
import { getQueryClient } from '@questpie/web/utils/query-client'
import { ThemeProvider } from '@questpie/ui/components/theme-provider'
import { Toaster } from '@questpie/ui/components/ui/sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function RootProviders(props: { children: React.ReactNode; authData: AuthData }) {
  return (
    <RootStoreProvider>
      <AuthProvider authData={props.authData}>
        <QueryClientProvider client={getQueryClient()}>
          <ReactQueryStreamedHydration>
            <ThemeProvider>
              <Toaster />
              {props.children}
            </ThemeProvider>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </AuthProvider>
    </RootStoreProvider>
  )
}
