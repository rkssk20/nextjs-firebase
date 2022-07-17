import { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import type { CommentType } from '@/types/types'
import useInsertCommentsLikes from '@/hooks/mutate/insert/useInsertCommentsLikes'
import useDeleteCommentsLikes from '@/hooks/mutate/delete/useDeleteCommentsLikes'

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

type Props = {
  index: number
  id: string
  setData: Dispatch<SetStateAction<CommentType[]>>
}

const InsertLikes = ({ index, id, setData }: Props) => {
  const mutate = useInsertCommentsLikes(index, id, setData)

  return (
    <Like handle={() => mutate()}>
      <FavoriteBorderIcon color='action' />
    </Like>
  )
}

const DeleteLikes = ({ index, id, setData }: Props) => {
  const mutate = useDeleteCommentsLikes(index, id, setData)

  return (
    <Like handle={() => mutate()}>
      <FavoriteIcon />
    </Like>
  )
}

// ログイン時のいいねボタン
export const LoginLike = ({ index, id, comments_likes, setData }: Props & { comments_likes: boolean }) => {
  return (
    comments_likes ? (
      <DeleteLikes
        index={ index }
        id={ id }
        setData={ setData }
      />
    ) : (
      <InsertLikes
        index={ index }
        id={ id }
        setData={ setData }
      />
    )
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
