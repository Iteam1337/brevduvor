import {
  MutationResolvers,
  MutationNotificationArgs,
} from '../../../__generated__/brevduvor'

export const notification: MutationResolvers['notification'] = async (
  _: any,
  { input }: MutationNotificationArgs
) => {
  try {
    console.log('-->', input)

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}
