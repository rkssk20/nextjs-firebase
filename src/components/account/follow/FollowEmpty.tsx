import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'

import styles from '@/styles/components/account/follow/empty.module.scss'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

const FollowEmpty = ({ path }: { path: string }) => {
  const { loading, user } = useUser(path)
  const router = useRouter()

  return (
    <Stack className={ styles.field }>
      <Typography variant='h6'>
        まだ誰もフォローしていません
      </Typography>

      { (user?.display_id === path) &&
        <Button
          className={ styles.search_button }
          classes={{ root: styles.search_button_root }}
          disableElevation
          variant='contained'
          startIcon={ <SearchIcon /> }
          onClick={ () => router.push('/search') }
        >
          ユーザーを探す
        </Button>
      }
    </Stack>
  )
}

export default FollowEmpty