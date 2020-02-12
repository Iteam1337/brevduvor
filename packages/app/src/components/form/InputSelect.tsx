import React from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import { Destination } from '~/__generated__/app'
import RNPickerSelect from 'react-native-picker-select'
import Label from '~/components/form/Label'
import theme from '~/styles/theme'
interface InputSelectProps {
  name?: string
  label: string
  selectOptions?: Destination[]
  callback: (value: string) => void
  placeholder: string
}

const InputSelectWrapper = styled(View)`
  width: 100%;
  align-items: flex-start;
`

const InputSelect: React.FC<InputSelectProps> = ({
  selectOptions = [],
  callback,
  label,
  placeholder,
}) => {
  const toSelectItem: (d: Destination) => { label: string; value: string } = ({
    alias,
  }) => ({
    label: alias,
    value: alias,
  })

  return (
    <InputSelectWrapper>
      <Label value={label} />
      <RNPickerSelect
        placeholder={{ label: placeholder, value: null }}
        onValueChange={val => callback(val)}
        items={selectOptions?.map(toSelectItem)}
        style={PickerStyle}
      />
    </InputSelectWrapper>
  )
}

const PickerStyle = StyleSheet.create({
  inputIOSContainer: {
    width: 140,
    height: 42,
    borderWidth: 1,
    borderColor: theme.colors.NGrey7,
    fontFamily: theme.typography.paragraph,
    fontSize: 16,
    paddingLeft: 4,
    marginBottom: 12,
    justifyContent: 'center',
  },

  inputIOS: {
    fontSize: 16,
  },
})

export default InputSelect
