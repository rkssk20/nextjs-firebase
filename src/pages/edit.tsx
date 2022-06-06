import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import { nanoid } from 'nanoid'
import { useRecoilState } from "recoil";
import { draftState } from "@/lib/recoil";
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'
import LoginOnly from '@/components/provider/LoginOnly'
import Categories from '@/components/edit/Categories'
import Image from '@/components/edit/Image'

const Markdown = dynamic(import('@/components/edit/Markdown'), { ssr: false })

import styles from '@/styles/pages/edit.module.scss'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase'

const Edit = () => {
  const [draft, setDraft] = useRecoilState(draftState)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [tags, setTags] = useState<number[]>([])
  const [image, setImage] = useState('')
  const router = useRouter()

  // localstorageをuseStateの初期値に渡すとサーバーでエラーになるため
  useEffect(() => {
    setTitle(draft.title)
    setDetails(draft.details)
    setTags(draft.tags)
  }, [])

  useEffect(() => {
    router.beforePopState(() => {
      // 書き込みがあった場合(画像以外)下書き保存する
      if((title.length > 0) || (details.length > 0) || (tags.length > 0)) {
        setDraft({ title, details, tags })

        alert('下書きに保存しました。')
      }

      return true
    })

    return () => router.beforePopState(() => true)
  }, [title, details, tags]);

  // 投稿する
  const handlePost = () => {
    console.log(nanoid());
  }

  return (
    <Layout
      type='article'
      title='記事の作成'
      description=''
      image=''
    >
      <LoginOnly>
        <CardContent className={ styles.header } classes={{ root: styles.header_root }}>
        <IconButton aria-label='戻る' onClick={ () => router.back() }>
            <CloseIcon />
          </IconButton>

          { ((title.length > 0) && (details.length > 0) ?
            <ContainedButton text='投稿' handle={ handlePost } />
            :
            <DisabledButton text='投稿' />
          )}
        </CardContent>

        <CardContent className={ styles.content }>
          {/* 画像を選択 */}
          <Image image={ image } setImage={ setImage } />

          {/* カテゴリを選択 */}
          <Categories tags={ tags } setTags={ setTags } />

          {/* タイトル */}
          <InputBase
            className={ styles.title }
            classes={{ root: styles.title_root }}
            autoFocus
            multiline
            inputProps={{
              maxLength: 30,
            }}
            placeholder='記事タイトル (必須)'
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
          />

          {/* 本文 */}
          <Markdown details={ details } setDetails={ setDetails } />
        </CardContent>
      </LoginOnly>
    </Layout>
  )
}

export default Edit