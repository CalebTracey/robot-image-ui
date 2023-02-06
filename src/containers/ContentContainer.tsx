import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
// import { InputFormContainer } from './InputFormContainer'
import Service from '../services/Service'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../components/ErrorFallback'
import ResultsContainer from './ResultsContainer'
import FaceContainer from './FaceContainer'
import HeaderContainer from './HeaderContainer'
import ScrollResultButton from '../components/buttons/ScrollResultButton'
import InputFormContainer from './InputFormContainer'
import LandingContainer from './LandingContainer'

interface Props {
  initializing: boolean
  setInitializing: Dispatch<SetStateAction<boolean>>
}
const placeholder = 'Two bears fighting aliens with light sabers'
const defaultSize = '1024x1024'
const defaultCount = 1
const tenSeconds = 10000

// const testAlert: AlertT = { type: 'success', message: 'success message!' }

export const ContentContainer = (props: Props): JSX.Element => {
  const { initializing, setInitializing } = props

  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<ResultI | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<AlertT | undefined>(undefined)
  const [respCount, setRespCount] = useState(0)
  const [wallpaper, setWallpaper] = useState('')

  const clearAlert = (): (() => void) => {
    const timer = setTimeout(() => {
      setAlert(undefined)
    }, tenSeconds)

    return () => clearTimeout(timer)
  }

  /**
   * * handleSubmit
   * Makes the source call and handles the result when the user submits
   * an image generation request.
   * ? is using Context API a better way to manage state
   * ? would that allow us to not prop drill this function
   *
   * @param e the event object from submitting the form
   * @returns void
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('=== SUBMITTED ===')

    const req: RequestI = { n: defaultCount, prompt, size: defaultSize }

    setIsLoading(true)

    Service.Post({ request: req })
      .then((res: ResponseI | undefined) => {
        if (res?.result) {
          if (res.result.data.length == 0) {
            // is this sketchy?
            setResult(undefined)
            setAlert({ type: 'danger', message: 'None found!' })
          }
          setResult(res.result)
          setAlert({ type: 'success', message: 'Success!' })
        }
        return
      })
      .finally(() => setIsLoading(false))

    clearAlert()
    return e.currentTarget.reset()
  }

  useEffect(() => {
    if (result && result?.data) {
      if (result?.data.length !== null) {
        setRespCount(result.data.length)
      }
    }
  }, [result])

  return (
    <div className='content'>
      <div className='upper-content'>
        <HeaderContainer alert={alert} />
        {/* <LandingContainer
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          setInitializing={setInitializing}
        /> */}
        <FaceContainer isLoading={isLoading} respCount={respCount} />
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className='lower-content-container'>
          <div className='lower-content'>
            <InputFormContainer
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
          <ScrollResultButton respCount={respCount} />
        </div>
      </ErrorBoundary>

      {prompt && respCount > 0 ? (
        <ResultsContainer
          respCount={respCount}
          isLoading={isLoading}
          result={result}
          prompt={prompt}
        />
      ) : null}
    </div>
  )
}

export default ContentContainer
