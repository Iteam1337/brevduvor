import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'

interface ParagraphProps {
  text: string
  small?: boolean
  toLeft?: boolean
}

const Paragraph = styled(Text)<{
  small: ParagraphProps['small']
  toLeft: ParagraphProps['toLeft']
}>`
  font-family: ${({ theme }) => theme.typography.paragraph};
  font-size: ${({ theme, small }) =>
    small ? theme.typography.sizes.sm : theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.NGrey1};
  ${({ toLeft }) => toLeft && 'align-self: flex-start;'};
`

const Component: React.FC<ParagraphProps> = ({
  text,
  small = false,
  toLeft = false,
}) => (
  <Paragraph toLeft={toLeft} small={small}>
    {text}
  </Paragraph>
)

export default Component
