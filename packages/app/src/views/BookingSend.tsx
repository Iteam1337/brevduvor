import React from 'react'
import PrimaryButton from '~/components/Button'
import styled from 'styled-components/native'
import Heading from '~/components/typography/Heading'
import Send from '~/assets/Send'
import ScrollableLayout from '~/components/ScrollableLayout'

const backgroundImage = require('~/../assets/background-topo.png')

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
interface BookingSendProps {
  navigation: any
}

const BookingSend: React.FC<BookingSendProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <Heading text="Skicka din drönare" />
      <Send />
      <ButtonGroup>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('Home')}
        />
      </ButtonGroup>
    </ScrollableLayout>
  )
}

export default BookingSend
