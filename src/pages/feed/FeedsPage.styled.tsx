import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  padding: 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: auto;
  background-color: ${(props) => props.theme.color.softGray};
`
