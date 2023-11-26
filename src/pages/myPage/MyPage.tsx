import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './MyPage.styled'
import { useDeleteUserMutation } from '@/store/asyncSlice/asyncSlice'
import { useNavigate } from 'react-router-dom'
import { closeModal, openModal, resetModalState } from '@/store/slices/modal.slice'
import { useAppDispatch } from '@/store/store'
import { INITIAL_USER, deleteCookie, logout, resetUserInfo } from '@/utils/storage'
import { unConfirmService } from '@/store/slices/intro.slice'
export const MyPage = (): React.ReactNode => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteUserTriger] = useDeleteUserMutation()

  const leaveBoombim = (): void => {
    deleteUserTriger()
      .then(() => {
        resetUserInfo()
        logout()
        deleteCookie(INITIAL_USER)
      })
      .then(() => {
        dispatch(unConfirmService())
        navigate('/')
      })
      .catch(() => {
        alert('떠나기에 실패하였습니다. 관리자에게 문의 바랍니다.')
      })
  }

  const openLeaveModal = () => {
    dispatch(
      openModal({
        modalType: 'CONFIRM',
        props: {
          title: <div style={{ fontWeight: 700 }}>이용해주셔서 감사합니다.</div>,
          description:
            '붐빔에서 좋은 시간 보내셨길 바라며, 더 나은 모습으로 이용자님을 다시 찾아뵐 수 있도록 노력하겠습니다. 감사합니다.',
          confirmOption: {
            text: '붐빔 팀에 메세지 보내기',
            onClick: () => {
              dispatch(closeModal())
            },
          },
          cancleOption: {
            text: '서비스 종료하기',
            onClick: () => {
              leaveBoombim()
              dispatch(closeModal())
            },
          },
        },
      }),
    )
  }

  const handleConfirmLeave = () => {
    dispatch(
      openModal({
        modalType: 'CONFIRM',
        props: {
          title: <div style={{ fontWeight: 700 }}>😢 떠나신다니 아쉬워요.</div>,
          description:
            '붐빔은 현재 로그아웃을 지원하지 않고 있어요. 떠남과 동시에 계정이 삭제 되어 다시 접근할 수 없게 됩니다. 피드는 남은 시간 이후 삭제 됩니다.',
          confirmOption: {
            text: '취소하기',
            onClick: () => {
              dispatch(closeModal())
            },
          },
          cancleOption: {
            text: '떠나기',
            onClick: () => {
              newOpenModal()
            },
          },
        },
      }),
    )
  }

  const newOpenModal = () => {
    dispatch(resetModalState())
    dispatch(closeModal())
    setTimeout(() => {
      openLeaveModal()
    }, 100)
  }

  return (
    <Styles.Container>
      {/* <Styles.InfoSection></Styles.InfoSection> */}
      <Styles.ListSection>
        <Styles.ListItem
          onClick={() => {
            navigate('/my-feeds')
          }}
        >
          <Typography size={'SMALL'}>🔥 내가 쓴 피드 보기</Typography>
        </Styles.ListItem>
        <Styles.ListItem>
          <Typography size={'SMALL'}>✉️️ 붐빔 팀에 응원 메세지 보내기</Typography>
        </Styles.ListItem>
        <Styles.ListItem onClick={handleConfirmLeave}>
          <Typography size={'SMALL'} color={'mainColor'}>
            🚪 붐빔 떠나기
          </Typography>
        </Styles.ListItem>
      </Styles.ListSection>
      <Styles.BottomSection>
        <Typography size={'SMALL'} color={'gray'}>
          2023 VANILLAWORKS
        </Typography>
      </Styles.BottomSection>
    </Styles.Container>
  )
}
