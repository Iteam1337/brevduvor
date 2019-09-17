import { Client } from '@elastic/elasticsearch'
import config from './../config'

const client = new Client({ node: config.ELASTIC_URL })

export const saveDroneStatus = async droneStatus => {
  await client.index({
    index: 'drone-status',
    body: {
      timestamp: new Date(),
      location: {
        ...droneStatus.currentPos,
      },
      id: 'Drone ID',
      eta: null,
      distance: null,
      battery: null,
      height: null,
      bearing: null,
    },
  })

  await client.indices.refresh({ index: 'drone-status' })
}
