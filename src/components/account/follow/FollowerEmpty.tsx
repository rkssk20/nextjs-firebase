import useUser from '@/hooks/useUser'

import styles from '@/styles/components/account/follow/empty.module.scss'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const FollowerEmpty = ({ path }: { path: string }) => {
  const { loading, user } = useUser(path)

  return (
    <Stack className={ styles.field }>
      <Typography variant='h6'>
        まだフォローされていません。
      </Typography>

      { (user?.display_id !== path) &&
        <Button
          className={ styles.search_button }
          classes={{ root: styles.search_button_root }}
          disableElevation
          variant='outlined'
          onClick={ () => console.log('フォロー') }
        >
          このアカウントをフォローする
        </Button>
      }
    </Stack>
  )
}

export default FollowerEmpty