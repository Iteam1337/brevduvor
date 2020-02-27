import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Line = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: #000;
  width: 100%;
  margin: 25px 0;
`

const Component = () => {
  return <Line />
}

export default Component
