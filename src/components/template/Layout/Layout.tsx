import * as Styles from './Layout.styles'
import { useEffect } from 'react'
import { setScreenSize } from '@/utils/screen'
import { GNB } from '@/components/atom/GNB/GNB'
import { FNB } from '@/components/atom/FNB/FNB'
import { Drawer } from '@bds/Drawer/Drawer'
import { useAppSelector } from '@/store/store'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  const isDrawerOpen = useAppSelector((state) => state.drawer.isOpen)
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Styles.Container>
      <Styles.MainContainer>
        <Styles.GNBContainer>
          <GNB />
        </Styles.GNBContainer>
        <Styles.MainBody>{children}</Styles.MainBody>
        <Styles.FNBContainer>
          <FNB />
        </Styles.FNBContainer>
        {isDrawerOpen && <Drawer />}
      </Styles.MainContainer>
    </Styles.Container>
  )
}
