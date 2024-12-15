import React from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import StarIcon from '@material-ui/icons/Star'
import Avatar from 'antd/lib/avatar'
import Typography from 'antd/lib/typography'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { ReviewRatingItem as ReviewItem } from '../../../../types'
import styles from '../../../../styles/Products.module.css'

const { Text } = Typography

type ReviewRatingItemProps = {
  item?: ReviewItem
}

const ReviewRatingItem: React.FC<ReviewRatingItemProps> = (props) => {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <Row align="middle" className="mabo16">
        <Avatar
          src={props.item?.client.profilePictureImgUrl || '/uzuri_avatar.png'}
          size={36}
          style={{ marginRight: '8px' }}></Avatar>
        <Text className="text12 black fowe700 ">{`${props?.item?.client?.firstName} ${props?.item?.client?.lastName}`}</Text>
      </Row>
      <Row className="mabo64">
        <Col span={24} className="mabo8">
          {[...Array(5).keys()].map((idx) => {
            if (idx < parseInt(props.item?.rating ? props.item?.rating : '0')) {
              return <StarIcon className={styles.starIconOutlined} />
            } else {
              return <StarBorderIcon className={styles.starIconOutlined} />
            }
          })}
        </Col>
        <Col span={24}>
          <p className="text12 fowe900 black mabo8">{props.item?.title}</p>
          <p className="text12 black fowe500 mabo16">{props.item?.description}</p>
          <p className="text10 gray fowe300">
            {props?.item && new Date(props?.item.createdOn)?.toLocaleDateString()}
          </p>
        </Col>
      </Row>
    </Col>
  )
}

export default ReviewRatingItem
