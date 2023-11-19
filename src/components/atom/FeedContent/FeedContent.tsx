/* eslint-disable multiline-ternary */
import * as Styles from './FeedContent.styles'

interface Props {
  content: string
  isEllipsis?: boolean
}
export const FeedContent = ({ content, isEllipsis = false }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      {isEllipsis ? (
        <Styles.EllipsisContent>{content.replaceAll('<br/>', '')}</Styles.EllipsisContent>
      ) : (
        <Styles.DefaultContent>{content.replaceAll('<br/>', '')}</Styles.DefaultContent>
      )}
    </Styles.Container>
  )
}
