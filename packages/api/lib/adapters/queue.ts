import kue from 'kue'
import config from './../config'

export const queue = kue.createQueue({
  redis: {
    auth: config.REDIS.password,
  },
})
