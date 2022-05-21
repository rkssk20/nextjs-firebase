import styles from '@/styles/atoms/noImage.module.scss'
import Typography from '@mui/material/Typography'

const NoImage = ({ title }: { title: string }) => {
  return (
    <div className={ styles.noimage }>
      <Typography
        className={ styles.noimage_text }
        classes={{ root: styles.noimage_text_root }}
        color='white'
      >
        { title }
      </Typography>
    </div>
  )
}

export default NoImage