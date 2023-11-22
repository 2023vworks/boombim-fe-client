import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
`

export const InfoSection = styled.section`
  height: 48px;
`

export const ListSection = styled.section``

export const ListItem = styled.div`
  height: 48px;
  padding: 14px 21px 14px 21px;
  background-color: ${(props) => props.theme.color.white};
  border-bottom: ${(props) => `1px solid ${props.theme.color.gray}`};
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const BottomSection = styled.section`
  width: 100%;
  margin-top: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`
