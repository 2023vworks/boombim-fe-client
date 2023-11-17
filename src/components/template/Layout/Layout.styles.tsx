import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const MainContainer = styled.section`
  width: 600px;
  height: 100%;
  position: relative;
`

export const MainBody = styled.section`
  width: 100%;
  height: calc(100% - 170px);
  position: relative;
  z-index: 1;
`

export const GNBContainer = styled.section`
  width: 100%;
  position: sticky;
  top: 0;
`
export const FNBContainer = styled.section`
  width: 100%;
  height: 90px;
  position: sticky;
  bottom: 0;
`

export const DrawerContainer = styled.section`
  width: 100%;
  position: relative;
  z-index: 12;
`
