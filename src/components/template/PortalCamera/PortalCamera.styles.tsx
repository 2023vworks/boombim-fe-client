import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: calc(100% - 180px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ButtonSection = styled.section`
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const ButtonBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
