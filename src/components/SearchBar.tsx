import { useState, useEffect, FC } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Constants from '../Constants'
import { SearchBarI, SearchBarT } from '../hooks/useSearch'
import SubmitButton from './buttons/SubmitButton'

interface Props {
  searchState: SearchBarT
  handler: SearchBarI
}

const SearchBar: FC<Props> = ({ searchState, handler }): JSX.Element => {
  const { DefaultLabel, SearchLabel } = Constants

  const { searchLoading } = searchState
  // const [userInput] = useState('')

  const { onSubmit, onInputChange } = handler

  return (
    <Form className='input-form' onSubmit={(e: SubmitEventT) => onSubmit(e)}>
      <InputGroup>
        <Form.FloatingLabel
          controlId='floatingInput'
          label={searchLoading ? SearchLabel : DefaultLabel}
        >
          <Form.Control
            onChange={(e: InputEventT) => onInputChange(e)}
            as='input'
            type='text'
            name='prompt'
            // value={userInput}
          />
        </Form.FloatingLabel>

        <SubmitButton searchLoading={searchLoading} />
      </InputGroup>
    </Form>
  )
}

export default SearchBar
