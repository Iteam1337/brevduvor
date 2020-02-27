import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

interface NavigationProps {
  active: boolean
}

const Notification: React.FC<NavigationProps> = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G
        opacity={active ? 1 : 0.4}
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

const Settings: React.FC<NavigationProps> = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G
        opacity={active ? 1 : 0.4}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a1.998 1.998 0 010 2.83 1.998 1.998 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a1.998 1.998 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 013.417 1.415 2 2 0 01-.587 1.415l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1v0z" />
      </G>
    </Svg>
  )
}

const Home: React.FC<NavigationProps> = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G opacity={active ? 1 : 0.4}>
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

const History: React.FC<NavigationProps> = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G
        opacity={active ? 1 : 0.4}
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

export default { Home, History, Notification, Settings }
