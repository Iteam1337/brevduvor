import { db, pgp } from '../adapters/postgres'
import dedent from 'dedent'
import { createHash } from '../helpers/password'

interface User {
  // generate from graphql implementation
  email: string
  password: string
}

export async function getUserByEmail(email: String): Promise<User> {
  return db.one(
    dedent`
    SELECT email FROM users where email = $1
  `,
    [email]
  )
}

export async function createUser(user: User) {
  const query = pgp.helpers.insert(
    {
      ...user,
      password: await createHash(user.password),
    },
    undefined,
    'users'
  )
  return db.none(query)
}
