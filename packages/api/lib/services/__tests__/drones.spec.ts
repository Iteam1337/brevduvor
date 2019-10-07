import {
  getActiveDrones,
  updateTripStatus,
  insertDroneTrip,
  Status,
} from '../drones'
import { db, pgp } from '../../adapters/postgres'

interface DroneTrip {
  drone_id: string
  allowed_spectators: [string?]
  finished: boolean
  status: Status
  start: string
  stop: string
}

jest.mock('../../adapters/postgres', () => ({
  db: {
    manyOrNone: jest.fn(),
    none: jest.fn(),
  },
  pgp: {
    helpers: {
      insert: jest.fn(() => 'SQL'),
    },
  },
}))

describe('drones', () => {
  it('#getActiveDrones', async () => {
    await getActiveDrones()

    expect(db.manyOrNone).toBeCalledWith(expect.any(String))
  })

  it('#updateTripStatus', async () => {
    const id = '3d8bfd0a-ef72-453b-b670-c47d125ad78f'
    const status = 'in progress'
    await updateTripStatus(id, status)

    expect(db.none).toBeCalledWith(expect.any(String), [status, id])
  })

  it('#insertDroneTrip', async () => {
    const data = {
      drone_id: '3d8bfd0a-ef72-453b-b670-c47d125ad78f',
      allowed_spectators: [],
      finished: true,
      status: 'in progress',
      start: '',
      stop: '',
    } as DroneTrip
    await insertDroneTrip(data)

    expect(pgp.helpers.insert).toBeCalledWith(
      { ...data },
      undefined,
      'drone_trips'
    )
    expect(db.none).toBeCalledWith('SQL')
  })
})
