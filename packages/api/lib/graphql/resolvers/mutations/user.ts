import {
  MutationResolvers,
  MutationUpdateUserLanguageArgs,
  MutationUpdateUserDevicesArgs,
} from '../../../__generated__/brevduvor'
import { updateLanguage, updateDevices } from '../../../services/users'
import { User } from '../../../services/auth'

export const updateUserLanguage: MutationResolvers['updateUserLanguage'] = async (
  _,
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

export const updateUserDevices: MutationResolvers['updateUserDevices'] = async (
  _,
  { deviceId }: MutationUpdateUserDevicesArgs,
  { user }: { user: User }
) => {
  try {
    console.log('upddatera device', user.id, deviceId)
    await updateDevices(user.id, deviceId)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
