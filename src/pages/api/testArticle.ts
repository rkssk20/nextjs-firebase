import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body)

  const test_data = [
    {
      id: '111111111111111111111',
      display_id: 'front_end',
      title: 'Next.js × Supabaseの技術選定',
      created_at: '2022-04-30 05:00:00.00000',
      image: '',
      likes: 1,
      like: true,
      details: `今回のNext.js × Supabaseに使用したものです。

  #### フロントエンド
  - Next.js
    - ISRで記事ごとに動的OGPを生成する
    - Imageコンポーネントで画像最適化する
  - Typescript
    - 型を付けて開発する
    - Supabaseと連携できるため、DBから取得した値にも型を付ける
  - Recoil
    - 状態管理ライブラリ
    - Recoil persistを使用してlocalstorageに値を永続化できる。これを検索履歴や投稿の下書きに使用。
  - Mui + SCSS
    - UIライブラリ。旧Material UI
    - 未経験でデザインするため、まずはMuiで完成されたコンポーネントを呼び出す。
      - ダークモード、レスポンシブデザインも簡単に実装できる。
      - デザインに慣れたらMuiを使用せず、Tailwind CSSに置き換えたい。
    - 必要な部分だけSCSSでスタイルを当てる。
      - [styled-componentsやemotion, インラインスタイル, Muiのsxではレンダリング速度が遅くなるため](https://mui.com/system/basics/#performance-tradeoff)、CSSでスタイルを当てる。
    - また、create-next-appの際にデフォルトでインストールされるCSS Moduleでファイルを分割している
    
  #### サーバーサイド
  - Supabase
    - RDS版Firebaseと謳っている、認証・API・DBをサーバーレスで利用できるサービス
    - Twitter, Facebook, Googleなどのソーシャルログインを実装
    - セキュリティはPostgreSQLのRLS(行レベルセキュリティ)
    - 複雑な処理はPostgreSQLのストアドプロシージャ
    
  #### ホスティング
  - Vercel
    - Next.jsの最適なデプロイ先
    - GIthubとの連携、ISR、画像最適化が簡単に利用できる。
    - 一ヶ月の帯域幅が1TBまでは20ドルと安い
      - それを超えると100GBごとに50ドルと高くなる。
      - 帯域幅によってVercelとCloud Runを使い分けたい。
    
  #### その他
  - Google Analytics
    - アクセス解析サービス
    - このデータを利用して当サービス内の人気記事ランキングを実装`,
      name: 'フロントエンジニア',
      tags: [0],
      mine: true,
      comments: 1,
    },
    {
      id: '222222222222222222222',
      display_id: 'front_end',
      title: '技術選定',
      created_at: '2022-04-30 04:00:00.00000',
      image: '/image/ginza.png',
      likes: 0,
      like: false,
      details:
        'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
      name: 'フロントエンジニア',
      tags: [0, 1],
      mine: true,
      comments: 0,
    },
    {
      id: '333333333333333333333',
      display_id: 'serverless',
      title: 'Hasura vs Prisma',
      created_at: '2022-04-29 04:00:00.00000',
      image: '',
      likes: 0,
      like: true,
      details: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 100,
    },
    {
      id: '444444444444444444444',
      display_id: 'front_end',
      title: 'このサイトについて',
      created_at: '2022-03-30 04:00:00.00000',
      image: '/image/hose.png',
      likes: 1,
      like: false,
      details:
        'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
      name: 'フロントエンジニア',
      tags: [],
      mine: true,
      comments: 1000,
    },
    {
      id: '555555555555555555555',
      display_id: 'serverless',
      title: 'Next.jsについて',
      created_at: '2021-04-30 04:00:00.00000',
      image: '',
      likes: 2,
      like: true,
      details: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 10000,
    },
    {
      id: '666666666666666666666',
      display_id: 'serverless',
      title: 'Firebaseのデメリット',
      created_at: '2020-04-30 04:00:00.00000',
      image: '',
      likes: 9999,
      like: true,
      details:
        'Firebaseは使いやすいサービスですが、DB周りでRDBとの違いが複数あります。まず、同一レコー',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 0,
    },
    {
      id: '777777777777777777777',
      display_id: 'front_end',
      title: 'Next.jsをCloud Runにデプロイする理由',
      created_at: '2020-03-01 04:00:00.00000',
      image: '',
      likes: 19999,
      like: true,
      details:
        'Next.jsはVercelにデプロイすると楽ですが、帯域幅の問題があります。帯域幅が一ヶ月に1TB',
      name: 'フロントエンジニア',
      tags: [1],
      mine: false,
      comments: 0,
    },
  ]

  let number: number | null = null

  test_data.filter((item, index) => {
    if (item.id === id) number = index
  })

  res.status(200).json({ data: number !== null ? test_data[number] : null })
}
