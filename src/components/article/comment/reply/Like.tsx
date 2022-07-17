import { useState, ReactElement } from 'react'
import dynamic from 'next/dynamic'
import type { definitions } from '@/types/supabase'
import useMutateRepliesLike from '@/hooks/mutate/useMutateRepliesLikes'

import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Login = dynamic(import('@/components/dialog/Login'))

const Like = ({ handle, children }: { handle: () => void; children: ReactElement }) => {
  return (
    <IconButton aria-label='いいね' color='primary' onClick={handle}>
      {children}
    </IconButton>
  )
}

type LoginLikeProps = {
  id: string
  replies_like: boolean
}

const InsertLikes = () => {
  return (
    <Like handle={() => {}}>
      <FavoriteBorderIcon color='action' />
    </Like>
  )
}

const DeleteLikes = () => {
  return (
    <Like handle={() => {}}>
      <FavoriteIcon />
    </Like>
  )
}

// ログイン時のいいねボタン
export const LoginLike = ({ id, replies_like }: LoginLikeProps) => {
  return ( replies_like ? <DeleteLikes /> : <InsertLikes /> )
}

// ログアウト時のいいねボタン
export const LogoutLike = () => {
  const [dialog, setDialog] = useState(false)

  if (dialog) return <Login dialog={dialog} handleClose={() => setDialog(false)} />

  return (
    <Like handle={() => setDialog(true)}>
      <FavoriteBorderIcon color='action' />
    </Like>
  )
}
