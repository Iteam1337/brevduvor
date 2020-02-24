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
