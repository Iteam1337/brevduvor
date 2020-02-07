import React from 'react'
import PrimaryButton from '~/components/Button'
import styled from 'styled-components/native'
import Heading from '~/components/typography/Heading'
import Package from '~/assets/Package'
import ScrollableLayout from '~/components/ScrollableLayout'

const backgroundImage = require('~/../assets/background-topo.png')

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
interface BookingPackingProps {
  navigation: any
}

const BookingPacking: React.FC<BookingPackingProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <Heading text="Packa ditt paket" />
      <Package />
      <ButtonGroup>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('BookingSend')}
        />
      </ButtonGroup>
    </ScrollableLayout>
  )
}

export default BookingPacking
