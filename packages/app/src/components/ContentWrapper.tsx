import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
console.disableYellowBox = true
const Wrapper = styled(SafeAreaView)`
  width: 100%;
  align-items: center;
`

const ContentWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ContentWrapper
