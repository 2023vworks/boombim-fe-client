import * as Styles from './Button.styles'

const BUTTON_TYPE = {
  PRIMARY: 'PRIMARY',
  OUTLINE: 'OUTLINE',
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
  return (
    <Styles.StyleButton onClick={onClick} $width={width} $height={height} $buttonType={buttonType}>
      {text}
    </Styles.StyleButton>
  )
}
