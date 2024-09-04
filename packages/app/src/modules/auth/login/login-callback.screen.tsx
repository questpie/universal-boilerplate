'use client'
import { useAuthActions } from '@questpie/app/modules/auth/use-auth-actions'
import { Center } from '@questpie/ui/components/ui/center'
import { Heading } from '@questpie/ui/components/ui/heading'
import { Text } from '@questpie/ui/components/ui/text'
import { VStack } from '@questpie/ui/components/ui/vstack'
import { useEffect } from 'react'
import { useRouter } from 'solito/navigation'

export default function LoginCallbackScreen(props: {
  searchParams: Record<string, string | undefined>
}) {
  const token = props.searchParams.token
  const { login } = useAuthActions()
  const router = useRouter()

  useEffect(() => {
    if (!token || login.isPending) return
    login.mutate(token, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }, [token, login, router])

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
