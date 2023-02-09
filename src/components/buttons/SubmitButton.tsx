import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'

interface Props {
    isSearchLoading: boolean
}

const SubmitButton = (props: Props): JSX.Element => {
    const { isSearchLoading } = props

    return (
        <Button
            className='form-button'
            type='submit'
            disabled={isSearchLoading}
            // active={isLoading}
        >
            {isSearchLoading ? <GrowSpinner /> : <BsArrowRight />}
        </Button>
    )
}

export default SubmitButton
