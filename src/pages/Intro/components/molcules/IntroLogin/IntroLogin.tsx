/* eslint-disable multiline-ternary */
import { useState } from 'react'
import * as Styles from './IntroLogin.styles'
import { Button } from '@/bds/Button/Button'
import { Typography } from '@/bds/Typography/Typography'

interface Props {
  onNext: () => void
}

export const IntroLogin = ({ onNext }: Props): React.ReactNode => {
  //   const dispatch = useDispatch()
  //   const [loginTrigger, _login] = useLoginMutation()

  const [checkTerm, setCheckTerm] = useState(false)
  const [mbtiEI, setMbtiEI] = useState('E')
  const [mbtiSN, setMbtiSN] = useState('S')
  const [mbtiFT, setMbtiFT] = useState('T')
  const [mbtiPJ, setMbtiPJ] = useState('P')

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value

    switch (value) {
      case 'E':
      case 'I':
        setMbtiEI(value)
        break
      case 'S':
      case 'N':
        setMbtiSN(value)
        break
      case 'F':
      case 'T':
        setMbtiFT(value)
        break
      case 'P':
      case 'J':
        setMbtiPJ(value)
        break
    }
  }

  function handleCheck() {
    setCheckTerm(!checkTerm)
  }

  function login() {
    // checkTerm &&
    //   loginTrigger({ mbtiType: `${mbtiEI + mbtiSN + mbtiFT + mbtiPJ}` })
    //     .unwrap()
    //     .then(
    //       (res) => (
    //         res?.data && setToken(res.data.token),
    //         res?.data && setUserInfo(res.data.nickname, res.data.mbtiType),
    onNext()
    //         dispatch(modalSlice.actions.closeModal())
    //       ),
    //     )
    //     .catch(
    //       () => (alert('로그인에 실패하였습니다. 관리자에게 문의바랍니다.'), dispatch(modalSlice.actions.closeModal())),
    //     )
  }
  return (
    <Styles.Container>
      <Styles.DescriptionSection>
        <Typography size={'P'}>
          <Styles.BoldTypo>MBTI</Styles.BoldTypo>를 선택해 주세요 :)
        </Typography>
        <br />
        <br />
        <Typography size={'P'}> 현재 붐빔은 서비스 이용을 위해 기기UID와 MBTI외에</Typography>
        <Typography size={'P'}> 구체적인 회원 정보를 수집하지 않고 있어요. UID는 가입</Typography>
        <Typography size={'P'}> 여부를 구분하고, MBTI는 서비스 내에서 고유ID 부여와</Typography>
        <Typography size={'P'}> 통계 데이터 수집에 이용됩니다.</Typography>
        <br />
        <Typography size={'P'}> 추후에 어떤 MBTI가 소식을 많이 올리는지, 어떤 MBTI가</Typography>
        <Typography size={'P'}> 어떤 장소를 좋아 하는지 등 재미있는 소식 전해 드릴게요!</Typography>
      </Styles.DescriptionSection>
      <Styles.ContentSection>
        <Styles.Select onChange={handleSelect}>
          <option value='E'>E</option>
          <option value='I'>I</option>
        </Styles.Select>
        <Styles.Select onChange={handleSelect}>
          <option value='S'>S</option>
          <option value='N'>N</option>
        </Styles.Select>
        <Styles.Select onChange={handleSelect}>
          <option value='T'>T</option>
          <option value='F'>F</option>
        </Styles.Select>
        <Styles.Select onChange={handleSelect}>
          <option value='P'>P</option>
          <option value='J'>J</option>
        </Styles.Select>
      </Styles.ContentSection>
      <Typography size={'SMALL'} color='gray'>
        MBTI는 가입 후 수정이 어려우니 참고 부탁드립니다.
      </Typography>
      <Styles.ButtonSection>
        <Styles.CheckSection>
          <input type='checkbox' checked={checkTerm} onChange={handleCheck} />
          <label>정보 수집 및 이용 방향을 확인하였으며, 내용에 동의합니다.</label>
        </Styles.CheckSection>
        {checkTerm ? (
          <Button text='등록완료' onClick={login} width={320} height={42} buttonType='PRIMARY' />
        ) : (
          <Button text='등록완료' width={320} height={42} buttonType='UNAVALIAVE' />
        )}
      </Styles.ButtonSection>
    </Styles.Container>
  )
}
