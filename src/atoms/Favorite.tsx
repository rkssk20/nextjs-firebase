import type {MouseEvent, TouchEvent } from 'react'

import styles from '@/styles/atoms/favorite.module.scss'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'

interface FavoriteProps {
  like: boolean;
  likes: number;
}

const Favorite = ({ like, likes }: FavoriteProps) => {
  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // setShareOpen(true)
  }

  return (
    <Stack
      className={ styles.stack }
      direction='row'
      alignItems='center'
    >
      <IconButton
        className={ styles.favorite }
        classes={{ root: styles.favorite_root }}
        aria-label='いいね'
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

export default Favorite