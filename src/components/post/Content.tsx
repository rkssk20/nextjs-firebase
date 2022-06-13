import { definitions } from '@/types/supabase'
import Categories from '@/atoms/Categories'

import styles from '@/styles/components/post/content.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface ContentProps {
  title: definitions['articles']['title'];
  details: definitions['articles']['details'];
  categories: {
    category: definitions['categories']['category']
  }[] | undefined
}

const Content = ({ title, details, categories }: ContentProps) => {
  return (
    <div className={ styles.content }>
      <Typography variant='h5'>{ title }</Typography>
      <Typography variant='body1'>{ details + '...' }</Typography>

      { categories && (categories.length > 0) &&
        <Stack className={ styles.tags } direction='row' alignItems='center'>
          { categories.map(item => <Categories key={ item.category } category={ item.category } />) }
        </Stack>
      }
    </div>
  )
}

export default Content