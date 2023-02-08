import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'
import { useEffect, useState } from 'react'
interface Props {
  isLoading: boolean
  prompt: string
}

const SubmitButton = (props: Props): JSX.Element => {
  const [disabled, setDisabled] = useState(true)
  const { isLoading, prompt } = props

  useEffect(() => {
    if (isLoading || prompt.length === 0) {
      if (!disabled) {
        setDisabled(true)
        return
      }
    } else {
      setDisabled(false)
      return
    }
  }, [disabled, isLoading, prompt])

  return (
    <Button
      className='form-button'
      // variant='primary'
      type='submit'
      disabled={disabled}
    >
      {isLoading ? <GrowSpinner /> : <BsArrowRight />}
    </Button>
  )
}

export default SubmitButton
