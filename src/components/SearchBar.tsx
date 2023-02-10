import {
    useState,
    useEffect,
    SetStateAction,
    Dispatch,
    useCallback,
} from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Constants from '../Constants'
import { isResponseI, SearchBarI } from '../hooks/useSearch'
import useService, { InitialServiceState } from '../hooks/useService'
import SubmitButton from './buttons/SubmitButton'

const { DefaultLabel, SearchLabel } = Constants

interface Props {
    isSearchLoading: boolean
    Handler: SearchBarI
    Result: ResultI | null
    setResult: Dispatch<SetStateAction<ResultI | null>>
}

const SearchBar = (props: Props): JSX.Element => {
    const { isSearchLoading, Handler, setResult } = props

    const [, Service] = useService(InitialServiceState)
    const [Label, setLabel] = useState(DefaultLabel)
    const [isLoading, setIsLoading] = useState(false)

    const { onSubmit, onInputChange } = Handler

    const HandleSubmit = async (e: SubmitEventT): Promise<void> => {
        console.log('=== submit handler')
        setLabel(SearchLabel)

        const response = await onSubmit(e, Service)

        if (isResponseI(response)) {
            const resp = response as ResponseI
            setLabel(DefaultLabel)
            setResult(resp.result)
        }
    }

    const handleIsLoading = useCallback((loading: boolean) => {
        loading ? setLabel(SearchLabel) : setLabel(DefaultLabel)
        setIsLoading((prevState) =>
            prevState !== loading ? loading : prevState,
        )
    }, [])

    useEffect(() => {
        handleIsLoading(isSearchLoading)

        return () => {
            setLabel(DefaultLabel)
            setIsLoading(false)
        }
    }, [handleIsLoading, isSearchLoading])

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

                <SubmitButton isLoading={isLoading} />
            </InputGroup>
        </Form>
    )
}

export default SearchBar
