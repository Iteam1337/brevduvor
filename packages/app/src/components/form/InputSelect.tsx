import React from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import { Destination, DestinationInput } from '~/__generated__/app'
import RNPickerSelect from 'react-native-picker-select'
import Label from '~/components/form/Label'
import theme from '~/styles/theme'

interface InputSelectProps {
  name?: string
  label: string
  selectOptions?: Destination[]
  callback: (value: DestinationInput) => void
  placeholder: string
}

const InputSelectWrapper = styled(View)`
  width: 100%;
  align-items: flex-start;
`

const GeoSelect: React.FC<InputSelectProps> = ({
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

  const handleChange = (input: string) => {
    const selectOption = selectOptions.find(({ alias }) => alias === input)
    if (selectOption) {
      const { alias, lat, lon } = selectOption // strip __typename prop

      callback({ alias, lat, lon })
    }
  }

  return (
    <InputSelectWrapper>
      <Label value={label} />
      <RNPickerSelect
        placeholder={{
          label: placeholder,
          value: null,
        }}
        onValueChange={handleChange}
        items={selectOptions.map(toSelectItem)}
        style={PickerStyle}
      />
    </InputSelectWrapper>
  )
}

const PickerStyle = StyleSheet.create({
  inputIOSContainer: {
    width: '100%',
    height: 42,
    backgroundColor: 'white',
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

export default GeoSelect
