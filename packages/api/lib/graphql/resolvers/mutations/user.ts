import {
  MutationResolvers,
  MutationUpdateUserLanguageArgs,
} from '../../../__generated__/brevduvor'
import { updateLanguage } from '../../../services/users'
import { User } from '../../../services/auth'

export const updateUserLanguage: MutationResolvers['updateUserLanguage'] = async (
  _: any,
  { email, language }: MutationUpdateUserLanguageArgs,
  { user }: { user: User }
) => {
  if (user.email === email && language) {
    try {
      await updateLanguage(user.id, language)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return false
}
