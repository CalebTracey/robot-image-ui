import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'
import { FC } from 'react'

interface Props {
    isLoading: boolean
}

const SubmitButton: FC<Props> = ({ isLoading }): JSX.Element => {
    return (
        <Button className='form-button' type='submit' disabled={isLoading}>
            {isLoading ? <GrowSpinner /> : <BsArrowRight />}
        </Button>
    )
}

export default SubmitButton
