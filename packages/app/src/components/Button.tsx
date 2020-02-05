import React from 'react'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity<{
  isCancel: ButtonProps['isCancel']
}>`
  width: 140px;
  background: ${({ theme, isCancel }) =>
    isCancel ? theme.colors.NGrey9 : theme.colors.blue8};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text<{
  isCancel: ButtonProps['isCancel']
}>`
  font-family: ${({ theme }) => theme.typography.heading};
  color: ${({ theme, isCancel }) =>
    isCancel ? theme.colors.NGrey4 : theme.colors.blue1};
`

interface ButtonProps {
  text: string
  callback: () => void
  isCancel?: boolean
}

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  callback,
  isCancel = false,
}) => {
  return (
    <ButtonContainer onPress={callback} isCancel={isCancel}>
      <ButtonText isCancel={isCancel}>{text}</ButtonText>
    </ButtonContainer>
  )
}

export default PrimaryButton
