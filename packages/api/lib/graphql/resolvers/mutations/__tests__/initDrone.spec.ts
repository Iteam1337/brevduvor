import { initDrone } from '../initDrone'

// const args = {
//   start: {
//     alias: 'Storuman',
//     lat: 1.1234,
//     lon: 1.1234,
//   },
//   stop: {
//     alias: 'Slussfors',
//     lat: 1.1234,
//     lon: 1.1234,
//   },
// }

describe('initDrone', () => {
  it('exists', async () => {
    //expect(await initDrone({}, args, {}, {} as any)).toHaveProperty('waypoints')
    expect(initDrone).toBeDefined()
  })
})
