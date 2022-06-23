import type { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import client from '@/lib/queryClient'
import Mui from '@/components/provider/Mui'
import Auth from '@/components/provider/Auth'

import '@/styles/globals.scss'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    // recoil
    <RecoilRoot>
      {/* react-query */}
      <QueryClientProvider client={ client }>
        <Auth>
          {/* Mui */}
          <Mui>
            { getLayout(<Component {...pageProps} />) }

            <ReactQueryDevtools initialIsOpen={ false } />
          </Mui>
        </Auth>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
export default MyApp