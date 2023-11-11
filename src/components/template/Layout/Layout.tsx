import * as Styles from './Layout.styles'
import { useEffect } from 'react'
import { setScreenSize } from '@/utils/screen'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Styles.Container>
      <Styles.MainContainer>
        <Styles.GNBContainer></Styles.GNBContainer>
        <Styles.MainBody>{children}</Styles.MainBody>
        <Styles.FNBContainer></Styles.FNBContainer>
      </Styles.MainContainer>
    </Styles.Container>
  )
}
