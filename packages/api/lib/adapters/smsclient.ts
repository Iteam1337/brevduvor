import twilio from 'twilio'
import config from './../config'

export const client = twilio(config.TWILIO.account, config.TWILIO.token)

export const send = (message: string, receiver: string) => {
  return client.messages.create({
    body: message,
    from: config.TWILIO.sender,
    to: receiver,
  })
}
