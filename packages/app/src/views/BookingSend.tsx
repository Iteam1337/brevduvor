import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import Paragraph from '~/components/typography/Paragraph'
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
        <Paragraph text="Drönaren är nu förberedd och redo för avfärd." />
        <Paragraph text="Bekräfta för att starta färd" />
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Avbryt"
          callback={() => navigation.navigate('Home')}
        />
        <PrimaryButton
          text="Bekräfta"
          callback={() => navigation.navigate('Home')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default BookingSend
