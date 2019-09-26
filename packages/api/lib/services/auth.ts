import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../__generated__/brevduvor'

const JWT_SECRET = 'MY SUPER SECRET KEY'

/** DUMMY IMPLEMENTATION OF USER RECORDS */
type User = {
  id: number
  name: string
  password: string
}

class Users {
  private registered: User[] = [
    {
      id: 1,
      name: 'Kalle',
      password: 'hunter2',
    },
    {
      id: 2,
      name: 'Kenta',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Svin-Robban',
      password: '213Hkldsfjy234Fjjklfd^^^^*',
    },
  ]

  async find(username: string, callback: (err: any, user: any) => void) {
    try {
      const found = this.registered.find(user => user.name === username)
      if (found) {
        return callback(null, found)
      } else {
        return callback(null, null)
      }
    } catch (error) {
      return callback(error, null)
    }
  }

  async findById(id: number, callback: (err: any, user: any) => void) {
    try {
      const found = this.registered.find(user => user.id === id)
      if (found) {
        return callback(null, found)
      } else {
        return callback(null, null)
      }
    } catch (error) {
      return callback(error, null)
    }
  }
}

const usersDb = new Users()

/* END DUMMY IMPLEMENTATION OF USERS*/

export const verifyTokenAgainstUserRecords = (token: string) =>
  new Promise((resolve, reject) => {
    try {
      token = token.split('Bearer ')[1]

      const payload = verify(token, JWT_SECRET) as User

      usersDb.findById(payload.id, (err: any, user: any) => {
        if (err) {
          reject(err)
        }
        if (!user || user.password !== payload.password) {
          reject(err)
        }

        resolve(user)
      })
    } catch (error) {
      reject(error)
    }
  })

const authenticate = (username: string, password: string) => {
  return new Promise<User>((resolve, reject) => {
    try {
      usersDb.find(username, (err, user) => {
        if (err) {
          reject({ message: 'Something went wrong' })
        }

        if (!user) {
          reject({ message: 'Could not find user' })
        }

        if (user.password !== password) {
          reject({ message: 'Password or username is incorrect' })
        }

        resolve(user as User)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const login = (
  username: string,
  password: string
): Promise<AuthPayload> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user: User = await authenticate(username, password)
      console.log('Login user -->', user)
      if (user) {
        const token = sign(user, JWT_SECRET)
        resolve({
          token,
          username: user.name,
          id: String(user.id),
        } as AuthPayload)
      }
    } catch (error) {
      console.log('Login error -->', error)
      reject(error)
    }
  })
}
