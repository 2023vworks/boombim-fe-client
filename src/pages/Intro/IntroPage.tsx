import React, { useCallback, useState } from 'react'
import * as Styles from './IntroPage.styles'
// import { INITIAL_USER, getCookie } from '../../utils/storage'
import { IntroStart } from './components/molcules/IntroStart/IntroStart'
import { IntroDescription } from './components/molcules/IntroDescription/IntroDescription'
import { IntroAuthorization } from './components/molcules/IntroAuthorization/IntroAuthorization'
import { IntroLogin } from './components/molcules/IntroLogin/IntroLogin'
// import { useNavigate } from 'react-router-dom'

const INTRO_STEP = {
  START: 'START',
  DESCRIPTION: 'DESCRIPTION',
  AUTHORIZATION: 'AUTHORIZATION',
  LOGIN: 'LOGIN',
} as const

type INTRO_STEP_ENUM = (typeof INTRO_STEP)[keyof typeof INTRO_STEP]

export const IntroPage = ({ onConfirm }: { onConfirm: () => void }): React.ReactNode => {
  // const navigate = useNavigate()
  const [step, setStep] = useState<INTRO_STEP_ENUM>(INTRO_STEP.START)

  const IntroComponent = useCallback(() => {
    switch (step) {
      case INTRO_STEP.START:
        return (
          <IntroStart
            onNext={() => {
              setStep(INTRO_STEP.DESCRIPTION)
            }}
          />
        )

      case INTRO_STEP.DESCRIPTION:
        return (
          <IntroDescription
            onNext={() => {
              setStep(INTRO_STEP.AUTHORIZATION)
            }}
          />
        )

      case INTRO_STEP.AUTHORIZATION:
        return (
          <IntroAuthorization
            onNext={() => {
              setStep(INTRO_STEP.LOGIN)
            }}
          />
        )

      case INTRO_STEP.LOGIN:
        return (
          <IntroLogin
            onNext={() => {
              onConfirm()
            }}
          />
        )

      default:
        return (
          <IntroStart
            onNext={() => {
              setStep(INTRO_STEP.DESCRIPTION)
            }}
          />
        )
    }
  }, [step])

  // useEffect(() => {
  //   if (getCookie(INITIAL_USER) === 'false') {
  //     navigate('/')
  //   }
  // }, [])

  return (
    <Styles.Container>
      <IntroComponent />
    </Styles.Container>
  )
}
