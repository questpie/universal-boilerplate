import type React from 'react'
import { config } from './config'
import { type ColorSchemeName, useColorScheme, View, type ViewProps } from 'react-native'
import { OverlayProvider } from '@gluestack-ui/overlay'
import { colorScheme as colorSchemeNW } from 'nativewind'

type ModeType = 'light' | 'dark' | 'system'

const getColorSchemeName = (colorScheme: ColorSchemeName, mode: ModeType): 'light' | 'dark' => {
  if (mode === 'system') {
    return colorScheme ?? 'light'
  }
  return mode
}

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: 'light' | 'dark' | 'system'
  children?: React.ReactNode
  style?: ViewProps['style']
}) {
  const colorScheme = useColorScheme()

  const colorSchemeName = getColorSchemeName(colorScheme, mode)

  colorSchemeNW.set(mode)

  return (
    <View
      style={[config[colorSchemeName], { flex: 1, height: '100%', width: '100%' }, props.style]}
    >
      <OverlayProvider>{props.children}</OverlayProvider>
    </View>
  )
}
