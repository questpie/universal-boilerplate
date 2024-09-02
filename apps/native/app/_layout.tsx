import { GluestackUIProvider } from '@questpie/ui/components/ui/gluestack-ui-provider'
import '@questpie/ui/css'
import 'expo-dev-client'
import { Stack } from 'expo-router'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // useEffect(function onMount() {
  //   let isMounted = true

  //   async function onFetchUpdateAsync() {
  //     /**
  //      * Don't check for updates in the Expo Go app.
  //      */
  //     if (Constants.appOwnership === AppOwnership.Expo) return
  //     try {
  //       const update = await Updates.checkForUpdateAsync()

  //       if (update.isAvailable && isMounted) {
  //         await Updates.fetchUpdateAsync()
  //         await Updates.reloadAsync()
  //       }
  //     } catch (error) {
  //       if (!isMounted) return
  //       // You can also add an alert() to see the error message in case of an error when fetching updates.
  //       alert(`Error fetching latest Expo update: ${error}`)
  //     }
  //   }
  //   onFetchUpdateAsync()

  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error
  // }, [error])

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <>
      <GluestackUIProvider>
        {/* <DeepLinkLayout /> */}
        {/* <Button>
          <ButtonText>Ide to tt</ButtonText>
        </Button> */}
        <Stack>
          <Stack.Screen name='index' />
        </Stack>
      </GluestackUIProvider>
    </>
  )

  // return (
  //   <>
  //   // <Provider initialSession={null}>
  //     <DeepLinkLayout />
  //     // <Suspense fallback={<PageLoader />}>
  //       <Stack
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //         />
  //     </Suspense>
  //   // </Provider>
  //         </>
  // )
}

function DeepLinkLayout() {
  // TODO: add deep link handling
  // useHandleStripeCallback()

  return null
}
