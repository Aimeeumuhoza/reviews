import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import firebase from 'firebase/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LoadingComponent from '../components/LoadingComponent'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { firebaseConfig } from '../config/firebase.config'
import CartProvider from '../contexts/Cart/CartProvider'
import ApiProvider from '../contexts/Api/ApiProvider'
import AuthProvider from '../contexts/Auth/AuthProvider'
import CurrencyConversionProvider from '../contexts/CurrencyConversion/CurrencyConversionProvider'
import { GOOGLE_ANALYTICS_TRACKING_ID, FACEBOOK_PIXEL_ID } from '../config/constants'
import * as ga from '../lib/ga'
import 'bootstrap/dist/css/bootstrap.min.css'

type Props = {
  Component: React.ComponentType<ReactNode>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

const App = ({ Component, pageProps }: Props): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${FACEBOOK_PIXEL_ID}`) // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.min.css')
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Cookie&family=Montserrat:ital,wght@0,300;0,400;0,700;0,800;1,500&display=swap"
          rel="stylesheet"></link> */}

        <link rel="shortcut icon" href="/icon.png" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />

        <script src="https://kit.fontawesome.com/38d6312813.js" crossOrigin="anonymous"></script>

        <script
          type="text/javascript"
          src="https://jira.awesomity.rw/s/d41d8cd98f00b204e9800998ecf8427e-CDN/-cc5r0b/807001/6411e0087192541a09d88223fb51a6a0/2.2.4.7/_/download/batch/com.atlassian.plugins.jquery:jquery/com.atlassian.plugins.jquery:jquery.js?collectorId=48d4ebec"></script>
        <script
          type="text/javascript"
          src="https://jira.awesomity.rw/s/a26fda97580b72606ef58f7fe9d81c22-T/-cc5r0b/807001/6411e0087192541a09d88223fb51a6a0/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en&collectorId=48d4ebec"></script>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"></script>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/44048353.js"></script>
      </Head>
      <ApiProvider>
        <CurrencyConversionProvider>
          <AuthProvider>
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </AuthProvider>
        </CurrencyConversionProvider>
      </ApiProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <LoadingComponent />,
})
