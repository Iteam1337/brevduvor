import { queue } from '../adapters/queue'
import { NotificationInput } from '../__generated__/brevduvor'
import { Job } from 'kue'

type NotificationType = 'sms' | 'email' | 'push'

export const create = (
  type: NotificationType,
  notification: NotificationInput
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const job = queue.create(type || 'sms', notification).save()

    job.attempts(3).backoff({ type: 'exponential' })

    job
      .on('complete', _res => {
        console.log('DONE')

        resolve(true)
      })
      .on('enqueue', () => {
        console.log('Job enqeueud', job.data)

        queue.process('sms', (job: Job['data'], done: Function) => {
          console.log('inside processing')
          console.log(job.data.to, done)
        })
      })
      .on('failed attempt', (errorMsg, completedAttempts) => {
        // TODO: add some logger service
        console.log(
          'Failed attempt',
          'Error: ' + errorMsg,
          'Attempts: ' + completedAttempts
        )
      })
      .on('failed', (errorMsg: string) => {
        console.log(errorMsg)
        reject(errorMsg)
      })
  })
