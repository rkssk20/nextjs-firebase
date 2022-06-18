import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import type { definitions } from '@/types/supabase';
import { accountState, dialogState } from '@/lib/recoil';
import { supabase } from '@/lib/supabaseClient';
import useSelectLikes from '@/hooks/select/useSelectLikes';
import useMutateLikes from '@/hooks/mutate/useMutateLikes';

import styles from '@/styles/components/article/actions.module.scss'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type ActionsProps = {
  like_count: definitions['articles']['like_count']
  user_id: definitions['articles']['user_id']
  path: string
}

const Actions = ({ like_count, user_id, path }: ActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [likeCountState, setLikeCountState] = useState(like_count)
  const open = Boolean(anchorEl);
  const account = useRecoilValue(accountState)
  const setDialog = useSetRecoilState(dialogState)
  const { data, isFetching } = useSelectLikes(path)
  const { mutate, isLoading } = useMutateLikes(path, setLikeCountState)

  // いいね処理
  const handleLikes = () => {
    if(isFetching || isLoading) return

    if(account.data) {
     mutate(data?.id)

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
    <div className={ styles.card_actions }>
      {/* いいねボタン */}
      <IconButton
        aria-label='いいね'
        color='primary'
        component='div'
        onClick={ handleLikes }
      >
        { data?.id ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      </IconButton>

      {/* いいね数 */}
      <Typography className={ styles.favorite_count } variant='caption'>
        { likeCountState.toLocaleString() }
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
        { (user_id === supabase.auth.user()?.id) ?
          <MenuItem onClick={ handleDelete }>記事を削除</MenuItem>
          :
          <MenuItem onClick={ handleReport }>記事の問題を報告</MenuItem>
        }
      </Menu>
    </div>
  )
}

export default Actions