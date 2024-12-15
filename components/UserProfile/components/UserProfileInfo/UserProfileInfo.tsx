import React, { Fragment, useRef, useState } from 'react'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { Formik, FormikProps } from 'formik'
import Input from 'antd/lib/input'
// import DatePicker from 'antd/lib/date-picker'
import Card from 'antd/lib/card'
import PhoneNumberInput from '../../../PhoneNumberInput'
import { DeliveryCity, User, UserProfileDto } from '../../../../types'
import {
  profileInfoInitialValues,
  profileInfoValidationSchema,
} from '../../../../lib/validation/profile-info.validation'
import { getHelp, getValidationStatus } from '../../../../lib/utils/formik.util'
import { countryAreaCodes } from '../../../../lib/utils/country-area-codes'
import { capitalize, mapIsoCodeToFlag } from '../../../../lib/utils/formatting.util'
import { Button, message } from 'antd'
import useModifyProfile from '../../../../hooks/api/useModifyProfile'
import useHandleState from '../../../../hooks/useHandleState'
import { getErrorFromUnknown } from '../../../../lib/utils/error.util'
import {
  changePasswordInitialValues,
  changePasswordValidationSchema,
} from '../../../../lib/validation/change-password.validation'
import useModifyPassword from '../../../../hooks/api/useModifyPassword'
import useSearchCity from '../../../../hooks/api/useSearchCity'

