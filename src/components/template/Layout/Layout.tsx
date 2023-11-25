import * as Styles from './Layout.styles'
import { useEffect, useState } from 'react'
import { setScreenSize } from '@/utils/screen'
import { GNB } from '@/components/atom/GNB/GNB'
import { FNB } from '@/components/atom/FNB/FNB'
import 'react-modern-drawer/dist/index.css'
import { IntroPage } from '@/pages/Intro/IntroPage'
import { INITIAL_USER, getCookie } from '@/utils/storage'
import { CombineDrawer } from '@/bds/Drawer/Drawer'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  const [isConfirm, setConfirm] = useState<boolean>(false)
  const isUser = getCookie(INITIAL_USER)

  useEffect(() => {
    setScreenSize()
  }, [])

  const handleConfirm = () => {
    setConfirm(true)
  }

  return (
    <Styles.Container>
      <Styles.MainContainer>
        {!isUser && !isConfirm && (
          <Styles.IntroPageContainer>
            <IntroPage onConfirm={handleConfirm} />
          </Styles.IntroPageContainer>
        )}
        <Styles.GNBContainer>
          <GNB />
        </Styles.GNBContainer>
        <Styles.MainBody>{children}</Styles.MainBody>
        <Styles.FNBContainer>
          <FNB />
        </Styles.FNBContainer>
      </Styles.MainContainer>
      <CombineDrawer />
    </Styles.Container>
  )
}
