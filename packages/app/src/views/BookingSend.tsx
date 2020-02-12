import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Send from '~/assets/Send'
import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import ButtonWrapper from '~/components/ButtonWrapper'

const backgroundImage = require('~/../assets/background-topo.png')

interface BookingSendProps {
  navigation: any
}

const BookingSend: React.FC<BookingSendProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Heading text="Skicka din drönare" />
        <Send />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Nästa"
          callback={() => navigation.navigate('Home')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingSend
