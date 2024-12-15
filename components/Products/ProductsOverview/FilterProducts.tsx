/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import styles from '../../../styles/Products.module.css'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Checkbox from 'antd/lib/checkbox'
import CheckboxField from '../../Common/CheckboxField'
import useCategories from '../../../lib/swr/category.hooks'
import { Color } from '../../../types'
import { isEmpty, isValid } from '../../../lib/arrayHelpers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button from 'antd/lib/button'

const FilterProducts: React.FC = () => {
  // TODO: IMPLEMENT METHOD TO GET QUERIES FROM URL STRING & POPULATE THEM INTO RESPECTIVE FILTER FIELDS
  const router = useRouter()
  const [checkedCategories, setCheckedCategories] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string[]>([])
  const [selectedShoeSize, setSelectedShoeSize] = useState<number[]>([])
  const [selectedProductType, setSelectedProductType] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string[]>([])

  const onCategoryCheck = ({ target }, category): void => {
    if (target.checked) setCheckedCategories([...checkedCategories, category])
    else setCheckedCategories(checkedCategories.filter((c) => c !== category))
  }

  const onShoesizeCheck = ({ target }, shoesize): void => {
    if (target.checked) setSelectedShoeSize([...selectedShoeSize, shoesize])
    else setSelectedShoeSize(selectedShoeSize.filter((c) => c !== shoesize))
  }

  const onProductTypeChange = ({ target }, productType): void => {
    if (target.checked) setSelectedProductType([...selectedProductType, productType])
    else setSelectedProductType(selectedProductType.filter((c) => c !== productType))
  }

  const onColorChange = (color: string): void => {
    if (!selectedColor.includes(color)) setSelectedColor([...selectedColor, color])
    else setSelectedColor(selectedColor.filter((c) => c !== color))
  }

  const onSectionCheck = ({ target }, section): void => {
    if (target.checked) setSelectedSection([...selectedSection, section])
    else setSelectedSection(selectedSection.filter((c) => c !== section))
  }

  const onClearAll = (): void => {
    // TODO: FIND A BETTER SOLUTION TO REMOVE QUERIES WITHOUT REFRESHING PAGE
    window.location.href = '/products'
  }

  useEffect(() => {
    const searchParam = new URLSearchParams()
    if (!isEmpty(checkedCategories)) searchParam.append('c_._name__in', checkedCategories.join())
    if (selectedColor && !isEmpty(selectedColor))
      searchParam.append('pv_._dominantColors__jsonarrcontain', selectedColor.join())
    if (selectedShoeSize && !isEmpty(selectedShoeSize))
      searchParam.append('pv_._shoeSizes__jsonarrcontain', selectedShoeSize.join())
    if (selectedProductType && !isEmpty(selectedProductType))
      searchParam.append('pt_._name__in', selectedProductType.join())
    if (selectedSection && !isEmpty(selectedSection))
      searchParam.append('pp_._productSection', selectedSection.join())

    if (!(Array.from(searchParam).length === 0)) router.replace(`/products?${searchParam}`)
    else router.replace(router.asPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCategories, selectedColor, selectedShoeSize, selectedProductType, selectedSection])

  const { categories, isLoading, mutate } = useCategories.all({})

  useEffect(() => {
    mutate()
  }, [mutate])

  const productTypes = isValid(categories, isLoading)
    ? categories.flatMap((c) => c.productTypes)
    : []

  return (
    <Fragment>
      <div className="mabo32" style={{ padding: '42px 0px' }}>
        <p className="text12 fowe700 black mabo32">FILTER</p>
        <p className="text12 fowe700 black mabo32">Category</p>
        {isValid(categories, isLoading) ? (
          categories.map((c) => (
            <Row key={c.id} className="mabo16">
              <Col flex="auto" className="text12 gray fowe500">
                {c.name}
              </Col>
              <Col flex="none">
                <Checkbox
                  checked={checkedCategories.includes(c.name)}
                  onChange={(e) => onCategoryCheck(e, c.name)}
                />
              </Col>
            </Row>
          ))
        ) : (
          <div></div>
        )}

        {/* <p className="text12 fowe700 black mato64 mabo32">Price range</p>
        <Row align="middle">
          <Col span={12} className="text12 gray fowe500">
            <span>Start</span>
          </Col>
          <Col span={12}>
            <Input
              onChange={(e) => setPriceStart(e.target.value)}
              value={priceStart}
              suffix={
                <span className="text12 black fowe700">USD</span>
              }
            />
          </Col>
        </Row> */}
        {/* <Row className="mato16">
          <Col span={12} className="text12 gray fowe500">
            <span>End</span>
          </Col>
          <Col span={12}>
            <Input
              onChange={(e) => setPriceEnd(e.target.value)}
              value={priceEnd}
              suffix={
                <span className="text12 black fowe700">USD</span>
              }
            />
          </Col>
        </Row> */}
        <p className="text12 fowe700 black mato64 mabo32">Color</p>
        <Row>
          {Object.entries(Color).map(([color, hex]) => (
            <div key={hex} onClick={() => onColorChange(color)}>
              <Brightness1Icon
                style={{ color: hex }}
                className={`${styles.bulletIconFilter} color_picker ${
                  selectedColor.includes(color) ? 'color_picker_active' : ''
                }`}
              />
            </div>
          ))}
        </Row>

        <p className="text12 fowe700 black mato64 mabo32">Sizes</p>
        <Row>
          {Array.from({ length: 22 }, (x, i) => i + 27).map((i) => {
            return (
              <>
                <Col span={5}>
                  <Checkbox
                    key={i}
                    checked={selectedShoeSize.includes(i)}
                    onChange={(e) => onShoesizeCheck(e, i)}
                    className=" text12 gray">
                    {i}
                  </Checkbox>
                </Col>
              </>
            )
          })}
        </Row>
        <br />
        <Row className="mabo32">
          <Col span={24}>
            <p className="text12 black fowe700 mabo0">Product types</p>
          </Col>
        </Row>
        {isValid(productTypes, isLoading) ? (
          productTypes.map((p) => (
            <CheckboxField
              key={p.id}
              checked={selectedProductType.includes(p.name)}
              onChange={onProductTypeChange}
              title={p.name}
            />
          ))
        ) : (
          <p className="text12 gray fowe500">No Product types available</p>
        )}
        <br />
        <Row className="mabo32">
          <Col span={24}>
            <p className="text12 black fowe700 mabo0">Sections</p>
          </Col>
        </Row>
        {['Women', 'Men', 'Kids'].map((s) => (
          <Row key={s} className="mabo16">
            <Col flex="auto" className="text12 gray fowe500">
              {s}
            </Col>
            <Col flex="none">
              <Checkbox
                checked={selectedSection.includes(s.toUpperCase())}
                onChange={(e) => onSectionCheck(e, s.toUpperCase())}></Checkbox>
            </Col>
          </Row>
        ))}
        <Row className="mabo32 mato64">
          <Col span={24}>
            <Button className="clear_filter btn_full" onClick={() => onClearAll()}>
              Clear Filter
            </Button>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default FilterProducts
