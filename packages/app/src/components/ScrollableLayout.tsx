import React from 'react'
import styled from 'styled-components/native'
import { ImageURISource } from 'react-native'

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
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
      <Container>{children}</Container>
    </BackgroundImage>
  ) : (
    <Container>{children}</Container>
  )
}

export default ScrollableLayout
