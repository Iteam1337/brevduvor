import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import ScrollableLayout from '~/components/ScrollableLayout'
import ButtonWrapper from '~/components/ButtonWrapper'
import PrimaryButton from '~/components/Button'
import Paragraph from '~/components/typography/Paragraph'
import RowWrapper from '~/components/RowWrapper'
import Line from '~/components/Line'
import Title from '~/components/typography/Title'

import Clock from '~/assets/Clock'
import Map from '~/assets/Map'
import Arrow from '~/assets/Arrow'
import Status from '~/assets/Status'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookingInfoProps {
  navigation: any
  route: any
}

const InfoWrapper = styled.View`
  width: 100%;
  align-items: flex-start;

  height: 90%;
`

const BookingInfo: React.FC<BookingInfoProps> = ({ route, navigation }) => {
  const [showMap, setShowMap] = React.useState<boolean>(false)
  const { booking } = route.params

  return (
    <ScrollableLayout image={backgroundImage}>
      <InfoWrapper>
        <Title text="Status" />
        <Paragraph
          bold={true}
          toLeft={true}
          text={`Rutt: ${booking.start.alias} - ${booking.stop.alias}`}
        />
        <RowWrapper>
          <Status small={true} />
          <Paragraph bold={true} small={true} text={booking.status} />
        </RowWrapper>
        <Line />
        <RowWrapper>
          <Clock small={true} />
          <Paragraph bold={true} small={true} text="BERÄKNAD ANSKOMST" />
        </RowWrapper>
        <Line />
        <TouchableOpacity onPress={() => setShowMap(!showMap)}>
          <RowWrapper>
            <Map />
            <Paragraph bold={true} small={true} text="NUVARANDE POSITION" />
          </RowWrapper>
          <RowWrapper>
            <Paragraph
              small={true}
              text={`${booking.start.lon} ${booking.start.lat}`}
            />
            <Arrow active={showMap} />
          </RowWrapper>
        </TouchableOpacity>
        <Line />
        <Paragraph bold={true} small={true} text="HÄNDELSER" />
      </InfoWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Tillbaka"
          callback={() => navigation.navigate('Home')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingInfo
