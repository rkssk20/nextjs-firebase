import styles from '@/styles/atoms/circular.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

const Circular = ({ size }: { size: 'small' | 'large' }) => {
  return (
    <CircularProgress
      size={ 40 }
      className={size === 'small' ? styles.small_circular : styles.large_circular}
    />
  )
}

export default Circular
