import { ReactElement } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Introduction from '@/atoms/Introduction'
import Layout from '@/components/provider/Layout'
import Side from '@/components/side/Side'
import { ContainedButton } from '@/atoms/Button'

import styles from '@/styles/pages/about.module.scss'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

const About = () => {
  const router = useRouter()

  return (
    <Layout type='article' title='このサイトについて' description='' image=''>
      <Introduction />

      <Typography className={styles.title} classes={{ root: styles.title_root }} variant='h3'>
        技術選定
      </Typography>

      <NextLink href='/article/' passHref>
        <MuiLink className={styles.link}>Next.js × Supabaseの技術選定</MuiLink>
      </NextLink>

      <Typography className={styles.title} classes={{ root: styles.title_root }} variant='h3'>
        機能一覧
      </Typography>

      <NextLink href='/article/' passHref>
        <MuiLink className={styles.link}>Next.js × Supabaseで実装した機能</MuiLink>
      </NextLink>

      <Typography className={styles.title} classes={{ root: styles.title_root }} variant='h3'>
        githubリポジトリ
      </Typography>

      <NextLink href='https://github.com/rkssk20/nextjs-supabase' passHref>
        <MuiLink className={styles.link} target='_blank'>
          rkssk20/nextjs-supabase
        </MuiLink>
      </NextLink>

      <div className={styles.button}>
        <ContainedButton text='かんたんログイン' handle={() => router.push('/login')} />
      </div>
    </Layout>
  )
}

export default About

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      {page}

      <Side />
    </div>
  )
}
