'use client'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { tva } from '@gluestack-ui/nativewind-utils/tva'
import { useStyleContext, withStyleContext } from '@gluestack-ui/nativewind-utils/withStyleContext'
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates'
import { createToast, createToastHook } from '@gluestack-ui/toast'
import { AnimatePresence, Motion } from '@legendapp/motion'
import { HStack } from '@questpie/ui/components/ui/hstack'
import { Icon } from '@questpie/ui/components/ui/icon'
import { Spinner } from '@questpie/ui/components/ui/spinner'
import { VStack } from '@questpie/ui/components/ui/vstack'
import { CheckCircle, CircleX, Info } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import React, { type ComponentProps, type ReactNode } from 'react'
import { Platform, Text, View } from 'react-native'

export const useToast = createToastHook(Motion.View, AnimatePresence)
const SCOPE = 'TOAST'
export const UIToast = createToast({
  Root:
    Platform.OS === 'web' ? withStyleContext(View, SCOPE) : withStyleContextAndStates(View, SCOPE),
  Title: Text,
  Description: Text,
})

cssInterop(Motion.View, { className: 'style' })
cssInterop(UIToast, { className: 'style' })
cssInterop(UIToast.Title, { className: 'style' })
cssInterop(UIToast.Description, { className: 'style' })

const toastStyle = tva({
  base: 'p-4 m-1 rounded-md gap-1 web:pointer-events-auto shadow-hard-5 border-outline-100',
  variants: {
    action: {
      error: 'bg-error-50 text-error-600',
      warning: 'bg-warning-50 text-warning-600',
      success: 'bg-success-50 text-success-600',
      info: 'bg-info-50 text-info-600',
      muted: 'bg-background-50 text-secondary-600',
    },

    variant: {
      solid: '',
      outline: 'border',
    },
  },
})

const toastTitleStyle = tva({
  base: 'text-typography-0 font-medium font-body tracking-md text-left',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
  parentVariants: {
    variant: {
      solid: '',
      outline: '',
    },
    action: {
      error: 'text-error-600',
      warning: 'text-warning-600',
      success: 'text-success-600',
      info: 'text-info-600',
      muted: 'text-background-600',
    },
  },
  parentCompoundVariants: [
    // {
    //   variant: 'outline',
    //   action: 'error',
    //   class: 'text-error-600',
    // },
    // {
    //   variant: 'outline',
    //   action: 'warning',
    //   class: 'text-warning-600',
    // },
    // {
    //   variant: 'outline',
    //   action: 'success',
    //   class: 'text-success-600',
    // },
    // {
    //   variant: 'outline',
    //   action: 'info',
    //   class: 'text-info-600',
    // },
    // {
    //   variant: 'outline',
    //   action: 'muted',
    //   class: 'text-background-600',
    // },
  ],
})

const toastDescriptionStyle = tva({
  base: 'font-normal font-body tracking-md text-left',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
  parentVariants: {
    variant: {
      solid: 'text-typography-50',
      outline: 'text-typography-900',
    },
  },
})

type IToastProps = React.ComponentProps<typeof UIToast> & {
  className?: string
} & VariantProps<typeof toastStyle>

export const Toast = React.forwardRef<React.ElementRef<typeof UIToast>, IToastProps>(
  ({ className, variant = 'solid', action = 'muted', ...props }, ref) => {
    return (
      <UIToast
        ref={ref}
        className={toastStyle({ variant, action, class: className })}
        context={{ variant, action }}
        {...props}
      />
    )
  }
)

type IToastTitleProps = React.ComponentProps<typeof UIToast.Title> & {
  className?: string
} & VariantProps<typeof toastTitleStyle>

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof UIToast.Title>,
  IToastTitleProps
>(({ className, size = 'md', ...props }, ref) => {
  const { variant: parentVariant, action: parentAction } = useStyleContext(SCOPE)
  return (
    <UIToast.Title
      ref={ref}
      {...props}
      className={toastTitleStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
          action: parentAction,
        },
      })}
    />
  )
})

type IToastDescriptionProps = React.ComponentProps<typeof UIToast.Description> & {
  className?: string
} & VariantProps<typeof toastDescriptionStyle>

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof UIToast.Description>,
  IToastDescriptionProps
>(({ className, size = 'md', ...props }, ref) => {
  const { variant: parentVariant } = useStyleContext(SCOPE)
  return (
    <UIToast.Description
      ref={ref}
      {...props}
      className={toastDescriptionStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
        },
      })}
    />
  )
})

type ToastHelperOptions = {
  description?: string
  icon?: ReactNode
  id?: string
  className?: string
}

type PromiseToastItem = string | ({ title: string } & ToastHelperOptions)

export function useToastHelper() {
  const toast = useToast()

  const showToast = (
    action: Required<ComponentProps<typeof Toast>['action']>,
    message: string,
    options?: ToastHelperOptions
  ) => {
    return toast.show({
      id: options?.id,
      render: () => (
        <Toast action={action}>
          <HStack className='gap-3 items-center'>
            {options?.icon}
            <VStack className='gap-2'>
              <ToastTitle size='sm'>{message}</ToastTitle>
              {options?.description && <ToastDescription>{options.description}</ToastDescription>}
            </VStack>
          </HStack>
        </Toast>
      ),
    })
  }

  return {
    success: (message: string, options?: ToastHelperOptions) =>
      showToast('success', message, {
        icon: <Icon as={CheckCircle} className='text-inherit' />,
        ...options,
      }),
    error: (message: string, options?: ToastHelperOptions) =>
      showToast('error', message, {
        icon: <Icon as={CircleX} className='text-inherit' />,
        ...options,
      }),
    info: (message: string, options?: ToastHelperOptions) =>
      showToast('info', message, {
        icon: <Icon as={Info} className='text-inherit' />,
        ...options,
      }),
    promise: async <T,>(
      promise: Promise<T>,
      messages: {
        loading: PromiseToastItem
        success: PromiseToastItem
        error: PromiseToastItem
      },
      options?: ToastHelperOptions
    ) => {
      const id = showToast(
        'muted',
        typeof messages.loading === 'string' ? messages.loading : messages.loading.title,
        {
          icon: <Spinner />,
          ...(typeof messages.loading === 'object' ? messages.loading : undefined),
          ...options,
        }
      )
      try {
        const result = await promise
        showToast(
          'success',
          typeof messages.success === 'string' ? messages.success : messages.success.title,
          {
            id,
            icon: <Icon as={CheckCircle} className='text-inherit' />,
            ...(typeof messages.success === 'object' ? messages.success : undefined),
            ...options,
          }
        )
        return result
      } catch (error) {
        showToast(
          'error',
          typeof messages.error === 'string' ? messages.error : messages.error.title,
          {
            id,
            icon: <Icon as={CircleX} className='text-inherit' />,
            ...(typeof messages.error === 'object' ? messages.error : undefined),
            ...options,
          }
        )
        throw error
      }
    },
  }
}
