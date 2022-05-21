import type { AppProps } from 'next/app'
import Mui from '@/components/provider/Mui'
import { RecoilRoot } from 'recoil';

import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Mui>
        <Component {...pageProps} />
      </Mui>
    </RecoilRoot>
  )
}
export default MyApp