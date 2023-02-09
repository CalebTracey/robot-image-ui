import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'

interface Props {
  searchLoading: boolean
}

const SubmitButton = (props: Props): JSX.Element => {
  const { searchLoading } = props

  return (
    <Button
      className='form-button'
      type='submit'
      disabled={searchLoading}
      // active={isLoading}
    >
      {searchLoading ? <GrowSpinner /> : <BsArrowRight />}
    </Button>
  )
}

export default SubmitButton
