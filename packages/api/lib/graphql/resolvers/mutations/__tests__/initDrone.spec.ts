import { initDrone } from '../initDrone'
import { dronePost } from '../../../../adapters/drone'
import { insertDroneTrip } from '../../../../services/drones'

const dronePostResponse = {
  body: {
    id: 1337,
    start: { lat: 1, lon: 2 },
    stop: { lat: 3, lon: 4 },
  },
}

const input = { start: { lat: 1, lon: 2 }, stop: { lat: 3, lon: 4 } }

jest.mock('../../../../adapters/drone', () => ({
  dronePost: jest.fn(() => dronePostResponse),
}))

jest.mock('../../../../services/drones', () => ({
  insertDroneTrip: jest.fn(),
}))

describe('#initDrone', () => {
  it('starts the drone through the api', async () => {
    await initDrone({} as any, input as any, {} as any, {} as any)

    expect(dronePost).toBeCalledWith('/init', input)
  })

  it('saves the trip down to the database', async () => {
    await initDrone({} as any, input as any, {} as any, {} as any)

    expect(insertDroneTrip).toBeCalledWith({
      drone_id: dronePostResponse.body.id,
      status: 'initiating',
      start: `(${dronePostResponse.body.start.lat}, ${dronePostResponse.body.start.lon})`,
      stop: `(${dronePostResponse.body.stop.lat}, ${dronePostResponse.body.stop.lon})`,
      finished: false,
      allowed_spectators: [],
    })
  })

  it('returns the post body from the drone', async () => {
    const body = await initDrone({} as any, input as any, {} as any, {} as any)
    expect(body).toEqual(dronePostResponse.body)
  })

  it('throws an error if it cant connect to the drone', async () => {
    const mockDronePost = dronePost as jest.Mock
    mockDronePost.mockRejectedValueOnce('err')

    expect(
      initDrone({} as any, input as any, {} as any, {} as any)
    ).rejects.toThrow('Error in initDrone: err')
  })
})
