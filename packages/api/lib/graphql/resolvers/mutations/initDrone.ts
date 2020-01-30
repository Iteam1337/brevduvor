import { MutationResolvers } from '../../../__generated__/brevduvor'
import got from 'got'
import pubsub from '../../../adapters/pubsub'

export const initDrone: MutationResolvers['initDrone'] = async (
  _,
  { start, stop },
  _ctx,
  _resolvers
) => {
  try {
    pubsub.publish('hasStarded', {
      hasStarted: {
        id: 1,
      },
    })
    got.post(`http://8a7d6697.ngrok.io/drone/take_off`)

    return JSON.stringify({ start, stop })
  } catch (err) {
    throw new Error(`Error in initDrone: ${err}`)
  }
}
