import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
`

export const DefaultContent = styled.div`
  overflow: hidden;
  font-size: 13px;
`

export const EllipsisContent = styled.div`
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
`
