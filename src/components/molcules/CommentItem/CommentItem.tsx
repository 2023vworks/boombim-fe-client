import styled from 'styled-components'
import FeedHeadInfo from '@/components/molcules/FeedHeadInfo/FeedHeadInfo'

interface Props {
  type: 'NORMAL' | 'REPLY'
  name: string
  time: string
  description: string
}

export default function CommentItem({ name, time, description, type }: Props) {
  return (
    <Container type={type}>
      <Header>
        <FeedHeadInfo title={name} description={time} />
      </Header>
      <Body type={type}>{description}</Body>
    </Container>
  )
}

const Container = styled.section<{ type: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.type === 'NORMAL' ? 'flex-start' : 'flex-end')};
`
const Header = styled.section`
  margin-bottom: 4px;
`
const Body = styled.section<{ type: string }>`
  max-width: 100%;
  padding: 9.6px 17px;
  border-radius: ${(props) => (props.type === 'NORMAL' ? '0px 10px 10px 10px' : '10px 0px 10px 10px')};
  background: #0000000d;
  background: ${(props) => (props.type === 'NORMAL' ? '#0000000d' : 'white')};
`
