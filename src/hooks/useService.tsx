import { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import Constants from '../Constants'
import chalk from 'chalk'

type ServiceT = {
  isServiceLoading: boolean
}

interface ServiceI {
  imageRequest: (request: RequestI) => Promise<ResponseI | null>
}

export const initialServiceState: ServiceT = { isServiceLoading: false }

/**
 ** useService custom hook
 */
const useService = (state: ServiceT): [ServiceT, ServiceI] => {
  const [response, setResponse] = useState<ServiceT>(state)

  const setLoading = (loading: boolean): void => {
    setResponse((prevState) => ({ ...prevState, isServiceLoading: loading }))
  }

  const imageRequest = async (request: RequestI): Promise<ResponseI | null> => {
    console.log(chalk.green('Request starting for: ' + JSON.stringify(request)))
    setLoading(true)
    try {
      const res = await axios.post<ResponseI>(Constants.DevURL, request)
      setLoading(false)
      return res.data
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message)
      } else {
        console.error(error)
      }
      setLoading(false)
      return null
    }
  }

  const handler: ServiceI = {
    imageRequest,
  }

  return [response, handler]
}

export default useService
