import { Dispatch, SetStateAction } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import SubmitButton from './buttons/SubmitButton'

interface Props {
    Label: string
    isLoading: boolean
    HandleSubmit: (e: SubmitEventT) => Promise<void>
    onInputChange: (e: InputEventT) => void
    setLabel: Dispatch<SetStateAction<string>>
}

const SearchBar = (props: Props): JSX.Element => {
    const { Label, isLoading, HandleSubmit, onInputChange } = props

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
