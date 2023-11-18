import * as Styles from './IntroPage.styles'
import React, { useCallback, useEffect, useState } from 'react'
import { IntroStart } from './components/molcules/IntroStart/IntroStart'
import { IntroDescription } from './components/molcules/IntroDescription/IntroDescription'
import { IntroAuthorization } from './components/molcules/IntroAuthorization/IntroAuthorization'
import { IntroLogin } from './components/molcules/IntroLogin/IntroLogin'
import { useNavigate } from 'react-router-dom'
import { getCookie, INITIAL_USER } from '../../utils/storage'

export const IntroPage = (): React.ReactNode => {
  const navigate = useNavigate()
  const [step, setStep] = useState<'START' | 'DESCRIPTION' | 'AUTHORIZATION' | 'LOGIN'>('START')

  const IntroComponent = useCallback(() => {
    switch (step) {
      case 'START':
        return <IntroStart onNext={() => setStep('DESCRIPTION')} />

      case 'DESCRIPTION':
        return <IntroDescription onNext={() => setStep('AUTHORIZATION')} />

      case 'AUTHORIZATION':
        return <IntroAuthorization onNext={() => setStep('LOGIN')} />

      case 'LOGIN':
        return <IntroLogin onNext={() => navigate('/')} />

      default:
        return <IntroStart onNext={() => setStep('DESCRIPTION')} />
    }
  }, [step])

  useEffect(() => {
    if (getCookie(INITIAL_USER) === 'false') {
      navigate('/')
    }
  }, [])

  return (
    <Styles.Container>
      <IntroComponent />
    </Styles.Container>
  )
}
