import { getAllDrones } from '../../../services/drones'

export const drones = async () => {
  const drones = await getAllDrones()

  return drones.map(({ drone_id }) => drone_id)
}
