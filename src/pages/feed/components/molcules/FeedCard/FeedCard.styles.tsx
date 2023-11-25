import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 183px;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: column;
`
export const ImageSectiion = styled.section`
  padding: 0 21px;
  display: flex;
  gap: 10px;
`

export const ImageBox = styled.div`
  width: 25%;
  aspect-ratio: auto 1/1;
  border-radius: 10px;
  background-color: gray;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`
