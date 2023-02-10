import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface StateI {
    Result: ResultT
    setResult: Dispatch<SetStateAction<ResultT>>
}

const InitialState: StateI = { Result: null, setResult: () => null }

const ResultContext = createContext<StateI>(InitialState)

interface ResultProviderI {
    children: JSX.Element
}

const ResultProvider = (props: ResultProviderI): JSX.Element => {
    const [Result, setResult] = useState<ResultT>(null)

    const { children } = props
    const { Provider } = ResultContext

    return <Provider value={{ Result, setResult }}>{children}</Provider>
}

export { ResultContext, ResultProvider }
