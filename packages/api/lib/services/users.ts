import { db, pgp } from '../adapters/postgres'
import dedent from 'dedent'
import { createHash } from '../helpers/password'
import { Languages } from './auth'

interface RegisterUser {
  email: string
  name: string
  password: string
}

export async function getUserByEmail(email: String): Promise<any> {
  return await db
    .one(
      dedent`SELECT id, email, name, password, language FROM users where email = $1`,
      [email]
    )
    .then((user: any) => {
      return user
    })
    .catch(err => {
      return err
    })
}

export async function getUserById(id: String): Promise<any> {
  return db
    .one(
      dedent`SELECT id, email, name, password, language FROM users where id = $1`,
      [id]
    )
    .then((user: any) => {
      return user
    })
    .catch(err => {
      return err
    })
}

export async function createUser(user: RegisterUser) {
  const query =
    pgp.helpers.insert(
      {
        ...user,
        password: await createHash(user.password),
      },
      undefined,
      'users'
    ) + 'RETURNING id, email, name, language'

  return db
    .one(query)
    .then(user => {
      return user
    })
    .catch(e => {
      return e
    })
}

export async function updateLanguage(
  id: String,
  language: Languages
): Promise<any> {
  const toCodeFromLanguageEnum = (language: Languages): string | null => {
    switch (language) {
      case Languages.Swedish:
        return 'sv'
      case Languages.English:
        return 'en'
      default:
        return null
    }
  }

  const langCode = toCodeFromLanguageEnum(language)

  return db.query(dedent`UPDATE users SET language = $1 WHERE id = $2`, [
    langCode,
    id,
  ])
}
