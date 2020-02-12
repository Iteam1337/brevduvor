import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`

const ButtonWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default ButtonWrapper
