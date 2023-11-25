import * as Styles from './Layout.styles'
import { useEffect, useState } from 'react'
import { setScreenSize } from '@/utils/screen'
import { GNB } from '@/components/atom/GNB/GNB'
import { FNB } from '@/components/atom/FNB/FNB'
import Drawer from 'react-modern-drawer'
import { useAppSelector } from '@/store/store'
import 'react-modern-drawer/dist/index.css'
import { FeedDetail } from '../Feed/FeedDetail/FeedDetail'
import PostFeed from '@/components/molcules/PostFeed/PostFeed'
import { IntroPage } from '@/pages/Intro/IntroPage'
import { INITIAL_USER, getCookie } from '@/utils/storage'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  const drawerState = useAppSelector((state) => state.drawer)
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
        <Drawer
          style={{
            width: '400px',
            height: '65%',
            margin: '0 auto',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
          zIndex={20000}
          open={drawerState.isOpen}
          duration={300}
          direction='bottom'
          enableOverlay={false}
        >
          {drawerState.drawerType === 'DETAIL' ? <FeedDetail /> : <PostFeed />}
        </Drawer>
      </Styles.MainContainer>
    </Styles.Container>
  )
}
