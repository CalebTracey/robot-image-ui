import React, {
  ChangeEvent,
  SetStateAction,
  Dispatch,
  FormEvent,
  useState,
  useEffect,
} from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import ContentButtonContainer from '../containers/ContentButtonContainer'
import Handler from '../services/Handler'
import SubmitButton from './buttons/SubmitButton'

interface Props {
  isLoading: boolean

  prompt: string
  placeholder: string
  result: ResultI | undefined
  respCount: number

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  setSearchBarState: Dispatch<SetStateAction<SearchBarStateT>>
  setResultLocation: Dispatch<SetStateAction<ResultLocationT>>
  setRespCount: Dispatch<SetStateAction<number>>
  setPrompt: (str: string) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<ResultI | undefined>>
}

const defaultLabel = 'what would you like to see?'
const resultLabel = 'scroll down to see you results'
const focusLabel = 'type here'

const InputForm = (props: Props): JSX.Element => {
  const {
    respCount,
    setRespCount,
    result,
    isLoading,
    prompt,
    setPrompt,
    placeholder,
    handleSubmit,
    setIsLoading,
    setResult,
    setSearchBarState,
  } = props

  const [label, setLabel] = useState(defaultLabel)
  const [inputDisabled, setInputDisabled] = useState(false)

  useEffect(() => {
    if (respCount > 0 || isLoading) {
      if (respCount > 0) {
        setLabel(resultLabel)
      }
      setInputDisabled(true)
    } else {
      setInputDisabled(false)
      setLabel(defaultLabel)
    }
  }, [respCount, isLoading])

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): (() => void) => {
    // throttle setState with timeout
    const timer = setTimeout(() => {
      setPrompt(e.target.value)
    }, 500)

    return () => {
      clearTimeout(timer)
      setSearchBarState('center')
    }
  }

  return (
    <Form className='input-form' onSubmit={handleSubmit}>
      <InputGroup>
        <Form.FloatingLabel
          controlId='floatingInput'
          label={label}
          // onBlur={() => setLabel(defaultLabel)}
          // onFocus={() => setLabel(focusLabel)}
        >
          <Form.Control
            onChange={handleOnChange}
            as='input'
            type='text'
            name='prompt'
            // value={prompt}
            disabled={inputDisabled}
            readOnly={inputDisabled}
            placeholder={placeholder}
          />
        </Form.FloatingLabel>
        {respCount === 0 ? <SubmitButton isLoading={isLoading} /> : null}
        <ContentButtonContainer
          isLoading={isLoading}
          respCount={respCount}
          handleClear={() => {
            setRespCount(0)
            setSearchBarState('center')
            Handler.Clear({
              setIsLoading,
              setPrompt,
              setResult,
            })
          }}
          result={result}
        />
      </InputGroup>
    </Form>
  )
}

export default InputForm
