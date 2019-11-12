import cron from 'node-cron'
import { queue } from '../adapters/queue'
import { NotificationInput } from '../__generated__/brevduvor'
import { Job } from 'kue'
import { send } from './../adapters/smsclient'

// scheduler for notification jobs
cron.schedule('* * * * *', () => {
  queue.process('sms', sendSMS)
})

type NotificationType = 'sms' | 'email' | 'push'

export const create = (
  type: NotificationType,
  notification: NotificationInput
): Promise<boolean> =>
  new Promise((resolve, _reject) => {
    const job = queue.create(type || 'sms', notification).save()

    job.attempts(3).backoff({ type: 'exponential' })

    job
      .on('enqueue', () => {
        console.log('Job enqeueud: ', job.data)
      })

      .on('complete', _res => {
        resolve(true)
      })

      .on('failed attempt', (errorMsg, completedAttempts) => {
        // TODO: add some logger service
        console.error(
          'Failed attempt',
          'Error: ' + errorMsg,
          'Attempts: ' + completedAttempts
        )
      })

      .on('failed', (errorMsg: string) => {
        console.error(errorMsg)
        resolve(false)
      })
  })

export const sendSMS = (job: Job, doneCb: Function) => {
  send(job.data.message, job.data.receiver)
    .then(() => doneCb())
    .catch(() => doneCb())
}
