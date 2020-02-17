import { gql } from '@apollo/client'

export const GET_ALL_DESTINATIONS = gql`
  query {
    allDestinations {
      alias
      lat
      lon
    }
  }
`

export const GET_BOOKINGS = gql`
  query {
    bookings {
      status
      start {
        alias
      }
      stop {
        alias
      }
      eta
    }
  }
`
