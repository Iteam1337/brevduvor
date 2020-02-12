import React from 'react'
import { Picker } from 'react-native'
import Paragraph from '~/components/typography/Paragraph'
import { Destination } from '~/__generated__/app'

interface InputSelectProps {
  name?: string
  select?: Destination[]
  callback: (value: string) => void
}

const InputSelect: React.FC<InputSelectProps> = ({
  select,
  callback,
  name = '',
}) => {
  return (
    <>
      <Paragraph text={name} />
      <Picker
        selectedValue={name}
        onValueChange={itemValue => {
          callback(itemValue)
        }}
      >
        <Picker.Item label="" value="" />
        {select &&
          select.map(destination => (
            <Picker.Item label={destination.alias} value={destination.alias} />
          ))}
      </Picker>
    </>
  )
}

export default InputSelect
