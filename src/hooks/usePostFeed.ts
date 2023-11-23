/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useEffect, useState } from 'react'
import { useGetUserQuery, usePostFeedMutation, usePostUploadImagesMutation } from '../store/asyncSlice/asyncSlice'
import { convertAddress, convertRegion, convertRoadAddress, getGeoData } from '../utils/map'
import { type RootState, useAppSelector, useAppDispatch } from '@/store/store'

import { type Address, type RoadAddress } from '@/types/feed'
import { useNavigate } from 'react-router-dom'
import { getCheckedHashTagArray } from '@/utils/common'
import { removeImage, resetImage } from '@/store/slices/image.slice'
import { setMapSize, setMapType } from '@/store/slices/map.slice'
import { closeDrawer } from '@/store/slices/drawer.slice'
import { type RegionCode } from '@/types/map'

interface ResponseType {
  onChangeText: (value: string) => void
  onDeleteImage: (id: number) => void
  submitPostFeed: () => void
  text: string
}

interface Props {
  position: { x: number; y: number }
}

export default function usePostFeed({ position }: Props): ResponseType {
  const [text, setText] = useState<string>('')

  const { data: userInfo } = useGetUserQuery()
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [feedTrigger, _postFeed] = usePostFeedMutation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadTrigger, _upload] = usePostUploadImagesMutation()

  const dispatch = useAppDispatch()

  const imageFormdata = useAppSelector((state: RootState) => state.image.images)

  const onChangeText = (value: string): void => {
    setText(value)
  }

  const onDeleteImage = (id: number): void => {
    dispatch(removeImage({ idx: id }))
  }

  const onResetImage = (): void => {
    dispatch(resetImage())
    // todo: 전역 이미지 전체 삭제
  }

  const comfirmPostFeedwithMessage = (message: string): void => {
    alert(message)
    navigate('/?mode=viewMode')
  }

  const submitPostFeed = async () => {
    if (userInfo?.data.feedWritingCount === 0) {
      comfirmPostFeedwithMessage('게시물 작성횟수가 초과되었습니다.')
      return
    }
    if (text.length <= 3) {
      alert('세글자 이상의 게시물을 작성해주세요.')
      return
    }
    if (!position) return

    const geoDate = await getGeoData({
      lng: position.x,
      lat: position.y,
    })

    const geoMark: {
      address: Address
      roadAddress?: RoadAddress
      regionInfo: RegionCode
      x: number
      y: number
    } = {
      address: convertAddress(geoDate[0]),
      roadAddress: convertRoadAddress(geoDate[1]),
      regionInfo: convertRegion(geoDate[2][1]),
      x: position.x,
      y: position.y,
    }

    const closePostFeed = (): void => {
      dispatch(setMapType({ mapType: 'NORMAL' }))
      dispatch(setMapSize({ height: '100%' }))
      dispatch(closeDrawer())
      comfirmPostFeedwithMessage('피드작성이 완료되었습니다.')
    }

    const checkedDupShopText = getCheckedHashTagArray(text)
    feedTrigger({
      content: text,
      hashTags: checkedDupShopText,
      geoMark,
    })
      .unwrap()
      .then((res) => {
        if (!imageFormdata) {
          return closePostFeed()
        }
        uploadTrigger({ id: res.data.feedId, body: imageFormdata })
          .unwrap()
          .then(() => {
            return closePostFeed()
          })
          .catch((err) => {
            return comfirmPostFeedwithMessage(err.message)
          })
      })
      .catch((err) => {
        comfirmPostFeedwithMessage(err.message)
      })
  }

  useEffect(() => {
    return () => {
      setText('')
      onResetImage()
    }
  }, [])

  return { onChangeText, onDeleteImage, submitPostFeed, text }
}
