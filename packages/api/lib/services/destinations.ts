import { db } from '../adapters/postgres'
import dedent from 'dedent'

export async function getDestinations(): Promise<any> {
  return await db
    .query(dedent(`SELECT * FROM destinations`))
    .then((user: any) => {
      return user
    })
    .catch(err => {
      return err
    })
}
