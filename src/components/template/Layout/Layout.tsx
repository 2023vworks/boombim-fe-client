import * as Styles from './Layout.styles'
import { useEffect } from 'react'
import { setScreenSize } from '@/utils/screen'
import { GNB } from '@/components/atom/GNB/GNB'
import { FNB } from '@/components/atom/FNB/FNB'
import 'react-modern-drawer/dist/index.css'
import { IntroPage } from '@/pages/Intro/IntroPage'
import { INITIAL_USER, getCookie } from '@/utils/storage'
import { CombineDrawer } from '@/bds/Drawer/Drawer'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { confirmService } from '@/store/slices/intro.slice'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  const isConfirm = useAppSelector((state) => state.intro.isConfirmService)
  const dispatch = useAppDispatch()
  const isUser = getCookie(INITIAL_USER)

  useEffect(() => {
    setScreenSize()
  }, [])

  useEffect(() => {
    if (isUser === null) return
    handleConfirm()
  }, [isUser])

  const handleConfirm = () => {
    dispatch(confirmService())
  }

  return (
    <Styles.Container>
      <Styles.MainContainer>
        {isUser === null && !isConfirm && (
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
