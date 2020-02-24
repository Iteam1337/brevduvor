import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

interface NotificationIconProps {
  active: number
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  active = 0.4,
}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G
        opacity={active}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a1.999 1.999 0 01-3.46 0" />
      </G>
    </Svg>
  )
}

export default NotificationIcon
