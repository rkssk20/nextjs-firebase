import type { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import useGA from '@/hooks/useGA'
import muiTheme from '@/lib/muiTheme'
import Auth from '@/components/provider/Auth'

import '@/styles/globals.scss'
import {ThemeProvider} from '@mui/material/styles'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  
  useGA() 

  return (
    // recoil
    <RecoilRoot>
      <Auth>
        {/* Mui */}
        <ThemeProvider theme={ muiTheme }>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Auth>
    </RecoilRoot>
  )
}

export default MyApp