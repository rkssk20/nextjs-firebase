import { useState, useRef, Dispatch, SetStateAction } from "react"
import AvatarEditor from 'react-avatar-editor'
import useAvatarUpload from '@/hooks/update/useAvatarUpload'
import { ContainedButton, OutlinedButton } from '@/atoms/Button'

import styles from '@/styles/components/account/setting/crop.module.scss'
import Dialog from '@mui/material/Dialog'
import Slider from '@mui/material/Slider'
import ImageIcon from '@mui/icons-material/Image';

type CropProps = {
  selectImage: string
  setSelectImage: Dispatch<SetStateAction<string>>
}

const Crop = ({ selectImage, setSelectImage }: CropProps) => {
  const [scale, setScale] = useState(10)
  const ref = useRef<AvatarEditor>(null)
  const { mutate } = useAvatarUpload()
  
  // キャンセル
  const handleClose = () => {
    (document.getElementById('icon-button-file') as HTMLInputElement).value = '';
    setSelectImage('')
  }
  
  // 確定
  const handleConfirm = () => {
    if(ref) {
      // chromeならwebpに変換し、画質を0.5にする
      // chrome以外ではpngに変換される
      ref.current.getImage().toBlob((blob: Blob) => {
        const type = blob.type
        const index = type.indexOf('/')
        const url = URL.createObjectURL(blob);
        
        mutate({ blob, type: type.substring(index + 1) });
        
        (document.getElementById('icon-button-file') as HTMLInputElement).value = '';
        setSelectImage('')

      }, 'image/webp', 0.5)
    }
  }

  return (
    <Dialog
      className={ styles.dialog }
      open={ Boolean(selectImage) }
      onClose={ handleClose }
    >
      {/* 画像の切り抜き */}
      <AvatarEditor
        ref={ ref }
        image={ selectImage }
        width={ 300 }
        height={ 300 }
        border={ 0 }
        color={ [ 0, 0, 0, 0.6] }
        borderRadius={ 9999 }
        scale={ scale / 10 }
      />

      {/* 画像サイズのスライダー */}
      <div className={ styles.slider_field }>
        <ImageIcon color='disabled' />

        <Slider
          className={ styles.slider }
          aria-label="Volume"
          min={ 10 }
          max={ 50 }
          value={ scale }
          onChange={ (e, newValue) => setScale(newValue as number) }
        />

        <ImageIcon fontSize="large" color='disabled' />
      </div>

      {/* キャンセルと確定ボタン */}
      <div className={ styles.button_field } >
        <OutlinedButton text='キャンセル' handle={ handleClose } />
        <ContainedButton text='確定' handle={ handleConfirm } />
      </div>
    </Dialog>
  )
}

export default Crop