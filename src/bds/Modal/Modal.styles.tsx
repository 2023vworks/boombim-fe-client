import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 11;
`

export const ModalWrap = styled.div`
  width: 326px;
  height: fit-content;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
`

export const Contents = styled.div``
