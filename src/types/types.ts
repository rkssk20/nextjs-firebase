// ダイアルコンポーネントに渡すprops
export type DialogProps = {
  open: boolean
  handleClose: () => void
}

// カテゴリ
export type CategoriesProps = {
  text: 'フロント' | 'サーバーレス'
  url: 'front' | 'serverless'
}

// 記事api
export type ArticleType = {
  id: string;
  display_id: string;
  title: string;
  created_at: string;
  image: string;
  likes: number;
  like: boolean;
  details: string;
  name: string;
  tags: number[];
  mine: boolean;
  comments: number;
}

// プロフィールのISR用api
export type ProfilePageType = {
  display_id: string
  name: string
  image: string
  details: string
}

// プロフィールの詳細api
export type ProfileDetailsType = {
  follow: number
  follower: number
  mine: boolean
  following: boolean
}

// フォロー、フォロワーapi
export type FollowType = {
  display_id: string
  name: string
}[]

// コメント
export type CommentType = {
  id: number
  display_id: string
  created_at: string
  image: string
  likes: number,
  like: boolean,
  content: string
  name: string
  mine: boolean,
  replies: number
}

// リプライ
export type RepliesType = {
  id: number
  comment_id: number
  display_id: string
  created_at: string
  image: string
  likes: number,
  like: boolean,
  content: string
  name: string
  mine: boolean
}