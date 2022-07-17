import { useState } from 'react'
import Image from 'next/image'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import NoArticleImage from '@/atoms/Image/NoArticleImage'
import ArticleImage from '@/atoms/Image/ArticleImage'
import { CircularProgress } from '@mui/material'

type Props = {
  image: string
  title: string
}

const ArticleImage = ({image, title}: Props) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  Boolean(image) && getDownloadURL(ref(getStorage(), image)).then(data => {
    if(data) setResult(data)
  }).catch(() => {

  }).finally(() => setLoading(false))

  if(loading) {
    return <CircularProgress />
  } else if(result) {
    return <ArticleImage image={ result } />
  }
}

export default ArticleImage