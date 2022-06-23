import { ReactElement, Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import useMutateLikes from '@/hooks/mutate/useMutateLikes';

import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Login = dynamic((import('@/components/dialog/Login')))

const Like = ({ handle, children }: { handle: () => void, children: ReactElement }) => {
  return (
    <IconButton
      aria-label='いいね'
      color='primary'
      onClick={ handle }
    >
      { children }
    </IconButton>
  )
}

type LoginLikeProps = {
  path: string
  id: number | undefined
  isFetching: boolean
  setLikeCountState: Dispatch<SetStateAction<number>>
}

// ログイン時のいいねボタン
export const LoginLike = ({ path, id, isFetching, setLikeCountState }: LoginLikeProps) => {
  const { mutate, isLoading } = useMutateLikes(path, setLikeCountState)

  // いいね処理
  const handleLikes = () => {
    if(isFetching || isLoading) return

    mutate(id)
  }

  return (
    <Like handle={ handleLikes }>
      { id && id ? <FavoriteIcon /> : <FavoriteBorderIcon color='info' /> }
    </Like>
  )
}

// ログアウト時のいいねボタン
export const LogoutLike = () => {
  const [dialog, setDialog] = useState(false)

  if(dialog) return (
    <Login
      dialog={ dialog }
      setDialog={ setDialog }
      handleClose={ () => setDialog(false) }
    />
  )

  return (
    <Like handle={ () => setDialog(true) }>
      <FavoriteBorderIcon color='info' />
    </Like>
  )
}