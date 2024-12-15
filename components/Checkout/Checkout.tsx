import React, { useEffect, useState } from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import Divider from 'antd/lib/divider'
import CheckoutFeeDetails from '../CheckoutFeeDetails'
import CheckoutDeliveryInformationArea from '../CheckoutDeliveryInfomationArea'
import CheckoutPromoCodeArea from '../CheckoutPromoCodeArea'
import TopBanner from '../TopBanner'
import useGetProfile from '../../hooks/api/useGetProfile'
import useHandleState from '../../hooks/useHandleState'
import { message } from 'antd'
import { getErrorFromUnknown } from '../../lib/utils/error.util'
import { CreateOrderDetailsDto, CreateOrderDto, PromoCode, User } from '../../types'
import { useCart } from '../../contexts/Cart'
import useCalculateShippingFees from '../../hooks/api/useCalculateShippingFees'
import { DeliveryInfo } from '../../classes'
import useConvertCurrency from '../../contexts/CurrencyConversion/useConvertCurrency'
// import Currency from '../../lib/enums/currency.enum'
import { useRouter } from 'next/router'
import useCreateOrder from '../../hooks/api/useCreateOrder'
import Currency from '../../lib/enums/currency.enum'
import useGetOrderHistory from '../../hooks/api/useGetOrderHistory'

type PriceResult = {
  totalPrice: { currencyType: string; priceCurrency: string; price: string }
  plannedShippingDate: string
  estimatedDeliveryDateAndTime: string
}

