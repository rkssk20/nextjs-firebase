import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

import styles from '@/styles/components/edit/image.module.scss'
import Button from '@mui/material/Button'
import ImageIcon from '@mui/icons-material/Image';
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'

interface ImageProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>
}

const Image = ({ image , setImage }: ImageProps) => {
  // 画像選択
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {    
    if(e.target.files === null) return

    setImage(window.URL.createObjectURL(e.target.files[0]))
  }

  // 洗濯中の画像をキャンセル
  const handleCancel = () => {
    (document.getElementById('icon-button-file') as HTMLInputElement).value = ''
    setImage('')
  }

  return (
    <div className={ styles.label }>
      <label htmlFor="icon-button-file">
        {/* 表示せずボタンと連携するinput */}
        <input
          className={ styles.hidden_button }
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={ handleImage }
        />

        { (image.length === 0) &&
          // 未選択時、画像選択ボタン
          <Button
            className={ styles.image_button }
            aria-label="upload picture"
            component='span'
            variant='contained'
            color="inherit"
            disableElevation
            startIcon={ <ImageIcon />}
          >
            画像を選択
          </Button>
        }
      </label>

      { (image.length > 0) &&
        // 選択時、画像とキャンセルボタン
        <div className={ styles.image_field }>
        <Badge
          badgeContent={
            <IconButton className={ styles.cancel } onClick={ handleCancel }>
              <ClearIcon className={ styles.clear } fontSize='large' />
            </IconButton>
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <img className={ styles.image } alt='選択中の画像' src={ image } />
        </Badge>
      </div>
      }
    </div>
  )
}

export default Image