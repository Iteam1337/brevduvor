import { MutationResolvers } from '../../../__generated__/brevduvor'
import * as auth from '../../../services/auth'
import { AuthenticationError } from 'apollo-server-core'
import errorCodes from '../../../resources/errorCodes'

export const login: MutationResolvers['login'] = async (
  _,
  { email, password }
) => {
  try {
    return await auth.login(email, password)
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, username, password, confirmPassword } = input

  if (email) {
    try {
      const result = await auth.register(
        email,
        username,
        password,
        confirmPassword
      )

      return result
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  }
  throw new AuthenticationError(errorCodes.Auth.Unspecified)
}
