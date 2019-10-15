import { startDrone } from '../startDrone'
import { dronePost } from '../../../../adapters/drone'
import { updateTripStatus } from '../../../../services/drones'

export const ctx = {
  req: {
    headers: {
      authorization: 'Bearer token',
    },
  },
  startDrone: jest.fn(),
}
jest.mock('../../../../adapters/drone', () => ({
  dronePost: jest.fn(),
}))

jest.mock('../../../../services/drones', () => ({
  updateTripStatus: jest.fn(),
}))

jest.mock('../../../../config', () => ({
  WEBHOOK_URL: 'url',
}))

describe('#startDrone', () => {
  const id = '3d8bfd0a-ef72-453b-b670-c47d125ad78f'

  it('dronePost should be called with an id and webhookUrl', async () => {
    await startDrone({} as any, { id } as any, {} as any, {} as any)

    expect(dronePost).toBeCalledWith('/start', { id, webhookUrl: 'url' })
  })

  it('updateTripStatus should be called with an id and with string "in progress"', async () => {
    await startDrone({} as any, { id } as any, {} as any, {} as any)

    expect(updateTripStatus).toBeCalledWith(id, 'in progress')
  })

  it('throws an error when dronePost rejects', async () => {
    ;(dronePost as jest.Mock).mockRejectedValueOnce('err')
    await expect(
      startDrone({} as any, { id } as any, {} as any, {} as any)
    ).rejects.toThrow('Error in startDrone: err')
  })

  it('exits function by returning id', async () => {
    const data = await startDrone(
      {} as any,
      { id } as any,
      {} as any,
      {} as any
    )

    expect(data).toEqual({ id })
  })
})
