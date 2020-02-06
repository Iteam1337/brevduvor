import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, ImageURISource, View } from 'react-native'

const Container = styled.SafeAreaView`
  padding: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  justify-content: center;
  align-items: center;
`

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`

interface LayoutProps {
  image?: ImageURISource
}

const Layout: React.FC<LayoutProps> = ({ children, image }) => {
  return image ? (
    <BackgroundImage source={image}>
      <Container>
        <SafeAreaView>{children}</SafeAreaView>
      </Container>
    </BackgroundImage>
  ) : (
    <View style={{ width: '100%', height: '100%' }}>
      <Container>
        <SafeAreaView>{children}</SafeAreaView>
      </Container>
    </View>
  )
}

export default Layout
