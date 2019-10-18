const authService = require('./../auth')
const userService = require('./../users')
const { db, pgp } = require('./../../adapters/postgres')

jest.mock('../../adapters/postgres', () => ({
  db: {
    one: jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
        email: 'hello2@me',
        name: 'ElGato_aka_TheCat-O',
      })
    ),
  },
  pgp: {
    helpers: {
      insert: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
          email: 'hello2@me',
          name: 'ElGato_aka_TheCat-O',
        })
      ),
    },
  },
}))

describe('authentication', () => {
  it('service exists', () => {
    expect(authService).toBeDefined()
  })

  it('registers a user', async () => {
    const authPayload = await authService
      .register('hello@me', 'TestUser', 'Password!', 'Password!')
      .then((payload: any) => {
        return payload
      })

    expect(authPayload).toHaveProperty('id')
    expect(authPayload).toHaveProperty('token')
    expect(authPayload).toHaveProperty('email')
    expect(authPayload).toHaveProperty('username')
  })

  it("rejects a registration when password fields don't match", () => {
    expect(
      authService.register('hello@me', 'TestUser', 'Password!', 'NO MATCH')
    ).rejects.toThrow('Auth')
  })
})
