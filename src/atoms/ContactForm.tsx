import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'

import styles from '@/styles/atoms/contactForm.module.scss'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'

interface ContactFormProps {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  details: string;
  setDetails: Dispatch<SetStateAction<string>>;
  error: boolean;
}

const ContactForm = ({ address, setAddress, details, setDetails, error }: ContactFormProps) => {
  const router = useRouter()
  
  return (
    <div>
      <Typography variant='h6'>メールアドレス (必須)</Typography>

      <InputBase
        className={ styles.address }
        classes={{ root: styles.address_root }}
        inputProps={{
          maxLength: 254,
        }}
        value={ address }
        onChange={ (e) => setAddress(e.target.value) }
      />

      { error &&
        <Typography variant='body1' color='error'>
          正しいメールアドレスを入力してください。
        </Typography>
      }

      <Typography variant='h6'>詳細 (必須)</Typography>

      <InputBase
        className={ styles.details }
        classes={{ root: styles.details_root }}
        multiline={ true }
        rows={ 10 }
        inputProps={{
          maxLength: 1000,
        }}
        value={ details }
        onChange={ (e) => setDetails(e.target.value) }
        error={ true }
      />
    </div>
  )
}

export default  ContactForm