import React from 'react'
import PrimaryButton from '~/components/Button'
import Heading from '~/components/typography/Heading'
import styled from 'styled-components/native'
import ScrollableLayout from '~/components/ScrollableLayout'

const backgroundImage = require('~/../assets/background-topo.png')

const Content = styled.View`
  height: 30%;
  align-self: center;
`

const Container = styled.View`
  height: 100%;
`

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
      <Container>
        <InfoText>
          <Heading text="Du har just nu inga pågående transporter" />
        </InfoText>
        <Content>
          <PrimaryButton
            text="Ny Bokning"
            callback={() => navigation.navigate('Book')}
          />
        </Content>
      </Container>
    </ScrollableLayout>
  )
}

export default Home
