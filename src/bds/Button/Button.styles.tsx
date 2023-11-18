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
  background-color: ${(props) => {
    switch (props.$buttonType) {
      case 'PRIMARY':
        return props.theme.color.mainColor
      case 'OUTLINE':
        return props.theme.color.white
      case 'UNAVALIAVE':
        return props.theme.color.gray
    }
  }};

  color: ${(props) => {
    switch (props.$buttonType) {
      case 'PRIMARY':
        return props.theme.color.white
      case 'OUTLINE':
        return props.theme.color.mainColor
      case 'UNAVALIAVE':
        return props.theme.color.white
    }
  }};
  border: ${(props) => (props.$buttonType === 'OUTLINE' ? '1px solid' + props.theme.color.mainColor : 'none')};
  font-size: 14px;
  font-weight: 600;
`
