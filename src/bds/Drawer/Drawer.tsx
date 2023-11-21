import { useAppSelector } from '@/store/store'
import * as Styles from './Drawer.styles'

export const Drawer = () => {
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)
  const drawerType = useAppSelector((state) => state.drawer.drawerType)

  return (
    <Styles.Container $isOpen={isOpenDrawer}>{drawerType === 'DETAIL' ? <>detail</> : <>create</>}</Styles.Container>
  )
}
