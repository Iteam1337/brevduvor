import React from 'react'
import PrimaryButton from '~/components/Button'
import styled from 'styled-components/native'
import Heading from '~/components/typography/Heading'
import Clock from '~/assets/Clock'
import ScrollableLayout from '~/components/ScrollableLayout'
const backgroundImage = require('~/../assets/background-topo.png')

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
interface BookingEtaProps {
  navigation: any
}

const BookingEta: React.FC<BookingEtaProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <Heading text="Beräknad tid" />
      <Clock />
      <ButtonGroup>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('BookingPacking')}
        />
      </ButtonGroup>
    </ScrollableLayout>
  )
}

export default BookingEta
