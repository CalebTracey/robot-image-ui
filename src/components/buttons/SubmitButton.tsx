import { Button } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'
import { FC } from 'react'
import { GrowSpinner } from '../GrowSpinner'

interface Props {
    isLoading: boolean
}

const SubmitButton: FC<Props> = ({ isLoading }): JSX.Element => {
    return (
        <Button className='form-button' type='submit' disabled={isLoading}>
            <div style={{ width: '2rem' }}>
                {isLoading ? <GrowSpinner /> : <BsArrowRight />}
            </div>
        </Button>
    )
}

export default SubmitButton
