import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
import { accountState, dialogState } from '@/lib/recoil'
import useMutateRepliesLikes from '@/hooks/mutate/useMutateRepliesLikes'

import styles from '@/styles/components/article/comment/reply/actions.module.scss'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Props = {
  path: string
  id: definitions['replies']['id']
  user_id: definitions['replies']['user_id']
  comment_id: definitions['replies']['comment_id']
  comment: definitions['replies']['comment']
  like_count: definitions['replies']['like_count']
  replies_like: definitions['replies_likes'][] | undefined
}

const Actions = ({ path, id, user_id, comment_id, comment, like_count, replies_like }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)
  const { mutate, isLoading } = useMutateRepliesLikes(comment_id, id)

  // いいね
  const handleLikes = () => {
    if(isLoading) return

    if(account.data) {
      mutate((replies_like && (replies_like.length > 0)) ? replies_like[0].id : undefined) 

    } else {
      setDialog({
        open: true,
        content: 'login',
        id: null
      })
    }
  }

  // 詳細メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 削除ダイアログ
  const handleDelete = () => {
    setDialog({
      open: true,
      content: 'article_delete',
      id: path
    })
    handleClose()
  }
  
  // 報告ダイアログ
  const handleReport = () => {
    setDialog({
      open: true,
      content: 'article_report',
      id: path
    })
    handleClose()
  }
  
  return (
    <div className={ styles.reply_field }>
      {/* 本文 */}
      <div className={ styles.content }>{ comment }</div>

      <div className={ styles.actions_field }>
        {/* いいねボタン */}
        <IconButton
          aria-label='いいね'
          color='primary'
          component='div'
          onClick={ handleLikes }
        >
          { replies_like && replies_like[0]?.id ? <FavoriteIcon /> : <FavoriteBorderIcon color='info' /> }
        </IconButton>

        {/* いいね数 */}
        <Typography className={ styles.favorite_count } variant='caption'>
          { like_count.toLocaleString() }
        </Typography>

        {/* 詳細ボタン */}
        <IconButton
          className={ styles.icon_button }
          classes={{ root: styles.icon_button_root }}
          aria-label='詳細'
          id="positioned-button"
          aria-controls={ open ? 'positioned-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ open ? 'true' : undefined }
          onClick={ (e) => setAnchorEl(e.currentTarget) }
        >
          <MoreVertIcon />
        </IconButton>

        {/* 詳細メニュー */}
        <Menu
          id="positioned-menu"
          anchorEl={ anchorEl }
          open={ open }
          onClose={ handleClose }
        >
          { (user_id === supabase.auth.user()?.id) ?
            <MenuItem onClick={ handleDelete }>コメントを削除</MenuItem>
            :
            <MenuItem onClick={ handleReport }>コメントの問題を報告</MenuItem>
          }
        </Menu>
      </div>
    </div>
  )
}

export default Actions