import { useAppSelector } from '@/store/store'
import * as Styles from './Drawer.styles'

export const Drawer = () => {
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpen)
  return <Styles.Container $isOpen={isOpenDrawer}>Drawer</Styles.Container>
}
