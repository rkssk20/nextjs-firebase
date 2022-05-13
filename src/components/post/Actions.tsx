import type { Dispatch, MouseEvent, SetStateAction, TouchEvent } from 'react'
import useCreatedAt from '@/hooks/useCreatedAt'
import { LoginFavorite, LogoutFavorite } from '@/atoms/Favorite'

import styles from '@/styles/components/post/actions.module.scss'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'

interface ActionsProps {
  likes: number;
  like: boolean;
  created_at: string;
  setShareDialog: Dispatch<SetStateAction<boolean>>;
}

const Actions = ({ likes, like, created_at, setShareDialog }: ActionsProps) => {
  const created = useCreatedAt(created_at)

  const test_login = false

  // 共有ダイアログを開く
  const handleShare = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShareDialog(true)
  }

  return (
    <CardActions className={ styles.actions } classes={{ root: styles.actions_root }}>
      {/* 投稿時間 */}
      <Typography
        className={ styles.created }
        variant='caption'
      >
        { created }
      </Typography>

      {/* いいねボタンといいね数 */}
      { test_login ?
        <LoginFavorite like={ like } likes={ likes } />
        :
        <LogoutFavorite likes={ likes } />
      }

      {/* 共有ボタン */}
      <IconButton
        aria-label='共有'
        component='div'
        onClick={ handleShare }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        <ShareIcon />
      </IconButton>
    </CardActions>
  )
}

export default Actions