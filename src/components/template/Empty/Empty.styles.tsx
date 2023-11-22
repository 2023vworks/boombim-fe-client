import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.softGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
