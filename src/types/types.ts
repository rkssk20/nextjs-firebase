import { definitions } from "@/types/supabase"

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

// 記事一つ
export type CustomArticlesType = {
  id: definitions['articles']['id']
  user_id: definitions['articles']['user_id']
  image: definitions['articles']['image']
  title: definitions['articles']['title']
  details: definitions['articles']['details']
  like_count: definitions['articles']['like_count']
  comment_count: definitions['articles']['comment_count']
  created_at: definitions['articles']['created_at']
  categories: {
    category: definitions['categories']['category']
  }[] | undefined
  username: definitions['profiles']['username']
  avatar: definitions['profiles']['avatar']
  likes_id: definitions['likes']['id'] | undefined
}

// 記事一つ
export type ArticleType = {
  id: string;
  title: string;
  details: string;
  image?: string | undefined;
  like_count: number;
  comment_count: number;
  created_at: string;
  categories: {
    category: number
  }[]
  profiles: {
    id: string
    usernmae: string
    avatar: string | null
  }
  likes: {
    id: number | undefined
  }[]
}

// プロフィールのISR用api
export type ProfilePageType = {
  id: string | number
  username: string
  avatar: string | undefined
  details: string
  follow_count: number
  follower_count: number
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

// トレンド
export type TrendType = {
  id: string
  title: string
  image: string
  name: string
}