import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Wrapper = styled.div`
  margin-top: 94px;
`

export const DescriptionSection = styled.section`
  width: 320px;
  height: 287px;
  line-height: 21px;
`

export const BoldTypo = styled.span`
  font-weight: 700;
`

export const SelectBoxSection = styled.section`
  width: 320px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SelectBoxWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`

export const SelectBox = styled.select`
  width: 56px;
  height: 92px;
  border-radius: 15px;
  border: 1px solid black;
  font-size: 32px;
  text-align-last: center;
  appearance: none;
`

export const ButtonSection = styled.section`
  position: fixed;
  bottom: 76px;
`

export const CheckboxWrapper = styled.div`
  margin-bottom: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`
