import { gql } from '@apollo/client'

export const GET_ALL_DESTINATIONS = gql`
  query {
    allDestinations {
      alias
    }
  }
`

export const GET_BOOKINGS = gql`
  query {
    bookings {
      id
      start {
        alias
        lat
        lon
      }
      stop {
        alias
        lat
        lon
      }
      events {
        created_at
        status
      }
    }
  }
`
