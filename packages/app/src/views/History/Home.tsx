import React from 'react'

import ScrollableLayout from '~/components/ScrollableLayout'
import ContentWrapper from '~/components/ContentWrapper'
import Title from '~/components/typography/Title'

const backgroundImage = require('~/../assets/background-topo.png')

interface HomeProps {
  navigation: any
}

const Home: React.FC<HomeProps> = () => {
  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Title text={'History'} />
      </ContentWrapper>
    </ScrollableLayout>
  )
}

export default Home
