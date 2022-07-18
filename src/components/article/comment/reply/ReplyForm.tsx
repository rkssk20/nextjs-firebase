import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useInsertReplies from '@/hooks/mutate/insert/useInsertReplies'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
import { LoginForm, LogoutForm } from '@/atoms/Form'

import styles from '@/styles/components/article/comment/reply/replyForm.module.scss'
import Button from '@mui/material/Button'

type ReplyFormProps = {
  path: string
  id: string
  articles_user_id: string
  user_id: string
  setFormOpen: Dispatch<SetStateAction<boolean>>
  handleReply: (uuid: string, comment: string) => void
}

type LoginProps = ReplyFormProps & {
  username: string
}

const Login = ({ path, id, articles_user_id, user_id, setFormOpen, username, handleReply }: LoginProps) => {
  const [text, setText] = useState('')
  const mutate = useInsertReplies(path, id, articles_user_id, user_id, setFormOpen, handleReply)

  return (
    <LoginForm text={text} setText={setText} name={username} placeholder='返信する'>
      {/* キャンセルボタン */}
      <Button
        className={styles.cancel_button}
        classes={{ root: styles.cancel_button_root }}
        color='inherit'
        onClick={() => setFormOpen(false)}
      >
        キャンセル
      </Button>

      {/* 送信ボタン */}
      {Boolean(text) ? (
        <ContainedButton text='返信' handle={() => mutate(text)} />
      ) : (
        <DisabledButton text='返信' />
      )}
    </LoginForm>
  )
}

const ReplyForm = ({ path, id, user_id, articles_user_id, setFormOpen, handleReply }: ReplyFormProps) => {
  const account = useRecoilValue(accountState)

  // ログイン時
  if (account.data) {
    return <Login
      path={ path }
      id={id}
      articles_user_id={ articles_user_id }
      user_id={ user_id }
      setFormOpen={setFormOpen}
      username={account.data.username}
      handleReply={ handleReply }
    />

    // ログアウト時
  } else {
    return <LogoutForm placeholder='返信する' />
  }
}

export default ReplyForm
