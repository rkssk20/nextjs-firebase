import { ReactElement, Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import useSelectLikes from '@/hooks/select/useSelectLikes'
import useInsertArticlesLikes from '@/hooks/mutate/insert/useInsertArticlesLikes'
import useArticlesLikesDelete from '@/hooks/mutate/delete/useArticlesLikesDelete'

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
  path: string
  user_id: string
  setLikeCountState: Dispatch<SetStateAction<number>>
}

type MutateProps = LoginLikeProps & {
  setData: Dispatch<SetStateAction<boolean>>
}

// いいねするボタン
const InsertLike = ({ path, user_id, setLikeCountState, setData }: MutateProps) => {
  const mutate = useInsertArticlesLikes(user_id, path, setLikeCountState, setData)

  return (
    <Like handle={() => mutate()}>
      <FavoriteBorderIcon color='action' />
    </Like>
  )
}

// いいねを取り消すボタン
const DeleteLikes = ({path, user_id, setLikeCountState, setData}: MutateProps) => {
  const mutate = useArticlesLikesDelete(path, user_id, setData, setLikeCountState)
  
  return (
    <Like handle={() => mutate()}>
      <FavoriteIcon />
    </Like>
  )
}

// ログイン時のいいねボタン
export const LoginLike = ({ path, user_id, setLikeCountState }: LoginLikeProps) => {
  const { data, loading, setData } = useSelectLikes(path)

  if(loading) return null

  return (
    !loading && data ?
      <DeleteLikes
        path={ path }
        user_id={ user_id }
        setData={ setData }
        setLikeCountState={ setLikeCountState }
      />
      :
      <InsertLike
        user_id={ user_id }
        path={ path }
        setLikeCountState={ setLikeCountState}
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
