import { User } from '../../types'

export default interface AuthContextData {
  isLoggedIn: boolean
  hasLoaded: boolean
  loggedInUser: User | undefined
  logoutUserLocally: () => void
  setApiAccessToken: (accessToken: string) => void
  setLoggedInUser?: React.Dispatch<React.SetStateAction<User | undefined>>
}
