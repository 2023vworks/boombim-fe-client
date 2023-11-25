import styled from 'styled-components'

const BUTTON_WRAPPER_UNION_TYPE = {
  MAIN: 'MAIN',
  SUB: 'SUB',
} as const

export type BUTTON_WRAPPER_TYPE = (typeof BUTTON_WRAPPER_UNION_TYPE)[keyof typeof BUTTON_WRAPPER_UNION_TYPE]

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const ButtonBox = styled.div`
  position: absolute;
  width: 40px;
  height: 90px;
  bottom: 50px;
  right: 20px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonWraaper = styled.div<{ $type: BUTTON_WRAPPER_TYPE }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.$type === 'MAIN' ? props.theme.color.mainColor : props.theme.color.white)};
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
