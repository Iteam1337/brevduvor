export default {
  distance: (trip: any) => {
    return trip.distance
  },
  geoJson: (trip: any) => {
    const geo = trip.geometry
    return {
      type: geo.type,
      coordinates: geo.coordinates || [],
    }
  },
}
