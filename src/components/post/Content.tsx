import Tags from '@/atoms/Tag'

import styles from '@/styles/components/post/content.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface ContentProps {
  title: string;
  details: string;
  tags: number[];
}

const Content = ({ title, details, tags }: ContentProps) => {
  return (
    <div className={ styles.content }>
      <Typography variant='h5'>{ title }</Typography>
      <Typography variant='body1'>{ details + '...' }</Typography>

      { (tags.length > 0) &&
        <Stack className={ styles.tags } direction='row' alignItems='center'>
          { tags.map(item => <Tags key={ item } tag={ item } />) }
        </Stack>
      }
    </div>
  )
}

export default Content