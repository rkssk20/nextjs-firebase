import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/post/header.module.scss'
import MuiLink from '@mui/material/Link'
import CardHeader from '@mui/material/CardHeader'

interface HeaderProps {
  display_id: string;
  name: string;
}

const Header = ({ display_id, name }: HeaderProps) => {
  return (
    <CardHeader
      className={ styles.header }
      classes={{ avatar: styles.header_avatar }}
      avatar={
        // アバター
        <NextLink href={ `/account/${ display_id }` } passHref>
          <MuiLink
            underline='none'
            onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
          >
            <UserIcon name={ name.slice(0, 1)} variant='link' />
          </MuiLink>
        </NextLink>
      }
      title={
        // 投稿者名
        <NextLink
          href={ `/account/${ display_id }` }
          passHref
        >
          <MuiLink
            underline='hover'
            color='inherit'
            onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
          >
            { name }
          </MuiLink>
        </NextLink>
      }
      subheader={
        // 投稿者ID
        <NextLink
          href={ `/account/${ display_id }` }
          passHref
        >
          <MuiLink
            underline='hover'
            color='info'
            onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
            onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
          >
            { '@' + display_id }
          </MuiLink>
        </NextLink>
      }
    />
  )
}

export default Header