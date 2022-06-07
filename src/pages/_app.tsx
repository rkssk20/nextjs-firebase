import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import client from '@/lib/queryClient'
import Mui from '@/components/provider/Mui'
import AuthProvider from '@/components/provider/AuthProvider';

import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // recoil
    <RecoilRoot>
      {/* Mui */}
      <Mui>
        {/* react-query */}
        <QueryClientProvider client={ client }>
          {/* 認証 */}
          <AuthProvider>
            <Component {...pageProps} />

            <ReactQueryDevtools initialIsOpen={ false } />
          </AuthProvider>
        </QueryClientProvider>
      </Mui>
    </RecoilRoot>
  )
}
export default MyApp