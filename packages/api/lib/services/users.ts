import { db, pgp } from '../adapters/postgres'
import dedent from 'dedent'
import { createHash } from '../helpers/password'
import { Languages } from './auth'

interface RegisterUser {
  email: string
  name: string
  password: string
}

export async function getUserByEmail(email: string): Promise<any> {
  return await db
    .one(
      dedent`SELECT id, email, name, password, language, destination FROM users where LOWER(email) = LOWER($1)`,
      [email]
    )
    .then((user: any) => {
      return user
    })
    .catch(err => {
      return err
    })
}

export async function getUserById(id: string): Promise<any> {
  return db
    .one(
      dedent`SELECT id, email, name, password, language, destination FROM users where id = $1`,
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
  id: string,
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

export async function updateDevices(
  id: string,
  deviceId: string
): Promise<any> {
  return db.none(
    `UPDATE users SET device_ids = device_ids || '{${deviceId}}' WHERE users.id = '${id}' AND (NOT(device_ids @> ARRAY['${deviceId}']) OR users.device_ids IS NULL)`
  )
}

export function getDevicesByBookingId(bookingId: string): any {
  return db.manyOrNone(`SELECT u1.device_ids AS departure_devices, u2.device_ids AS destination_devices
   FROM bookings b
   INNER JOIN users u1 ON u1.destination = b.departure
   INNER JOIN users u2 ON u2.destination = b.destination
   WHERE b.id = '${bookingId}'`)
}
export function getDevicesByDestination(id: string): Promise<any[]> {
  return db
    .manyOrNone(
      `SELECT device_ids from USERS where users.destination = '${id}'`
    )
    .then(users => {
      return users.reduce((prev, curr) => {
        const devices = curr.device_ids || []
        return [...prev, ...devices]
      }, [])
    })
}
