import { styled } from 'styled-components'
import { type BUTTON_TYPE_ENUM } from './Button'

interface StyleProp {
  $width: number
  $height: number
  $buttonType: BUTTON_TYPE_ENUM
}

export const StyleButton = styled.button<StyleProp>`
  width: ${(props) => props.$width + 'px'};
  height: ${(props) => props.$height + 'px'};
  border-radius: 15px;
  background-color: ${(props) =>
    props.$buttonType === 'PRIMARY' ? props.theme.color.mainColor : props.theme.color.white};
  color: ${(props) => (props.$buttonType === 'PRIMARY' ? props.theme.color.white : props.theme.color.mainColor)};
  border: ${(props) => (props.$buttonType === 'OUTLINE' ? '1px solid' + props.theme.color.mainColor : 'none')};
  font-size: 14px;
  font-weight: 600;
`
