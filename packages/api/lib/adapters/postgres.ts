import pgPromise from 'pg-promise'
import config from '../config'

export const pgp = pgPromise()
export const db = pgp(config.POSTGRES)
