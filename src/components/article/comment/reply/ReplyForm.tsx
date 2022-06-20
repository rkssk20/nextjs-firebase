import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useInsertReplies from '@/hooks/mutate/insert/useInsertReplies'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
import Form from '@/atoms/Form'

import styles from '@/styles/components/article/comment/reply/replyForm.module.scss'
import Button from '@mui/material/Button'

type ReplyFormProps = {
  path: string
  id: number
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

const ReplyForm = ({ path, id, setFormOpen }: ReplyFormProps) => {
  const [text, setText] = useState('')
  const account = useRecoilValue(accountState)
  const { mutate, isLoading } = useInsertReplies(path, id)

  // 返信を送信
  const handlePost = () => {
    if(isLoading) return
    mutate(text)
    setFormOpen(false)
  }

  return (
    <Form
      text={ text }
      setText={ setText }
      name={ account.data?.username ?? '' }
      placeholder='返信する'
    >
      {/* キャンセルボタン */}
      <Button
        className={ styles.cancel_button }
        classes={{ root: styles.cancel_button_root }}
        color='info'
        onClick={ () => setFormOpen(false) }
      >
        キャンセル
      </Button>

      {/* 送信ボタン */}
      { Boolean(text) ?
        <ContainedButton text='返信' handle={ handlePost } />
        :
        <DisabledButton text='返信' />
      }
    </Form>
  )
}

export default ReplyForm