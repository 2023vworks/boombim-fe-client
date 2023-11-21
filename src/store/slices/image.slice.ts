import { convertFormData } from '@/utils/image'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ImageInitialState {
  images: FormData | null
  previewImages: string[]
}

const initialState: ImageInitialState = {
  images: null,
  previewImages: [],
}

const imageSlice = createSlice({
  name: 'imageSlice',
  initialState,
  reducers: {
    addImage(state, action: PayloadAction<ImageInitialState>) {
      const originImages = state.images?.getAll('images')
      const addImages = action.payload.images?.getAll('images')

      if (!originImages && addImages) {
        const newFileFormData = convertFormData('images', addImages)
        state.images = newFileFormData
      }

      if (originImages && addImages) {
        const addedFormData = [...originImages, ...addImages]

        if (addedFormData.length > 5) {
          alert('이미지 업로드는 5개까지만 가능합니다.')
        }

        const newFileFormData = convertFormData('images', addedFormData)

        state.images = newFileFormData
      }
      state.previewImages = [...state.previewImages, ...action.payload.previewImages]
    },
    removeImage: (state, action: PayloadAction<{ idx: number }>) => {
      const originImages = state.images?.getAll('images')

      const deletedImages = originImages?.filter((_, index) => index !== action.payload.idx)
      if (deletedImages) {
        const newFileFormData = convertFormData('images', deletedImages)
        state.images = newFileFormData
      }

      state.previewImages = state.previewImages.filter((_, index) => index !== action.payload.idx)
    },

    resetImage: (state) => {
      state.images = null
      state.previewImages = []
    },
  },
})

export const { addImage, removeImage, resetImage } = imageSlice.actions
export default imageSlice.reducer
