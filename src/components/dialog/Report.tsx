import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { dialogState } from '@/lib/recoil'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Details from '@/components/report/Details'
import Select from '@/components/report/Select'

import styles from '@/styles/components/dialog/report.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

const Report = () => {
  const [genru, setGenru] = useState<number | null>(null)
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  const dialog = useRecoilValue(dialogState)
  const check = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // 報告の投稿
  const handlePost = () => {
    // その他を選んでいるのにメアドが正しくない場合はエラー
    if ((genru === 2) && !check.test(address)) {
      setError(true)
      return
    }

    console.log(dialog.id)
  }

  return (
    <DialogContent>
      <Typography className={ styles.title } variant='h3'>問題を報告する</Typography>

      {/* 項目を選択 */}
      <Select
        genru={ genru }
        setGenru={ setGenru }
        menu_item={ ['スパム', 'センシティブな内容', 'その他'] }
      />

      {/* その他選択時、入力フォームを表示 */}
      { (genru === 2) &&
        <Details
          address={ address }
          setAddress={ setAddress }
          details={ details }
          setDetails={ setDetails }
          error={ error }
          checked={ checked }
          setChecked={ setChecked }
        />
      }

      {/* 送信ボタン */}
      <div className={ styles.button }>
        { (((genru === 0) || (genru === 1) || ((genru === 2)) && (address.length > 0) && (details.length > 0) && checked)) ?
          <ContainedButton text='送信' handle={ handlePost } /> :
          <DisabledButton text='送信' />
        }
      </div>
    </DialogContent>
  )
}

export default Report