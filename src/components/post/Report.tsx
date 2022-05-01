import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import DialogPaper from "@/atoms/DialogPaper"
import ContactForm from '@/atoms/ContactForm'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Report = () => {
  const [genru, setGenru] = useState<null | 0 | 1 | 2>(null)
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const check = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const handleClose = () => {
    router.push(`${ router.pathname }`)
  }
  
  // 報告の投稿
  const handlePost = () => {
    // その他を選んでいるのにメアドが正しくない場合はエラー
    if ((genru === 2) && !check.test(address)) {
      setError(true)
      return
    }
  }

  return (
    <DialogPaper
      open={ true }
      handleClose={ handleClose }
    >
      <DialogTitle>
        <IconButton onClick={ handleClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant='h4'>問題を報告する</Typography>
        <Typography variant='caption'>問題の詳細をお知らせください。</Typography>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={ genru }
          onChange={ (e: ChangeEvent<HTMLInputElement>) => setGenru(Number(e.target.value) as 0 | 1 | 2) }
        >
          <FormControlLabel value={ 0 } control={<Radio />} label='スパム' />
          <FormControlLabel value={ 1 } control={<Radio />} label='センシティブな内容' />
          <FormControlLabel value={ 2 } control={<Radio />} label='その他' />
        </RadioGroup>

        { (genru === 2) &&
          <ContactForm
            address={ address }
            setAddress={ setAddress }
            details={ details }
            setDetails={ setDetails }
            error={ error }
          />
        }

        { ((genru === 0) || (genru === 1) || (genru === 2) && (address.length > 0) && (details.length > 0)) ?
          <ContainedButton text='送信' handle={ handlePost } /> :
          <DisabledButton text='送信' />
        }
      </DialogContent>
    </DialogPaper>
  )
}

export default Report