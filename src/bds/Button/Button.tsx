import theme from '@/styles/theme'
import * as Styles from './Button.styles'
import { useCallback } from 'react'

const BUTTON_TYPE = {
  PRIMARY: 'PRIMARY',
  OUTLINE: 'OUTLINE',
  UNAVALIAVE: 'UNAVALIAVE',
} as const

export type BUTTON_TYPE_ENUM = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]

interface Props {
  text?: string
  width: number
  height?: number
  buttonType: BUTTON_TYPE_ENUM
  onClick?: () => void
}

export const Button = ({ text, width, height = 42, buttonType = 'PRIMARY', onClick }: Props): React.ReactNode => {
  const defineBackgroundColor = useCallback((buttonType: BUTTON_TYPE_ENUM) => {
    switch (buttonType) {
      case 'OUTLINE':
        return theme.color.white
      case 'PRIMARY':
        return theme.color.mainColor
      case 'UNAVALIAVE':
        return theme.color.gray
    }
  }, [])

  const defineColor = useCallback((buttonType: BUTTON_TYPE_ENUM) => {
    switch (buttonType) {
      case 'OUTLINE':
        return theme.color.mainColor
      case 'PRIMARY':
        return theme.color.white
      case 'UNAVALIAVE':
        return theme.color.white
    }
  }, [])

  return (
    <Styles.StyleButton
      onClick={onClick}
      $width={width}
      $height={height}
      $buttonType={buttonType}
      $backgroundColor={defineBackgroundColor(buttonType)}
      $color={defineColor(buttonType)}
    >
      {text}
    </Styles.StyleButton>
  )
}
