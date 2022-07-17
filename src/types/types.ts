import type { MouseEvent } from 'react'
import type { definitions } from '@/types/supabase'

// プロフィール
export type ProfileType = {
  id: string
  username: string
  avatar: string
  details: string
  follow_count: number
  follower_count: number
}

// カテゴリ
export type CategoriesProps = {
  text: 'フロント' | 'サーバーレス'
  url: 'front' | 'serverless'
}

// 記事一つ
export type ArticleType = {
  id: string
  user_id:string
  image: string
  title: string
  details: string
  like_count: number
  comment_count: number
  created_at: string
  avatar: string
  username: string
  categories: string[] | number[]
}

// アカウントトップ10
export type ProfilesSummaryType = {
  id: definitions['profiles']['id']
  username: definitions['profiles']['username']
  avatar: definitions['profiles']['avatar']
  details: definitions['profiles']['details']
  follower_count: definitions['profiles']['follower_count']
}

// ダイアログ
export type DialogProps = {
  dialog: boolean
  handleClose: (e?: MouseEvent) => void
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
  id: string
  user_id: string
  comment: string
  like_count: number
  comments_likes: boolean
  reply_count: number
  created_at: string
  username: string
  avatar: string
}

// リプライ
export type RepliesType = {
  id: string
  user_id: string
  comment: string
  like_count: number
  replies_likes: boolean
  created_at: string
  username: string
  avatar: string
  
}

// トレンド
export type TrendType = {
  id: string
  title: string
  image: string
  name: string
}
