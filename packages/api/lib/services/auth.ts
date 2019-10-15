import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../__generated__/brevduvor'
import errorCodes from '../resources/errorCodes'

import { createUser, getUserByEmail, getUserById } from './users'
import { AuthenticationError } from 'apollo-server-core'
import { errors } from 'pg-promise'
import { GraphQLError } from 'graphql'
import { verifyPassword } from '../helpers/password'
//import { errors } from 'pg-promise'

const JWT_SECRET = 'MY SUPER SECRET KEY'

/** DUMMY IMPLEMENTATION OF USER RECORDS */
type User = {
  id: string
  name: string
  password: string
}

// class Users {
//   private registered: User[] = [
//     {
//       id: '1',
//       name: 'Kalle',
//       password: 'hunter2',
//     },
//     {
//       id: '2',
//       name: 'Kenta',
//       password: 'password123',
//     },
//     {
//       id: '3',
//       name: 'Svin-Robban',
//       password: '213Hkldsfjy234Fjjklfd^^^^*',
//     },
//   ]
//   private tableIndex: number = 3

//   async find(
//     username: string,
//     callback: (err: any, user: User | null) => void
//   ) {
//     try {
//       const found = this.registered.find(user => user.name === username)
//       if (found) {
//         return callback(null, found)
//       } else {
//         return callback(null, null)
//       }
//     } catch (error) {
//       return callback(error, null)
//     }
//   }

//   async findById(id: number, callback: (err: any, user: User | null) => void) {
//     try {
//       const found = this.registered.find(user => user.id === id)
//       if (found) {
//         return callback(null, found)
//       } else {
//         return callback(null, null)
//       }
//     } catch (error) {
//       return callback(error, null)
//     }
//   }

//   async add(payload: any, callback: (err: any, user: User | null) => void) {
//     try {
//       const len = this.registered.push({
//         id: String(++this.tableIndex),
//         name: payload.username,
//         password: payload.password,
//       })

//       return callback(null, this.registered[len - 1])
//     } catch (err) {
//       return callback(err, null)
//     }
//   }
// }

// //const usersDb = new Users()

/* END DUMMY IMPLEMENTATION OF USERS*/

export const verifyTokenAgainstUserRecords = async (token: string) => {
  try {
    token = token.split('Bearer ')[1]

    const payload = verify(token, JWT_SECRET) as User

    if (payload && payload.id) {
      const user = await getUserById(payload.id)

      // User not found
      if (
        user instanceof errors.QueryResultError &&
        user.code === errors.queryResultErrorCode.noData
      ) {
        throw new GraphQLError(errorCodes.Auth.MissingUser)
      }

      console.log(payload.password, user.password)

      // Password
      if ((await verifyPassword(payload.password, user.password)) !== true) {
        throw new GraphQLError(errorCodes.Auth.PassIncorrect)
      }
    }
  } catch (error) {
    throw new AuthenticationError(errorCodes.Auth.RequireLogin)
  }
}
// new Promise((resolve, reject) => {
//   try {
//     token = token.split('Bearer ')[1]

//     const payload = verify(token, JWT_SECRET) as User

//     usersDb.findById(payload.id, (err: any, user: any) => {
//       if (err) {
//         reject(err)
//       }
//       if (!user || user.password !== payload.password) {
//         reject(err)
//       }

//       resolve(user)
//     })
//   } catch (error) {
//     reject(error)
//   }
// })

const authenticate = async (username: string, password: string) => {
  const res = await getUserByEmail(username)

  if (
    res instanceof errors.QueryResultError &&
    res.code === errors.queryResultErrorCode.noData
  ) {
    throw new GraphQLError(errorCodes.Auth.MissingUser)
  }

  console.log(password, res.password)

  if ((await verifyPassword(password, res.password)) !== true) {
    throw new GraphQLError(errorCodes.Auth.PassIncorrect)
  }

  return res as User
}

export const login = async (
  username: string,
  password: string
): Promise<AuthPayload> => {
  const user: any /** any => User */ = await authenticate(username, password)
  const token = sign(user, JWT_SECRET)

  return {
    token,
    username: user.email,
    id: user.id,
  } as AuthPayload
}

export const register = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<AuthPayload> => {
  // make sure password fields are matching
  if (password !== confirmPassword) {
    throw new AuthenticationError(errorCodes.Auth.PasswordFieldsNotMatching)
  }

  // check that user doesn't exist already
  const res = await getUserByEmail(username)
  const userExists = res && res.email === username
  const hasValidErrorResponse =
    res &&
    res instanceof errors.QueryResultError &&
    res.code !== errors.queryResultErrorCode.noData

  if (userExists) {
    throw new AuthenticationError(errorCodes.Auth.UserExists)
  }

  if (hasValidErrorResponse) {
    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  }

  // register
  try {
    const user = await createUser({
      email: username,
      password,
      name: username,
    })

    if (user) {
      const token = sign(user as object, JWT_SECRET)

      return {
        id: String(user.id),
        token,
        username: user.email,
      } as AuthPayload
    }

    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  } catch (error) {
    throw new AuthenticationError(errorCodes.Auth.Unspecified)
  }
}
