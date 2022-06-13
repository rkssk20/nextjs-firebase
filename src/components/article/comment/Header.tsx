import NextLink from 'next/link'
import CreatedAt from '@/lib/createdAt'
import InitialIcon from '@/atoms/InitialIcon'

import styles from '@/styles/components/article/comment/header.module.scss'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

type HeaderProps = {
  name: string
  display_id: string
  created_at: string
}

const Header = ({ name, display_id, created_at }: HeaderProps) => {
  const created = CreatedAt(created_at)

  return (
    <div className={ styles.field }>
      {/* アバター */}
      <NextLink href={ `/account/${ display_id }` } passHref>
        <MuiLink underline='none'>
          <InitialIcon username={ name } variant='link' />
        </MuiLink>
      </NextLink>

      {/* タイトル */}
      <NextLink href={ `/account/${ display_id }` } passHref>
        <MuiLink
          className={ styles.title }
          underline='hover'
          variant='body1'
          color='inherit'
          noWrap
        >
          { name }
        </MuiLink>
      </NextLink>

      {/* 投稿日時 */}
      <Typography className={ styles.created } variant='caption'>
        { '・' + created }
      </Typography>
    </div>
  )
}

export default Header