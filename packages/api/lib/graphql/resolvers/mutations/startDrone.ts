import { MutationResolvers } from '../../../__generated__/brevduvor'

export const startDrone: MutationResolvers['startDrone'] = async _ => ({
  id: '1337',
  status: 'ok',
})
