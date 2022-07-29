## Next.js × Firebase

[https://nextjs-firebase.tk](https://nextjs-firebase.tk)

Next.js と Firebase を使用した技術ブログ風のポートフォリオです。ログイン・投稿・いいね・コメントなどをお試しください
[Supabase 版](https://nextjs-firebase.tk)と[Hasura 版](https://nextjs-hasura.tk)もあります

<br>

## 技術選定

詳細は[Next.js × Firebase の技術選定](https://nextjs-firebase.tk/article/5fdS-oH1HKBOScdXUjJzz)

### フロント

- Next.js
- Typescript
- Recoil
- Mui (旧 Material UI)
- SCSS

### サーバー

- Firebase Authentication (認証)
- Firestore (DB)
- Cloud Storage for Firebase (ストレージ)

### ホスティング

- Vercel

### その他

- ESlint, Prettier
- Google Analytics

<br>

## 実装した機能

### CRUD

- 記事・コメント・返信の投稿、削除
- 記事・コメント・返信へのいいね
- アカウント作成、削除、プロフィール変更
- ユーザーのフォロー
- 記事やアバター画像のアップロード

など

### 検索履歴、下書き

- Recoil (Persist)

### レスポンシブデザイン

- Mui と SCSS

### トレンド一覧

- Google Analytics で PV 数を測定
- Google Analytics Data API で人気のページを取得

### Markdown

- エディターは react-simplemde-editor
- unified で変換して表示

### 無限スクロール

- Intersection Observer API で ref を監視

### 検索

- Firebase では Like 検索ができないため、前方一致のみ実装

![image](https://user-images.githubusercontent.com/67939683/181830589-395bb559-3c4d-4921-ab07-59bf1595a38a.jpeg)
