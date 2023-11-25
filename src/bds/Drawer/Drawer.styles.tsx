import styled, { keyframes } from 'styled-components'

const openDrawer = keyframes`
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-350px);
  }

  100% {
    transform: translateY(-700px);
  }
`

const closeDrawer = keyframes`
  0% {
    transform: translateY(-700px);
  }

  50% {
    transform: translateY(-350px);
  }

  100% {
    transform: translateY(0);
  }
`

export const Container = styled.div`
  width: 100%;
  height: calc((100% - 62px) * 0.7);
  z-index: 100;
  position: absolute;
  bottom: -700px;

  .drawerOpen {
    animation: ${openDrawer} 0.25s ease-out forwards;
  }

  .drawerClose {
    animation: ${closeDrawer} 0.3s ease-in forwards;
  }
`
