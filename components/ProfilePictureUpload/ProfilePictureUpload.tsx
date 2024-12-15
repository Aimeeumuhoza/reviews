import React, { Fragment, useEffect, useState } from 'react'
import Avatar from 'antd/lib/avatar'
import ImgCrop from 'antd-img-crop'
import Upload from 'antd/lib/upload'
import { Spin } from 'antd'
import { getBase64 } from '../../lib/utils/file.util'

type ProfilePictureUploadProps = {
  onUpload: (file: File) => void
  defaultImageUrl?: string
  isUploading?: boolean
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onUpload,
  defaultImageUrl,
  isUploading,
}) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [file, setFile] = useState<File>()

  const props = {
    showUploadList: false,
  }

  const parseImage = (file: File): void => {
    if (file) {
      getBase64(file, async (imageUrl) => {
        setImageUrl(imageUrl)
      })
      if (setFile) {
        setFile(file)
      }
    }
  }

  useEffect(() => {
    setImageUrl(defaultImageUrl)
  }, [defaultImageUrl])

  useEffect(() => {
    if (file) {
      onUpload(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <Fragment>
      <ImgCrop
        onModalOk={(croppedImg) => {
          parseImage(croppedImg)
        }}
        rotate
        modalWidth={400}
        shape="round">
        <Upload {...props}>
          <img
            src="/camera.svg"
            alt="camera_icon"
            height="16px"
            style={{
              backgroundColor: '#ffffff',
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              borderRadius: '4px',
              padding: '2px',
              zIndex: 2,
            }}
          />
        </Upload>
      </ImgCrop>
      <Spin spinning={isUploading}>
        <Avatar
          shape="circle"
          src={imageUrl || '/uzuri_avatar.png'}
          className="align-self-center"
          size={64}
        />
      </Spin>
    </Fragment>
  )
}

export default ProfilePictureUpload
