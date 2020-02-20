import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const RowWrapper: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>

export default RowWrapper
