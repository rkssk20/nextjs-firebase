import { useState, MouseEvent, TouchEvent } from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/dialog/Login'))

import styles from '@/styles/atoms/favorite.module.scss'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'

type LogoutFavoriteProps = {
  likes: number;
}

export  const LogoutFavorite = ({ likes }: LogoutFavoriteProps) => {
  const [loginDialog, setLoginDialog] = useState(false)

  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
  }

  return (
    <Stack
      className={ styles.stack }
      direction='row'
      alignItems='center'
    >
      <IconButton
        aria-label='いいね'
        className={ styles.favorite }
        classes={{ root: styles.favorite_root }}
        component='div'
        onClick={ handleLikes }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Typography variant='caption'>{ likes }</Typography>

      {/* ログインダイアログ */}
      { loginDialog &&
        <Login
          open={ loginDialog }
          handleClose={ () => setLoginDialog(false) }
        />
      }
    </Stack>
  )
}

type LoginFavoriteProps = LogoutFavoriteProps & {
  like: boolean;
}

export const LoginFavorite = ({ likes, like }: LoginFavoriteProps) => {
  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  return (
    <Stack
      className={ styles.stack }
      direction='row'
      alignItems='center'
    >
      <IconButton
        aria-label='いいね'
        className={ styles.favorite }
        classes={{ root: styles.favorite_root }}
        component='div'
        onClick={ handleLikes }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        { like ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon /> }
      </IconButton>

      <Typography variant='caption'>{ likes }</Typography>
    </Stack>
  )
}