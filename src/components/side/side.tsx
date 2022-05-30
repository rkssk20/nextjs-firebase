import styles from '@/styles/components/side/side.module.scss'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

const Side = () => {
  return (
    <List className={ styles.list }>
      <ListItem>
        aaa
      </ListItem>

      {/* 最下部 */}
      <Typography className={ styles.caption } variant='caption'>
        @2022 Next.js × Supabase
      </Typography>
    </List>
  )
}

export default Side