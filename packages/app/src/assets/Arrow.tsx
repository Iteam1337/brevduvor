import React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components'

interface ArrowProps {
  active?: boolean
}

const SVG = styled(Svg)<{
  active: ArrowProps['active']
}>`
  width: 13px;
  height: 8px;
  ${({ active }) => active && 'transform: rotate(180deg)'};
`
const Arrow = ({ active = false }) => {
  return (
    <SVG active={active} viewBox="0 0 13 8" fill="none">
      <Path
        d="M6.027 7.66a.828.828 0 001.16 0L11.97 2.88c.351-.352.351-.879 0-1.195l-.774-.809c-.351-.316-.879-.316-1.195 0l-3.41 3.41L3.215.875C2.898.559 2.37.559 2.02.875l-.774.809c-.351.316-.351.843 0 1.195L6.027 7.66z"
        fill="#000"
      />
    </SVG>
  )
}

export default Arrow
