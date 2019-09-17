export default {
  distance: trip => {
    return trip.distance
  },
  geoJson: trip => {
    const geo = trip.geometry
    return {
      type: geo.type,
      coordinates: geo.coordinates || [],
    }
  },
}
