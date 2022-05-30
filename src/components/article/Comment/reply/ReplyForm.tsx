import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
import Form from '@/components/article/comment/Form'

import styles from '@/styles/components/article/comment/reply/replyForm.module.scss'
import Button from '@mui/material/Button'

type ReplyFormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

const ReplyForm = ({ setFormOpen }: ReplyFormProps) => {
  const [text, setText] = useState('')
  const account = useRecoilValue(accountState)

  const handlePost = () => {

  }

  return (
    <Form
      text={ text }
      setText={ setText }
      name={ account.name }
      placeholder='返信する'
    >
      {/* キャンセルボタン */}
      <Button
        className={ styles.cancel_button }
        classes={{ root: styles.cancel_button_root }}
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