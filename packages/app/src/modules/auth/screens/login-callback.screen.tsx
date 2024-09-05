'use client'
import { useAuthActions } from '@questpie/app/modules/auth/use-auth-actions'
import { Center } from '@questpie/ui/components/ui/center'
import { Heading } from '@questpie/ui/components/ui/heading'
import { Text } from '@questpie/ui/components/ui/text'
import { VStack } from '@questpie/ui/components/ui/vstack'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'solito/navigation'

export default function LoginCallbackScreen() {
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''
  const { login } = useAuthActions()
  const router = useRouter()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!token || login.isPending) return
    login.mutateAsync(token).then(() => {
      router.replace('/')
    })
  }, [])

  return (
    <VStack className='flex justify-center items-center min-h-screen bg-muted'>
      <Center className='text-center'>
        <Heading className='text-2xl font-bold mb-4'>Logging you in...</Heading>
        <Text className='text-muted-foreground'>
          Please wait while we authenticate your session.
        </Text>
      </Center>
    </VStack>
  )
}
