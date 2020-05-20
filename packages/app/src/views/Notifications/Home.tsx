import React from 'react'

import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import Title from '~/components/typography/Title'

const backgroundImage = require('~/../assets/background-topo.png')

interface HomeProps {
  navigation: any
}

const Home: React.FC<HomeProps> = () => {
  return (
    <ContentWrapper>
      <ScrollableLayout image={backgroundImage}>
        <Title text={'Notifikationer'} />
      </ScrollableLayout>
    </ContentWrapper>
  )
}

export default Home
