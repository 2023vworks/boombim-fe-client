import styled from 'styled-components'

export const Container = styled.div`
  height: 40px;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  align-items: center;
`

export const NameSection = styled.section`
  margin-left: 5px;
  display: flex;
  align-items: center;
`
