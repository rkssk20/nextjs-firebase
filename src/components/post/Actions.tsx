import type { MouseEvent, TouchEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, dialogState } from '@/lib/recoil'

import styles from '@/styles/components/post/actions.module.scss'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

type ActionsProps = {
  display_id: string
  likes: number;
  like: boolean;
  comments: number
}

const Actions = ({ display_id, likes, like, comments }: ActionsProps) => {
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)

  // いいね処理
  const handleLike = (e: MouseEvent) => {
    e.stopPropagation()

    if(account.data) {
      console.log('favorite')
  
    } else {
      setDialog({
        open: true,
        content: 'login',
        id: null
      })
    }
  }

  // 共有ダイアログを開く
  const handleShare = (e: MouseEvent) => {
    e.stopPropagation()
    setDialog({
      open: true,
      content: 'share',
      id: display_id
    })
  }

  return (
    <div className={ styles.actions }>
      {/* いいねボタン */}
      <IconButton
        aria-label='いいね'
        color='primary'
        component='button'
        onClick={ handleLike }
        onMouseDown={ (e: MouseEvent) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent) => e.stopPropagation() }
      >
        { like ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      </IconButton>

      {/* いいね数 */}
      <Typography variant='caption'>
        { likes.toLocaleString() }
      </Typography>

      {/* コメントアイコン */}
      { (comments > 0) && <ChatBubbleOutlineIcon className={ styles.comments_icon } /> }

      {/* コメント数 */}
      { (comments > 0) &&
        <Typography className={ styles.comments_count } variant='caption'>
          { comments.toLocaleString() }
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