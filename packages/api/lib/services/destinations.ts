import { db } from '../adapters/postgres'
import dedent from 'dedent'
import { Destination, DestinationInput } from '../__generated__/brevduvor'

export async function getDestinations(): Promise<Destination[]> {
  return await db
    .query(dedent(`SELECT alias, lat, lon FROM destinations`))
    .then(destinations => destinations)
    .catch(err => err)
}

export async function getDestinationFromAlias(
  alias: DestinationInput['alias']
): Promise<Destination & { id: string }> {
  const data = await db.one(
    `SELECT id, alias, lat, lon FROM destinations WHERE alias = '${alias}'`
  )

  return data
}

export async function getDestination(id: string): Promise<Destination> {
  return db.one(`SELECT alias, lat, lon FROM destinations WHERE id = '${id}'`)
}
