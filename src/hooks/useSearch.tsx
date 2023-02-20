import { useCallback, useState } from 'react'
import Constants from '../Constants'
import { ErrorI, ServiceI } from './useService'

const { DefaultSize, DefaultAmount, SearchBarFormId } = Constants

type SearchBarResponseT = [SearchBarT, SearchBarI]

export type SearchBarT = {
    isSearchLoading: boolean
    Input: string
    Location: SearchBarLocT
}

export interface SearchBarI {
    onSubmit: (
        e: SubmitEventT,
        service: ServiceI,
    ) => Promise<ResponseI | ErrorI | null>
    onInputChange: (e: InputEventT) => void
    onReset: () => void
}

export const InitialSearchState: SearchBarT = {
    isSearchLoading: false,
    Input: '',
    Location: 'center',
}

// TODO implement this
// const newErrorResponse = (cause: string): ResponseI => {
//     return {
//         result: { created: 0, data: [] },
//         message: {
//             errorLog: [
//                 {
//                     scope: 'Service',
//                     statusCode: '500',
//                     rootCause: cause,
//                     trace: 'Post: error',
//                 },
//             ],
//             status: 'ERROR',
//             count: '0',
//         },
//     }
// }

export const isResponseI = (response: any): boolean => {
    return (response as ResponseI) !== undefined
}

export const isErrorI = (response: any): boolean => {
    return (response as ErrorI) !== undefined
}

/**
 * * === useSearchBar hook ===
 *
 * @param state: the current state of the search bar.
 * @returns searchBar state and a handler for the utility functions
 */

const useSearch = (state: SearchBarT): SearchBarResponseT => {
    const [Response, setResponse] = useState<SearchBarT>(state)

    const onSubmit = async (
        e: SubmitEventT,
        Service: ServiceI,
    ): Promise<ResponseI | ErrorI | null> => {
        e.preventDefault()

        const Input = e.target[SearchBarFormId].value

        setResponse((prevState: SearchBarT) => ({
            ...prevState,
            isSearchLoading: true,
            Location: 'top',
            Input,
        }))

        const apiResponse = await Service.ImageRequest({
            n: DefaultAmount,
            size: DefaultSize,
            prompt: Input,
        })

        // handle errors here
        if (isErrorI(apiResponse)) {
            const err = apiResponse as ErrorI
            if (err) {
                console.error(`error: ${err.RootCause}\n`)
                console.error(JSON.stringify(err.ErrorLog))
            } else {
                console.error(`search error: ${err}`)
            }
        }
        // successful response
        if (isResponseI(apiResponse)) {
            console.info('=== Service: ImageRequest: success')
        }

        setResponse((prevState: SearchBarT) => ({
            ...prevState,
            searchLoading: false,
        }))

        return apiResponse
    }

    const onInputChange = useCallback((e: InputEventT) => {
        e.preventDefault()
        const Input = e.target.value
        // throttle setState with timeout
        const Timer = setTimeout(() => {
            setResponse((prevState) => ({
                ...prevState,
                Input,
            }))
        }, 500) // 500ms

        return clearTimeout(Timer)
    }, [])

    const onReset = (): void => {
        setResponse(InitialSearchState)
    }

    const Handler: SearchBarI = {
        onSubmit,
        onInputChange,
        onReset,
    }

    return [Response, Handler]
}

export default useSearch
