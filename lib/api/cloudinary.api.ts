import axios from 'axios'
import { Err, err, Ok, ok } from 'neverthrow'
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../../config/constants'

type CloudinaryRes = Ok<any, unknown> | Err<unknown, any>

export const handleCloudinaryUpload = async (imageFile: File): Promise<CloudinaryRes> => {
  const formData = new FormData()

  formData.append('file', imageFile)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET || '')
  try {
    const res = await axios.post(`${CLOUDINARY_UPLOAD_URL}`, formData)
    const { data } = res

    return ok({
      data,
    })
  } catch (error) {
    return err({
      errorMsg: error,
    })
  }
}
