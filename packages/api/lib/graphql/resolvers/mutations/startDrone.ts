import { MutationResolvers } from '../../../__generated__/brevduvor'

export const startDrone: MutationResolvers['startDrone'] = async (
  _,
  __,
  { dataSources },
  c
) => {
  const { elastic } = dataSources

  elastic.saveDroneStatus({
    currentPos: {
      lat: 123,
      lon: 123,
    },
  })

  return { id: '1337', status: 'ok' }
}
