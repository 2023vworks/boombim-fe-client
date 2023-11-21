import theme, { type COLOR_TYPE } from '@/styles/theme'
import * as Styles from './Typography.styles'
import { useCallback } from 'react'

interface Props {
  children: React.ReactNode | string
  size: FONT_SIZE
  color?: keyof COLOR_TYPE
  lineHeight?: string
  fontWeight?: number
  fontFamily?: string
  className?: string
}

export const Typography = ({
  children,
  size,
  color = 'black',
  lineHeight,
  fontWeight = 400,
  fontFamily,
  className,
}: Props): React.ReactNode => {
  const defineSize = useCallback((fontSize: FONT_SIZE) => {
    switch (fontSize) {
      case 'H1':
        return '36px'
      case 'H2':
        return '32px'
      case 'H3':
        return '28px'
      case 'H4':
        return '24px'
      case 'H5':
        return '20px'
      case 'P':
        return '14px'
      case 'SMALL':
        return '12px'
      case 'XSMALL':
        return '10px'
    }
  }, [])

  return (
    <Styles.Text
      className={className ?? ''}
      $size={defineSize(size)}
      $color={theme.color[color]}
      $fontWeight={fontWeight}
      $lineHeight={lineHeight}
      $fontFamily={fontFamily}
    >
      {children}
    </Styles.Text>
  )
}

const UNION_FONT_SIZE = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  P: 'P',
  SMALL: 'SMALL',
  XSMALL: 'XSMALL',
} as const

export type FONT_SIZE = (typeof UNION_FONT_SIZE)[keyof typeof UNION_FONT_SIZE]
