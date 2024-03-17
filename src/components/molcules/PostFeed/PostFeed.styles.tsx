import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  -ms-overflow-style: none;
`

export const InputSection = styled.section`
  flex: 1;
`

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
  display: flex;
  gap: 10px;
  display: flex;
  padding: 5px 20px;
  justify-content: space-between;
`

export const ButtonSection = styled.section`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 14px 12px 11px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.gray100};
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
