import { useState, ReactElement, Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic'
import useInsertRepliesLikes from '@/hooks/mutate/insert/useInsertRepliesLikes'
import useDeleteRepliesLikes from '@/hooks/mutate/delete/useDeleteRepliesLikes'

import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { RepliesType } from '@/types/types'

const Login = dynamic(import('@/components/dialog/Login'))

const Like = ({ handle, children }: { handle: () => void; children: ReactElement }) => {
  return (
    <IconButton aria-label='いいね' color='primary' onClick={handle}>
      {children}
    </IconButton>
  )
}

type Props = {
  index: number
  id: string
  user_id: string
  setData: Dispatch<SetStateAction<RepliesType[]>>
}

const InsertLikes = ({ index, id, user_id, setData }: Props) => {
  const mutate = useInsertRepliesLikes(index, id, user_id, setData)

  return (
    <Like handle={() => mutate()}>
      <FavoriteBorderIcon color='action' />
    </Like>
  )
}

const DeleteLikes = ({ index, id, user_id, setData }: Props) => {
  const mutate = useDeleteRepliesLikes(index, id, user_id, setData)

  return (
    <Like handle={() => mutate()}>
      <FavoriteIcon />
    </Like>
  )
}

// ログイン時のいいねボタン
export const LoginLike = ({ index, id, user_id, setData, replies_like }: Props & { replies_like: boolean }) => {
  return (
    replies_like ?
    <DeleteLikes
      index={ index }
      id={ id }
      user_id={ user_id }
      setData={ setData }
    />
    :
    <InsertLikes
      index={ index }
      id={ id }
      user_id={ user_id }
      setData={ setData }
    />
  )
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
