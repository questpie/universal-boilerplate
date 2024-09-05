'use client'

import { apiClient } from '@questpie/app/api/api.client'
import { authAtom } from '@questpie/app/modules/auth/components/auth.provider'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'

export function useAuthActions() {
  const setSessionAtom = useSetAtom(authAtom)
  const login = useMutation({
    mutationFn: async (token: string) => {
      const res = await apiClient.auth.session.index.post({
        authToken: token,
      })

      if (res.error) {
        return null
      }

      // TODO: set to expo secure storage
      // await setSessionAction(res.data.session.id)
      return res.data
    },

    onSuccess: (data) => {
      setSessionAtom(data)
    },
  })

  const logout = useMutation({
    mutationFn: async () => {
      const res = await apiClient.auth.session.index.delete()
      if (res.error) {
        return null
      }
      // TODO: set to expo secure storage
      // await setSessionAction(null)
      return res.data
    },
    onSuccess: () => {
      setSessionAtom(null)
    },
  })

  return { login, logout }
}
