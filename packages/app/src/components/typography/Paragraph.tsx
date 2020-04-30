import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'

interface ParagraphProps extends StyleProps {
  text: string
  styles?: StyleProps
}

interface StyleProps {
  small?: boolean
  bold?: boolean
  toLeft?: boolean
  toRight?: boolean
}

const Paragraph = styled(Text)<StyleProps>`
  font-family: ${({ theme, bold }) =>
    bold ? theme.typography.bold : theme.typography.paragraph};
  font-size: ${({ theme, small }) =>
    small ? theme.typography.sizes.sm : theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.NGrey1};
  ${({ toLeft }) => toLeft && 'align-self: flex-start;'};
  ${({ toRight }) =>
    toRight && 'flex-grow: 1; text-align: right; margin-right: 10px;'}
`

const Component: React.FC<ParagraphProps> = ({
  text,
  small,
  bold,
  toLeft,
  toRight,
}) => (
  <Paragraph bold={bold} toLeft={toLeft} toRight={toRight} small={small}>
    {text}
  </Paragraph>
)

export default Component
