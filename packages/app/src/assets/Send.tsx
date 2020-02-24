import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Send(props: any) {
  return (
    <Svg width={61} height={61} viewBox="0 0 61 61" fill="none" {...props}>
      <Path
        d="M56.781.969L2.406 32.258c-2.11 1.172-1.875 4.219.235 5.039L15.18 42.57l33.633-29.648c.585-.586 1.523.234.937.937L21.625 48.195v9.492c0 2.813 3.281 3.868 4.922 1.876l7.5-9.141 14.531 6.21c1.64.704 3.633-.35 3.867-2.226l8.438-50.625c.469-2.344-2.11-3.984-4.102-2.812z"
        fill="#000"
      />
    </Svg>
  )
}

export default Send
