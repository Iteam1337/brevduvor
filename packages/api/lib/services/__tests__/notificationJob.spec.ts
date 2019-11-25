import { EventEmitter } from 'events'

class KueMock extends EventEmitter {
  createQueue() {
    return this
  }
  create() {
    return this
  }
  save() {
    return this
  }
  attempts() {
    return this
  }
  backoff() {
    return this
  }
}

jest.mock('kue', () => new KueMock())

// typescript complains about type when extending it with eventemitter,
// so we use require which just has an 'any' type
const kue = require('kue')

const create = jest
  .fn()
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)

describe('Notification job', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('can add a job to queue', async () => {
    const resolver = new Promise((resolve, _reject) => {
      process.nextTick(() => {
        kue.emit('complete')
        resolve()
      })
    })
    const result = await create('sms', {
      receiver: '+10000000',
      sentAt: new Date(Date.now()).toISOString(),
      sender: 'Storuman lasarett',
      message: 'The eagle has landed',
    })
    resolver.then(() => {
      expect(result).toBe(true)
    })
  })

  it('resolves to false', async () => {
    const resolver = new Promise((resolve, _reject) => {
      process.nextTick(() => {
        kue.emit('failed')
        resolve()
      })
    })

    const result = await create('sms', {
      receiver: '+10000000',
      sentAt: new Date(Date.now()).toISOString(),
      sender: 'Storuman lasarett',
      message: 'The eagle has landed',
    })

    resolver.then(() => {
      expect(result).toBe(false)
    })
  })
})
