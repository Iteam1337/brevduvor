import { pgp, db } from './../adapters/postgres'
import { NotificationInput } from '../__generated__/brevduvor'

export async function createNew(notification: NotificationInput) {
  const query = pgp.helpers.insert(
    {
      ...notification,
    },
    undefined,
    'notifications'
  )

  return db
    .one(query)
    .then(_n => {
      return true
    })
    .catch(_e => {
      return false
    })
}
