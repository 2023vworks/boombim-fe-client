/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable multiline-ternary */
import { useState } from 'react'
import * as Styles from './IntroLogin.styles'
import { Button } from '@/bds/Button/Button'
import { Typography } from '@/bds/Typography/Typography'
import { INITIAL_USER, setCookie, setToken, setUserInfo } from '@/utils/storage'
import { usePostUserMutation } from '@/store/asyncSlice/asyncSlice'

interface UserMbti {
  EI: 'E' | 'I'
  SN: 'S' | 'N'
  TF: 'T' | 'F'
  PJ: 'P' | 'J'
}

interface HandleLogin {
  userMbti: UserMbti
  agreementTerms: boolean
}

interface Props {
  onNext: () => void
}

export const IntroLogin = ({ onNext }: Props): React.ReactNode => {
  const [checkTerm, setCheckTerm] = useState<boolean>(false)
  const [mbti, setMbti] = useState<UserMbti>({
    EI: 'E',
    SN: 'S',
    TF: 'F',
    PJ: 'P',
  })

  const [postUserTrigger, _postUser] = usePostUserMutation()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value

    switch (value) {
      case 'E':
      case 'I':
        setMbti((prev) => {
          return { ...prev, EI: value }
        })
        break
      case 'S':
      case 'N':
        setMbti((prev) => {
          return { ...prev, SN: value }
        })
        break
      case 'F':
      case 'T':
        setMbti((prev) => {
          return { ...prev, TF: value }
        })
        break
      case 'P':
      case 'J':
        setMbti((prev) => {
          return { ...prev, PJ: value }
        })
        break
    }
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked
    setCheckTerm(value)
  }

  const processAfterPostUser = (): void => {
    setCookie({ key: INITIAL_USER, value: 'false', expires: 1 })
    onNext()
  }

  const handleLogin = ({ userMbti, agreementTerms }: HandleLogin): void => {
    agreementTerms &&
      postUserTrigger({ mbtiType: `${userMbti.EI + userMbti.SN + userMbti.TF + userMbti.PJ}`, agreementTerms })
        .unwrap()
        .then((res) => {
          setToken(res.data.token)
          setUserInfo(res.data.nickname, res.data.mbtiType)
          processAfterPostUser()
        })
        .catch(() => alert('로그인에 실패하였습니다. 관리자에게 문의바랍니다.'))
  }
  return (
    <Styles.Container>
      <Styles.Wrapper>
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
        <Styles.SelectBoxSection>
          <Styles.SelectBoxWrapper>
            <Styles.SelectBox onChange={handleSelect}>
              <option value='E'>E</option>
              <option value='I'>I</option>
            </Styles.SelectBox>
            <Styles.SelectBox onChange={handleSelect}>
              <option value='S'>S</option>
              <option value='N'>N</option>
            </Styles.SelectBox>
            <Styles.SelectBox onChange={handleSelect}>
              <option value='T'>T</option>
              <option value='F'>F</option>
            </Styles.SelectBox>
            <Styles.SelectBox onChange={handleSelect}>
              <option value='P'>P</option>
              <option value='J'>J</option>
            </Styles.SelectBox>
          </Styles.SelectBoxWrapper>
          <Typography size={'SMALL'} color='gray'>
            MBTI는 가입 후 수정이 어려우니 참고 부탁드립니다.
          </Typography>
        </Styles.SelectBoxSection>
        <Styles.ButtonSection>
          <Styles.CheckboxWrapper>
            <input type='checkbox' checked={checkTerm} onChange={handleCheck} />
            <label>정보 수집 및 이용 방향을 확인하였으며, 내용에 동의합니다.</label>
          </Styles.CheckboxWrapper>
          {checkTerm ? (
            <Button
              text='등록완료'
              onClick={() => handleLogin({ userMbti: mbti, agreementTerms: checkTerm })}
              width={320}
              height={42}
              buttonType='PRIMARY'
            />
          ) : (
            <Button text='등록완료' width={320} height={42} buttonType='UNAVALIAVE' />
          )}
        </Styles.ButtonSection>
      </Styles.Wrapper>
    </Styles.Container>
  )
}
