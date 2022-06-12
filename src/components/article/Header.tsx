import NextLink from 'next/link'
import InitialIcon from '@/atoms/InitialIcon'

import styles from '@/styles/components/article/header.module.scss'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface HeaderProps {
  display_id: string;
  name: string;
  created_at: string
}

const Header = ({ display_id, name, created_at }: HeaderProps) => {
  const created = new Date(created_at)
  
  return (
    <div className={ styles.field }>
      {/* アバター */}
      <NextLink href={ `/account/${ display_id }` } passHref>
        <MuiLink underline='none'>
          <InitialIcon name={ name } variant='link' />
        </MuiLink>
      </NextLink>

      <div className={ styles.text_field }>
        {/* タイトル */}
        <NextLink href={ `/account/${ display_id }` } passHref>
          <MuiLink
            underline='hover'
            variant='body1'
            color='inherit'
          >
            { name + '・@' + display_id }
          </MuiLink>
        </NextLink>

        {/* 投稿日時 */}
        <Typography className={ styles.created } variant='caption'>
          { created.getFullYear() + '年' + created.getMonth() + '月' + created.getDay() + '日' }
        </Typography>
      </div>

    </div>
  )
}

export default Header