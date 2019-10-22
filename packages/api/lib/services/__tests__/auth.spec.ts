const authService = require('./../auth')
// const userService = require('./../users')

const jsonwebtoken = require('jsonwebtoken')

jest.mock('../users', () => ({
  createUser() {
    return Promise.resolve({
      id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
      email: 'hello2@me',
      name: 'ElGato_aka_TheCat-O',
    })
  },
  getUserByEmail() {
    return Promise.resolve({
      id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
      email: 'hello2@me',
      name: 'ElGato_aka_TheCat-O',
    })
  },
  getUserById() {
    return Promise.resolve({
      id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
      email: 'hello2@me',
      name: 'ElGato_aka_TheCat-O',
    })
  },
}))

describe.only('authentication', () => {
  const privateKey = 'MY_PRIVATE_KEY'
  let token: string

  describe('verifyTokenAgainstUserRecords', () => {
    beforeEach(() => {
      token = jsonwebtoken.sign(
        { id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648' },
        privateKey
      )
    })

    it('throws authentication error when token does not match with private key', () => {
      const bearerToken = 'Bearer ' + token

      const user = authService.verifyTokenAgainstUserRecords(
        bearerToken,
        'Wrong key'
      )

      expect(user).rejects.toThrow()
    })

    it('resolves to a user object when token and key is valid', () => {
      const bearerToken = 'Bearer ' + token

      const user = authService.verifyTokenAgainstUserRecords(
        bearerToken,
        privateKey
      )

      expect(user).resolves.toStrictEqual({
        id: '25b12f49-9eca-4b28-9cbf-d3b70fcaf648',
        email: 'hello2@me',
        name: 'ElGato_aka_TheCat-O',
      })
    })
  })

  it('service exists', () => {
    expect(authService).toBeDefined()
  })

  it("rejects a registration when password fields don't match", () => {
    expect(
      authService.register('hello@me', 'TestUser', 'Password!', 'NO MATCH')
    ).rejects.toThrow()
  })

  it('rejects when the user already exists', () => {
    expect(
      authService.register('hello2@me', 'TestUser', 'Password!', 'Password!')
    ).rejects.toThrow()
  })

  it('registers a user', async () => {
    const authPayload = await authService
      .register('newuser@me', 'TestUser', 'Password!', 'Password!')
      .then((payload: any) => {
        return payload
      })


    expect(authPayload).toHaveProperty('id')
    expect(authPayload).toHaveProperty('token')
    expect(authPayload).toHaveProperty('email')
    expect(authPayload).toHaveProperty('username')
  })
})
