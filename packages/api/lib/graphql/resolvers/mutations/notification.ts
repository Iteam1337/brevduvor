import {
  MutationResolvers,
  MutationNotificationArgs,
} from '../../../__generated__/brevduvor'
import * as notifications from './../../../services/notifications'

export const notification: MutationResolvers['notification'] = async (
  _: any,
  { input }: MutationNotificationArgs
) => {
  try {
    const result = await notifications.createNew(input)

    return result
  } catch (error) {
    console.log(error)

    return false
  }
}
