import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../../config/constants'

export const uploadImage = async (source: File | undefined): Promise<Record<string, string>> => {
  if (source) {
    const formData = new FormData()
    formData.append('file', source)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    return await response.json()
  }

  return {}
}
