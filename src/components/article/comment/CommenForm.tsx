import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useInsertComments from '@/hooks/mutate/insert/useInsertComments'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
import Form from '@/atoms/Form'

import styles from '@/styles/components/article/comment/commentForm.module.scss'
import Skeleton from '@mui/material/Skeleton'

const CommentForm = ({ path }: { path: string }) => {
  const [text, setText] = useState('')
  const account = useRecoilValue(accountState)
  const { mutate, isLoading } = useInsertComments(path)

  // コメントの投稿
  const handlePost = () => {
    if(isLoading) return

    mutate(text)

    setText('')
  }

  if(account.loading) return <Skeleton className={ styles.skeleton } variant='rectangular' />

  return (
    <Form
      text={ text }
      setText={ setText }
      name={ account.data?.username ?? '' }
      placeholder='コメントする'
    >
      <div className={ styles.under }>
        {/* 送信ボタン */}
        { Boolean(text) ?
          <ContainedButton text='送信' handle={ handlePost } />
          :
          <DisabledButton text='送信' />
        }
      </div>
    </Form>
  )
}

export default CommentForm