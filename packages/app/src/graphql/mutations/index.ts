import { gql } from '@apollo/client'

export const INIT_DRONE = gql`
  mutation initDrone($start: DestinationInput!, $stop: DestinationInput!) {
    initDrone(start: $start, stop: $stop)
  }
`

export const START_DRONE = gql`
  mutation startDrone($id: String!) {
    startDrone(id: $id) {
      id
    }
  }
`
