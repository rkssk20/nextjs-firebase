import Image from 'next/image'

import styles from '@/styles/atoms/shareButton.module.scss'
import IconButton from '@mui/material/IconButton'

interface ShareButtonProps {
  url: string;
  social: string;
}

const ShareButton = ({ url, social }: ShareButtonProps) => {
  return (
    <IconButton
      className={ styles.button }
    >
      <Image
        src={ `/image/${ social }.png` }
        alt='共有アイコン'
        width={ 50 }
        height={ 50 }
      />
    </IconButton>
  )
}

export default ShareButton