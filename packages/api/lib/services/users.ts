import { db, pgp } from '../adapters/postgres'
import dedent from 'dedent'

interface User {
  // generate from graphql implementation
  email: string
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
    },
    undefined,
    'users'
  )
  return db.none(query)
}
