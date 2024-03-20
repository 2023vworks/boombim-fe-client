import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Wrapper = styled.div`
  width: 320px;
  height: 287px;
  margin-top: 94px;
`

export const Title = styled.div`
  margin-bottom: 22px;
`

export const DescriptionSection = styled.section`
  line-height: 21px;
`

export const DetailTitle = styled.div`
  margin-bottom: 8px;
`

export const OptionalTitle = styled.span`
  font-weight: 300;
`

export const DetailDescriptionSection = styled.section`
  margin-bottom: 23px;
`

export const ButtonSection = styled.section`
  height: 42px;
  position: fixed;
  bottom: 76px;
`

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 11;
`

export const SpinerWrap = styled.div`
  width: 326px;
  height: fit-content;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 12;
`

export const Spiner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
