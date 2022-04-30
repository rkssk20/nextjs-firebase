import Image from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/atoms/shareButton.module.scss'
import IconButton from '@mui/material/IconButton'

interface ShareButtonProps {
  url: string;
  social: string;
}

const ShareButton = ({ url, social }: ShareButtonProps) => {
  const router = useRouter()

  return (
    <IconButton
      className={ styles.button }
      onClick={ () => router.push(url) }
    >
      <Image
        src={ `/image/${ social }.png` }
        alt='共有アイコン'
        width={ 70 }
        height={ 70 }
      />
    </IconButton>
  )
}

export default ShareButton