import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, ImageURISource } from 'react-native'

const Container = styled.ScrollView`
  padding: ${({ theme }) => theme.spacing.sm};
`

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`

interface LayoutProps {
  image?: ImageURISource
}

const ScrollableLayout: React.FC<LayoutProps> = ({ children, image }) => {
  return image ? (
    <BackgroundImage source={image}>
      <Container>
        <SafeAreaView>{children}</SafeAreaView>
      </Container>
    </BackgroundImage>
  ) : (
    <Container>
      <SafeAreaView>{children}</SafeAreaView>
    </Container>
  )
}

export default ScrollableLayout
