import Icon from '@/bds/Icon/Icon'
import * as Styles from './ImagePreview.styles'
import theme from '@/styles/theme'

interface Props {
  id: number
  imageSoure: string
  onDelete?: (id: number) => void
}

export default function PreviewImage({ id, imageSoure = '', onDelete }: Props) {
  return (
    <Styles.ImgWrapper>
      {onDelete && (
        <Styles.IconWraper
          onClick={() => {
            onDelete(id)
          }}
        >
          <Icon iconType='CANCEL' fillColor={theme.color.white} width='14px' height='14px' />
        </Styles.IconWraper>
      )}
      <Styles.ImgBox src={imageSoure} />
    </Styles.ImgWrapper>
  )
}
