import { DefaultTheme } from 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string
      black: string
    }
  }
}

const theme: DefaultTheme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
  },
}

export default theme
