import Tags from '@/atoms/Tag'

import styles from '@/styles/components/article/title.module.scss'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type TitleProps = {
  tags: number[]
  title: string
  created_at: string
}

const Title = ({ tags, title, created_at }: TitleProps) => {
  const created = new Date(created_at)

  return (
    <CardContent>
      { (tags.length > 0) &&
        <Stack className={ styles.tags } direction='row' alignItems='center'>
          { tags.map(item => (
            <Tags key={ item } tag={ item } />
          )) }
        </Stack>
      }

      <Typography className={ styles.title } variant='h1'>
        { title }
      </Typography>

      {/* 投稿時間 */}
      <Typography variant='caption'>
        { created.getFullYear() + '年' + created.getMonth() + '月' + created.getDate() + '日' }
      </Typography>
    </CardContent>
  )
}

export default Title