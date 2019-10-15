const { init } = require('../drone')
const { calculateTotalDistance } = require('../../utils/directions')
const cache = require('memory-cache')

jest.mock('../../utils/directions', () => ({
  calculateTotalDistance: jest.fn(() => {
    return 1337
  }),
  etaInMinutes: jest.fn(),
}))

jest.mock('memory-cache', () => ({
  put: jest.fn(),
}))

let res, input
describe('#drone', () => {
  res = {
    send: jest.fn(),
  }

  input = {
    body: {
      coordinates: [
        {
          lat: 1,
          lon: 2,
        },
        {
          lat: 3,
          lon: 4,
        },
      ],
    },
  }

  const expectedDroneData = {
    id: expect.any(String),
    coordinates: input.body.coordinates,
    distance: 1337,
    bearing: 0,
    status: 'initiating',
    vehicle: 'Drone',
    batteryStatus: 1000,
    departure: expect.anything(),
    eta: expect.anything(),
  }

  it('calls directions.calculateTotalDistance', async () => {
    await init(input, res)

    expect(calculateTotalDistance).toHaveBeenCalled()
  })

  it('puts the coordinates in the cache', async () => {
    await init(input, res)
    expect(cache.put).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      coordinates: input.body.coordinates,
    })
  })

  it('calls res.send with correct data', async () => {
    await init(input, res)

    expect(res.send).toBeCalledWith(expectedDroneData)
  })
})
