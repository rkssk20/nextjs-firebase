import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import UserIcon from '@/atoms/UserIcon'
import { DisabledButton, ContainedButton } from '@/atoms/Button'

import styles from '@/styles/components/article/form.module.scss'
import InputBase from '@mui/material/InputBase'
import Skeleton from '@mui/material/Skeleton'

const Form = () => {
  const [text, setText] = useState('')
  const account = useRecoilValue(accountState)

  const handlePost = () => {

  }

  if(account.loading) return <Skeleton className={ styles.skeleton } variant='rectangular' />

  return (
    <div className={ styles.field }>
      <InputBase
        className={ styles.input_base }
        classes={{
          root: styles.input_base_root,
          input: styles.input_base_input
        }}
        placeholder='コメントする'
        multiline
        maxRows={ 5 }
        startAdornment={ <UserIcon name={ account.name.slice(0, 1) } variant='medium' /> }
        value={ text }
        onChange={ (e) => setText(e.target.value) }
      />

      <div className={ styles.under }>
        {/* 送信ボタン */}
        { Boolean(text) ?
          <ContainedButton text='送信' handle={ handlePost } />
          :
          <DisabledButton text='送信' />
        }
      </div>
    </div>
  )
}

export default Form