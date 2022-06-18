import type { MouseEvent, TouchEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import type { ArticleType } from '@/types/types'
import { dialogState } from '@/lib/recoil'

import styles from '@/styles/components/post/actions.module.scss'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

type ActionsProps = {
  user_id: ArticleType['user_id']
  like_count: ArticleType['like_count'];
  comment_count: ArticleType['comment_count']
}

const Actions = ({ user_id, like_count, comment_count }: ActionsProps) => {
  const setDialog = useSetRecoilState(dialogState)

  // 共有ダイアログを開く
  const handleShare = (e: MouseEvent) => {
    e.stopPropagation()
    setDialog({
      open: true,
      content: 'share',
      id: user_id
    })
  }

  return (
    <div className={ styles.actions }>
      {/* いいねボタン */}
      <FavoriteBorderIcon className={ styles.favorite } color='info' />

      {/* いいね数 */}
      <Typography variant='caption'>
        { like_count.toLocaleString() }
      </Typography>

      {/* コメントアイコン */}
      { (comment_count > 0) && <ChatBubbleOutlineIcon className={ styles.comments_icon } /> }

      {/* コメント数 */}
      { (comment_count > 0) &&
        <Typography className={ styles.comments_count } variant='caption'>
          { comment_count.toLocaleString() }
        </Typography>
      }

      {/* 共有ボタン */}
      <IconButton
        className={ styles.icon_button }
        classes={{ root: styles.icon_button_root }}
        aria-label='共有'
        onClick={ handleShare }
        onMouseDown={ (e: MouseEvent) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent) => e.stopPropagation() }
      >
        <ShareIcon />
      </IconButton>
    </div>
  )
}

export default Actions