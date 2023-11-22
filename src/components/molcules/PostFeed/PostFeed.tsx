import { Typography } from '@/bds/Typography/Typography'
import * as Styles from './PostFeed.styles'
import theme from '@/styles/theme'
import Icon, { ICON_UNION_TYPE } from '@/bds/Icon/Icon'
import { useMemo } from 'react'
import PreviewImage from '@/components/atom/ImagePreview/ImagePreview'
import usePostFeed from '@/hooks/usePostFeed'
import { type RootState, useAppSelector, useAppDispatch } from '@/store/store'
import { openCamera } from '@/store/slices/camera.slice'

export default function PostFeed() {
  const pickMarkerPosition = useAppSelector((state: RootState) => state.map.currentPickMarkerPosition)

  const { onChangeText, onDeleteImage, submitPostFeed, text } = usePostFeed({
    position: { x: pickMarkerPosition.x, y: pickMarkerPosition.y },
  })
  const images = useAppSelector((state: RootState) => state.image.previewImages)
  const dispatch = useAppDispatch()

  const onChangeTextFiled = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    onChangeText(value)
  }

  const POST_FEED_INTERACTION = useMemo(
    () => [
      {
        wrapperColor: theme.color.white,
        icon: {
          iconType: ICON_UNION_TYPE.CAMERA,
          fillColor: theme.color.white,
          width: '24px',
          height: '24px',
        },
        onClick: () => {
          dispatch(openCamera())
        },
      },
    ],
    [],
  )

  return (
    <Styles.Container onSubmit={submitPostFeed}>
      <Styles.InputSection>
        <Styles.TextField
          value={text}
          name='content'
          placeholder='텍스트를 입력해 주세요(최대 140자)'
          maxLength={140}
          onChange={onChangeTextFiled}
        />
        <Styles.ImageList>
          {images.map((image, idx) => (
            <PreviewImage id={idx} imageSoure={image} key={image} onDelete={onDeleteImage} />
          ))}
        </Styles.ImageList>
      </Styles.InputSection>
      <Styles.CountSection>
        <Typography size='SMALL'>{`${images.length}/5`}</Typography>
        <Typography size='SMALL'>{`${text.length > 140 ? 140 : text.length}/140`}</Typography>
      </Styles.CountSection>
      <Styles.ButtonSection>
        {POST_FEED_INTERACTION.map((interaction) => {
          return (
            <Styles.IconWrapper
              key={interaction.icon.iconType}
              WrapperColor={interaction.wrapperColor}
              onClick={interaction.onClick}
            >
              <Icon {...interaction.icon} />
            </Styles.IconWrapper>
          )
        })}
        <Styles.IconWrapper WrapperColor={theme.color.mainColor} onClick={submitPostFeed}>
          <Icon iconType={ICON_UNION_TYPE.ARROW_UP} fillColor={theme.color.white} width='24px' height='24px' />
        </Styles.IconWrapper>
      </Styles.ButtonSection>
    </Styles.Container>
  )
}
