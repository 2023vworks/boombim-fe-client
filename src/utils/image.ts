export function convertFormData(formKey: string, formSource: string | Blob | Array<string | Blob>): FormData {
  const formData = new FormData()

  if (Array.isArray(formSource)) {
    for (let i = 0; i < formSource.length; i++) {
      formData.append(formKey, formSource[i])
    }
  } else {
    formData.append(formKey, formSource)
  }

  return formData
}

export function convertBlob(convertData: string): Blob {
  const parts = convertData.split(';')
  const data = atob(parts[1].split(',')[1])
  // const contentType = parts[0].split(':')[1]

  const blob = new Blob([data], { type: 'image/jpeg' })

  return blob
}

export function checkImageType(imgType: string) {
  const regex = /^image\/(jpeg|jpg|png|gif|bmp|webp|svg\+xmI)$/i

  return !regex.test(imgType)
}
