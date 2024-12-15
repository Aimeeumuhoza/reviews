import React, { Fragment, useEffect, useState } from 'react'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import { countryAreaCodes } from '../../lib/utils/country-area-codes'
import { mapIsoCodeToFlag } from '../../lib/utils/formatting.util'
import parsePhoneNumber from 'libphonenumber-js'
import { Row } from 'antd'

const { Option } = Select

type PhoneNumberInputProps = {
  defaultPhoneNumber?: string
  label?: string
  placeholder?: string
  onChange?: (phoneNumber: string) => void
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onChange, ...props }) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const [country, setCountry] = useState<string>('')
  const [callingCode, setCallingCode] = useState<string>('')
  const [nationalPhoneNumber, setNationalPhoneNumber] = useState<string>()

  useEffect(() => {
    if (props.defaultPhoneNumber) {
      const res = parsePhoneNumber(props.defaultPhoneNumber)
      if (res) {
        setNationalPhoneNumber(res?.nationalNumber ? res?.nationalNumber?.toString() : '')
        setCountry(res?.country ? res?.country?.toString() : countryAreaCodes[0].code)
        setCallingCode(
          res?.countryCallingCode ? res?.countryCallingCode.toString() : countryAreaCodes[0].phone,
        )
      }
      setHasLoaded(true)
    } else {
      setCountry(countryAreaCodes[0].code)
      setCallingCode(countryAreaCodes[0].phone)
      setHasLoaded(true)
    }
  }, [props.defaultPhoneNumber])

  useEffect(() => {
    if (onChange && nationalPhoneNumber) {
      onChange(`${callingCode}${nationalPhoneNumber || ''}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callingCode, nationalPhoneNumber])

  const onCallingCodeChange = (newCallingCode: string): void => {
    const areaCode = countryAreaCodes.find(
      (countryAreaCode) => countryAreaCode.phone === newCallingCode,
    )
    setCountry(areaCode?.code?.toString() || countryAreaCodes[0].code)
    setCallingCode(areaCode?.phone || countryAreaCodes[0].phone)
  }

  const onNationalPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNationalPhoneNumber(e.target.value)
  }

  const CountryCodeSelector = (
    <Select
      showSearch
      value={`+${callingCode} ${mapIsoCodeToFlag(country)}`}
      defaultValue={`+${callingCode} ${mapIsoCodeToFlag(country)}`}
      onChange={(areaCode) => onCallingCodeChange(areaCode)}
      bordered={false}
      style={{ color: '#000000', fontWeight: 700 }}>
      {countryAreaCodes
        .sort((a, b) => parseInt(a.phone.replace('-', '')) - parseInt(b.phone.replace('-', '')))
        .map((areaCode, idx) => {
          return (
            <Option key={idx.toString()} value={areaCode.phone}>
              {`+${areaCode.phone} ${mapIsoCodeToFlag(areaCode.code)}`}
            </Option>
          )
        })}
    </Select>
  )

  if (!hasLoaded) return null

  return (
    <Fragment>
      {props?.label && (
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <span className="text12 black fowe700">{props.label}</span>
        </Col>
      )}
      <Col flex="auto">
        <Row>
          <Col span={24}>
            <Input
              onChange={onNationalPhoneNumberChange}
              style={{ overflow: 'hidden' }}
              value={nationalPhoneNumber}
              placeholder={props.placeholder}
              prefix={CountryCodeSelector}
              className="my_input"
            />
          </Col>
        </Row>
      </Col>
    </Fragment>
  )
}

export default PhoneNumberInput
