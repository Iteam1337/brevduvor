import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 90%;
`

const ContentWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ContentWrapper
