import type { apiClient } from '@questpie/app/api/api.client'
import { AtomsHydrator } from '@questpie/app/atoms/atoms-provider'
import { getRootStore } from '@questpie/app/atoms/root-store'
import { atom, useAtomValue } from 'jotai'

export type AuthData = Awaited<ReturnType<typeof apiClient.auth.session.index.get>>['data']
export const authAtom = atom<AuthData>(null)

export function useAuthData() {
  return useAtomValue(authAtom)
}

export function getSessionId(): string | undefined {
  return getRootStore().get(authAtom)?.session.id
}

export const AuthProvider = ({
  children,
  authData,
}: { children: React.ReactNode; authData: AuthData | null }) => {
  return <AtomsHydrator atomValues={[[authAtom, authData]]}>{children}</AtomsHydrator>
}
