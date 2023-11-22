/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components'
import { useAppSelector } from '@/store/store'
import useUserInteraction from '@/hooks/useUserInteraction'
import { INTERACTION_UNION_TYPE, type INTERACTION_TYPE } from '@/constants/feed'
import Icon, { ICON_UNION_TYPE } from '@/bds/Icon/Icon'
import { useEffect } from 'react'

interface Props {
  interactionConfigs: Array<{ interactionType: INTERACTION_TYPE }>
}

export default function UserInteractionBox({ interactionConfigs }: Props) {
  const selectedMarkerId = useAppSelector((state) => state.marker.selectedMarker)
  const { webShare, recommendFeed, unRecommendFeed, reportFeed } = useUserInteraction()

  useEffect(() => {
    console.log(selectedMarkerId)
  }, [selectedMarkerId])

  const INTERACTION_INFOS = {
    [INTERACTION_UNION_TYPE.USER_REPORT]: {
      placeholder: '신고',
      icon: (
        <Icon
          iconType={ICON_UNION_TYPE.ALERT_CIRCLE}
          width='24px'
          height='24px'
          strokeColor='black'
          fillColor={'white'}
        />
      ),
      onClickEvent: () => {
        if (!selectedMarkerId) return
        reportFeed(selectedMarkerId, {
          reason: `${selectedMarkerId}유저의 신고`,
        })
      },
    },
    [INTERACTION_UNION_TYPE.SHARE]: {
      placeholder: '공유',
      icon: (
        <Icon iconType={ICON_UNION_TYPE.SHARE} width='24px' height='24px' strokeColor='black' fillColor={'white'} />
      ),
      onClickEvent: webShare,
    },
    [INTERACTION_UNION_TYPE.RECOMMEND]: {
      placeholder: '추천',
      icon: (
        <Icon iconType={ICON_UNION_TYPE.THUMBS_UP} width='24px' height='24px' strokeColor='black' fillColor={'white'} />
      ),
      onClickEvent: () => {
        if (!selectedMarkerId) return
        recommendFeed(selectedMarkerId)
      },
    },
    [INTERACTION_UNION_TYPE.UN_RECOMMEND]: {
      placeholder: '비추천',
      icon: (
        <Icon
          iconType={ICON_UNION_TYPE.THUMBS_DOWN}
          width='24px'
          height='24px'
          strokeColor='black'
          fillColor={'white'}
        />
      ),
      onClickEvent: () => {
        if (!selectedMarkerId) return
        unRecommendFeed(selectedMarkerId)
      },
    },
  }
  return (
    <Container>
      {interactionConfigs.map((interactionType) => {
        const Component = INTERACTION_INFOS[interactionType.interactionType].icon
        return (
          <BorderIconWrapper
            key={interactionType.interactionType}
            onClick={INTERACTION_INFOS[interactionType.interactionType].onClickEvent}
          >
            {Component}
          </BorderIconWrapper>
        )
      })}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 4px;
`
const BorderIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
