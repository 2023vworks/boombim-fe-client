import marker_level_1 from '@/assets/images/marker_level_1.png'
import marker_level_2 from '@/assets/images/marker_level_2.png'
import marker_level_3 from '@/assets/images/marker_level_3.png'
import marker_level_4 from '@/assets/images/marker_level_4.png'
import marker_level_5 from '@/assets/images/marker_level_5.png'
import * as Styles from './LevelIcon.styles'
import { useMemo } from 'react'

interface Props {
  activity: number
  style?: React.CSSProperties
}

export const LevelIcon = ({ style, activity }: Props): React.ReactNode => {
  const markerImage = useMemo(() => {
    switch (activity) {
      case 2:
        return marker_level_2
      case 3:
        return marker_level_3
      case 4:
        return marker_level_4
      case 5:
        return marker_level_5

      default:
        return marker_level_1
    }
  }, [])
  return (
    <Styles.Container>
      <Styles.Image src={markerImage} style={{ ...style }} />
    </Styles.Container>
  )
}
