import { QueryResolvers } from '../../../__generated__/brevduvor'
import { getDestinations } from '../../../services/destinations'

export const allDestinations: QueryResolvers['allDestinations'] = async _ => {
  return await getDestinations()
}
