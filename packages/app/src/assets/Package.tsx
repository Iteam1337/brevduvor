import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Package(props: any) {
  return (
    <Svg width={60} height={61} viewBox="0 0 60 61" fill="none" {...props}>
      <Path
        d="M59.648 22.18L53.672 4.367C52.969 2.141 50.859.5 48.398.5H31.875V23h27.89c0-.234 0-.586-.117-.82zM28.125.5h-16.64C9.022.5 6.914 2.14 6.21 4.367L.234 22.18c-.117.234-.117.586-.117.82h28.008V.5zM0 26.75v28.125C0 58.039 2.46 60.5 5.625 60.5h48.75c3.047 0 5.625-2.46 5.625-5.625V26.75H0z"
        fill="#000"
      />
    </Svg>
  )
}

export default Package
