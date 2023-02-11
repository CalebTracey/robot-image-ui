import { useState } from 'react'
import axios, { AxiosError, isAxiosError } from 'axios'
import Constants from '../Constants'
import chalk from 'chalk'

export type ServiceT = {
    isServiceLoading: boolean
}

export interface ServiceI {
    ImageRequest: (request: RequestI) => Promise<ResponseI | ErrorI | null>
}

export interface ErrorI {
    StatusCode: string
    RootCause: string
    Trace: string
    ErrorLog: ErrorLogsT | null
}

// StatusCode: error.code ? error.code : "500",
//                 RootCause: error.cause ? error.cause.message : "Axios error"

const NewServiceError = (error: ErrorI | AxiosError): ErrorI => {
    if (isAxiosError(error)) {
        const { code, cause } = error
        return {
            StatusCode: code ? code : '500',
            RootCause: cause ? cause.message : 'Axios error',
            Trace: 'Service: ImageRequest: error',
            ErrorLog: null,
        }
    }

    return error
}

export const InitialServiceState: ServiceT = { isServiceLoading: false }

/**
 ** useService custom hook
 *  TODO - would be cool to add state that monitors progress for a load bar
 */
const useService = (state: ServiceT): [ServiceT, ServiceI] => {
    const [Response, setResponse] = useState<ServiceT>(state)

    const setLoading = (loading: boolean): void => {
        console.log('=== set loading: ' + loading)
        setResponse((prevState) => ({
            ...prevState,
            isServiceLoading: loading,
        }))
    }

    const ImageRequest = async (
        request: RequestI,
    ): Promise<ResponseI | ErrorI | null> => {
        console.info(
            chalk.green(
                '=== Service: Request starting for: ' + JSON.stringify(request),
            ),
        )
        setLoading(true)
        try {
            const res = await axios.post<ResponseI>(
                // * change URL here
                Constants.LocalURL,
                request,
            )
            setLoading(false)
            return res.data
        } catch (error) {
            if (error) {
                const err = error as ErrorI
                const axiosErr = error as AxiosError
                if (axiosErr) {
                    return NewServiceError(axiosErr)
                } else if (err) {
                    return NewServiceError(err)
                } else {
                    console.error('error: ' + error)
                }
            }
            setLoading(false)
        }
        return null
    }

    const DAO: ServiceI = {
        ImageRequest,
    }

    return [Response, DAO]
}

export default useService
