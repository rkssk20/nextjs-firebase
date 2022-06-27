import { useState, useEffect, useMemo, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import dynamic from 'next/dynamic'
import { draftState } from '@/lib/recoil'
import useInsertArticles from '@/hooks/mutate/insert/useInsertArticles'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'
import LoginOnly from '@/components/provider/LoginOnly'
import Categories from '@/components/edit/Categories'
import Image from '@/components/edit/Image'
import Side from '@/components/side/Side'

const Markdown = dynamic(import('@/components/edit/Markdown'), { ssr: false })

import styles from '@/styles/pages/edit.module.scss'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import InputBase from '@mui/material/InputBase'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'

const Edit = () => {
  const [draft, setDraft] = useRecoilState(draftState)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [categories, setCategories] = useState<number[]>([])
  const [image, setImage] = useState<Blob | null>(null)
  const router = useRouter()
  const { mutate, isLoading } = useInsertArticles()

  const ImageMemo = useMemo(() => <Image image={image} setImage={setImage} />, [image])

  // localstorageをuseStateの初期値に渡すとサーバーでエラーになるため
  useEffect(() => {
    setTitle(draft.title)
    setDetails(draft.details)
    setCategories(draft.categories)
  }, [])

  useEffect(() => {
    router.beforePopState(() => {
      // 書き込みがあった場合(画像以外)下書き保存する
      if (title.length > 0 || details.length > 0 || categories.length > 0) {
        setDraft({ title, details, categories })

        alert('下書きに保存しました。')
      }

      return true
    })

    return () => router.beforePopState(() => true)
  }, [title, details, categories])

  // 投稿する
  const handlePost = () => {
    if (isLoading) return

    mutate({
      title,
      details,
      image,
      categories,
    })
  }

  return (
    <Layout type='article' title='記事の作成' description='' image=''>
      <LoginOnly>
        {isLoading ? (
          <CardContent className={styles.header} classes={{ root: styles.header_root }}>
            <CircularProgress size={40} />
          </CardContent>
        ) : (
          <CardContent className={styles.header} classes={{ root: styles.header_root }}>
            <IconButton
              className={styles.cancel}
              classes={{ root: styles.cancel_root }}
              aria-label='戻る'
              onClick={() => router.back()}
            >
              <CloseIcon />
            </IconButton>

            {title.length > 0 && details.length > 0 ? (
              <ContainedButton text='投稿' handle={handlePost} />
            ) : (
              <DisabledButton text='投稿' />
            )}
          </CardContent>
        )}

        <CardContent className={styles.content}>
          {/* 画像を選択 */}
          {ImageMemo}

          {/* カテゴリを選択 */}
          <Categories categories={categories} setCategories={setCategories} />

          {/* タイトル */}
          <InputBase
            className={styles.title}
            classes={{ root: styles.title_root }}
            autoFocus
            inputProps={{
              maxLength: 30,
            }}
            placeholder='記事タイトル (必須)'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 本文 */}
          <Markdown details={details} setDetails={setDetails} />
        </CardContent>
      </LoginOnly>
    </Layout>
  )
}

export default Edit

Edit.getLayout = function getLayout(page: ReactElement) {
  const md = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {page}
      {md && <Side />}
    </>
  )
}
