import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const HistoryIcon = (props: any) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G
        opacity={0.4}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M21 8v13H3V8M23 3H1v5h22V3zM10 12h4" />
      </G>
    </Svg>
  )
}

export default HistoryIcon
