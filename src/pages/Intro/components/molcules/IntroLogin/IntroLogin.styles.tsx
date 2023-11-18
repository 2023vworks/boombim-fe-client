import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const DescriptionSection = styled.div`
  width: 320px;
  height: 287px;
  margin-top: 94px;
  line-height: 21px;
`

export const BoldTypo = styled.span`
  font-weight: 700;
`

export const ContentSection = styled.section`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`

export const Select = styled.select`
  width: 56px;
  height: 92px;
  border-radius: 15px;
  border: 1px solid black;
  font-size: 32px;
  text-align-last: center;
  appearance: none;
`

export const ButtonSection = styled.div`
  position: fixed;
  bottom: 76px;
`

export const CheckSection = styled.section`
  margin-bottom: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`
