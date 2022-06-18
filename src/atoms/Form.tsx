import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import InitialIcon from '@/atoms/InitialIcon'
import AvatarIcon from '@/atoms/AvatarIcon'

import styles from '@/styles/components/article/comment/form.module.scss'
import InputBase from '@mui/material/InputBase'

type FormProps = {
  children: ReactNode
  text: string
  setText: Dispatch<SetStateAction<string>>
  name: string
  placeholder: string
}

const Form = ({ children, text, setText, name, placeholder }: FormProps) => {
  const account = useRecoilValue(accountState)

  return (
    <div className={ styles.field }>
      <InputBase
        className={ styles.input_base }
        classes={{
          root: styles.input_base_root,
          input: styles.input_base_input
        }}
        placeholder={ placeholder }
        multiline
        maxRows={ 5 }
        startAdornment={
          account.data?.avatar ?
          <AvatarIcon src={ account.data.avatar } variant='medium' />
          :
          <InitialIcon username={ name } variant='medium' />
        }
        value={ text }
        onChange={ (e) => setText(e.target.value) }
      />
      
      <div className={ styles.under }>
        { children }
      </div>
    </div>
  )
}

export default Form