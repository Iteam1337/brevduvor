import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'

interface ParagraphProps {
  text: string
}
const Paragraph = styled(Text)`
  font-family: ${({ theme }) => theme.typography.paragraph};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.NGrey1};
`

const Component: React.FC<ParagraphProps> = ({ text }) => (
  <Paragraph>{text}</Paragraph>
)

export default Component
