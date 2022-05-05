import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/provider/Layout'

import styles from '@/styles/pages/categories/index.module.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Categories = () => {
  const categories = [{
    url: 'front',
    text: 'フロント'
  }, {
    url: 'serverless',
    text: 'サーバーレス'
  }]

  return (
    <Layout
      type='article'
      title=''
      description='Next.jsとSupabaseを使用したテンプレート。技術ブログ風。'
      ogp='nextjssupabase'
    >
      <Typography className={ styles.title } variant='h3'>
        カテゴリ一覧
      </Typography>

      <div className={ styles.content }>
        { categories.map(item => (
          <Link key={ item.url } href={ '/categories/' + item.url } passHref>
            <Button
              className={ styles.button }
              classes={{
                root: styles.button_root,
                startIcon: styles.button_start_icon
              }}
              color='inherit'
              variant='contained'
              disableElevation
              component='a'
              startIcon={
                <Image
                  width={ 80 }
                  height={ 80 }
                  quality={ 70 }
                  alt={ item.text }
                  src={ `/image/${ item.url }.png` }
                />
              }
            >
              { '# ' + item.text }
            </Button>
          </Link>
        )) }
      </div>
    </Layout>
  )
}

export default Categories