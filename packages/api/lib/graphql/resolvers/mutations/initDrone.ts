import {
  MutationResolvers,
  InitDroneReponse,
} from '../../../__generated__/brevduvor'

export const initDrone: MutationResolvers['initDrone'] = async _ =>
  ({
    id: '1337',
    waypoints: [
      {
        lat: 1,
        lon: 2,
      },
    ],
  } as InitDroneReponse)
