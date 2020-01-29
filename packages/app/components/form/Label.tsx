import React from 'react'

import styled from 'styled-components/native'

interface LabelProps {
  value: string
}

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.paragraph};
  font-size: ${({ theme }) => theme.typography.sizes.md};
`
const Component: React.FC<LabelProps> = ({ value }) => <Label>{value}</Label>

export default Component
