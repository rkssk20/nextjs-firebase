import Button from '@mui/material/Button'

import styles from '@/styles/atoms/button.module.scss'

export const ContainedButton = ({ text, handle }: { text: string, handle: () => void }) => {
  return (
    <Button
      className={ styles.button }
      classes={{ root: styles.button_root }}
      variant='contained'
      disableElevation
      onClick={ handle }
    >
      { text }
    </Button>
  )
}

export const OutlinedButton = ({ text, handle }: { text: string, handle: () => void }) => {
  return (
    <Button
      className={ styles.button }
      variant='outlined'
      disableElevation
      onClick={ handle }
    >
      { text }
    </Button>
  )
}

export const DisabledButton = ({ text }: { text: string }) => {
  return (
    <Button
      className={ styles.button }
      variant='contained'
      disabled
    >
      { text }
    </Button>
  )
}