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
import ScrollResultButton from './buttons/ScrollResultButton'
import SubmitButton from './buttons/SubmitButton'

interface Props {
  result: ResultI | undefined
  respCount: number
  setRespCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
  prompt: string
  setPrompt: (str: string) => void
  placeholder: string
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
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
    setPrompt,
    placeholder,
    handleSubmit,
    setIsLoading,
    setResult,
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
    }, 1000)

    return () => clearTimeout(timer)
  }

  return (
    <Form className='form-input-container' onSubmit={handleSubmit}>
      <InputGroup>
        <Form.FloatingLabel
          controlId='floatingInput'
          label={label}
          className='floating-label'
          // onBlur={() => setLabel(defaultLabel)}
          // onFocus={() => setLabel(focusLabel)}
        >
          <Form.Control
            onChange={handleOnChange}
            as='input'
            type='text'
            name='prompt'
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
            Handler.Clear({
              setIsLoading,
              setPrompt,
              setResult,
            })
          }}
          result={result}
        />
      </InputGroup>
      <ScrollResultButton respCount={respCount} />
    </Form>
  )
}

export default InputForm
