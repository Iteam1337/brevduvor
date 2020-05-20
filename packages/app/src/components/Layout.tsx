import React from 'react'
import styled from 'styled-components/native'
import { ImageURISource } from 'react-native'

const ScrollContainer = styled.ScrollView`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
`

const DefaultContainer = styled.View`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
`

const Container = styled.View`
  padding-bottom: ${({ theme }) => `${theme.spacing.lg}`};
`

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  background-color: white;
`

interface LayoutProps {
  image?: ImageURISource
}

export const ScrollableLayout: React.FC<LayoutProps> = ({
  children,
  image,
}) => {
  return image ? (
    <BackgroundImage source={image}>
      <ScrollContainer>
        <Container>{children}</Container>
      </ScrollContainer>
    </BackgroundImage>
  ) : (
    <ScrollContainer>
      <Container>{children}</Container>
    </ScrollContainer>
  )
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children, image }) => {
  return image ? (
    <BackgroundImage source={image}>
      <DefaultContainer>
        <Container>{children}</Container>
      </DefaultContainer>
    </BackgroundImage>
  ) : (
    <DefaultContainer>
      <Container>{children}</Container>
    </DefaultContainer>
  )
}
