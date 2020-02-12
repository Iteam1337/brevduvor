import React from 'react'
import Heading from '~/components/typography/Heading'
import { Destination } from '~/__generated__/app'
import RNPickerSelect from 'react-native-picker-select'

interface InputSelectProps {
  name?: string
  selectOptions?: Destination[]
  callback: (value: string) => void
  placeholder: string
}

const InputSelect: React.FC<InputSelectProps> = ({
  selectOptions = [],
  callback,
  name = '',
  placeholder,
}) => {
  const toSelectItem: (d: Destination) => { label: string; value: string } = ({
    alias,
  }) => ({
    label: alias,
    value: alias,
  })

  return (
    <>
      <Heading text={name} />
      <RNPickerSelect
        placeholder={{ label: placeholder, value: null }}
        onValueChange={val => callback(val)}
        items={selectOptions?.map(toSelectItem)}
      />
    </>
  )
}

// const IsnputSelect: React.FC<InputSelectProps> = ({
//   select,
//   callback,
//   name = '',
// }) => {
//   return (
//     <>
//       <Heading text={name} />
//       <Picker
//         selectedValue={name}
//         onValueChange={itemValue => {
//           callback(itemValue)
//         }}
//       >
//         <Picker.Item label="" value="" />
//         {select &&
//           select.map(destination => (
//             <Picker.Item label={destination.alias} value={destination.alias} />
//           ))}
//       </Picker>
//     </>
//   )
// }

export default InputSelect
