'use client'
import { apiClient } from '@questpie/app/api/api.client'
import { env } from '@questpie/app/env'
import { Box } from '@questpie/ui/components/ui/box'
import { Button, ButtonText } from '@questpie/ui/components/ui/button'
import { Center } from '@questpie/ui/components/ui/center'
import { Divider } from '@questpie/ui/components/ui/divider'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@questpie/ui/components/ui/form-control'
import { Heading } from '@questpie/ui/components/ui/heading'
import { HStack } from '@questpie/ui/components/ui/hstack'
import { Icon, MailIcon } from '@questpie/ui/components/ui/icon'
import { Input, InputField } from '@questpie/ui/components/ui/input'
import { Link, LinkText } from '@questpie/ui/components/ui/link'
import { Text } from '@questpie/ui/components/ui/text'
import { useToast } from '@questpie/ui/components/ui/toast'
import { VStack } from '@questpie/ui/components/ui/vstack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Platform } from 'react-native'

export default function LoginScreen() {
  const [email, setEmail] = useState('')

  // make sure this works
  const toast = useToast()

  const magicLinkMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiClient.auth['magic-link'].index.post({
        email,
        redirectTo: Platform.select({
          web: `${env.PUBLIC_APP_URL}/login/callback?token={{token}}`,
          native: 'questpie://login/callback?token={{token}}',
        }),
      })
    },
  })

  const handleEmailSubmit = (e: any) => {
    e?.preventDefault?.()
    magicLinkMutation.mutateAsync(email)
    // toast.show({
    //   render: (props) => {
    //     return (
    //       <Toast variant='solid' action='error' nativeID={`toast-${props.id}`}>
    //         <HStack space='md'>
    //           <Icon as={HelpCircleIcon} className='stroke-error-500 mt-0.5' />
    //           <VStack space='xs'>
    //             <ToastTitle className='font-semibold text-error-500'>Error!</ToastTitle>
    //             <ToastDescription size='sm'>Something went wrong.</ToastDescription>
    //           </VStack>
    //         </HStack>
    //         <HStack className='min-[450px]:gap-3 gap-1'>
    //           <Button variant='link' size='sm' className='px-3.5 self-center'>
    //             <ButtonText>Retry</ButtonText>
    //           </Button>
    //           <Pressable onPress={() => toast.close(props.id)}>
    //             <Icon as={CloseIcon} />
    //           </Pressable>
    //         </HStack>
    //       </Toast>
    //     )
    //   },
    // })

    // promise(magicLinkMutation.mutateAsync(email), {
    //   loading: 'Sending magic link...',
    //   success: 'Magic link sent',
    //   error: 'Failed to send magic link',
    // })
  }

  return (
    <Box className='flex justify-center items-center min-h-screen '>
      <Box className='w-full max-w-md p-8  sm:border sm:border-background-200 rounded-xl'>
        <VStack className='flex flex-col gap-8'>
          <Box className='space-y-2 text-center'>
            <Heading className='text-3xl font-bold'>Welcome Back</Heading>
            <Text className='text-background-500'>Sign in to continue your journey</Text>
          </Box>
          <Box className='gap-4 flex flex-col'>
            {/* <Box onSubmit={handleEmailSubmit} className='space-y-4'> */}
            <Box className='gap-4 flex flex-col'>
              <FormControl className='flex-col flex gap-2'>
                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <Icon as={MailIcon} className='ml-3 size-4 text-background-500' />
                  <InputField
                    type='text'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                  />
                </Input>
              </FormControl>
              <Button
                onPress={(e) => {
                  console.log('yoo')
                  handleEmailSubmit(e)
                }}
                className='w-full gap-2'
                isLoading={magicLinkMutation.isPending}
                loadingText='Sending...'
                disabled={magicLinkMutation.status === 'success'}
              >
                {/* <Icon icon='lucide:mail' /> */}
                <ButtonText>Sign in with Email</ButtonText>
              </Button>
            </Box>
            <HStack className='relative items-center gap-2'>
              <Divider className='flex-1' />
              <Text size='xs' className='text-background-500 uppercase'>
                Or continue with
              </Text>
              <Divider className='flex-1' />
            </HStack>
            <Box className='grid grid-cols-2 gap-4'>
              <Button action='secondary' className='gap-2'>
                {/* <AddIcon icon='logos:github-icon' /> */}
                <ButtonText>GitHub</ButtonText>
              </Button>
              <Button action='secondary' className='gap-2'>
                {/* <Icon icon='logos:google-icon' /> */}
                <ButtonText>Google</ButtonText>
              </Button>
            </Box>
          </Box>
          <HStack className='items-center justify-center text-xs flex-wrap gap-0.5 text-background-500'>
            <Text className='text-xs text-background-500'>By signing in, you agree to our </Text>
            <Link href='/terms-of-service'>
              <LinkText size='xs'>Terms of Service </LinkText>
            </Link>
            <Text className='text-xs text-background-500'>and </Text>
            <Link href='/privacy-policy'>
              <LinkText size='xs'>Privacy Policy</LinkText>
            </Link>
            <Text className='text-xs text-background-500'>.</Text>
          </HStack>
          <Box className='w-full mt-8'>
            <Heading className='text-base text-right font-bold'>QUESTPIE</Heading>
            <Text className='text-xs text-right text-background-500'>Your WebApp Boilerplate</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