type UserProfileInfoProps = {
  profileInfo: User | undefined
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ profileInfo }) => {
  const searchCityHook = useSearchCity()
  const modifyProfileHook = useModifyProfile()
  const modifyPasswordHook = useModifyPassword()
  const [cities, setCities] = useState<DeliveryCity[]>([])
  const [cityFieldDirty, setcityFieldDirty] = useState<boolean>(false)
  const [isLoadingCities, setisLoadingCities] = useState<boolean>(false)
  const formikRef = useRef<FormikProps<{ newPassword: string; oldPassword: string }>>(null)

  useHandleState(modifyProfileHook, {
    onSuccess: () => message.success('Profile updated successfully'),
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

  useHandleState(modifyPasswordHook, {
    onSuccess: () => {
      message.success('Password updated successfully')
      formikRef.current?.resetForm()
    },
    onError: (error) => message.error(getErrorFromUnknown(error)),
  })

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

  const handleSearchCity = (country?: string, city?: string): void => {
    if (country?.trim().length) {
      if (city && city?.trim().length >= 2) {
        searchCityHook.sendRequest({ country, city })
      }
    }
  }

  return (
    <Card className="user_profile_card">
      <Formik
        enableReinitialize
        initialValues={profileInfo || profileInfoInitialValues}
        validationSchema={profileInfoValidationSchema}
        onSubmit={(formikValues) => {
          const body: UserProfileDto = {
            address: formikValues?.address || '',
            city: formikValues.city?.split('<>')[0] || '',
            country: formikValues.country || '',
            email: formikValues.email,
            firstName: formikValues.firstName,
            lastName: formikValues.lastName,
            phoneNumber: formikValues.phoneNumber,
            postalCode: formikValues.postalCode || '',
          }
          modifyProfileHook.sendRequest(body)
        }}>
        {(formikProps) => {
          return (
            <Fragment>
              <p className="text14 black fowe700 mabo32">MY INFORMATION</p>
              <Form.Item
                name="firstName"
                validateStatus={getValidationStatus(formikProps, 'firstName')}
                help={getHelp(formikProps, 'firstName')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">First Name : </span>
                  </Col>
                  <Col flex="auto">
                    <Input
                      className="my_input"
                      placeholder="First Name"
                      size="small"
                      value={formikProps.values.firstName}
                      onChange={formikProps.handleChange('firstName')}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name="lastName"
                validateStatus={getValidationStatus(formikProps, 'lastName')}
                help={getHelp(formikProps, 'lastName')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">Last Name : </span>
                  </Col>
                  <Col flex="auto">
                    <Input
                      className="my_input"
                      placeholder="Last Name"
                      size="small"
                      value={formikProps.values.lastName}
                      onChange={formikProps.handleChange('lastName')}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'phoneNumber')}
                help={getHelp(formikProps, 'phoneNumber')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">Phone number : </span>
                  </Col>
                  <Col flex="auto">
                    <PhoneNumberInput
                      defaultPhoneNumber={formikProps.values.phoneNumber}
                      onChange={(phoneNumber) => {
                        formikProps.setFieldValue('phoneNumber', `+${phoneNumber}`)
                      }}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name="email"
                validateStatus={getValidationStatus(formikProps, 'email')}
                help={getHelp(formikProps, 'email')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className=" black fowe700">Email : </span>
                  </Col>
                  <Col flex="auto">
                    <Input
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange('email')}
                      className="my_input"
                      placeholder="Email"
                      size="small"
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name="country"
                validateStatus={getValidationStatus(formikProps, 'country')}
                help={getHelp(formikProps, 'country')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">Country : </span>
                  </Col>
                  <Col flex="auto">
                    <Select
                      style={{
                        borderRadius: '3px',
                        fontSize: '10px',
                      }}
                      onFocus={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        if (target?.autocomplete) {
                          target.autocomplete = 'whatever'
                        }
                      }}
                      defaultValue={formikProps.values.country}
                      value={formikProps.values.country}
                      showSearch
                      placeholder="Select country"
                      onChange={(selectedCountry) => {
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
              {/* <Form.Item
                validateStatus={getValidationStatus(formikProps, 'city')}
                help={getHelp(formikProps, 'city')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">City : </span>
                  </Col>
                  <Col flex="auto">
                    <Select
                      showSearch
                      defaultValue={formikProps.values.city}
                      value={formikProps.values.city}
                      notFoundContent={
                        isLoadingCities
                          ? 'Searching...'
                          : cityFieldDirty
                          ? 'No cities found!'
                          : 'Type the city name...'
                      }
                      onChange={(selectedCity) => {
                        const { postalCode } = cities[selectedCity?.split('<>')[1]]
                        formikProps.setFieldValue('city', selectedCity)
                        postalCode && formikProps.setFieldValue('postalCode', postalCode)
                      }}
                      onSearch={(value) => {
                        if (value && value?.trim().length >= 2) setcityFieldDirty(true)
                        else setcityFieldDirty(false)
                        handleSearchCity(formikProps.values.country, value)
                      }}
                      className="my_input"
                      loading={isLoadingCities}
                      placeholder="Type the city name...">
                      {cities.map((city, idx) => (
                        <Select.Option
                          key={idx}
                          value={`${city.cityName}<>${idx}`}
                          className="text14">
                          {city.countyName || city.postalCode
                            ? `${capitalize(city.cityName)} - ${capitalize(
                                city.countyName || city.postalCode,
                              )}`
                            : capitalize(city.cityName)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Form.Item> */}
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
                        formikProps.setFieldValue('city', selectedCity)
                        formikProps.setFieldValue(
                          'postalCode',
                          cities[selectedCity.split('<>')[1]].postalCode || '00000',
                        )
                      }}
                      onSearch={(value) => {
                        if (value && value?.trim().length >= 2) setcityFieldDirty(true)
                        else setcityFieldDirty(false)
                        handleSearchCity(formikProps.values.country, value)
                      }}
                      className="my_input"
                      loading={isLoadingCities}
                      placeholder="Type the city name...">
                      {cities.map((city, idx) => (
                        <Select.Option
                          key={idx}
                          value={`${city.cityName}<>${idx}`}
                          className="text14">
                          {city.countyName || city.postalCode
                            ? `${capitalize(city.cityName)} - ${capitalize(
                                city.countyName || city.postalCode,
                              )}`
                            : capitalize(city.cityName)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Form.Item>
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
              {/* <Form.Item
                name="postalCode"
                validateStatus={getValidationStatus(formikProps, 'postalCode')}
                help={getHelp(formikProps, 'postalCode')}>
                <Row align="middle" className="mabo16">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <span className="text12 black fowe700">Birthday : </span>
                  </Col>
                  <Col flex="auto">
                    <DatePicker
                      className="my_input"
                      onChange={() => {
                        console.log('Date picker selected')
                      }}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>
              </Form.Item> */}
              <Row className="mato32 mabo64">
                <Col flex="auto">
                  <Button
                    loading={modifyProfileHook.isLoading}
                    className="btn_primary_large btn_full"
                    onClick={() => formikProps.handleSubmit()}>
                    SAVE CHANGES
                  </Button>
                </Col>
              </Row>
            </Fragment>
          )
        }}
      </Formik>
      <p className="text14 black fowe900 mabo32">EDIT PASSWORD</p>
      <Formik
        innerRef={formikRef}
        initialValues={changePasswordInitialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={(data) => {
          modifyPasswordHook.sendRequest(data)
        }}>
        {(formikProps) => (
          <Fragment>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'oldPassword')}
              help={getHelp(formikProps, 'oldPassword')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">Old Pasword : </span>
                </Col>
                <Col flex="auto">
                  <Input.Password
                    className="my_input"
                    placeholder="Current Password"
                    size="small"
                    value={formikProps.values.oldPassword}
                    onChange={formikProps.handleChange('oldPassword')}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              validateStatus={getValidationStatus(formikProps, 'newPassword')}
              help={getHelp(formikProps, 'newPassword')}>
              <Row align="middle" className="mabo16">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <span className="text12 black fowe700">New Password : </span>
                </Col>
                <Col flex="auto">
                  <Input.Password
                    className="my_input"
                    placeholder="New Password"
                    size="small"
                    value={formikProps.values.newPassword}
                    onChange={formikProps.handleChange('newPassword')}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Row className="mato32 mabo32">
              <Col flex="auto">
                <Button
                  className="btn_primary_large btn_full"
                  loading={modifyPasswordHook.isLoading}
                  onClick={() => {
                    formikProps.handleSubmit()
                  }}>
                  SAVE PASSWORD
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      </Formik>
    </Card>
  )
}

export default UserProfileInfo
