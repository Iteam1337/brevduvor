import { MutationResolvers } from '../../../__generated__/brevduvor'
import * as auth from '../../../services/auth'
import { AuthenticationError, ValidationError } from 'apollo-server-core'

export const login: MutationResolvers['login'] = async (
  _,
  { username, password }
) => {
  try {
    return await auth.login(username, password)
  } catch (error) {
    throw new AuthenticationError(error.message)
  }
}

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { username, password, confirmPassword } = input
  try {
    return await auth.register(username, password, confirmPassword)
  } catch (error) {
    throw new ValidationError(error.message)
  }
}
