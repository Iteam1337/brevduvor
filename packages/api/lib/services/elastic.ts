import { Client } from '@elastic/elasticsearch'
import config from './../config'
import { DronePositionResponse } from '../__generated__/brevduvor'

const client = new Client({ node: config.ELASTIC_URL })

export const saveDroneStatus = async (droneStatus: DronePositionResponse) => {
  await client.index({
    index: 'drone-status',
    body: {
      timestamp: new Date(),
      location: {
        ...droneStatus.currentPos,
      },
      id: droneStatus.id,
      eta: null,
      distance: null,
      battery: droneStatus.batteryStatus,
      height: null,
      bearing: droneStatus.bearing,
    },
  })

  await client.indices.refresh({ index: 'drone-status' })
}
