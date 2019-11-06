import {
  MutationResolvers,
  MutationNotificationArgs,
} from '../../../__generated__/brevduvor'
// import * as notifications from './../../../services/notifications'
import { create } from './../../../services/notificationJob'

export const notification: MutationResolvers['notification'] = async (
  _: any,
  { input }: MutationNotificationArgs
) => {
  try {
    const result = await create('sms', input)

    return result
  } catch (error) {
    console.log(error)

    return false
  }
}
