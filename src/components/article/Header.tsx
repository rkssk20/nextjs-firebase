import NextLink from 'next/link'
import InitialIcon from '@/atoms/Icon/InitialIcon'
import AvatarIcon from '@/atoms/Icon/AvatarIcon'

import styles from '@/styles/components/article/header.module.scss'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface HeaderProps {
  user_id: string
  avatar: string | undefined
  name: string
  created_at: string
}

const Header = ({ user_id, avatar, name, created_at }: HeaderProps) => {
  const created = new Date(created_at)

  return (
    <div className={styles.field}>
      {/* アバター */}
      <NextLink href={`/account/${user_id}`} as={`/account/${user_id}`} passHref>
        <MuiLink underline='none'>
          { avatar ?
            <AvatarIcon src={ avatar } variant='link' />
            :
            <InitialIcon username={name} variant='link' />
          }
        </MuiLink>
      </NextLink>

      <div className={styles.text_field}>
        {/* タイトル */}
        <NextLink href={`/account/${user_id}`} as={`/account/${user_id}`} passHref>
          <MuiLink underline='hover' variant='body1' color='inherit'>
            {name}
          </MuiLink>
        </NextLink>

        {/* 投稿日時 */}
        <Typography className={styles.created} variant='caption'>
          {created.getFullYear() + '年' + (created.getMonth() + 1) + '月' + created.getDate() + '日'}
        </Typography>
      </div>
    </div>
  )
}

export default Header
