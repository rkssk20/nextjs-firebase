import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'

import MuiLink from '@mui/material/Link'

const Categories = ({ category }: { category: 0 | 1 | '0' | '1' }) => {
  console.log(category)
  return (
    <NextLink
      href={ (category == 0) ? '/categories/front' : '/categories/serverless' }
      passHref
    >
      <MuiLink
        underline='hover'
        onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
      >
        { (category == 0) ? '#フロント' : '#サーバーレス' }
      </MuiLink>
    </NextLink>
  )
}

export default Categories