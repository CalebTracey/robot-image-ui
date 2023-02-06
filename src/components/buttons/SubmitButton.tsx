import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'
interface Props {
  isLoading: boolean
}

const SubmitButton = (props: Props): JSX.Element => {
  const { isLoading } = props

  return (
    <Button
      className='form-button'
      // variant='primary'
      type='submit'
      disabled={isLoading}
    >
      {isLoading ? <GrowSpinner /> : <BsArrowRight />}
    </Button>
  )
}

export default SubmitButton
