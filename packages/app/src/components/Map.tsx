import React from 'react'
import styled from 'styled-components/native'
import MapView from 'react-native-maps'

const Map = styled(MapView)`
  flex: 1;
`

const MapComponent = React.forwardRef((props: any, ref: any) => (
  <Map
    ref={ref}
    onMapReady={props.onMapReady}
    showsMyLocationButton={true}
    showsUserLocation={true}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    {props.children}
  </Map>
))

export default MapComponent
