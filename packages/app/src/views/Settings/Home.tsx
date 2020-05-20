import React from 'react'

import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import Title from '~/components/typography/Title'
import ButtonWrapper from '~/components/ButtonWrapper'
import PrimaryButton from '~/components/Button'
import { AuthContext } from '~/AppContext'

const backgroundImage = require('~/../assets/background-topo.png')

interface HomeProps {
  navigation: any
}

const Home: React.FC<HomeProps> = () => {
  const { logout } = React.useContext<any>(AuthContext)

  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <Title text={'Inställningar'} />
      </ScrollableLayout>
      <ButtonWrapper>
        <PrimaryButton text="Logga ut" callback={() => logout()} />
      </ButtonWrapper>
    </ContentWrapper>
  )
}

export default Home
