/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react'
import Webcam from 'react-webcam'
import * as Styles from './PortalCamera.styles'
import ReactDOM from 'react-dom'
import { checkImageType, convertBlob, convertFormData } from '@/utils/image'
import { addImage } from '@/store/slices/image.slice'
import { Button } from '@/bds/Button/Button'
import Icon, { ICON_UNION_TYPE } from '@/bds/Icon/Icon'
import theme from '@/styles/theme'
import { type RootState, useAppDispatch, useAppSelector } from '@/store/store'
import { closeCamera } from '@/store/slices/camera.slice'

export default function PortalCamera() {
  const webcamRef = React.useRef<Webcam>(null)
  const dispatch = useAppDispatch()
  const isCameraOpen = useAppSelector((state: RootState) => state.camera.isOpen)

  const [imgSrc, setImgSrc] = useState<string | null>(null)

  const capture = React.useCallback(() => {
    const screenShoot = webcamRef.current?.getScreenshot()
    screenShoot && setImgSrc(screenShoot)
  }, [webcamRef])

  const retake = (): void => {
    setImgSrc(null)
  }

  const uploadImg = (img: string): void => {
    if (img) {
      const parts = img.split(';')
      const contentType = parts[0].split(':')[1]

      if (checkImageType(contentType)) {
        alert('데이터 타입이 맞지 않습니다.')
        return
      }

      const imgSrcBlob = convertBlob(img)

      const imgSrcFormData = convertFormData('images', imgSrcBlob)

      dispatch(
        addImage({
          images: imgSrcFormData,
          previewImages: [img],
        }),
      )

      dispatch(closeCamera())
      setImgSrc(null)
    }
  }

  const cameraRoot = document.querySelector('#camera-root') as HTMLElement

  return isCameraOpen
    ? ReactDOM.createPortal(
        <Styles.Container>
          <Styles.Wrapper>
            {imgSrc && (
              <img
                src={imgSrc}
                alt='webcam'
                style={{
                  width: '400px',
                  height: '300px',
                }}
              />
            )}
            {!imgSrc && (
              <Webcam
                style={{
                  width: '400px',
                  height: '400px',
                }}
                videoConstraints={{ facingMode: 'environment' }}
                ref={webcamRef}
              />
            )}
            <Styles.ButtonSection>
              {imgSrc && (
                <>
                  <Button text='다시찍기' buttonType='OUTLINE' width={100} height={50} onClick={retake} />
                  <Button
                    text='사진업로드'
                    buttonType='PRIMARY'
                    width={100}
                    height={50}
                    onClick={() => {
                      uploadImg(imgSrc)
                    }}
                  />
                </>
              )}
              {!imgSrc && (
                <Styles.ButtonBox onClick={capture}>
                  <Icon iconType={ICON_UNION_TYPE.CAMERA} width='24px' height='24px' fillColor={theme.color.white} />
                </Styles.ButtonBox>
              )}
            </Styles.ButtonSection>
          </Styles.Wrapper>
        </Styles.Container>,
        cameraRoot,
      )
    : null
}
