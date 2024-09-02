import { Box } from '@questpie/ui/components/ui/box'
import { Button, ButtonText } from '@questpie/ui/components/ui/button'
import { Text } from 'react-native'

export default function Index() {
  return (
    <Box className='flex-1 justify-center items-center flex flex-col gap-6'>
      <Button variant='solid' size='xl' className='rounded-lg'>
        <ButtonText> Ide to tt??</ButtonText>
      </Button>

      <Text className='text-base font-bold mt-4'>Edit app/index.tsx to edit this screen.</Text>
    </Box>
  )
}
