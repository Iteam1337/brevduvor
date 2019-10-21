import { droneStatus } from '../droneStatus'
import { DroneStatusResponse } from '../../__generated__/brevduvor'
import { saveDroneStatus } from '../elastic'
import { updateTripStatus } from '../drones'

jest.mock('../elastic', () => ({
  saveDroneStatus: jest.fn(),
}))

jest.mock('../../services/drones', () => ({
  updateTripStatus: jest.fn(),
}))

describe('#droneStatus', () => {
  let data: { body: DroneStatusResponse }
  const next = jest.fn()
  const res = {
    send: jest.fn(),
  } as any
  beforeEach(() => {
    data = {
      body: {
        id: '3d8bfd0a-ef72-453b-b670-c47d125ad78f',
        start: {
          alias: 'Stockholm',
          lat: 1337,
          lon: 1339,
        },
        stop: {
          alias: 'Umeå',
          lat: 2337,
          lon: 2339,
        },
        currentPos: {
          lat: 8008,
          lon: 7007,
        },
        bearing: 1200,
        status: 'in progress',
        batteryStatus: 20,
        departure: '2018-09-12 00:20',
        eta: '2019-09-13 00:13',
      },
    }
  })
  it('Calls saveDroneStatus', async () => {
    await droneStatus(data, res, next)

    expect(saveDroneStatus).toBeCalledWith(data.body)
    expect(updateTripStatus).not.toBeCalled()
  })

  it('calls updateTripStatus when status is done', async () => {
    data.body.status = 'done'

    await droneStatus(data, res, next)

    expect(saveDroneStatus).toBeCalledWith(data.body)
    expect(updateTripStatus).toBeCalledWith(data.body.id, 'done')
  })
})
