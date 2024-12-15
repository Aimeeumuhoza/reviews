/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import firebase from 'firebase'
import { Err, err, Ok, ok } from 'neverthrow'
import { useState } from 'react'

export const useHandleGoogleLogin = ({
  onSuccess,
  onFailure,
}: {
  onSuccess: (user: any) => void
  onFailure: (error: any) => void
}): { isLoading: boolean; sendRequest: () => Promise<void> } => {
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
      const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
      if (user) {
        onSuccess(user)
      } else {
        onFailure('Could not find user, try again later')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      onFailure(error)
    }
  }

  return { isLoading, sendRequest }
}

export const useHandleFacebookLogin = ({
  onSuccess,
  onFailure,
}: {
  onSuccess: (user: any) => void
  onFailure: (error: any) => void
}): { isLoading: boolean; sendRequest: () => Promise<void> } => {
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
      const { user } = await firebase.auth().signInWithPopup(facebookAuthProvider)

      if (user) {
        onSuccess(user)
      } else {
        onFailure('Could not find user, try again later')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      onFailure(error)
    }
  }

  return { isLoading, sendRequest }
}

export const handleGoogleLogin = async (): Promise<firebase.User | null> => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
  return user
  // try {
  // } catch (error) {
  //   throw error
  // }
  // return await firebase
  //   .auth()
  //   .signInWithPopup(googleAuthProvider)
  //   .then(
  //     (result) => {
  //       return result.user
  //     },
  //     (error) => {
  //       return err(new Error(error.code))
  //     },
  //   )
}

export const handleFacebookLogin = async (): Promise<
  Ok<firebase.User | null, unknown> | Err<unknown, Error>
> => {
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
  return await firebase
    .auth()
    .signInWithPopup(facebookAuthProvider)
    .then(
      (result) => {
        return ok(result.user)
      },
      (error) => {
        return err(new Error(error.code))
      },
    )
}

export const handleEmailLogin = async ({
  email,
  password,
}: Record<string, string>): Promise<Ok<firebase.User | null, unknown> | Err<unknown, Error>> => {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (result) => {
        return ok(result.user)
      },
      (error) => {
        return err(new Error(error))
      },
    )
}

export const handleTwitterLogin = async (): Promise<void> => {
  throw new Error('not implemented')
  // const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
  // return await firebase
  //   .auth()
  //   .signInWithPopup(twitterAuthProvider)
  //   .then(
  //     (result) => {
  //       return result.credential
  //     },
  //     (error) => {
  //       return new Error(error)
  //     },
  //   )
}

export const sendVerificationEmail = async (email: string): Promise<void> => {
  return await firebase
    .auth()
    .sendSignInLinkToEmail(email, { url: `http://localhost:3000`, handleCodeInApp: true })
    .then(
      (res) => console.log('email verification ok', res),
      (error) => console.error(error.code),
    )
}

export const sendPasswordReset = async (email: string): Promise<void | Err<unknown, Error>> => {
  return await firebase
    .auth()
    .sendPasswordResetEmail(email, { url: `http://localhost:3000`, handleCodeInApp: true })
    .then(
      () => {
        return
      },
      (error) => err(new Error(error.code)),
    )
}

export const handleUserRegistration = async ({
  email,
  password,
}: Record<string, string>): Promise<Ok<firebase.User | null, unknown> | Err<unknown, Error>> => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      (res) => {
        return ok(res.user)
      },
      (error) => {
        return err(new Error(error.code))
      },
    )
}
