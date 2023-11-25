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
      {description && (
        <Typography color='gray' size={'XSMALL'} fontWeight={350}>
          {description ?? ''}
        </Typography>
      )}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 6px;
`
