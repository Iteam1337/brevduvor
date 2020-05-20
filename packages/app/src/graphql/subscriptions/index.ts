import { gql } from '@apollo/client'

export const DRONE_INFO_SUBSCRIPTION = gql`
  subscription($id: String!) {
    droneInfo(id: $id) {
      id
      currentPos {
        lat
        lon
      }
      batteryStatus
      armed
    }
  }
`
