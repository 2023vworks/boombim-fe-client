import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 8px 21px;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InfoSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
`
export const SubInfo = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`

export const ActiveTimeSection = styled.section`
  width: 100px;
  display: flex;
  justify-content: flex-end;
`
