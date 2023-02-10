import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Constants from '../Constants'
import useSearch, { SearchBarT } from '../hooks/useSearch'
import useService, { InitialServiceState } from '../hooks/useService'
import SubmitButton from './buttons/SubmitButton'

const { DefaultLabel, SearchLabel } = Constants

interface Props {
    SearchBarState: SearchBarT

    Result: ResultI | null
    setResult: Dispatch<SetStateAction<ResultI | null>>
}

const SearchBar = (props: Props): JSX.Element => {
    const { SearchBarState, Result, setResult } = props

    const [{ isSearchLoading }, Handler] = useSearch(SearchBarState)
    const [, Service] = useService(InitialServiceState)
    const [Label, setLabel] = useState(DefaultLabel)

    const { onSubmit, onInputChange } = Handler

    const HandleSubmit = async (e: SubmitEventT): Promise<void> => {
        console.log('=== submit handler')
        setLabel(SearchLabel)

        const response = await onSubmit(e, Service)

        if (response) {
            response.message.errorLog
                ? console.error(JSON.stringify(response.message.errorLog))
                : console.info('=== request successful!')

            setLabel(DefaultLabel)
            setResult(response.result)
        }
    }

    useEffect(() => {
        isSearchLoading ? setLabel(SearchLabel) : setLabel(DefaultLabel)
        return () => setLabel(DefaultLabel)
    }, [isSearchLoading, Result])

    return (
        <Form
            className='input-form'
            onSubmit={(e: SubmitEventT) => HandleSubmit(e)}
        >
            <InputGroup>
                <Form.FloatingLabel controlId='floatingInput' label={Label}>
                    <Form.Control
                        onChange={(e: InputEventT) => onInputChange(e)}
                        as='input'
                        type='text'
                        name='prompt'
                    />
                </Form.FloatingLabel>

                <SubmitButton SearchBarState={SearchBarState} />
            </InputGroup>
        </Form>
    )
}

export default SearchBar
