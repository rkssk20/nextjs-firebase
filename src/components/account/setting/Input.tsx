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
  const [newImage, setNewImage] = useState(data.image)
  const [newName, setNewName] = useState(data.name)
  const [newDisplayId, setNewDisplayId] = useState(data.display_id)
  const [newDetails, setNewDetails] = useState(data.details)

  // ユーザーアイコンの変更

  const handleUpdate = () => {

  }

  return (
    <div>
      <Typography className={ styles.title } variant='h5'>プロフィール設定</Typography>

      <Typography className={ styles.sub_title } variant='h6'>アイコン</Typography>

      {/* アイコンの変更 */}
      <Icon
        name={ newName }
        newImage={ newImage }
        setNewImage={ setNewImage }
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
          onChange={ (e) => setNewName(e.target.value) }
        />

        <Typography>{ newName.length + ' / 15' }</Typography>
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
          value={ newDisplayId }
          onChange={ (e) => setNewDisplayId(e.target.value) }
        />

        <Typography>{ newDisplayId.length + ' / 15' }</Typography>
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
          value={ newDetails }
          onChange={ (e) => setNewDetails(e.target.value) }
        />

        <Typography>{ newDetails.length + ' / 140' }</Typography>
      </div>

      <div className={ styles.save }>
        { ((newName.length > 0) && (newDisplayId.length > 0) && ((data.name !== newName) || (data.display_id !== newDisplayId) || (data.details !== newDetails) || (data.image !== newImage))) ?
          <ContainedButton text='保存する' handle={ handleUpdate } /> :
          <DisabledButton text='保存する' />
        }
      </div>
    </div>
  )
}

export default Input