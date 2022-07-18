import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import { LoginLike, LogoutLike } from '@/components/article/comment/reply/Like'

import styles from '@/styles/components/article/comment/reply/actions.module.scss'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { RepliesType } from '@/types/types'

const ReplyDelete = dynamic(import('@/components/dialog/ReplyDelete'))
const Report = dynamic(import('@/components/dialog/Report'))

type Props = {
  path: string
  index: number
  id: string
  articles_user_id: string
  user_id: string
  comment_id: string
  comment: string
  like_count: number
  replies_like: boolean
  setData: Dispatch<SetStateAction<RepliesType[]>>
}

const Actions = ({ path, index, id, articles_user_id, user_id, comment_id, comment, like_count, replies_like, setData }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialog, setDialog] = useState(false)
  const open = Boolean(anchorEl)
  const account = useRecoilValue(accountState)

  // 詳細メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null)
  }

  // 削除ダイアログ
  const handleDialogOpen = () => {
    setDialog(true)
    handleClose()
  }

  return (
    <div className={styles.reply_field}>
      {/* 本文 */}
      <div className={styles.content}>{comment}</div>

      <div className={styles.actions_field}>
        {/* いいねボタン */}
        {account.data ? (
          <LoginLike
            index={ index }
            id={id}
            user_id={ user_id }
            setData={ setData }
            replies_like={replies_like}
          />
        ) : (
          <LogoutLike />
        )}

        {/* いいね数 */}
        <Typography className={styles.favorite_count} variant='caption'>
          {like_count.toLocaleString()}
        </Typography>

        {/* 詳細ボタン */}
        <IconButton
          className={styles.icon_button}
          classes={{ root: styles.icon_button_root }}
          aria-label='詳細'
          id='positioned-button'
          aria-controls={open ? 'positioned-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>

        {/* 詳細メニュー */}
        { !account.loading &&
          <Menu id='positioned-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleDialogOpen}>
              {user_id === account.data?.id ? 'コメントを削除' : 'コメントの問題を報告'}
            </MenuItem>
          </Menu>
        }
      </div>

      {dialog && user_id === account.data?.id ? (
        // 削除ダイアログ
        <ReplyDelete
          dialog={dialog}
          handleClose={() => setDialog(false)}
          path={ path }
          articles_user_id={ articles_user_id }
          index={ index }
          comment_id={ comment_id }
          user_id={ user_id }
          id={id}
          setData={ setData }
        />
      ) : (
        // 報告ダイアログ
        <Report dialog={dialog} handleClose={() => setDialog(false)} />
      )}
    </div>
  )
}

export default Actions
