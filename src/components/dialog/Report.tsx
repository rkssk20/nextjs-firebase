import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { DialogProps } from '@/types/types'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import DialogHeader from '@/components/dialog/DialogHeader'
import ContactForm from '@/atoms/ContactForm'
import DialogPaper from '@/components/dialog/DialogPaper'

import styles from '@/styles/components/dialog/report.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type ReportProps = DialogProps & {
  id: string;
}

const Report = ({ id, open, handleClose }: ReportProps) => {
  const [genru, setGenru] = useState<null | 0 | 1 | 2>(null)
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const check = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  // 報告の投稿
  const handlePost = () => {
    // その他を選んでいるのにメアドが正しくない場合はエラー
    if ((genru === 2) && !check.test(address)) {
      setError(true)
      return
    }

    console.log(id)
  }

  return (
    <DialogPaper open={ open } handleClose={ handleClose }>
      <DialogHeader handleClose={ handleClose } />

      <DialogContent>
        <Typography variant='h3'>
          問題を報告する
        </Typography>

        <RadioGroup
          className={ styles.group }
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={ genru }
          onChange={ (e: ChangeEvent<HTMLInputElement>) => setGenru(Number(e.target.value) as 0 | 1 | 2) }
        >
          <FormControlLabel value={ 0 } control={<Radio />} label='スパム' />
          <FormControlLabel value={ 1 } control={<Radio />} label='センシティブな内容' />
          <FormControlLabel value={ 2 } control={<Radio />} label='その他' />
        </RadioGroup>

        {/* その他選択時、入力フォームを表示 */}
        { (genru === 2) &&
          <ContactForm
            address={ address }
            setAddress={ setAddress }
            details={ details }
            setDetails={ setDetails }
            error={ error }
            checked={ checked }
            setChecked={ setChecked }
          />
        }

        <div className={ styles.button }>
          { ((genru === 0) || (genru === 1) || ((genru === 2) && (address.length > 0) && (details.length > 0) && checked)) ?
            <ContainedButton text='送信' handle={ handlePost } /> :
            <DisabledButton text='送信' />
          }
        </div>
      </DialogContent>
    </DialogPaper>
  )
}

export default Report