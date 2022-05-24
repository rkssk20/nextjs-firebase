import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, dialogState } from '@/lib/recoil'

import styles from '@/styles/components/article/comment/content.module.scss'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type ContentProps = {
  path: string
  id: number
  content: string
  likes: number
  like: boolean
  mine: boolean
}

const Content = ({ path, id, content, likes, like, mine }: ContentProps) => {
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
    <div className={ styles.field }>
      {/* 本文 */}
      <div>{ content }</div>

      {/* いいね、詳細ボタン */}
      <div className={ styles.actions_field }>
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
          { likes.toLocaleString() }
        </Typography>

        {/* 詳細ボタン */}
        <IconButton className={ styles.icon_button } classes={{ root: styles.icon_button_root }}>
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
      </div>
    </div>
  )
}

export default Content