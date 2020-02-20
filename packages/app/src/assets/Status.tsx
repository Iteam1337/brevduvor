import React from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components'

interface StatusProps {
  small?: boolean
}

const SVG = styled(Svg)<{
  small: StatusProps['small']
}>`
  width: ${({ small }) => (small ? '21px' : '68px')};
  height: ${({ small }) => (small ? '21px' : '69px')};
  ${({ small }) => small && 'margin-right: 5px'};
`

const Status: React.FC<StatusProps> = ({ small = false }) => {
  return (
    <SVG small={small} viewBox="0 0 68 45" fill="none">
      <Path
        d="M67.031 20.86C60.703 8.437 48.047 0 33.75 0 19.336 0 6.68 8.438.352 20.86.117 21.327 0 22.03 0 22.616c0 .469.117 1.172.352 1.64C6.68 36.68 19.336 45 33.75 45c14.297 0 26.953-8.32 33.281-20.742.235-.469.352-1.172.352-1.758 0-.469-.117-1.172-.352-1.64zM33.75 39.374c-9.375 0-16.875-7.5-16.875-16.875 0-9.258 7.5-16.875 16.875-16.875 9.258 0 16.875 7.617 16.875 16.875v.117c0 9.258-7.617 16.758-16.875 16.758zm0-28.125c-.938.117-2.227.234-3.047.469.586.82 1.172 2.344 1.172 3.398 0 3.047-2.578 5.508-5.625 5.508-1.055 0-2.578-.469-3.398-1.055-.235.82-.352 2.11-.352 2.93 0 6.21 5.04 11.25 11.25 11.25S45 28.71 45 22.5s-5.04-11.25-11.25-11.25z"
        fill="#000"
      />
    </SVG>
  )
}

export default Status
