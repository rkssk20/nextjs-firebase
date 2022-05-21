import type { MouseEvent, TouchEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, dialogState } from '@/lib/recoil'

import styles from '@/styles/atoms/favorite.module.scss'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'

type FavoriteProps = {
  like: boolean
  likes: number;
}

// ログアウト中のいいねボタン
const Favorite = ({ likes, like }: FavoriteProps) => {
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)

  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if(account.display_id) {
     console.log('favorite')

    } else {
      setDialog({
        content: 'login',
        id: null
      })
    }
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
        color='primary'
        component='div'
        onClick={ handleLikes }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        { like ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      </IconButton>

      <Typography variant='caption'>{ likes }</Typography>
    </Stack>
  )
}

export default Favorite