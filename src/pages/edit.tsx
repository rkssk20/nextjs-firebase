import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'

import styles from '@/styles/pages/edit.module.scss'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import TagIcon from '@mui/icons-material/Tag';
import Select from '@mui/material/Select'
import { SelectChangeEvent } from "@mui/material";
import MenuItem from '@Mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import Checkbox from '@mui/material/Checkbox';
import ImageIcon from '@mui/icons-material/Image';
import Badge from '@mui/material/Badge'
import ClearIcon from '@mui/icons-material/Clear'

const Edit = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [tags, setTags] = useState<number[]>([])
  const [image, setImage] = useState('')
  const router = useRouter()

  // 前のページに戻る (入力中の場合は確認)
  const handleBack = () => {
    if((title.length > 0) || (details.length > 0) || (image.length > 0)) {
      if(confirm('入力中の内容を消去して、このページを離れますか?')) {
        if(router.query.back) {
          router.push(router.query.back as string)
          return
        }
        router.push('/')
      }
    } else {
      if(router.query.back) {
        router.push(router.query.back as string)
        return
      }
      router.push('/')
    }
  }

  // カテゴリを選択
  const handleChange = (e: SelectChangeEvent<number[]>) => {
    setTags(e.target.value as number[])
    // setTags()
  }

  // 画像選択
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    
    if(e.target.files === null) return

    setImage(window.URL.createObjectURL(e.target.files[0]))
  }

  // 洗濯中の画像をキャンセル
  const handleCancel = () => {
    (document.getElementById('icon-button-file') as HTMLInputElement).value = ''

    setImage('')
  }

  // 投稿する
  const handlePost = () => {

  }

  return (
    <Layout
      type='article'
      title='投稿の作成'
      description=''
      ogp='nextjssupabase'
    >
      <CardContent className={ styles.header } classes={{ root: styles.header_root }}>
       <IconButton aria-label='戻る' onClick={ handleBack }>
          <CloseIcon />
        </IconButton>

        { ((title.length > 0) && (details.length > 0) ?
          <ContainedButton text='送信' handle={ handlePost } />
          :
          <DisabledButton text='送信' />
        )}
      </CardContent>

      <CardContent className={ styles.content }>
        <InputBase
          className={ styles.title }
          classes={{ root: styles.title_root }}
          autoFocus={ true }
          multiline={ true }
          inputProps={{
            maxLength: 20,
          }}
          placeholder='タイトル (必須)'
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />

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

        <Select
          className={ styles.select }
          classes={{ select: styles.select_root }}
          SelectDisplayProps={{ style: { padding: '6px 16px' } }}
          multiple
          displayEmpty
          value={ tags }
          renderValue={ (selected) =>
            (selected.length === 0) ?
            <span className={ styles.categories }>
              <TagIcon className={ styles.tag_icon } />
              カテゴリを選択
            </span>
            :
            selected.map(item => (
              <span>
                { (item === 0) ? '# フロント' : '# サーバーレス' }
              </span>
            ))
          }
          input={
            <InputBase className={ styles.input } classes={{ focused: styles.input_focused }} />
          }
          MenuProps={{ PaperProps: { elevation: 3 } }}
          IconComponent={ () => <></> }
          onChange={ handleChange }
        >
          { ['# フロント', '# サーバーレス'].map((item, index) => (
            <MenuItem
              className={ styles.menu_item }
              classes={{ root: styles.menu_item_selected }}
              key={item }
              value={ index }
            >
              <Checkbox checked={ tags.indexOf(index) > -1 } />
              { item }
            </MenuItem>
          )) }
        </Select>

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
              color="inherit"
              disableElevation
              startIcon={ <ImageIcon />}
            >
              画像を選択
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
      </CardContent>
    </Layout>
  )
}

export default Edit