import styled from 'styled-components'

export const Container = styled.section`
  width: 41px;
  height: 41px;
  background-color:${(props) => props.theme.color.white}
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Image = styled.img`
  width: 30px;
  height: 30px;
`
