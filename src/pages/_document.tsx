import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
         <Head prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#'>
          {/* 文字コード */}
          <meta charSet='utf-8' />

          {/* スマホ表示設定 */}
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          {/* スマホ表示で数字を電話番号のリンクにしない */}
          <meta name='format-detection' content='telephone=no,email=no,address=no' />
          {/* apple ホーム画面追加時のアイコン */}
          <link rel='apple-touch-icon' href='' />
          {/* windowsピン留め時のカラー */}
          <meta name='msapplication-TileColor' content='' />
          {/* widowsピン留め時の画像 */}
          <meta name='msapplication-config' content='' />

          {/* OGPを設定するサイトURL */}
          <meta property='og:url' content={ process.env.NEXT_PUBLIC_WEB_URL } />
          {/* OGP画像サイズ(Facebookでの初回レンダリング用) */}
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />

          {/* FacebookのアプリID */}
          <meta property='fb:app_id' content='' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;