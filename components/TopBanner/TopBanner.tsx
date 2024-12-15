import React from 'react'
import Link from 'next/link'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { useRouter } from 'next/router'

type TopBannerProps = {
  onBackPressedUrl: string
  label: string
  onBackImgSrc: string
}

const TopBanner: React.FC<TopBannerProps> = (props) => {
  const router = useRouter()
  return (
    <div className="container-fluid checkout_header">
      <div className="container">
        <Link href={props.onBackPressedUrl}>
          <Row>
            <Col flex="auto">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  router.back()
                }}>
                <span style={{ verticalAlign: 'top' }}>
                  <img src={props.onBackImgSrc} alt="icon" style={{ width: '24px' }} />
                </span>
              </a>
              <span className="white text18 fowe700 ml-4">{props.label}</span>
            </Col>
          </Row>
        </Link>
      </div>
    </div>
  )
}

export default TopBanner
