import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface StateI {
  result: ResultT
  setResult: Dispatch<SetStateAction<ResultT>>
}

const InitialState: StateI = { result: null, setResult: () => null }

const ResultContext = createContext<StateI>(InitialState)

interface ResultProviderI {
  children: JSX.Element
}

const ResultProvider = (props: ResultProviderI): JSX.Element => {
  const [result, setResult] = useState<ResultT>(null)

  const { children } = props
  const { Provider } = ResultContext

  return <Provider value={{ result, setResult }}>{children}</Provider>
}

export { ResultContext, ResultProvider }
