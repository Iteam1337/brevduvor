import { gql } from '@apollo/client'

export const INIT_DRONE = gql`
  mutation initDrone($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop)
  }
`

export const BOOKING = gql`
  mutation booking($start: DestinationInput!, $stop: DestinationInput!) {
    booking(start: $start, stop: $stop)
  }
`

export const START_DRONE = gql`
  mutation startDrone($bookingId: String!) {
    startDrone(bookingId: $bookingId)
  }
`

export const LAND_DRONE = gql`
  mutation landDrone($bookingId: String!) {
    landDrone(bookingId: $bookingId)
  }
`

export const UPDATE_BOOKING_STATUS = gql`
  mutation updateBookingStatus($bookingId: String!, $status: Status!) {
    updateBookingStatus(bookingId: $bookingId, status: $status)
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      username
      destination {
        alias
        lat
        lon
      }
    }
  }
`

export const UPDATE_USER_DEVICES = gql`
  mutation updateUserDevices($deviceId: String!) {
    updateUserDevices(deviceId: $deviceId)
  }
`
