import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'

import MuiLink from '@mui/material/Link'

const Tag = ({ tag }: { tag: number }) => {
  return (
    <NextLink
      href={ (tag === 0) ? '/categories/front' : '/categories/serverless' }
      passHref
    >
      <MuiLink
        underline='hover'
        onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
      >
        { (tag === 0) ? '#フロント' : '#サーバーレス' }
      </MuiLink>
    </NextLink>
  )
}

export default Tag