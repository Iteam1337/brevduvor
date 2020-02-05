import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'

interface HeadingProps {
  text: string
  inColor?: boolean
}
const Heading = styled(Text)<{ inColor: HeadingProps['inColor'] }>`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme, inColor }) =>
    inColor ? theme.colors.blue1 : theme.colors.NGrey1};
`

const Component: React.FC<HeadingProps> = ({ text, inColor }) => (
  <Heading inColor={inColor}>{text}</Heading>
)

export default Component
