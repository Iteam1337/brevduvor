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

import Icons from '~/assets/Icons'

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
          <Icons.Status small={true} />
          <Paragraph bold={true} small={true} text={booking.status} />
        </RowWrapper>
        <Line />
        <RowWrapper>
          <Icons.Clock small={true} />
          <Paragraph bold={true} small={true} text="BERÄKNAD ANSKOMST" />
        </RowWrapper>
        <Line />
        <TouchableOpacity onPress={() => setShowMap(!showMap)}>
          <RowWrapper>
            <Icons.Map />
            <Paragraph bold={true} small={true} text="NUVARANDE POSITION" />
          </RowWrapper>
          <RowWrapper>
            <Paragraph
              small={true}
              text={`${booking.start.lon} ${booking.start.lat}`}
            />
            <Icons.Arrow active={showMap} />
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
