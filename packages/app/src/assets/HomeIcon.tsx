import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

interface HomeIconProps {
  active: number
}

const HomeIcon: React.FC<HomeIconProps> = ({ active = 0.4 }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G opacity={active}>
        <Path
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 22V12h6v10"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default HomeIcon
