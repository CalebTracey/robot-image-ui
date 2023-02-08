import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import InputForm from '../components/InputForm'

interface Props {
  isLoading: boolean
  searchBarState: SearchBarStateT
  prompt: string
  placeholder: string
  result: ResultI | undefined
  respCount: number

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  setSearchBarState: Dispatch<SetStateAction<SearchBarStateT>>
  setRespCount: Dispatch<SetStateAction<number>>
  setPrompt: (str: string) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResultLocation: Dispatch<SetStateAction<ResultLocationT>>
  setResult: Dispatch<SetStateAction<ResultI | undefined>>
}

const SearchBarContainer = (props: Props): JSX.Element => {
  const {
    setResultLocation,
    setSearchBarState,
    searchBarState,
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
  } = props
  return (
    <div className={`search-container ${searchBarState}`}>
      <InputForm
        setResultLocation={setResultLocation}
        setSearchBarState={setSearchBarState}
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

export default SearchBarContainer
