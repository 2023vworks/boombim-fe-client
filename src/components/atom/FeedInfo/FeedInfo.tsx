/* eslint-disable multiline-ternary */
import React from 'react'
import * as Styles from './FeedInfo.styles'
import { Typography } from '@/bds/Typography/Typography'
import Icon, { type ICON_TYPE } from '@/bds/Icon/Icon'

export interface InfoProps {
  infoType: string
  isReadOnly: boolean
  infoContent: number | string | undefined
  onClick?: () => void
  iconStyle: {
    iconType: ICON_TYPE
    strokeColor: string
    fillColor: string
    width: string
    height: string
  }
}

interface Props {
  infos: InfoProps[]
}
export const FeedInfo = ({ infos }: Props): React.ReactNode => {
  return (
    <Styles.Container>
      {infos.map((info) =>
        info.isReadOnly ? (
          <Styles.InfoItem key={info.infoType}>
            <Icon {...info.iconStyle} />
            <Typography size={'SMALL'}>{info.infoContent}</Typography>
          </Styles.InfoItem>
        ) : (
          <Styles.InfoItem key={info.infoType} onClick={info.onClick}>
            <Icon {...info.iconStyle} />
            <Typography size={'SMALL'}>{info.infoContent}</Typography>
          </Styles.InfoItem>
        ),
      )}
    </Styles.Container>
  )
}
