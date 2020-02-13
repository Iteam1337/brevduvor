import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Clock(props: any) {
  return (
    <Svg width={81} height={81} viewBox="0 0 81 81" fill="none" {...props}>
      <Path
        d="M40.5 74.25c18.64 0 33.75-15.11 33.75-33.75S59.14 6.75 40.5 6.75 6.75 21.86 6.75 40.5 21.86 74.25 40.5 74.25z"
        fill="#000"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M40.5 20.25V40.5L54 47.25"
        stroke="#fff"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Clock
