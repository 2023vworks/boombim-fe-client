import React, { useState } from 'react'
import { Typography } from '@/bds/Typography/Typography'
import useInterval from '@/hooks/useInterval'
import remainTimeCount from '@/utils/time'

interface Props {
  compareTime: string
}
export const TimeCount = ({ compareTime }: Props): React.ReactNode => {
  const [remainTime, setRemainTime] = useState<string>('')

  useInterval(() => {
    const time = remainTimeCount({
      activationAt: compareTime,
      currentAt: new Date().toString(),
    })
    setRemainTime(time)
  }, 1000)

  return <Typography size={'XSMALL'} fontWeight={350}>{`⏳ ${remainTime || ' ️활성시간 계산중...'}`}</Typography>
}
