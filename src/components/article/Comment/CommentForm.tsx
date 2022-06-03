import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import { DisabledButton, ContainedButton } from '@/atoms/Button'
// import Form from '@/components/article/comment/Form'

import styles from '@/styles/components/article/comment/commentForm.module.scss'
import Skeleton from '@mui/material/Skeleton'

const CommentForm = () => {
  const [text, setText] = useState('')
  const account = useRecoilValue(accountState)

  const handlePost = () => {
    console.log('post')
  }

  if(account.loading) return <Skeleton className={ styles.skeleton } variant='rectangular' />

  return (
    // <Form
    //   text={ text }
    //   setText={ setText }
    //   name={ account.name }
    //   placeholder='コメントする'
    // >
    //   <div className={ styles.under }>
    //     {/* 送信ボタン */}
    //     { Boolean(text) ?
          <ContainedButton text='送信' handle={ handlePost } />
    //       :
    //       <DisabledButton text='送信' />
    //     }
    //   </div>
    // </Form>
  )
}

export default CommentForm