import React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components'

interface ClockProps {
  small?: boolean
}

const SVG = styled(Svg)<{
  small: ClockProps['small']
}>`
  width: ${({ small }) => (small ? '24px' : '81px')};
  height: ${({ small }) => (small ? '24px' : '81px')};
  ${({ small }) => small && 'margin-right: 5px'};
`

const Clock: React.FC<ClockProps> = ({ small = false }) => {
  return (
    <SVG small={small} viewBox="0 0 81 81" fill="none">
      <Path
        d="M40.5 74.25c18.64 0 33.75-15.11 33.75-33.75S59.14 6.75 40.5 6.75 6.75 21.86 6.75 40.5 21.86 74.25 40.5 74.25z"
        fill={small ? '#fff' : '#000'}
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M40.5 20.25V40.5L54 47.25"
        stroke={small ? '#000' : '#fff'}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}

export default Clock
