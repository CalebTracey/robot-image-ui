import { Form, InputGroup } from 'react-bootstrap'
import SubmitButton from './buttons/SubmitButton'

interface Props {
    Label: string
    isLoading: boolean
    HandleSubmit: (e: SubmitEventT) => Promise<void>
    onInputChange: (e: InputEventT) => void
}

const SearchBar = (props: Props): JSX.Element => {
    const { Label, isLoading, HandleSubmit, onInputChange } = props
    const { FloatingLabel, Control } = Form
    return (
        <Form
            className='input-form'
            onSubmit={(e: SubmitEventT) => HandleSubmit(e)}
        >
            <InputGroup>
                <FloatingLabel controlId='floatingInput' label={Label}>
                    <Control
                        onChange={(e: InputEventT) => onInputChange(e)}
                        as='input'
                        type='text'
                        name='prompt'
                    />
                </FloatingLabel>
                <SubmitButton isLoading={isLoading} />
            </InputGroup>
        </Form>
    )
}

export default SearchBar
