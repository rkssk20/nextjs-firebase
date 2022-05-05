import { ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

type Props = {
  type: 'website' | 'article' | 'profile'
  title: string
  description: string
  ogp: string | number
  children: ReactNode
}

const Layout: NextPage<Props> = ({ type, title, description, ogp, children }) => {
  const ogpImageUrl = `${ process.env.NEXT_PUBLIC_STORAGE_URL }/${ ogp }.png`
  const ogpTitle = title ? (title + '| Next.js × Supabase') : 'Next.js × Supabase'

  return (
    <>
      <Head>
        {/* ページのタイトル */}
        <title>{ ogpTitle }</title>
        {/* ページの概要。検索結果にも表示される */}
        <meta name='description' content={description} />
        {/* ページの種類 */}
        <meta property='og:type' content={type} />

        {/* OGPにおけるページのタイトル */}
        <meta property='og:title' content={ ogpTitle } />
        {/* OGPにおけるサイト名 */}
        <meta property='og:site_name' content={ ogpTitle } />
        {/* OGPにおけるページの概要 */}
        <meta property='og:description' content={description} />
        {/* OGPにおける画像 */}
        <meta property='og:image' content={ ogpImageUrl } />

        {/* Twitterカードの利用 */}
        <meta name='twitter:card' content='summary_large_image' />
        {/* Twitterカードのタイトル */}
        <meta name='twitter:title' content={ ogpTitle } />
        {/* Twitterカードの説明文 */}
        <meta name='twitter:description' content={ description } />
        {/* Twitterカードの画像 */}
        
        {/* Twitterアカウント */}
        <meta name='twitter:site' content='' />
        <meta name='twitter:image' content={ ogpImageUrl } />
      </Head>

      {children}
    </>
  )
}

export default Layout
