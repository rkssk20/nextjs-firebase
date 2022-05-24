import { useState } from 'react'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Icon from '@/components/account/setting/Icon'

import styles from '@/styles/components/account/setting/input.module.scss'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'

type InputProps = {
  data: {
    name: string
    display_id: string
    image: string
    details: string
  }
}

const Input = ({ data }: InputProps) => {
  const [cropImage, setCropImage] = useState(data.image)
  const [name, setName] = useState(data.name)
  const [displayId, setDisplayId] = useState(data.display_id)
  const [details, setDetails] = useState(data.details)

  const handleUpdate = () => {

  }

  return (
    <div>
      <Typography className={ styles.title } variant='h5'>プロフィール設定</Typography>

      <Typography className={ styles.sub_title } variant='h6'>アイコン</Typography>

      {/* アイコンの変更 */}
      <Icon
        name={ name }
        cropImage={ cropImage }
        setCropImage={ setCropImage }
      />

      <Typography className={ styles.sub_title } variant='h6'>アカウント名</Typography>

      <div className={ styles.input_field }>
        <InputBase
          className={ styles.input }
          classes={{ root: styles.input_root }}
          inputProps={{
            maxLength: 15,
          }}
          placeholder='名前'
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        <Typography>{ name.length + ' / 15' }</Typography>
      </div>

      <Typography className={ styles.sub_title } variant='h6'>アカウントID</Typography>

      <div className={ styles.input_field }>
        <InputBase
          className={ styles.input }
          classes={{ root: styles.input_root }}
          inputProps={{
            maxLength: 15,
          }}
          placeholder='ID'
          value={ displayId }
          onChange={ (e) => setDisplayId(e.target.value) }
        />

        <Typography>{ displayId.length + ' / 15' }</Typography>
      </div>

      <Typography className={ styles.sub_title } variant='h6'>自己紹介</Typography>

      <div className={ styles.input_field }>
        <InputBase
          className={ styles.input }
          classes={{ root: styles.input_root }}
          inputProps={{
            maxLength: 140,
          }}
          placeholder='自己紹介'
          multiline
          value={ details }
          onChange={ (e) => setDetails(e.target.value) }
        />

        <Typography>{ details.length + ' / 140' }</Typography>
      </div>

      <div className={ styles.save }>
        { ((name.length > 0) && (displayId.length > 0) && ((data.name !== name) || (data.display_id !== displayId) || (data.details !== details) || (data.image !== cropImage))) ?
          <ContainedButton text='保存する' handle={ handleUpdate } /> :
          <DisabledButton text='保存する' />
        }
      </div>
    </div>
  )
}

export default Input