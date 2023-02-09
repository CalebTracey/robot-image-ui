declare type ResultT = ResultI | null
declare type AlertT = { type: 'success' | 'danger'; message: string }
declare type VoidFn = () => void
declare type PromiseVoidFn = () => Promise<void>
declare type InputEventT = ChangeEvent<HTMLInputElement>
declare type SubmitEventT = FormEvent<HTMLFormElement>
declare type ResultLocT = 'center' | 'bottom'
declare type SearchBarLocT = 'center' | 'top'

declare interface UrlI {
  url: string
}

declare interface RequestI {
  n: number
  prompt: string
  size: string
}

declare interface ClearI {
  setPrompt: Dispatch<SetStateAction<string>>
  setResult: Dispatch<SetStateAction<ResultI>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

declare interface ResponseI {
  result: ResultI | null
  message: MessageI
}

declare interface ResultI {
  created: number
  data: UrlI[]
}

declare interface MessageI {
  errorLog: TErrorLogs
  status: string
  count: string
}

declare type TErrorLogs = ErrorLogI[]

declare interface ErrorLogI {
  scope: string
  statusCode: string
  rootCause: string
  trace: string
}
