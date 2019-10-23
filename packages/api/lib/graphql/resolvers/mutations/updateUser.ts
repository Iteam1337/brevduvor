import { MutationResolvers, UpdateUser } from '../../../__generated__/brevduvor'
import { updateLanguage } from './../../../services/users'

export const updateUser: MutationResolvers['updateUser'] = async (
  _: any,
  { input }: { input: UpdateUser },
  { user }: any
) => {
  if (user.email === input.email && input.language) {
    try {
      await updateLanguage(user.id, input.language)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return false
}
