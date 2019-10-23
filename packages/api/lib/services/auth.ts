import config from './../config'
import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../__generated__/brevduvor'
import errorCodes from '../resources/errorCodes'

import { createUser, getUserByEmail, getUserById } from './users'
import { AuthenticationError } from 'apollo-server-core'
import { errors } from 'pg-promise'
import { GraphQLError } from 'graphql'
import { verifyPassword } from '../helpers/password'

export enum Languages { // TODO Remove when typescript is great again
  English = 'ENGLISH',
  Swedish = 'SWEDISH',
}

type User = {
  id: string
  name: string
  email: string
  language: string
}

const fromCodeToLanguageEnum = (langCode: string): Languages | null => {
  switch (langCode) {
    case 'sv':
      return Languages.Swedish
    case 'en':
      return Languages.English
    default:
      return null
  }
}

export const verifyTokenAgainstUserRecords = async (
  token: string,
  privateKey: string
) => {
  try {
    token = token.split('Bearer ')[1]

    const payload = verify(token, privateKey) as User

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

  const token = sign(tokenPayload, config.JWT_SECRET)

  return {
    token,
    email: user.email,
    username: user.name,
    id: user.id,
    language: fromCodeToLanguageEnum(user.language),
  } as AuthPayload
}

export const register = async (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<AuthPayload> => {
  if (password !== confirmPassword) {
    throw new AuthenticationError(errorCodes.Auth.PasswordFieldsNotMatching)
  }

  const res = await getUserByEmail(email)
  const userExists = res && res.email === email

  if (userExists) {
    throw new AuthenticationError(errorCodes.Auth.UserExists)
  }

  try {
    const user = await createUser({
      email: email,
      name: username,
      password,
    })

    if (user) {
      // user object contains the password so we
      // need to prune the data before signing the token
      const tokenPayload = {
        name: user.name,
        email: user.email,
        id: user.id,
      }

      const token = sign(tokenPayload as object, config.JWT_SECRET)

      return {
        id: String(user.id),
        token,
        email: user.email,
        username: user.name,
        language: user.language,
      } as AuthPayload
    } else {
      throw new AuthenticationError(errorCodes.Auth.Unspecified)
    }
  } catch (error) {
    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  }
}
