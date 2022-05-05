import type {MouseEvent, TouchEvent } from 'react'
import { useRouter } from 'next/router'
import useCreatedAt from '@/hooks/useCreatedAt'
import Favorite from '@/atoms/Favorite'

import styles from '@/styles/components/post/actions.module.scss'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface ActionsProps {
  id: string;
  likes: number;
  like: boolean;
  created_at: string;
}

const Actions = ({ id, likes, like, created_at }: ActionsProps) => {
  const created = useCreatedAt(created_at)
  const router = useRouter()

  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // setShareOpen(true)
  }

  const handleShare = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push({
      pathname: router.asPath,
      query: { share: id }
    })
    // setDialogOpen(1)
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
      <Favorite like={ like } likes={ likes } />

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

      {/* 詳細ボタン */}
        {/* <IconButton
          aria-label='詳細'
          component='div'
          id="demo-positioned-button"
          aria-controls={ detailsBoolean ? 'demo-positioned-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ detailsBoolean ? 'true' : undefined }
          onClick={ handleDetails }
          onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
        >
          <MoreVertIcon />
        </IconButton> */}
    </CardActions>
  )
}

export default Actions