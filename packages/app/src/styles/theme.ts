import { DefaultTheme } from 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string
      white: string
      blue1: string
      blue8: string
      blue10: string
      NGrey1: string
      NGrey4: string
      NGrey5: string
      NGrey7: string
      NGrey9: string
    }
    borderRadius: { sm: string; lg: string }
    typography: {
      heading: string
      button: string
      paragraph: string
      sizes: { sm: string; md: string; lg: string }
    }
    spacing: {
      xsm: string
      sm: string
      m: string
      lg: string
    }
  }
}

const theme: DefaultTheme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    blue1: '#052370',
    blue8: '#A6C9FF',
    blue10: '#ECF5FF',
    NGrey1: '#262626',
    NGrey4: '#595959',
    NGrey5: '#808080',
    NGrey7: '#DEE4E7',
    NGrey9: '#F3F3F3',
  },
  borderRadius: { sm: '4px', lg: '8px' },
  typography: {
    heading: 'NunitoSans-Regular',
    button: 'NunitoSans-Bold',
    paragraph: 'NunitoSans-Regular',
    sizes: { sm: '14px', md: '18px', lg: '24px' },
  },
  spacing: {
    xsm: '10px',
    sm: '12px',
    m: '24px',
    lg: '47px',
  },
}

export default theme
