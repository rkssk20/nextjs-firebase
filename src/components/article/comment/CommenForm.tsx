import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import type { CommentType } from '@/types/types'
import useInsertComments from '@/hooks/mutate/insert/useInsertComments'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
import { LoginForm, LogoutForm } from '@/atoms/Form'

type Props = {
  path: string
  user_id: string
  setData: Dispatch<SetStateAction<CommentType[]>>
}

const Login = ({ path, user_id, username, setData }: Props & { username: string}) => {
  const [text, setText] = useState('')
  const mutate = useInsertComments(path, user_id, setData, setText)

  return (
    <LoginForm text={text} setText={setText} name={username} placeholder='コメントする'>
      {/* <div> */}
        {/* 送信ボタン */}
        {Boolean(text) ? (
          <ContainedButton text='送信' handle={() => mutate(text)} />
        ) : (
          <DisabledButton text='送信' />
        )}
      {/* </div> */}
    </LoginForm>
  )
}

const CommentForm = ({ path, user_id, setData }: Props) => {
  const account = useRecoilValue(accountState)

  if (account.data) {
    return (
      <Login
        path={path}
        user_id={ user_id }
        username={account.data.username}
        setData={ setData }
      />
    )

    // ログアウト時
  } else {
    return <LogoutForm placeholder='コメントする' />
  }
}

export default CommentForm
