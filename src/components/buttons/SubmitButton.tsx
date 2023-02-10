import { Button } from 'react-bootstrap'
import { GrowSpinner } from '../GrowSpinner'
import { BsArrowRight } from 'react-icons/bs'
import { SearchBarT } from '../../hooks/useSearch'
import { FC, useEffect, useState } from 'react'
interface Props {
    SearchBarState: SearchBarT
}

const SubmitButton: FC<Props> = ({ SearchBarState }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false)
    const { isSearchLoading } = SearchBarState

    useEffect(() => {
        if (isLoading !== isSearchLoading) {
            setIsLoading(isSearchLoading)
        }
    }, [isSearchLoading, isLoading])

    return (
        <Button
            className='form-button'
            type='submit'
            disabled={isLoading}
            // active={isLoading}
        >
            {isSearchLoading ? <GrowSpinner /> : <BsArrowRight />}
        </Button>
    )
}

export default SubmitButton
