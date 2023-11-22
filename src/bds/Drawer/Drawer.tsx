import { useAppSelector } from '@/store/store'
import * as Styles from './Drawer.styles'
import PostFeed from '@/components/molcules/PostFeed/PostFeed'

export const Drawer = () => {
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)
  const drawerType = useAppSelector((state) => state.drawer.drawerType)

  return (
    <Styles.Container $isOpen={isOpenDrawer}>{drawerType === 'DETAIL' ? <>detail</> : <PostFeed />}</Styles.Container>
  )
}
