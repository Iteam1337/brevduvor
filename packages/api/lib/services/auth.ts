import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../__generated__/brevduvor'
import errorCodes from '../resources/errorCodes'

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
  private tableIndex: number = 3

  async find(
    username: string,
    callback: (err: any, user: User | null) => void
  ) {
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

  async findById(id: number, callback: (err: any, user: User | null) => void) {
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

  async add(payload: any, callback: (err: any, user: User | null) => void) {
    try {
      const len = this.registered.push({
        id: ++this.tableIndex,
        name: payload.username,
        password: payload.password,
      })

      return callback(null, this.registered[len - 1])
    } catch (err) {
      return callback(err, null)
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
          reject({ message: errorCodes.Auth.Unspecified })
        }

        if (!user) {
          reject({ message: errorCodes.Auth.MissingUser })
        }

        if (user && user.password !== password) {
          reject({ message: errorCodes.Auth.PassIncorrect })
        }

        resolve(user as User)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const login = async (
  username: string,
  password: string
): Promise<AuthPayload> => {
  try {
    const user: User = await authenticate(username, password)

    const token = sign(user, JWT_SECRET)

    if (user) {
      return Promise.resolve({
        token,
        username: user.name,
        id: String(user.id),
      } as AuthPayload)
    } else {
      return Promise.reject('Did not receive a user')
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const register = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<AuthPayload> => {
  if (password !== confirmPassword) {
    return Promise.reject({
      message: errorCodes.Auth.PasswordFieldsNotMatching,
    })
  }

  await usersDb.find(username, (error: any, user) => {
    if (error) {
      return Promise.reject({ message: errorCodes.Auth.Unspecified })
    }
    if (user) {
      return Promise.reject({ message: errorCodes.Auth.UserExists })
    }
  })

  await usersDb.add({ username, password }, (error, user) => {
    if (error) {
      return Promise.reject({ message: errorCodes.Auth.Unspecified })
    }
    if (user) {
      const token = sign(user as object, JWT_SECRET)
      return Promise.resolve({
        id: String(user.id),
        token,
        username: user.name,
      } as AuthPayload)
    } else {
      return Promise.reject({ message: errorCodes.Auth.Unspecified })
    }
  })

  return Promise.reject({ message: errorCodes.Auth.Unspecified })
}
