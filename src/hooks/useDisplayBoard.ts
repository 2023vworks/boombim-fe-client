/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable curly */
import { BOARD_UNION_TYPE, MBTI_INFO } from '@/constants/displayBoard'
import { useGetUserQuery } from '@/store/asyncSlice/asyncSlice'
import { useAppSelector } from '@/store/store'
import { MAP_UNION_TYPE } from '@/types/map'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useDisplayBoard = () => {
  const [displayBoard, setDisplayBoard] = useState<{ title: string | null; description: string } | null>(null)
  const { pathname } = useLocation()
  const currentMapType = useAppSelector((state) => state.map.mapType)
  const { data: userInfo } = useGetUserQuery()
  const currentDongList = useAppSelector((state) => state.map.currentDongList)

  const checkDisplayBoard = () => {
    if (currentMapType === MAP_UNION_TYPE.PICKMARK) return BOARD_UNION_TYPE.PICK_MARKER
    if (pathname === '/feed-list') return BOARD_UNION_TYPE.FEED_LIST
    if (pathname === '/my-page') return BOARD_UNION_TYPE.MY_PAGE
    if (pathname === '/my-feeds') return BOARD_UNION_TYPE.MY_FEED_LIST
    if (pathname === '/') return BOARD_UNION_TYPE.MAIN
    return null
  }

  useEffect(() => {
    const checkedDisplayBoard = checkDisplayBoard()
    const mbti = userInfo?.data.mbtiType
    switch (checkedDisplayBoard) {
      case 'MAIN':
        setDisplayBoard({ title: '🔥 BOOM', description: '오프라인의 붐빔을 온라인에서 확인하세요.' })
        return

      case 'PICK_MARKER':
        setDisplayBoard({ title: null, description: ' 🔥 지도를 드래그해서 위치를 지정하세요.' })
        return

      case 'FEED_LIST':
        setDisplayBoard({
          title: '📍 LOCATION ',
          description: [...new Set(currentDongList)].join(',') ?? '',
        })
        return
      case 'MY_PAGE':
        setDisplayBoard({ title: `😆 ${mbti}`, description: mbti ? `${MBTI_INFO[mbti].join(' ')}` : '' })
        return
      case 'MY_FEED_LIST':
        setDisplayBoard({ title: `😆 ${mbti}`, description: '내가 쓴 피드를 모아볼 수 있습니다.' })
    }
  }, [pathname, currentMapType, currentDongList, userInfo])

  return { displayBoard }
}
