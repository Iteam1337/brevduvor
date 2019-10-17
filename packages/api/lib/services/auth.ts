import config from './../config'
import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../__generated__/brevduvor'
import errorCodes from '../resources/errorCodes'

import { createUser, getUserByEmail, getUserById } from './users'
import { AuthenticationError } from 'apollo-server-core'
import { errors } from 'pg-promise'
import { GraphQLError } from 'graphql'
import { verifyPassword } from '../helpers/password'

type User = {
  id: string
  name: string
  email: string
}

export const verifyTokenAgainstUserRecords = async (token: string) => {
  try {
    token = token.split('Bearer ')[1]

    const payload = verify(token, config.JWT_SECRET.publicKey) as User

    console.log('verifyToken payload -->', payload)
    if (payload && payload.id) {
      const user = await getUserById(payload.id)

      // User not found
      if (
        user instanceof errors.QueryResultError &&
        user.code === errors.queryResultErrorCode.noData
      ) {
        throw new GraphQLError(errorCodes.Auth.MissingUser)
      }

      return { id: user.id, name: user.name, email: user.email } as User
    }
  } catch (error) {
    throw new AuthenticationError(errorCodes.Auth.RequireLogin)
  }
}

const authenticate = async (email: string, password: string) => {
  const res = await getUserByEmail(email)

  console.log('-->', res)

  if (
    res instanceof errors.QueryResultError &&
    res.code === errors.queryResultErrorCode.noData
  ) {
    throw new GraphQLError(errorCodes.Auth.MissingUser)
  }

  if ((await verifyPassword(password, res.password)) !== true) {
    throw new GraphQLError(errorCodes.Auth.PassIncorrect)
  }

  return res as User
}

export const login = async (
  email: string,
  password: string
): Promise<AuthPayload> => {
  const user = await authenticate(email, password)
  // user object contains the password so we
  // need to prune the data before signing it
  const tokenPayload = {
    name: user.name,
    email: user.email,
    id: user.id,
  }
  const token = sign(tokenPayload, config.JWT_SECRET.publicKey)

  return {
    token,
    email: user.email,
    username: user.name,
    id: user.id,
  } as AuthPayload
}

export const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<AuthPayload> => {
  // make sure password fields are matching
  if (password !== confirmPassword) {
    throw new AuthenticationError(errorCodes.Auth.PasswordFieldsNotMatching)
  }

  // check that user doesn't exist already
  const res = await getUserByEmail(email)
  const userExists = res && res.email === email
  const hasValidErrorResponse =
    res &&
    res instanceof errors.QueryResultError &&
    res.code !== errors.queryResultErrorCode.noData

  if (userExists) {
    throw new AuthenticationError(errorCodes.Auth.UserExists)
  }

  if (hasValidErrorResponse) {
    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  }

  // register
  try {
    const user = await createUser({
      email: email,
      name: username,
      password,
    })

    if (user) {
      // user object contains the password so we
      // need to prune the data before signing it
      const tokenPayload = {
        name: user.name,
        email: user.email,
        id: user.id,
      }

      const token = sign(tokenPayload as object, config.JWT_SECRET.publicKey)

      return {
        id: String(user.id),
        token,
        email: user.email,
        username: user.name,
      } as AuthPayload
    }

    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  } catch (error) {
    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  }
}
