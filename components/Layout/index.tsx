import { Fragment, ReactNode } from 'react'
import UpdatedFooter from '../Footer/UpdateFooter'
import UpdateNavBar from '../Navbar/UpdateNavBar'

type Children = {
  children: ReactNode
}

const Layout = ({ children }: Children): JSX.Element => {
  return (
    <Fragment>
      <UpdateNavBar />
      <main>{children}</main>
      <UpdatedFooter />
    </Fragment>
  )
}

export default Layout
