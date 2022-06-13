import Tags from '@/atoms/Categories'

import styles from '@/styles/components/article/title.module.scss'
import Typography from '@mui/material/Typography'

type TitleProps = {
  tags: number[]
  title: string
}

const Title = ({ tags, title }: TitleProps) => {
  return (
    <div className={ styles.field }>
      { (tags.length > 0) &&
        <div className={ styles.tags }>
          { tags.map(item => (
            <Tags key={ item } tag={ item } />
          )) }
        </div>
      }

      <Typography className={ styles.title } variant='h1'>
        { title }
      </Typography>
    </div>
  )
}

export default Title