import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './MyPage.styled'
import { useDeleteUserMutation } from '@/store/asyncSlice/asyncSlice'
import { useNavigate } from 'react-router-dom'
export const MyPage = (): React.ReactNode => {
  const navigate = useNavigate()
  const [deleteUserTriger, _deleteUser] = useDeleteUserMutation()

  const leaveBoombim = (): void => {
    deleteUserTriger()
    navigate('/')
  }

  return (
    <Styles.Container>
      <Styles.Box>
        <Typography size={'SMALL'}>🔥 내가 쓴 피드 보기</Typography>
      </Styles.Box>
      <Styles.Box>
        <Typography size={'SMALL'}>✉️️ 붐빔 팀에 응원 메세지 보내기</Typography>
      </Styles.Box>
      <Styles.Box>
        <Typography size={'SMALL'}>🚪 붐빔 떠나기</Typography>
      </Styles.Box>
      <Styles.BottomSection>
        <Typography size={'SMALL'} color={'gray'}>
          2023 VANILLAWORKS
        </Typography>
      </Styles.BottomSection>
    </Styles.Container>
  )
}
