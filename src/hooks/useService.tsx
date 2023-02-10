import { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import Constants from '../Constants'
import chalk from 'chalk'

export type ServiceT = {
    isServiceLoading: boolean
}

export interface ServiceI {
    ImageRequest: (request: RequestI) => Promise<ResponseI | null>
}

export const InitialServiceState: ServiceT = { isServiceLoading: false }

/**
 ** useService custom hook
 */
const useService = (state: ServiceT): [ServiceT, ServiceI] => {
    const [Response, setResponse] = useState<ServiceT>(state)

    const setLoading = (loading: boolean): void => {
        setResponse((prevState) => ({
            ...prevState,
            isServiceLoading: loading,
        }))
    }

    const ImageRequest = async (
        request: RequestI,
    ): Promise<ResponseI | null> => {
        console.log(
            chalk.green(
                '=== Service: Request starting for: ' + JSON.stringify(request),
            ),
        )
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

    const Handler: ServiceI = {
        ImageRequest,
    }

    return [Response, Handler]
}

export default useService
