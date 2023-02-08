import { Dispatch, FormEvent, SetStateAction } from 'react'
import Service from '../../services/Service'

interface postProps {
  e: FormEvent<HTMLFormElement>
  req: RequestI
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<ResultI | undefined>>
  setAlert: Dispatch<SetStateAction<AlertT | undefined>>
  clearAlert: () => void
}

const Post = (props: postProps): void => {
  const { e, req, clearAlert, setIsLoading, setResult, setAlert } = props
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

export default Post
