import React from 'react'
import styled from 'styled-components/native'

interface TextInputProps {
  placeholder: string
  value: string
  callback: (text: string) => void
}

const Input = styled.TextInput`
  width: 140px;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.NGrey7};
  font-family: ${({ theme }) => theme.typography.paragraph};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  padding-left: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Component: React.FC<TextInputProps> = ({
  placeholder,
  value,
  callback,
}) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChangeText={text => callback(text)}
    />
  )
}

export default Component
