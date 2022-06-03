import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, dialogState } from '@/lib/recoil'
import ReplyForm from '@/components/article/comment/replya/ReplyForm'

import styles from '@/styles/components/article/comment/actions.module.scss'
import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type ActionsProps = {
  path: string
  id: number
  content: string
  likes: number
  like: boolean
  mine: boolean
}

const Actions = ({ path, id, content, likes, like, mine }: ActionsProps) => {
  const [formOpen, setFormOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)

  // いいね
  const handleLikes = () => {
    if(account) {
      console.log('favorite')

    } else {
      setDialog({
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
    setDialog({ content: 'article_delete', id: path })
    handleClose()
  }
  
  // 報告ダイアログ
  const handleReport = () => {
    setDialog({ content: 'article_report', id: path })
    handleClose()
  }
  
  return (
    <div>
      {/* 本文 */}
      <div className={ styles.content }>{ content }</div>

      <div className={ styles.actions_field }>
        {/* 返信ボタン */}
        <Button
          className={ styles.reply_button }
          variant='outlined'
          color='info'
          startIcon={
            <ChatBubbleOutlineIcon />
          }
          onClick={ () => setFormOpen(true) }
        >
          返信
        </Button>

        {/* いいねボタン */}
        <IconButton
          aria-label='いいね'
          color='primary'
          component='div'
          onClick={ handleLikes }
        >
          { like ? <FavoriteIcon /> : <FavoriteBorderIcon color='info' /> }
        </IconButton>

        {/* いいね数 */}
        <Typography className={ styles.favorite_count } variant='caption'>
          { likes.toLocaleString() }
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
          { mine ?
            <MenuItem onClick={ handleDelete }>コメントを削除</MenuItem>
            :
            <MenuItem onClick={ handleReport }>コメントの問題を報告</MenuItem>
          }
        </Menu>
      </div>

      {/* 返信フォーム */}
      { formOpen && <ReplyForm setFormOpen={ setFormOpen } /> }
    </div>
  )
}

export default Actions