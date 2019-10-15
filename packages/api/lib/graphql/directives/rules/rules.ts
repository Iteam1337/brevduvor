import { ValidationError } from 'apollo-server-express'

class RuleDirectiveError extends ValidationError {
  public additionalInfo: string
  public name: string
  public errcode: string

  constructor(message: string) {
    super(message)
    this.additionalInfo = message
    this.name = 'RuleDirectiveError'
    this.errcode = 'RuleDirectiveError'
  }
}

/**
 * {
 *  args: string[] // must be valid sdl string
 *  validation: (value: any, ...args) => void
 * }
 */

export const maxLength = {
  args: ['length: Int'],
  validation(value: string, { length }: { length: number }) {
    if (value.length >= length) {
      throw new RuleDirectiveError(
        `Max length is ${length}, got ${value} with length of ${value.length}`
      )
    }
  },
}

export const minLength = {
  args: ['length: Int'],
  validation(value: string, { length }: { length: number }) {
    if (value.length < length) {
      throw new RuleDirectiveError(
        `Minimum length is ${length}, got ${value} with length of ${value.length}`
      )
    }
  },
}

export const isEmail = {
  validation(value: string) {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (pattern.test(value) === false) {
      throw new RuleDirectiveError(`This is not a valid email, got ${value}`)
    }
  },
}
