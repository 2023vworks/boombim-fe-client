import { useAppSelector } from '@/store/store'
import * as Styles from './Drawer.styles'
import PostFeed from '@/components/molcules/PostFeed/PostFeed'
import { FeedDetail } from '@/components/template/Feed/FeedDetail/FeedDetail'
import { Transition } from 'react-transition-group'
import { useEffect, useState } from 'react'

export const Drawer = () => {
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)
  const drawerType = useAppSelector((state) => state.drawer.drawerType)
  const [classState, setClassState] = useState('')

  useEffect(() => {
    setClassState(isOpenDrawer ? 'drawerOpen' : 'drawerClose')
  }, [isOpenDrawer])

  return (
    <Transition in={isOpenDrawer} timeout={{ enter: 250, exit: 250 }}>
      <Styles.Container>
        <div className={classState} style={{ height: '100%' }}>
          {drawerType === 'DETAIL' ? <FeedDetail /> : <PostFeed />}
        </div>
      </Styles.Container>
    </Transition>
  )
}
