import styled from 'styled-components'

export const Container = styled.form`
  width: 100%;
  height: calc((100% - 85px));
  background-color: ${(props) => props.theme.color.white};
`

export const InputSection = styled.section``

export const ImageList = styled.div`
  height: 90px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const TextField = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 18px 20px 0px;
  resize: none;
  outline: none;
  border: none;
`

export const CountSection = styled.section`
  height: 20px;
  display: flex;
  padding: 0px 20px;
  justify-content: space-between;
`

export const ButtonSection = styled.section`
  position: absolute;
  bottom: 90px;
  width: 100%;
  height: 72px;
  padding: 0px 18px;
  background-color: ${(props) => props.theme.color.softGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const IconWrapper = styled.div<{ $WrapperColor: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$WrapperColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`

export const SubmitWrapper = styled.input<{ $WrapperColor: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$WrapperColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`
