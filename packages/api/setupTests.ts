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
