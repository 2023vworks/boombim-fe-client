import styled from 'styled-components'

export const Container = styled.div`
  padding: 26px 50px;
  display: flex;
  flex-direction: row;
`

export const InfoItem = styled.div`
  height: 18px;
  border-right: ${(props) => `1px solid ${props.theme.color.gray}`};
  &:last-child {
    border-right: none;
  }
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
