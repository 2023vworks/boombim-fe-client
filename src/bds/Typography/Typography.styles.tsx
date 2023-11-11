import styled from 'styled-components'

interface StyleProps {
  $size: string
  $color: string
  $lineHeight?: string
  $fontWeight?: number
  $fontFamily?: string
}

export const Text = styled.p<StyleProps>`
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
  line-height: ${(props) => props.$lineHeight};
  font-weight: ${(props) => props.$fontWeight};
  font-family: ${(props) => props.$fontFamily};
`
