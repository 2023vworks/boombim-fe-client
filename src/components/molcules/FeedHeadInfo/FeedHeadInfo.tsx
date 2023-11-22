import { Typography } from '@/bds/Typography/Typography'
import styled from 'styled-components'

interface Props {
  title: string
  description?: string
}

export default function FeedHeadInfo({ title, description }: Props) {
  return (
    <Container>
      <Typography size='P' fontWeight={600}>
        {title}
      </Typography>
      {description && <VerticalLine>|</VerticalLine>}
      {description && <Typography size={'SMALL'}>{description ?? ''}</Typography>}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
`
const VerticalLine = styled.div`
  margin: 0 4px;
  font-size: 17px;
`
