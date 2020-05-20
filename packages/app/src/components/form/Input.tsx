import React from 'react'
import styled from 'styled-components/native'
import { KeyboardType } from 'react-native'

interface TextInputProps {
  placeholder: string
  value: string
  callback: (text: string) => void
  keyboardType?: KeyboardType
  secureTextEntry?: boolean
}

const Input = styled.TextInput`
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
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <Input
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      value={value}
      placeholder={placeholder}
      onChangeText={text => callback(text)}
    />
  )
}

export default Component
