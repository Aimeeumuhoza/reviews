import React, { Fragment } from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import { useRouter } from 'next/router'

type DynamicBreadcrumbProps = {
  items: { name: string; isSelected?: boolean; path?: string }[]
}

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = (props) => {
  const router = useRouter()
  return (
    <Fragment>
      <Breadcrumb separator="">
        {props.items.map((item, idx) => (
          <Fragment key={idx.toString()}>
            <Breadcrumb.Item
              onClick={() => {
                if (!item.isSelected && item.path) {
                  router.push(item.path)
                }
              }}
              className={`text12 fowe700 ${item.isSelected ? 'black' : 'gray'}`}>
              {item.name}
            </Breadcrumb.Item>
            {idx !== props.items.length - 1 && (
              <Breadcrumb.Separator>
                <span className="text12 fowe900 black">.</span>
              </Breadcrumb.Separator>
            )}
          </Fragment>
        ))}
      </Breadcrumb>
    </Fragment>
  )
}

export default DynamicBreadcrumb
