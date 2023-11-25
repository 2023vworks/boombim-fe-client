import * as Styles from './Layout.styles'
import { useEffect } from 'react'
import { setScreenSize } from '@/utils/screen'
import { GNB } from '@/components/atom/GNB/GNB'
import { FNB } from '@/components/atom/FNB/FNB'
import Drawer from 'react-modern-drawer'
import { useAppSelector } from '@/store/store'
import 'react-modern-drawer/dist/index.css'
import { FeedDetail } from '../Feed/FeedDetail/FeedDetail'
import PostFeed from '@/components/molcules/PostFeed/PostFeed'
// import { useAppSelector } from '@/store/store'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props): React.ReactNode => {
  const drawerState = useAppSelector((state) => state.drawer)

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
        <Drawer
          style={{
            width: '400px',
            height: '500px',
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
