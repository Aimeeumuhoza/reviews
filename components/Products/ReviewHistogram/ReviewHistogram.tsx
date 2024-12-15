import React, { Fragment } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Progress from 'antd/lib/progress'

type ReviewHistogramProps = {
  classifiedRating?: Record<number, { totalReviews: number; averageRating: number }>
  totalReviews?: number
}

const ReviewHistogram: React.FC<ReviewHistogramProps> = (props) => {
  return (
    <Fragment>
      <Row gutter={16} className="mabo8">
        <Col span={6}>
          <span className="text12 gray f">5 Stars</span>
        </Col>
        <Col flex="auto">
          <Progress
            percent={
              (100 * (props?.classifiedRating ? props?.classifiedRating[5].totalReviews : 0)) / 90
            }
            showInfo={false}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mabo8">
        <Col span={6}>
          <span className="text12 gray">4 Stars</span>
        </Col>
        <Col flex="auto">
          <Progress
            percent={
              (100 * (props?.classifiedRating ? props?.classifiedRating[4].totalReviews : 0)) / 90
            }
            showInfo={false}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mabo8">
        <Col span={6}>
          <span className="text12 gray">3 Stars</span>
        </Col>
        <Col flex="auto">
          <Progress
            percent={
              (100 * (props?.classifiedRating ? props?.classifiedRating[3].totalReviews : 0)) / 90
            }
            showInfo={false}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mabo8">
        <Col span={6}>
          <span className="text12 gray">2 Stars</span>
        </Col>
        <Col flex="auto">
          <Progress
            percent={
              (100 * (props?.classifiedRating ? props?.classifiedRating[2].totalReviews : 0)) / 90
            }
            showInfo={false}
          />
        </Col>
      </Row>
      <Row gutter={16} className="mabo8">
        <Col span={6}>
          <span className="text12 gray">1 Star</span>
        </Col>
        <Col flex="auto">
          <Progress
            percent={
              (100 * (props?.classifiedRating ? props?.classifiedRating[1].totalReviews : 0)) / 90
            }
            showInfo={false}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ReviewHistogram
