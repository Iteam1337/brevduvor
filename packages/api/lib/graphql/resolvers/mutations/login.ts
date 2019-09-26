import { MutationResolvers } from '../../../__generated__/brevduvor'
import * as auth from './../../../services/auth'
import { AuthenticationError } from 'apollo-server-core'

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
