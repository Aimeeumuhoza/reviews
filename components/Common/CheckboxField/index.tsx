import Checkbox from 'antd/lib/checkbox'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'

type Props = {
  title: string
  onChange: ({ target }: { target: any }, productType: any) => void
  checked?: boolean
}

const index: React.FC<Props> = ({ title, onChange, checked }) => (
  <Row className="mato8">
    <Col flex="auto" className="text12 gray fowe500">
      {title}
    </Col>
    <Col flex="none">
      <Checkbox checked={checked} onChange={(e) => onChange(e, title)} />
    </Col>
  </Row>
)

export default index
