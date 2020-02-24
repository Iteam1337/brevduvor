import React from 'react'
import PrimaryButton from '~/components/Button'
import Paragraph from '~/components/typography/Paragraph'
import styled from 'styled-components/native'
import ScrollableLayout from '~/components/ScrollableLayout'
import ButtonWrapper from '~/components/ButtonWrapper'
import ContentWrapper from '~/components/ContentWrapper'

const backgroundImage = require('~/../assets/background-topo.png')

const InfoText = styled.View`
  height: 80%;
  align-items: center;
  justify-content: center;
`
interface HomeProps {
  navigation: any
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <InfoText>
          <Paragraph text="Du har just nu inga pågående transporter" />
        </InfoText>
      </ContentWrapper>
      <ButtonWrapper>
        <PrimaryButton
          text="Ny Bokning"
          callback={() => navigation.navigate('Book')}
        />
      </ButtonWrapper>
    </ScrollableLayout>
  )
}

export default Home
