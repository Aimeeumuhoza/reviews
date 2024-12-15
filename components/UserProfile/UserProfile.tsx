import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React, { useEffect, useState } from 'react'
import Image from 'antd/lib/image'
import Tabs from 'antd/lib/tabs'
import message from 'antd/lib/message'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { UserProfileInfo, UserOrderHistory } from './components'
import WishlistTab from '../Wishlist/WishlistTab'
import { useRouter } from 'next/router'
import { User } from '../../types'
import { useAuth } from '../../contexts/Auth'
import { uploadImage } from '../../lib/utils/cloudinary.util'
import useChangeProfilePicture from '../../hooks/api/useChangeProfilePicture'
import useHandleState from '../../hooks/useHandleState'
import ProfilePictureUpload from '../ProfilePictureUpload'

const { TabPane } = Tabs

const UserProfile: React.FC = () => {
  const router = useRouter()
  const authHook = useAuth()
  const changeProfilePicture = useChangeProfilePicture()
  const [profileInfo, setProfileInfo] = useState<User>()
  const [isUploading, setIsUploading] = useState(false)
  const [tabIndex, setTabIndex] = useState((router.query?.tabIndex as string) || '1')

  useEffect(() => {
    setProfileInfo(authHook.loggedInUser)
  }, [authHook.loggedInUser])

  useEffect(() => {
    if (router.query.tabIndex) {
      setTabIndex(router.query?.tabIndex as string)
    }
  }, [router.query])

  useHandleState(changeProfilePicture, {
    onSuccess: (res) => {
      authHook.setLoggedInUser && authHook.setLoggedInUser(res.payload as User)
    },
  })

  const modifyTabIndex = (idx: string): void => {
    router.push(`/user-profile?tabIndex=${idx}`, undefined, {
      shallow: true,
    })
  }

  return (
    <>
      <div className="container-fluid checkout_header">
        <div className="container">
          <Row gutter={16} align="middle">
            <Col flex="none">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  router.back()
                }}>
                <Image src="/arrows-left-white.svg" preview={false} style={{ width: '24px' }} />
              </a>
            </Col>
            <Col flex="auto">
              <Row className="logo" align="middle" gutter={16}>
                <Col flex="none" className="d-flex">
                  <ProfilePictureUpload
                    onUpload={async (file) => {
                      try {
                        setIsUploading(true)
                        const imgUploadRes = await uploadImage(file)
                        changeProfilePicture.sendRequest({ profilePictureImgUrl: imgUploadRes.url })
                        setIsUploading(false)
                      } catch (error) {
                        message.error(error.message)
                        setIsUploading(false)
                      }
                    }}
                    defaultImageUrl={profileInfo?.profilePictureImgUrl}
                    isUploading={isUploading}
                  />
                </Col>
                <Col flex="auto" className="d-flex">
                  <span className="align-self-center">
                    <span className="text12 gray">Hello</span>
                    <br />
                    <span className="text16 white fowe700">{`${profileInfo?.firstName} ${profileInfo?.lastName}`}</span>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div
        className="container-fluid "
        style={{ backgroundColor: '#F4F6F9', padding: '32px 16px' }}>
        <div className="container">
          <Tabs
            onChange={(tabIdx) => modifyTabIndex(tabIdx)}
            tabPosition="left"
            defaultActiveKey={tabIndex}
            activeKey={tabIndex}
            type="card">
            <TabPane
              tab={
                <span className="text12 black fowe700 ">
                  <PersonOutlineOutlinedIcon className="my_icon" />
                  <span className="ml-3 hide_phone">My Account</span>
                </span>
              }
              key="1"
              style={{ padding: '0 24px', backgroundColor: '#F4F6F9' }}>
              <UserProfileInfo profileInfo={profileInfo} />
            </TabPane>
            <TabPane
              tab={
                <span className="text12 black fowe700">
                  <LabelOutlinedIcon className="my_icon" />
                  <span className="ml-3 hide_phone"> My Orders</span>
                </span>
              }
              key="2">
              <UserOrderHistory />
            </TabPane>
            <Tabs.TabPane
              tab={
                <span className="text12 black fowe700">
                  <FavoriteBorderOutlinedIcon className="my_icon" />
                  <span className="ml-3 hide_phone"> Saved Items</span>
                </span>
              }
              key="3">
              <WishlistTab />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default UserProfile
