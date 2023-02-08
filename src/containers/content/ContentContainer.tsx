import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import HeaderContainer from '../HeaderContainer'
import Post from './post'
import { Container } from 'react-bootstrap'
import ResultsContainer from '../ResultsContainer'
import SearchBarContainer from '../SearchBarContainer'

interface Props {
  initializing: boolean
  setInitializing: Dispatch<SetStateAction<boolean>>
}

const placeholder = 'Two bears fighting aliens with light sabers'
const defaultSize = '1024x1024'
const defaultCount = 1
const tenSeconds = 10000

export const ContentContainer = (props: Props): JSX.Element => {
  const [resultLocation, setResultLocation] =
    useState<ResultLocationT>('bottom')
  const [searchBarState, setSearchBarState] =
    useState<SearchBarStateT>('center')

  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<ResultI | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<AlertT | undefined>(undefined)
  const [respCount, setRespCount] = useState(0)

  const clearAlert = (): (() => void) => {
    const timer = setTimeout(() => {
      setAlert(undefined)
    }, tenSeconds)

    return () => clearTimeout(timer)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('=== SUBMITTED ===')
    const req: RequestI = { n: defaultCount, prompt, size: defaultSize }

    setIsLoading(true)
    setSearchBarState('top')

    Post({ e, req, setIsLoading, setResult, setAlert, clearAlert })
  }

  useEffect(() => {
    if (result && result?.data) {
      if (result?.data.length !== null) {
        setRespCount(result.data.length)
      }
    }
  }, [result])

  return (
    <div className='content-container'>
      <HeaderContainer alert={alert} />
      <Container className='content-grid' style={{ gridColumn: '1/5' }}>
        <ResultsContainer
          resultLocation={resultLocation}
          respCount={respCount}
          isLoading={isLoading}
          result={result}
          prompt={prompt}
        />

        <SearchBarContainer
          setResultLocation={setResultLocation}
          searchBarState={searchBarState}
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
      </Container>
    </div>
  )
}

export default ContentContainer
