'use client'
import { useAuthData } from '@questpie/app/modules/auth/components/auth.provider'
import { Button, ButtonText } from '@questpie/ui/components/ui/button'
import { Heading } from '@questpie/ui/components/ui/heading'
import { Text } from '@questpie/ui/components/ui/text'
import { VStack } from '@questpie/ui/components/ui/vstack'
import { Link } from 'solito/link'

export function HomeScreen() {
  const auth = useAuthData()

  return (
    <VStack className='gap-4 mx-auto items-center max-w-screen-xl'>
      <VStack className='w-full max-w-xl mt-20 gap-8'>
        <VStack className='gap-4'>
          <Heading className='text-2xl text-center'>Welcome</Heading>
          <Text className='text-center'>This is a Universal app</Text>
        </VStack>

        {auth?.user ? (
          <Text>Welcome {auth.user.name}</Text>
        ) : (
          <Link href='/login'>
            <Button>
              <ButtonText>Login</ButtonText>
            </Button>
          </Link>
        )}
      </VStack>
    </VStack>
  )
}
