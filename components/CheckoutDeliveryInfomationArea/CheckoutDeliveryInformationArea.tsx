import React, { Fragment, useEffect, useState } from 'react'
// import OnSubmitValidationError from '../OnSubmitValidationError'
import { Formik } from 'formik'
import Col from 'antd/lib/col'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'
import { Divider, message, Select, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import Button from 'antd/lib/button'
import PhoneNumberInput from '../PhoneNumberInput'
import useSearchCity from '../../hooks/api/useSearchCity'
import {
  deliveryInfoInitialValues,
  deliveryInfoValidationSchema,
} from '../../lib/validation/delivery-information.validation'
import { getHelp, getValidationStatus } from '../../lib/utils/formik.util'
import { countryAreaCodes } from '../../lib/utils/country-area-codes'
import { capitalize, mapIsoCodeToFlag } from '../../lib/utils/formatting.util'
import useHandleState from '../../hooks/useHandleState'
import { CheckoutDeliveryInformationAreaProps, DeliveryCity } from '../../types'
import OnSubmitValidationError from '../OnSubmitValidationError'
import CheckoutInfo from '../CheckoutInfo/CheckoutInfo'

const CheckoutDeliveryInformationArea: React.FC<CheckoutDeliveryInformationAreaProps> = (props) => {
  const searchCityHook = useSearchCity()
  const [cities, setCities] = useState<DeliveryCity[]>([])
  const [isLoadingCities, setisLoadingCities] = useState<boolean>(false)
  const [cityFieldDirty, setcityFieldDirty] = useState<boolean>(false)

  const [value, setValue] = useState(0)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    props.showShippingFees(value && value === 1 && !props.isAbove ? '2500' : '0')
  }, [value])

  useHandleState<DeliveryCity[]>(searchCityHook, {
    onLoading: () => {
      setisLoadingCities(true)
    },
    onError: () => {
      setisLoadingCities(false)
      setCities([])
    },
    onSuccess: (response) => {
      setisLoadingCities(false)
      setCities([...response.payload])
    },
  })

  const shouldCheckShippingFees = (
    country: string | undefined,
    shippingFees: string | undefined,
  ): boolean => {
    // If country is not Rwanda and shipping fees is undefined or 0,
    // shipping fees need to be checked
    if (props.isAbove) return false
    return country !== 'RW' && (shippingFees === undefined || shippingFees === '0')
  }

  const handleSearchCity = (country?: string, city?: string): void => {
    if (country?.trim().length) {
      if (city && city?.trim().length >= 2) {
        searchCityHook.sendRequest({ country, city })
      }
    }
  }
  // console.log(props.profileInfo, 'profileInfo')
  return (
    <Fragment>
      <p className="text14 black fowe700 text-uppercase mabo32">Delivery Information</p>
      <CheckoutInfo />
      <Formik
        enableReinitialize
        initialValues={props.profileInfo || deliveryInfoInitialValues}
        validationSchema={deliveryInfoValidationSchema}
        onSubmit={(formikValues: {
          country: string
          city: string
          postalCode: string
          address: string
          recipientName: string
          email: string
          phoneNumber: string
          clientNote: string
          shippingFees: string | undefined
          hasAgreedToTermsAndCondition: boolean
        }) => {
          props?.onSubmit({ ...formikValues, shippingFees: props?.shippingFees })
        }}>
        {(formikProps) => (
          <Fragment>
            <OnSubmitValidationError
              formik={formikProps}
              callback={() => {
                message.error('We noticed some errors. Check your form again before submitting')
              }}
            />
            <Row align="middle" className="mabo16">
              <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                <span className="text12 black fowe700">Phone Number : </span>
              </Col>
              <PhoneNumberInput
                defaultPhoneNumber={props.profileInfo?.phoneNumber}
                onChange={(phoneNumber) => {
                  formikProps.setFieldValue('phoneNumber', `+${phoneNumber}`)
                }}
              />
            </Row>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'email')}
              help={getHelp(formikProps, 'email')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">Email : </span>
                </Col>
                <Col flex="auto">
                  <Input
                    value={formikProps.values.email}
                    onChange={formikProps.handleChange('email')}
                    className="my_input "
                    placeholder="Email"
                    size="small"
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'country')}
              help={getHelp(formikProps, 'country')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">Country : </span>
                </Col>
                <Col flex="auto">
                  <Select
                    className="select_option"
                    onFocus={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      if (target?.autocomplete) {
                        ;(target as any).autocomplete = 'whatever'
                      }
                    }}
                    defaultValue={formikProps.values.country}
                    value={formikProps.values.country}
                    showSearch
                    placeholder="Select country"
                    onChange={(selectedCountry) => {
                      props.resetShippingFees()
                      // props.toggleShippingFeesVisibility(selectedCountry !== 'RW')

                      setValue(selectedCountry !== 'RW' ? 1 : 0)
                      setCities([])
                      formikProps.setFieldValue('country', selectedCountry)
                      formikProps.setFieldValue('city', '')
                      formikProps.setFieldValue('postalCode', '')
                    }}
                    optionFilterProp="children">
                    {countryAreaCodes
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map((countryAreaCode, idx) => (
                        <Select.Option key={idx} value={countryAreaCode.code} className="text14">
                          {`${countryAreaCode.label} ${mapIsoCodeToFlag(countryAreaCode.code)}`}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'city')}
              help={getHelp(formikProps, 'city')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">City : </span>
                </Col>
                <Col flex="auto">
                  <Select
                    showSearch
                    value={`${capitalize(formikProps.values.city?.split('<>')[0])} - ${
                      formikProps.values.postalCode
                    }`}
                    notFoundContent={
                      isLoadingCities
                        ? 'Searching...'
                        : cityFieldDirty
                        ? 'No cities found!'
                        : 'Type the city name...'
                    }
                    onChange={(selectedCity) => {
                      props.resetShippingFees()
                      // props.toggleShippingFeesVisibility(formikProps.values.country !== 'RW')
                      setValue(1)
                      formikProps.setFieldValue('city', selectedCity.split('<>')[0])
                      formikProps.setFieldValue(
                        'postalCode',
                        cities[selectedCity.split('<>')[1]].postalCode || '00000',
                      )
                      if (
                        formikProps.values.country &&
                        formikProps.values.country !== 'RW' &&
                        !props.isAbove
                      ) {
                        props.onCalculateShippingFees(
                          formikProps.values.country,
                          selectedCity?.split('<>')[0],
                        )
                      } else {
                        !formikProps.values.country &&
                          message.error('Please select a destination country.')
                      }
                    }}
                    onSearch={(value) => {
                      if (value && value?.trim().length >= 2) setcityFieldDirty(true)
                      else setcityFieldDirty(false)
                      handleSearchCity(formikProps.values.country, value)
                    }}
                    className=" select_option"
                    loading={isLoadingCities}
                    placeholder="Type the city name...">
                    {cities.map((city, idx) => (
                      <Select.Option
                        key={idx}
                        value={`${city.cityName}<>${idx}`}
                        className="text14">
                        {city.countyName || city.postalCode
                          ? `${capitalize(city.cityName)} - ${
                              capitalize(city.countyName) || city.postalCode
                            }`
                          : capitalize(city.cityName)}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>

            {/* <p className="text12 gray">
              Based on the shipping address you provided, the shipping fee for your order is
              automatically retrieved from our shipping partner (DHL) and added to the total cost.
            </p> */}

            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'address')}
              help={getHelp(formikProps, 'address')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">Address : </span>
                </Col>
                <Col flex="auto">
                  <Input
                    value={formikProps.values.address}
                    onChange={formikProps.handleChange('address')}
                    className="my_input"
                    placeholder="Address"
                    size="small"
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'postalCode')}
              help={getHelp(formikProps, 'postalCode')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">PostCode : </span>
                </Col>
                <Col flex="auto">
                  <Input
                    onChange={formikProps.handleChange('postalCode')}
                    value={formikProps.values.postalCode}
                    className="my_input"
                    placeholder="Postcode"
                    size="small"
                  />
                </Col>
              </Row>
            </Form.Item>
            {formikProps.values.country && formikProps.values.country === 'RW' ? (
              <Form.Item>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">Delivery option : </span>
                  </Col>
                  <Col flex="auto">
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={0}>Pick from store</Radio>
                      <Radio value={1}>Delivery (we charge 2 USD)</Radio>
                    </Radio.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </Form.Item>
            ) : null}
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'recipientName')}
              help={getHelp(formikProps, 'recipientName')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">Recipient name : </span>
                </Col>
                <Col flex="auto">
                  <Input
                    value={formikProps.values.recipientName}
                    onChange={formikProps.handleChange('recipientName')}
                    className="my_input"
                    placeholder="Name"
                    size="small"
                  />
                </Col>
              </Row>
            </Form.Item>
            <Divider></Divider>
            <p className="text14 black fowe700">COMMENTS</p>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'clientNote')}
              help={getHelp(formikProps, 'clientNote')}>
              <Row>
                <Col flex="auto">
                  <Input.TextArea
                    value={formikProps.values.clientNote}
                    onChange={formikProps.handleChange('clientNote')}
                    rows={4}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Divider></Divider>
            <p className="text12 gray fowe300">
              <span className="black fowe700 mabo16">The returns are accepted</span>
              <ul>
                <li>Within 5 days of the date of purchase</li>
                <li>
                  Only if the product is in this range: the wrong size, has a production issue, or
                  need a slight adjustment for your foot and the item must be unused
                </li>
              </ul>
            </p>
            <Divider></Divider>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'hasAgreedToTermsAndCondition')}
              help={getHelp(formikProps, 'hasAgreedToTermsAndCondition')}>
              <Checkbox
                checked={formikProps.values.hasAgreedToTermsAndCondition}
                onChange={(e) =>
                  formikProps.setFieldValue('hasAgreedToTermsAndCondition', e.target.checked)
                }
                className="text12 fowe300">
                I agree to the{' '}
                <span className="text12 text-decoration-underline fowe700 black">
                  Terms and Conditions
                </span>
              </Checkbox>
            </Form.Item>
            <br />
            <Row className="mato32 mabo32">
              <Col span={24}>
                <Button
                  // disabled={}
                  loading={props.isLoading}
                  onClick={() => {
                    // console.log(props.shippingFees ,'shipping');

                    if (shouldCheckShippingFees(formikProps.values.country, props.shippingFees)) {
                      message.warn('You need to calculate your shipping fees first')
                    } else {
                      formikProps.handleSubmit()
                    }
                  }}
                  className={`${
                    shouldCheckShippingFees(formikProps.values.country, props.shippingFees) &&
                    'btn_primary_large_disabled'
                  } btn_primary_large btn_full`}>
                  PROCEED TO PAYMENT
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  )
}

export default CheckoutDeliveryInformationArea
