import { useCallback, useContext, useState } from 'react'
import Constants from '../Constants'
import { ResultContext } from '../ResultContext'
import useService, { initialServiceState } from './useService'

export type SearchBarT = {
  searchLoading: boolean
  prompt: string
  location: SearchBarLocT
}

export interface SearchBarI {
  onSubmit: (e: SubmitEventT) => Promise<TErrorLogs | null>
  onInputChange: (e: InputEventT) => void
  onReset: () => void
}

export const initialSearchState: SearchBarT = {
  searchLoading: false,
  prompt: '',
  location: 'center',
}

/**
 * * useSearchBar hook
 * @param state
 * @returns
 */

const useSearch = (state: SearchBarT): [SearchBarT, SearchBarI] => {
  const { result, setResult } = useContext(ResultContext)

  const [serviceState, { imageRequest }] = useService(initialServiceState)
  const [response, setResponse] = useState<SearchBarT>(state)

  const { DefaultSize, DefaultAmount } = Constants

  const onSubmit = async (e: SubmitEventT): Promise<TErrorLogs | null> => {
    e.preventDefault()
    const prompt = e.target['floatingInput'].value
    console.log('=== SUBMIT: ' + prompt)
    setResponse((prevState) => ({
      ...prevState,
      isLoading: true,
      location: 'top',
      prompt,
    }))

    const req: RequestI = {
      n: DefaultAmount,
      prompt,
      size: DefaultSize,
    }

    // const res = await Service.GetImages({ request: req })
    const res = await imageRequest(req)

    if (res?.result) {
      setResult(res.result)
    }
    // return res?.message.errorLog ? res?.message.errorLog : null

    setResponse((prevState) => ({
      ...prevState,
      isLoading: false,
    }))

    // if (res !== null) {
    //   setResponse((prevState) => ({
    //     ...prevState,
    //     isLoading: false,
    //   }))

    //   return [
    //     {
    //       scope: '',
    //       statusCode: '500',
    //       rootCause: 'null response',
    //       trace: 'Service.GetImages',
    //     },
    //   ]
    // } else {
    //   setResponse((prevState) => ({
    //     ...prevState,
    //     searchResponse: res?.result,
    //     isLoading: false,
    //   }))
    // }

    return null
  }

  const onInputChange = useCallback((e: InputEventT) => {
    e.preventDefault()
    console.log('===' + e.target.value)
    // throttle setState with timeout
    const timer = setTimeout(() => {
      setResponse((prevState) => ({ ...prevState, input: e.target.value }))
    }, 100)

    return clearTimeout(timer)
  }, [])

  const onReset = (): void => {
    setResponse(initialSearchState)
  }

  const handler: SearchBarI = {
    onSubmit,
    onInputChange,
    onReset,
  }

  return [response, handler]
}

export default useSearch
