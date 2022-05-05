import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import DialogPaper from "@/atoms/DialogPaper"
import { ContainedButton, DisabledButton } from '@/atoms/Button'

import styles from '@/styles/components/header/post.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import ClearIcon from '@mui/icons-material/Clear'

const Post = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [tags, setTags] = useState({ front: false, serverless: false })
  const [image, setImage] = useState('')
  const router = useRouter()

  const handleClose = () => {
    router.push(router.asPath.replace(/\?.*$/, ""), undefined, { shallow: true })
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    
    if(e.target.files === null) return

    setImage(window.URL.createObjectURL(e.target.files[0]))
  }

  const handleCancel = () => {
    (document.getElementById('icon-button-file') as HTMLInputElement).value = ''

    setImage('')
  }

  const handlePost = () => {

  }

  return (
    <DialogPaper
      open={ router.query.dialog === 'post' }
      handleClose={ handleClose }
    >
      <DialogTitle className={ styles.dialog_title }>
        <IconButton aria-label='戻る' onClick={ handleClose }>
          <CloseIcon />
        </IconButton>

        { ((title.length > 0) && (details.length > 0) ?
          <ContainedButton text='送信' handle={ handlePost } />
          :
          <DisabledButton text='送信' />
        )}
      </DialogTitle>

      <DialogContent>
        <Typography className={ styles.top_title } variant='h6'>
          記事を投稿する
        </Typography>

        <InputBase
          className={ styles.title }
          classes={{ root: styles.title_root }}
          autoFocus={ true }
          rows={ 2 }
          multiline={ true }
          inputProps={{
            maxLength: 20,
          }}
          placeholder='タイトル (必須)'
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />

        <Typography className={ styles.title_length} variant="body1">
          { title.length + ' / 20' }
        </Typography>

        <Stack className={ styles.stack } direction='row'>
          <FormControlLabel
            className={ styles.form_control }
            classes={{ label: styles.form_control_label }}
            control={ <Checkbox /> }
            value={ tags.front }
            onChange={ () => setTags({ front: tags.front, serverless: !tags.serverless })}
            label='# フロントエンド'
          />

          <FormControlLabel
            className={ styles.form_control }
            classes={{ label: styles.form_control_label }}
            control={ <Checkbox /> }
            value={ tags.front }
            onChange={ () => setTags({ front: !tags.front, serverless: tags.serverless })}
            label='# サーバーレス'
          />
        </Stack>

        <InputBase
          className={ styles.details }
          classes={{ root: styles.details_root }}
          multiline={ true }
          rows={ 15 }
          inputProps={{
            maxLength: 1000,
          }}
          placeholder='本文 (必須)'
          value={ details }
          onChange={ (e) => setDetails(e.target.value) }
        />

        <Typography className={ styles.details_length} variant="body1">
          { details.length + ' / 1000' }
        </Typography>


        <label htmlFor="icon-button-file">
          <input
            className={ styles.hidden_button }
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={ handleImage }
          />

          { (image.length === 0) &&
            <Button
              className={ styles.image_button }
              aria-label="upload picture"
              component='span'
              variant='contained'
              color="secondary"
              disableElevation
            >
              画像を選択 (任意)
            </Button>
          }
        </label>

        { (image.length > 0) &&
          <div className={ styles.image_field }>
            <Badge
              badgeContent={
                <IconButton className={ styles.cancel } onClick={ handleCancel }>
                  <ClearIcon className={ styles.clear } color='info' />
                </IconButton>
              }
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <img className={ styles.image } alt='選択中の画像' src={ image } />
            </Badge>
          </div>
        }
      </DialogContent>
    </DialogPaper>
  )
}

export default Post