import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Col, Row } from 'antd'

const ProductListSkeletonLoader: React.FC = () => (
  <div className="d-flex w-100 flex-wrap">
    {[...Array(12).keys()].map((k) => (
      <Row style={{ paddingBottom: '24px', marginLeft: '24px' }} key={k}>
        <Col>
          <Skeleton
            style={{ height: '320px', width: '330px', borderRadius: '8px' }}
            variant="rect"
          />
          <Row>
            <Skeleton
              style={{
                marginTop: '24px',
                marginLeft: '12px',
                height: '12px',
                width: '142px',
                paddingTop: '12px',
                borderRadius: '12px',
              }}
              variant="rect"
            />
            {[...Array(3).keys()].map((i) => (
              <Skeleton
                key={i}
                style={{
                  marginTop: '24px',
                  marginLeft: '12px',
                  height: '12px',
                  width: '12px',
                  paddingTop: '12px',
                  borderRadius: '12px',
                }}
                variant="circle"
              />
            ))}
          </Row>
          <Row>
            <Skeleton
              style={{
                marginTop: '24px',
                marginLeft: '12px',
                height: '12px',
                width: '42px',
                paddingTop: '12px',
                borderRadius: '12px',
              }}
              variant="rect"
            />
          </Row>
        </Col>
      </Row>
    ))}
  </div>
)

export default ProductListSkeletonLoader
