import React, { useEffect, useRef } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useSubscription, useMutation } from '@apollo/client'

import { DefaultLayout } from '~/components/Layout'
import PrimaryButton from '~/components/Button'
import Paragraph from '~/components/typography/Paragraph'
import RowWrapper from '~/components/RowWrapper'
import Line from '~/components/Line'

import { DRONE_INFO_SUBSCRIPTION } from '~/graphql/subscriptions'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'
import ContentWrapper from '~/components/ContentWrapper'
import { MutationLandDroneArgs, Mutation } from '~/__generated__/app'
import { LAND_DRONE } from '~/graphql/mutations'
import MapComponent from '~/components/Map'
import { Marker } from 'react-native-maps'
import translate, { statusTranslations } from '~/utils/statusTranslation'
import { UserContext } from '~/AppContext'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookingInfoProps {
  navigation: any
  route: any
}

const InfoWrapper = styled.View`
  width: 100%;
  align-items: flex-start;
`

const LandButtonWrapper = styled.View`
  align-items: center;
  width: 100%;
`

const MapContainer = styled.View`
  width: 100%;
  height: 300px;
`

const EventsListItem = styled.View`
  flex-direction: row;
`

const BookingInfo: React.FC<BookingInfoProps> = ({ route }) => {
  const mapEl = useRef<any | null>(null)
  const { user } = React.useContext<any>(UserContext)

  const [showMap, setShowMap] = React.useState<boolean>(false)
  const { booking } = route.params
  const [isLanding, setIsLanding] = React.useState<boolean>(false)
  const [landed, setLanded] = React.useState<boolean>(false)

  const { data, loading: droneInfoLoading } = useSubscription(
    DRONE_INFO_SUBSCRIPTION,
    {
      variables: {
        id: '13', //TODO: Fetch from booking
      },
    }
  )

  const [landDrone] = useMutation<Mutation['landDrone'], MutationLandDroneArgs>(
    LAND_DRONE,
    {
      variables: { bookingId: booking.id },
      onCompleted: () => setIsLanding(true),
      onError: err => console.log('err', err),
    }
  )

  useEffect(() => {
    if (!droneInfoLoading && data && data.droneInfo.armed === false) {
      setIsLanding(false)
      setLanded(true)
    }
  }, [isLanding, data, droneInfoLoading])

  const markers = [
    {
      latitude: booking.start.lat,
      longitude: booking.start.lon,
    },
    {
      latitude: booking.stop.lat,
      longitude: booking.stop.lon,
    },
  ]

  const fitToCoordinates = () => {
    mapEl.current.fitToCoordinates(markers, {
      edgePadding: { top: 200, right: 100, bottom: 50, left: 100 },
      animated: false,
    })
  }

  return (
    <ContentWrapper>
      <MapContainer pointerEvents="none">
        <MapComponent onMapReady={fitToCoordinates} ref={mapEl}>
          <>
            {markers.map(marker => (
              <Marker coordinate={{ ...marker }} />
            ))}
          </>
        </MapComponent>
      </MapContainer>
      <DefaultLayout image={backgroundImage}>
        <InfoWrapper>
          <Line />
          <Paragraph
            bold={true}
            small={true}
            toLeft={true}
            text={
              user.destination.alias === booking.start.alias
                ? `Destination: ${booking.stop.alias}`
                : `Avsändare: ${booking.start.alias}`
            }
          />
          <Line />
          <TouchableOpacity onPress={() => setShowMap(!showMap)}>
            <RowWrapper>
              <Paragraph bold={true} small={true} text="NUVARANDE POSITION" />
            </RowWrapper>
            <RowWrapper>
              <Paragraph
                small={true}
                text={
                  droneInfoLoading
                    ? 'Väntar på position'
                    : data.droneInfo.currentPos.lon
                    ? `${data.droneInfo.currentPos.lon} ${data.droneInfo.currentPos.lat}`
                    : 'Kunde inte hitta någon position'
                }
              />
            </RowWrapper>
          </TouchableOpacity>
          <Line />
          <Paragraph bold={true} small={true} text="HÄNDELSER" />
          <RowWrapper>
            <FlatList
              data={booking.events}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <EventsListItem key={item.id}>
                  <Paragraph small={true} text={translate(item.status)} />
                  <Paragraph
                    small={true}
                    toRight={true}
                    text={format(new Date(item.created_at), 'dd MMM hh:mm', {
                      locale: sv,
                    })}
                  />
                </EventsListItem>
              )}
            />
          </RowWrapper>
          <Line />
          {translate(booking.events[booking.events.length - 1].status) ===
            statusTranslations.READY_TO_LAND &&
            !landed && (
              <>
                <LandButtonWrapper>
                  <PrimaryButton
                    isDisabled={isLanding}
                    text="Bekräfta landning"
                    callback={() => landDrone()}
                  />
                </LandButtonWrapper>
                <Line />
              </>
            )}
        </InfoWrapper>
      </DefaultLayout>
    </ContentWrapper>
  )
}

export default BookingInfo