const Checkout: React.FC = () => {
  const cartHook = useCart()
  const router = useRouter()
  const getProfileHook = useGetProfile()
  const getOrderHistoryHook = useGetOrderHistory()
  const { convertTo } = useConvertCurrency()
  const calculateShippingFeesHook = useCalculateShippingFees()
  const createOrderHook = useCreateOrder()
  const [shippingFees, setShippingFees] = useState<string | undefined>('0')
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [canShowShippingFees, setCanShowShippingFees] = useState(false)
  const [partialDeliveryInfo, setPartialDeliveryInfo] = useState<DeliveryInfo>()
  const [newPurchaseDiscount, setNewPurchaseDiscount] = useState<number>(0)

  useEffect(() => {
    // console.log(cartHook.cartItems, 'cart');
    if (cartHook.cartItems.length < 1) {
      router.back()
    } else {
      getProfileHook.sendRequest()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      partialDeliveryInfo?.city &&
      partialDeliveryInfo?.country &&
      partialDeliveryInfo?.country !== 'RW'
    ) {
      partialDeliveryInfo
      setCanShowShippingFees(true)
      calculateShippingFees()
    }
    setCanShowShippingFees(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partialDeliveryInfo])

  useEffect(() => {
    if (canShowShippingFees) {
      setShippingFees('0')
    }
    if (
      !canShowShippingFees &&
      parseInt(convertTo(cartHook.getCartTotal()).split(' ')[0]) >=
        parseInt(convertTo(100000).split(' ')[0])
    ) {
      setShippingFees('0')
      setCanShowShippingFees(false)
    }
  }, [canShowShippingFees])

  useHandleState<User>(getProfileHook, {
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
    onSuccess: (response) => {
      const deliveryInfo = new DeliveryInfo()
      deliveryInfo.fromUser(response.payload)
      setPartialDeliveryInfo(deliveryInfo)
      getOrderHistoryHook.sendRequest()
    },
  })

  useHandleState<PriceResult>(calculateShippingFeesHook, {
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
    onSuccess: (response) => {
      setShippingFees(`${response.payload.totalPrice.price}`)
    },
  })

  useHandleState<{ paymentUrl: string }>(createOrderHook, {
    onError: (error) => {
      message.error(getErrorFromUnknown(error))
    },
    onSuccess: (response) => {
      if (response.payload.paymentUrl === 'PAID') {
        message.success('Payment Successful')
        cartHook.removeAllFromCart()
        router.push('/')
        return
      } else {
        const paymentWindow = window.open(response.payload.paymentUrl, '_self')
        if (paymentWindow) {
          cartHook.removeAllFromCart()
          paymentWindow.focus()
        } else {
          message.error('Could not open the payment url')
        }
      }
    },
  })

  const calculateShippingFees = (): void => {
    try {
      // const kilos = cartHook.getCartWeight().toString()
      setShippingFees('48233')
      //  calculateShippingFeesHook.sendRequest({ country, city, kilos })
    } catch (error) {
      message.error(error.message)
    }
  }
  const resetShippingFees = (): void => {
    setShippingFees(undefined)
  }

  useEffect(() => {
    if (getOrderHistoryHook.items.length === 0 && !getOrderHistoryHook.isLoading) {
      setNewPurchaseDiscount(10)
    } else {
      setNewPurchaseDiscount(0)
    }
  }, [getOrderHistoryHook.items, getOrderHistoryHook.isLoading])
  return (
    <>
      <TopBanner
        label="CHECKOUT"
        onBackImgSrc="/arrows-left-white.svg"
        onBackPressedUrl="/products"
      />
      <div className="container-fluid uzuri_section">
        <div className="container">
          <Row gutter={48}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <CheckoutPromoCodeArea
                onPromoFound={(promoCode) => {
                  if (promoCodes.find((code) => promoCode.uuid === code.uuid)) {
                    message.error('Promo code has already been used in your current cart')
                    return
                  }
                  setPromoCodes((promoCodes) => [...promoCodes, promoCode])
                }}
              />
              <Divider></Divider>
              <Spin spinning={getProfileHook.isLoading}>
                <CheckoutDeliveryInformationArea
                  isLoading={createOrderHook.isLoading}
                  isCalculatingFees={calculateShippingFeesHook.isLoading}
                  onCalculateShippingFees={calculateShippingFees}
                  resetShippingFees={resetShippingFees}
                  showShippingFees={setShippingFees}
                  isAbove={
                    parseInt(convertTo(cartHook.getCartTotal()).split(' ')[0]) >=
                    parseInt(convertTo(100000).split(' ')[0])
                  }
                  shippingFees={shippingFees}
                  profileInfo={partialDeliveryInfo}
                  toggleShippingFeesVisibility={setCanShowShippingFees}
                  onSubmit={(formValues) => {
                    const orderDetailsDto: CreateOrderDetailsDto[] = cartHook.cartItems.map(
                      (i) => ({
                        orderedQuantity: i.orderedQuantity,
                        orderedShoeSize: i.orderedShoeSize ? Number(i.orderedShoeSize) : undefined,
                        productVariationId: i.productOptionId,
                        giftRecipientEmail: i.giftRecipientEmail,
                        giftEmailBody: i.giftEmailBody,
                        giftBenefactorName: i.giftBenefactorName,
                        giftBenefactorPhoneNumber: i.giftRecipientPhoneNumber,
                      }),
                    )
                    const promoCodesUsed = promoCodes.map((p) => p.code)
                    const convertedAmount = parseInt(formValues?.shippingFees as string)
                    const orderDto: CreateOrderDto = {
                      currency: Currency.USD,
                      clientPhoneNo: formValues?.phoneNumber || '',
                      clientEmail: formValues?.email || '',
                      deliveryCountry: formValues?.country || '',
                      deliveryCity: formValues?.city?.split('<>')[0] || '',
                      deliveryAddress: formValues?.address || '',
                      deliveryPostalCode: formValues?.postalCode || '',
                      receiverName: formValues?.recipientName || '',
                      clientNote: formValues?.clientNote || undefined,
                      shippingFees: convertedAmount,
                      orderDetailsDto,
                      promoCodesUsed,
                    }
                    createOrderHook.sendRequest(orderDto)
                  }}
                />
              </Spin>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <CheckoutFeeDetails
                shippingFees={parseFloat(parseInt(shippingFees || '0').toString())}
                discountPrice={promoCodes.reduce((a, b) => a + (b.amount || 0), 0)}
                // discountPrice={convertFrom(
                //   promoCodes.reduce((a, b) => a + (b.amount || 0), 0).toString(),
                // )}
                subTotal={Math.round(
                  parseInt(cartHook.getCartTotal().toString().split(' ')[0]) *
                    (1 - newPurchaseDiscount / 100),
                )}
                baseSubTotal={cartHook.getCartTotal()}
                newPurchaseDiscount={newPurchaseDiscount}
                canShowShippingFees={canShowShippingFees}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Checkout
