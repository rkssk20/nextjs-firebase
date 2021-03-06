import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import type { CommentType } from '@/types/types'
import { LoginLike, LogoutLike } from '@/components/article/comment/Like'
import Popup from '@/atoms/Popup'
import ReplyForm from '@/components/article/comment/reply/ReplyForm'

const CommentDelete = dynamic(import('@/components/dialog/CommentDelete'))
const Report = dynamic(import('@/components/dialog/Report'))

import styles from '@/styles/components/article/comment/actions.module.scss'
import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'

type ActionsProps = {
  index: number
  path: string
  id: string
  articles_user_id: string
  user_id: string
  comment: string
  like_count: number
  comments_likes: boolean
  setData: Dispatch<SetStateAction<CommentType[]>>
}

const Actions = ({ index, path, id, articles_user_id, user_id, comment, like_count, comments_likes, setData }: ActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [dialog, setDialog] = useState(false)
  const open = Boolean(anchorEl)
  const account = useRecoilValue(accountState)

  // ダイアログを表示
  const handleDialog = () => {
    setDialog(true)
    setAnchorEl(null)
  }

  const handleReply = () => {
    setData(prev => prev.map((item, number) => (
      (index === number) ? {
        ...item,
        reply_count: item.reply_count + 1
      } : item
    )))
  }

  return (
    <div>
      {/* 本文 */}
      <div className={styles.content}>{comment}</div>

      <div className={styles.actions_field}>
        {/* 返信ボタン */}
        <Button
          className={styles.reply_button}
          classes={{ root: styles.reply_button_root }}
          variant='outlined'
          color='inherit'
          startIcon={<ChatBubbleOutlineIcon />}
          onClick={() => setFormOpen(true)}
        >
          返信
        </Button>

        {/* いいねボタン */}
        {account.data ? (
          <LoginLike
            index={ index }
            id={id}
            comments_likes={comments_likes}
            setData={ setData }
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

        <Popup anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <MenuItem onClick={handleDialog}>
            {(user_id === account.data?.id) ? 'コメントを削除' : 'コメントの問題を報告'}
          </MenuItem>
        </Popup>
      </div>

      {/* 返信フォーム */}
      {formOpen &&
        <ReplyForm
          path={ path }
          id={id}
          articles_user_id={ articles_user_id }
          user_id={ user_id }
          setFormOpen={setFormOpen}
          handleReply={ handleReply }
        />}

      {dialog && (user_id === account.data?.id) ? (
        <CommentDelete
          dialog={dialog}
          handleClose={() => setDialog(false)}
          index={ index }
          user_id={ user_id }
          path={path}
          id={id}
          setData={ setData }
        />
      ) : (
        <Report dialog={dialog} handleClose={() => setDialog(false)} />
      )}
    </div>
  )
}

export default Actions
