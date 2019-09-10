import io from 'socket.io-client'
import { data } from './data.js'
const socket = io('http://localhost:3000')

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  zoom: 0,
})

map.on('load', function() {
  socket.on('droneFlightStatus', ({ currentPos }) => {
    const { lat, lon } = currentPos
    data.features[0].geometry.coordinates.push([lon, lat])
    map.getSource('trace').setData(data)
    map.panTo(currentPos)
  })

  socket.on('droneSetupStatus', ({ start }) => {
    map.easeTo({ center: start, zoom: 14 })
  })

  // start by showing just the first coordinate
  data.features[0].geometry.coordinates = [[-71.073668, 42.347856]]

  // add it to the map
  map.addSource('trace', { type: 'geojson', data })
  map.addLayer({
    id: 'trace',
    type: 'line',
    source: 'trace',
    paint: {
      'line-color': 'yellow',
      'line-opacity': 0.75,
      'line-width': 5,
    },
  })

  // setup the viewport
  map.setPitch(0)
})

const doFetch = (url, data) => {
  fetch(`http://localhost:3000/${url}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(console.log)
}

document.querySelector('#setup').addEventListener('click', () => {
  doFetch('setup', {
    webhookUrl: 'http://localhost:3000/droneSetupStatus',
    start: { lat: 42.347856, lon: -71.073668 },
    stop: { lat: 42.347555, lon: -71.065986 },
  })
})

document.querySelector('#init').addEventListener('click', () => {
  doFetch('init', {
    webhookUrl: 'http://localhost:3000/droneFlightStatus',
    start: { lat: 42.347856, lon: -71.073668 },
    stop: { lat: 42.347555, lon: -71.065986 },
  })
})
