import Layout from '@/components/provider/Layout'
import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import Post from '@/components/post/Post'

const Likes = () => {
  const test_data = [
    {
      id: 'fsdf-sdf-s-sdfs',
      display_id: 'jgaopigho',
      title: 'Tailwind UI vs Material UI',
      created_at: '2022-04-30 05:00:00.00000',
      image: '/image/back.png',
      likes: 1,
      like: true,
      details: 'Tailwind UIとMaterial UIを選ぶ時に考えること。Tailwind UIの場合は、',
      name: 'フロントエンジニアA',
      tags: [0],
      mine: true
    },
    {  
      id: 'fsdf-fsdf-erte-vdf',
      display_id: 'cvdfg',
      title: '技術選定',
      created_at: '2022-04-30 04:00:00.00000',
      image: '/image/ginza.png',
      likes: 0,
      like: false,
      details: 'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
      name: 'フロントエンジニアA',
      tags: [0, 1],
      mine: true
    },
    {
      id: 'wqerw-fgd-vbcvb',
      display_id: 'wgrgerg',
      title: 'Hasura vs Prisma',
      created_at: '2022-04-29 04:00:00.00000',
      image: '',
      likes: 0,
      like: true,
      details: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
      name: 'サーバーサイドエンジニア',
      tags: [1],
      mine: false
    },
    {
      id: 'wer-jtyj-cvgd',
      display_id: 'oguidfgodf',
      title: 'このサイトについて',
      created_at: '2022-03-30 04:00:00.00000',
      image: '/image/hose.png',
      likes: 1,
      like: false,
      details: 'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
      name: 'フロントエンジニアA',
      tags: [],
      mine: true
    },
    {
      id: 'nfghn-kuku-fgsdfg',
      display_id: 'ljoihfgh',
      title: 'Next.jsについて',
      created_at: '2021-04-30 04:00:00.00000',
      image: '',
      likes: 2,
      like: true,
      details: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
      name: 'サーバーサイドエンジニア',
      tags: [1],
      mine: false
    },
  ]
  
  return (
    <Layout
      type='profile'
      title=''
      description=''
      ogp='nextjssupabase'
    >
      {/* アカウント情報 */}
      <Profile />
      
      {/* ページ選択バー */}
      <Bar />

      {/* いいねした投稿一覧 */}
      { test_data.map(item => (
        <Post key={ item.id } data={ item } />
      ))}
    </Layout>
  )
}

export default Likes