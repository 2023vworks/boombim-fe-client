import { Map } from '@/components/template/Map/Map'
import useMaps from '@/hooks/useMaps'

export const MainPage = (): React.ReactNode => {
  const { map, containerRef } = useMaps()
  return (
    <>
      <Map maxLevel={4} minLevel={2} map={map} containerRef={containerRef} />
    </>
  )
}
