import { getDevicesByDestination, getDevicesByBookingId } from './users'
import firebase from '../adapters/firebase'

export const notifyDestinationNew = async (
  destinationId: string,
  bookingId: string
) => {
  console.log('bokningsId new', bookingId)
  const devices = await getDevicesByDestination(destinationId)

  if (!devices || !devices.length) {
    return
  }

  firebase.messaging().sendMulticast({
    notification: {
      title: 'Brevduvor',
      body: 'En leverans till dig är bokad',
    },
    tokens: devices,
  })
}

export const notifyDestinationSent = async (
  destinationId: string,
  bookingId: string
) => {
  console.log('bokningsId sent', bookingId)
  const devices = await getDevicesByDestination(destinationId)
  if (!devices || !devices.length) {
    return
  }

  firebase.messaging().sendMulticast({
    notification: {
      title: 'Brevduvor',
      body: 'En leverans till dig är skickad',
    },
    tokens: devices,
  })
}

export const notifyFinished = async (bookingId: string) => {
  const devices = await getDevicesByBookingId(bookingId)

  if (!devices) {
    return
  }

  if (devices.departure_devices && devices.departure_devices.length) {
    firebase.messaging().sendMulticast({
      notification: {
        title: 'Brevduvor',
        body: 'Din leverans har nått sin destination',
      },
      tokens: devices.departure_devices,
    })
  }

  if (devices.destination_devices && devices.destination_devices.length) {
    firebase.messaging().sendMulticast({
      notification: {
        title: 'Brevduvor',
        body: 'En leverans är nu på plats och redo att hämtas',
      },
      tokens: devices.destination_devices,
    })
  }
}

export const notifyReadyToLand = async (bookingId: string) => {
  const devices = await getDevicesByBookingId(bookingId)

  if (!devices) {
    return
  }

  if (devices.destination_devices && devices.destination_devices.length) {
    firebase.messaging().sendMulticast({
      notification: {
        title: 'Brevduvor',
        body: 'En leverans väntar på landningstillstånd',
      },
      tokens: devices.destination_devices,
    })
  }
}
