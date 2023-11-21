import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const ButtonBox = styled.div`
  width: 40px;
  height: 90px;
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonWraaper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
