import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountState, dialogState } from '@/lib/recoil';

import styles from '@/styles/components/article/sub.module.scss'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type SubProps = {
  like: boolean
  likes: number
  mine: boolean
  path: string
}

const Sub = ({ like, likes, mine, path }: SubProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)

  // いいね処理
  const handleLikes = () => {
    if(account.display_id) {
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
    <CardActions className={ styles.card_actions } classes={{ root: styles.card_actions_root }}>
      {/* いいねボタン */}
      <IconButton
        aria-label='いいね'
        color='primary'
        component='div'
        onClick={ handleLikes }
      >
        { like ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      </IconButton>

      {/* いいね数 */}
      <Typography className={ styles.favorite_count } variant='caption'>
        { likes .toLocaleString() }
      </Typography>

      {/* 詳細ボタン */}
      <IconButton
        aria-label='詳細'
        className={ styles.detail_button }
        classes={{ root: styles.detail_button_root }}
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
          <MenuItem onClick={ handleDelete }>記事を削除</MenuItem>
          :
          <MenuItem onClick={ handleReport }>記事の問題を報告</MenuItem>
        }
      </Menu>
    </CardActions>
  )
}

export default Sub