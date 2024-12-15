import * as Yup from 'yup'
// TODO use yup typescript model validation
// TODO update pass requirements
const phoneRegExp =
  /^\+((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const password = Yup.string()
  .required('No password provided.')
  .min(4, 'Password is too short')
  .max(20, 'Password is too long')
  .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password is too weak!')

export const email = Yup.string().required('No email provided.').email('Invalid email')

export const names = Yup.string()
  .required('names must be provided,')
  .min(3, 'too short - should be 8 chars minimum.')
  .max(20, 'too long - should be 20 chars maximum.')

export const gender = Yup.string().required('No gender provided.')

export const dateOfBirth = Yup.string().required('No date of birth provided.')

export const firstName = Yup.string()
  .required('First name required')
  .min(2, 'too short - should be 8 chars minimum.')

export const lastName = Yup.string()
  .required('Last name required')
  .min(2, 'too short - should be 8 chars minimum.')

export const orderedQuantity = Yup.number()
  .required('Quantity required')
  .typeError('you must specify a quantity')
  .min(1, 'too little - you should select at least 1 item in quantity')
  .max(10, 'too much - you can not take more than 10 items in quantity')

export const orderedShoeSize = Yup.number()
  .typeError('you must specify a shoe size')
  .required('Shoe size is required')
  .min(1, 'too little - you should select a valid shoe size')

export const country = Yup.string().nullable(true).required('Country is required')

export const city = Yup.string().nullable(true).required('City is required')

export const address = Yup.string().nullable(true).required('Address is required')

export const postalCode = Yup.string().nullable(true).required('Postal code is required')

export const recipientName = Yup.string()
  .nullable(true)
  .required("Recipient's full names are required")

export const promoCode = Yup.string()
  .required('Promo code is required')
  .min(1, 'Promo code should be altleast 5 characters long')

export const phoneNumber = Yup.string().matches(phoneRegExp, 'Phone number is not valid')

export const rating = Yup.number()
  .required('You must provide a rating')
  .min(1, 'You can not give less than 1 star')
  .max(5, 'You can not give more than 5 stars')

export const reviewTitle = Yup.string().required('Title is required')

export const reviewDescription = Yup.string().required('Description is required')

export const giftEmailBody = Yup.string().required('Body is required')

export const footSize = Yup.number()
  .required('Foot size is required')
  .min(1, 'Foot size can not be less than 1')
  .max(35, 'Foot size can not be more than 35')

export const measurementUnit = Yup.string().required('Unit is required').oneOf(['CM', 'IN'])

export const hasAgreedToTermsAndCondition = Yup.boolean()
  .nullable(true)
  .isTrue('You need to agree to our terms & conditions before proceeding')
