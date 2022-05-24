import { useState } from "react";
import { useRouter } from "next/router";
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'
import Categories from '@/components/edit/Categories'
import Image from '@/components/edit/Image'

import styles from '@/styles/pages/edit.module.scss'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase'

const Edit = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [tags, setTags] = useState<number[]>([])
  const [image, setImage] = useState('')
  const router = useRouter()

  // 前のページに戻る (入力中の場合は確認)
  const handleBack = () => {
    if((title.length > 0) || (details.length > 0) || (image.length > 0) || (tags.length > 0)) {
      if(confirm('入力中の内容を消去して、このページを離れますか?')) {
        router.back()
      }
    } else {
      router.back()
    }
  }

  // 投稿する
  const handlePost = () => {

  }

  return (
    <Layout
      type='article'
      title='記事の作成'
      description=''
      image=''
    >
      <CardContent className={ styles.header } classes={{ root: styles.header_root }}>
       <IconButton aria-label='戻る' onClick={ handleBack }>
          <CloseIcon />
        </IconButton>

        { ((title.length > 0) && (details.length > 0) ?
          <ContainedButton text='投稿' handle={ handlePost } />
          :
          <DisabledButton text='投稿' />
        )}
      </CardContent>

      <CardContent className={ styles.content }>
        <InputBase
          className={ styles.title }
          classes={{ root: styles.title_root }}
          autoFocus
          multiline
          inputProps={{
            maxLength: 20,
          }}
          placeholder='記事タイトル (必須)'
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />

        <InputBase
          className={ styles.details }
          classes={{ root: styles.details_root }}
          multiline
          rows={ 10 }
          inputProps={{
            maxLength: 1000,
          }}
          placeholder='本文 (必須)'
          value={ details }
          onChange={ (e) => setDetails(e.target.value) }
        />

        {/* カテゴリを選択 */}
        <Categories tags={ tags } setTags={ setTags } />

        {/* 画像を選択 */}
        <Image image={ image } setImage={ setImage } />
      </CardContent>
    </Layout>
  )
}

export default Edit