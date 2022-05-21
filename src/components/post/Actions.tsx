import type { MouseEvent, TouchEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { dialogState } from '@/lib/recoil'
import useCreatedAt from '@/hooks/useCreatedAt'
import Favorite from '@/atoms/Favorite'

import styles from '@/styles/components/post/actions.module.scss'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'

type ActionsProps = {
  display_id: string
  likes: number;
  like: boolean;
  created_at: string;
}

const Actions = ({ display_id, likes, like, created_at }: ActionsProps) => {
  const setDialog = useSetRecoilState(dialogState)
  const created = useCreatedAt(created_at)

  // 共有ダイアログを開く
  const handleShare = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialog({ content: 'share', id: display_id })
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
    </CardActions>
  )
}

export default Actions