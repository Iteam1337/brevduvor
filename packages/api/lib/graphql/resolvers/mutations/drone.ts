import { MutationResolvers } from '../../../__generated__/brevduvor'

export const initDrone: MutationResolvers['initDrone'] = async (_, { req }) => {
  try {
    return 'Hello world'
  } catch (e) {
    throw new Error(`drone.ts ${e}`)
  }
}
