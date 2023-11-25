import { useAppDispatch, useAppSelector } from '@/store/store'
import * as Styles from './Drawer.styles'
import PostFeed from '@/components/molcules/PostFeed/PostFeed'
import { FeedDetail } from '@/components/template/Feed/FeedDetail/FeedDetail'
import Drawer from 'react-modern-drawer'
import Icon, { ICON_UNION_TYPE } from '../Icon/Icon'
import { setMapSize } from '@/store/slices/map.slice'
import { closeDrawer } from '@/store/slices/drawer.slice'

export const CombineDrawer = () => {
  const drawerState = useAppSelector((state) => state.drawer)
  const dispatch = useAppDispatch()

  const handleClickCloseDrawer = () => {
    dispatch(setMapSize({ height: '100%' }))
    dispatch(closeDrawer())
  }

  return (
    <Drawer
      style={{
        width: '400px',
        height: '60%',
        margin: '0 auto',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
      zIndex={20000}
      open={drawerState.isOpen}
      duration={300}
      direction='bottom'
      enableOverlay={false}
      lockBackgroundScroll
    >
      <Styles.Container>
        <Styles.ButtonSection>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleClickCloseDrawer}
          >
            <Icon
              iconType={ICON_UNION_TYPE.ARROW_LEFT}
              width='24px'
              height='24px'
              fillColor='white'
              strokeColor='black'
            />
          </div>
        </Styles.ButtonSection>
        <Styles.DrawerSection>
          {drawerState.drawerType === 'DETAIL' ? <FeedDetail /> : <PostFeed />}
        </Styles.DrawerSection>
      </Styles.Container>
    </Drawer>
  )
}
