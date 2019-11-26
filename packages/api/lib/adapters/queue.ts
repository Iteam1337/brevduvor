import kue from 'kue'
import config from './../config'

export const queue = kue.createQueue({
  redis: {
    port: config.REDIS.port,
    host: config.REDIS.host,
    auth: config.REDIS.password,
  },
})
