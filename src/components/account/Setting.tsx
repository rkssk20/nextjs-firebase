import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import DialogPaper from "@/atoms/DialogPaper"
import { ContainedButton, DisabledButton } from "@/atoms/Button";
import Tips from '@/atoms/Tip'

import styles from '@/styles/components/account/setting.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface SettingProps {
  setting: boolean;
  setSetting: Dispatch<SetStateAction<boolean>>;
}

const Setting = ({ setting, setSetting }: SettingProps) => {
  const [name, setName] = useState('')

  const handleClose = () => {
    setSetting(false)
  }

  const handleUpdate = () => {

  }

  return (
    <DialogPaper
      open={ setting }
      handleClose={ handleClose }
    >
      <DialogTitle className={ styles.dialog_title }>
        <Tips title='キャンセル'>
          <IconButton onClick={ handleClose }>
            <CloseIcon />
          </IconButton>
        </Tips>
      </DialogTitle>

      <DialogContent className={ styles.content }>
        <Typography variant='h6'>設定</Typography>

        <Typography variant='h5'>アカウント名の変更</Typography>

        <InputBase
          className={ styles.name }
          classes={{ root: styles.name_root }}
          inputProps={{
            maxLength: 15,
          }}
          placeholder='名前'
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        <div className={ styles.name_option }>
          <Typography
            className={ styles.name_length}
            classes={{ root: styles.name_length_root }}
            variant='body1'
          >
            { name.length + ' / 15' }
          </Typography>

          { (name.length > 0) ?
            <ContainedButton text='変更' handle={ handleUpdate } /> :
            <DisabledButton text='変更' />
          }
        </div>

        <Typography variant='h5'>退会</Typography>
        
        <Stack direction='row' alignItems='center'>
          <Typography
            className={ styles.option }
            classes={{ root: styles.option_root }}
            variant='caption'
            >
            ※ ポートフォリオのため、退会機能を制限しています。
          </Typography>

          <DisabledButton text='退会' />
        </Stack>
      </DialogContent>
    </DialogPaper>
  )
}

export default Setting