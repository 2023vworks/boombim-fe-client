import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
  0% { bottom: -700px}
  50% {bottom: -350px}
  100% {bottom: 0}
`

export const Container = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc((100% - 130px) * 0.7);
  background-color: black;
  z-index: 10000;
  animation-name: ${slideUp};
  animation-duration: 0.2s;
  animation-timing-function: ease-in;
`
