import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import InputForm from '../components/InputForm'

interface Props {
  isLoading: boolean
  prompt: string
  placeholder: string
  result: ResultI | undefined
  respCount: number
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  setRespCount: Dispatch<SetStateAction<number>>
  setPrompt: (str: string) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<ResultI | undefined>>
}

const InputFormContainer = (props: Props): JSX.Element => {
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
    prompt,
  } = props

  return (
    <div className='input-form-container'>
      <InputForm
        respCount={respCount}
        setRespCount={setRespCount}
        setIsLoading={setIsLoading}
        setResult={setResult}
        result={result}
        isLoading={isLoading}
        setPrompt={setPrompt}
        prompt={prompt}
        handleSubmit={handleSubmit}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputFormContainer
