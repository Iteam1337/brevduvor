import React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components'

interface MapProps {
  small?: boolean
}

const SVG = styled(Svg)<{
  small: MapProps['small']
}>`
  width: 21px;
  height: 19px;
  ${({ small }) => small && 'margin-right: 5px'};
`

const Map: React.FC<MapProps> = ({ small = true }) => {
  return (
    <SVG small={small} viewBox="0 0 21 19" fill="none">
      <Path
        d="M10.125.25a4.434 4.434 0 00-4.43 4.43c0 2.004 2.883 5.59 3.973 6.925a.615.615 0 00.879 0c1.09-1.335 4.008-4.921 4.008-6.925 0-2.426-2.004-4.43-4.43-4.43zm0 5.906c-.844 0-1.477-.633-1.477-1.476 0-.809.633-1.477 1.477-1.477.809 0 1.477.668 1.477 1.477 0 .843-.668 1.476-1.477 1.476zM.703 7.844C.316 8.02 0 8.477 0 8.898v8.79c0 .421.387.703.738.527L5.625 16V7.809c-.316-.563-.598-1.09-.773-1.618L.703 7.844zm9.422 5.062c-.527 0-.984-.21-1.3-.597-.704-.809-1.442-1.723-2.075-2.707V16l6.75 2.25V9.602a28.92 28.92 0 01-2.11 2.707 1.617 1.617 0 01-1.265.597zm9.352-6.96l-4.852 2.179V18.25l4.887-1.934c.386-.175.738-.632.738-1.054v-8.79c0-.421-.422-.702-.773-.527z"
        fill="#000"
      />
    </SVG>
  )
}

export default Map
