import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

export const ContentSection = styled.section`
  width: 100%;
`

export const CommentSection = styled.section`
  width: 100%;
  flex: 1;
  padding: 15px 30px 20px 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray100};
`

export const InteractionSection = styled.section`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 5px 12px;
  background-color: ${(props) => props.theme.color.gray100};
`

export const BorderIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const Left = styled.section`
  display: flex;
  gap: 8px;
`

export const InputSection = styled.section`
  width: 100%;
  height: 42px;
`

export const IntersectTarget = styled.div`
  height: 1px;
`

export const TopLeftButton = styled.div`
  width: 100%;
  background-color: transparent;
  z-index: 10001;
  margin-bottom: 9px;
  padding-left: 14px;
`
