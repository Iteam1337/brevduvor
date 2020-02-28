import { db } from '../adapters/postgres'
import dedent from 'dedent'

export async function getDestinations(): Promise<any> {
  return await db
    .query(dedent(`SELECT * FROM destinations`))
    .then((destinations: any) => {
      return destinations
    })
    .catch(err => {
      return err
    })
}
